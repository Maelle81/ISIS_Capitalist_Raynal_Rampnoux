import { useEffect, useState } from "react"
import { Palier, Product, World } from "../world"
import Header from "./Header"
import LeftMenu from "./LeftMenu"
import ProductComponent from "./ProductComponent"
import "../assests/css/style.css";
import { gql, useMutation } from "@apollo/client"

type MainProps = {
    loadworld: World
    username: string
    onUserNameChanged:(event:any)=>void
}

export default function Main({loadworld, username, onUserNameChanged } : MainProps) {

    const [world, setWorld] = useState(JSON.parse(JSON.stringify(loadworld)) as World)    
    const [qtmulti, setMulti] = useState("x1")   
    const[score,setScore]=useState(world.score)
    const[money,setMoney]=useState(world.money) 
    const [nbQuantity, setnbQuantity] = useState(1)
    const [productQuantities, setProductQuantities] = useState<number[]>(world.products.map(p => p.quantite));
    const [snackBar, setsnackBar]=useState(false)  

    const ACHETER_QT_PRODUIT = gql`
        mutation acheterQtProduit($id:Int!, $quantite:Int!){
            acheterQtProduit(id:$id, quantite : $quantite){
                id
            }
        }
    `

    const[achterQtProduit]= useMutation(ACHETER_QT_PRODUIT,
        {  context: { headers: { "x-user": username } },
            onError: (error): void => {
            // actions en cas d'erreur
            }
        }
    )

    const ENGAGER_MANAGER = gql`
    mutation engagerManager($name: String!) {
      engagerManager(name: $name) {
        name
      }
    }
  `
    const [engagerManager] = useMutation(ENGAGER_MANAGER,
    { context: { headers: { "x-user": username }},
      onError: (error): void => {
        // actions en cas d'erreur
      }
    }
    )

    useEffect(() => {
        setWorld(JSON.parse(JSON.stringify(loadworld)) as World)
    }, [loadworld])


 
    function addToScore(gain : number){
        setScore(score+gain)
        setMoney(money+gain)
        setWorld({...world})
        //console.log('score'+gain)
    }

    function onProductionDone(p: Product, qt: number): void {
        // calcul de la somme obtenue par la production du produit
        let gain = qt*(productQuantities[p.quantite] * p.revenu)    
        addToScore(gain)
       
    }

    function onProductBuy(qt:number, product:Product){

        const cost = product.cout*((1-Math.pow(product.croissance, qt))/(1-product.croissance))
        let cout = qt*product.cout
        let costPredict = money-cost
        let costFuture = product.cout * Math.pow(product.croissance, qt)
        //achterQtProduit({ variables: { id: product.id, quantite: qt} })

        if(money >= costPredict){
           setMoney(costPredict)
            product.revenu += product.revenu*product.croissance*qt
            //product.quantite+=qt
            const newQuantities = [...productQuantities];
            newQuantities[product.id-1] += qt;
            
            setProductQuantities(newQuantities);
            setWorld({...world})
        }

        setWorld({...world})
        //console.log('money main'+money)
    }  

    

    function positionButton(){
        
        switch(qtmulti){
            case "x1":
                setMulti("x10")
                setnbQuantity(10)
                break
            case "x10":
                setMulti("x100")
                setnbQuantity(100)
                break
            case "x100":
                setMulti("Max")
                //setnbQuantity(999)
                break
            case "Max":
                setMulti("x1")
                setnbQuantity(1)
                break
            default:
                setMulti("x1")
                setnbQuantity(1)
        }
       
    }

    function hireManager(manager: Palier) {
        //engagerManager({variables:{name: manager.name}})
        if (money >= manager.seuil){
            manager.unlocked = true
            setMoney(money - manager.seuil)
            world.products[manager.idcible - 1].managerUnlocked = true
            //setShowManagers(false)
            setsnackBar(true)     
            setWorld({...world})
        }
    }

    function buyCashUpgrade(upgrade:Palier){
        
        if(money >= upgrade.seuil){
            upgrade.unlocked=true
            setMoney(money -upgrade.seuil)       
            
            if(upgrade.idcible==0){
                world.products.forEach(product =>{
                    if(upgrade.typeratio =="gain"){
                        product.revenu= product.revenu*upgrade.ratio
                    } 
                    if (upgrade.typeratio =="vitesse"){
                        product.vitesse /= upgrade.ratio
                    }
                    //return product
                    }
                )
            }else{
                let product = world.products.find(element => element.id == upgrade.idcible)
                if(product){
                    if(upgrade.typeratio =="gain"){
                        product.revenu= product.revenu*upgrade.ratio
                    } 
                    if (upgrade.typeratio =="vitesse"){
                        product.vitesse /= upgrade.ratio
                    }
                    //return product
                }
            }
            setsnackBar(true)  
            setWorld({...world})
        }
      }

    return(
        <div className="app">  
            <div> Your ID : </div>
            <input type="text" value={username} onChange={onUserNameChanged} />         
            <Header username={username} qtmulti={qtmulti} positionButton={positionButton} loadworld={loadworld} money={money}/>            
            <div className="main">                
                <LeftMenu  setsnackBar={setsnackBar} snackBar={snackBar}
                hireManager={hireManager} username={username}
                loadworld={loadworld} money={money}
                updateWorld={(world)=> setWorld({...world})} 
                setMoney={setMoney}
                buyCashUpgrade={buyCashUpgrade} ></LeftMenu>
                <div className="products">                    
                    <ProductComponent onProductionDone={onProductionDone}
                    qtmulti={qtmulti} product = {world.products[0]} nbQuantity={nbQuantity} 
                    money={money} onProductBuy={onProductBuy}
                    quantite={productQuantities[0]} username={username} />

                    <ProductComponent onProductionDone={onProductionDone} 
                    qtmulti={qtmulti} product = {world.products[1]} nbQuantity={nbQuantity} 
                    money={money} onProductBuy={onProductBuy}
                    quantite={productQuantities[1]} username={username}  />

                    <ProductComponent onProductionDone={onProductionDone} 
                    qtmulti={qtmulti} product = {world.products[2]} nbQuantity={nbQuantity} 
                    money={money} onProductBuy={onProductBuy}
                    quantite={productQuantities[2]} username={username}/>

                    <ProductComponent onProductionDone={onProductionDone} 
                    qtmulti={qtmulti} product = {world.products[3]} nbQuantity={nbQuantity} 
                    money={money} onProductBuy={onProductBuy} 
                    quantite={productQuantities[3]} username={username}/>

                    <ProductComponent onProductionDone={onProductionDone} 
                    qtmulti={qtmulti} product = {world.products[4]} nbQuantity={nbQuantity} 
                    money={money} onProductBuy={onProductBuy}
                    quantite={productQuantities[4]} username={username}/>

                    <ProductComponent onProductionDone={onProductionDone} 
                    qtmulti={qtmulti} product = {world.products[5]} nbQuantity={nbQuantity} 
                    money={money} onProductBuy={onProductBuy} 
                    quantite={productQuantities[5]} username={username}/>
                </div>
            </div>            
        </div>
    )
}