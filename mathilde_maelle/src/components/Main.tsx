import { useEffect, useState } from "react"
import { ToastContainer } from "react-toastify"
import { geometricSum, transform } from "../util"
import { Product, World } from "../world"
import Header from "./Header"
import LeftMenu from "./LeftMenu"
import ProductComponent from "./ProductComponent"
import "../assests/css/style.css";

type MainProps = {
    loadworld: World
    username: string    
}

export default function Main({loadworld, username } : MainProps) {

    const [world, setWorld] = useState(JSON.parse(JSON.stringify(loadworld)) as World)    
    const [qtmulti, setMulti] = useState("x1")   
    const[score,setScore]=useState(world.score)
    const[money,setMoney]=useState(world.money) 
    const [nbQuantity, setnbQuantity] = useState(1)
    const [productQuantities, setProductQuantities] = useState<number[]>(world.products.map(p => p.quantite));
    
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

    return(
        <div className="app">           
            <Header username={username} qtmulti={qtmulti} positionButton={positionButton} loadworld={loadworld} money={money}/>            
            <div className="main">                
                <LeftMenu loadworld={loadworld} money={money} updateWorld={(world)=> setWorld({...world})} setMoney={setMoney} ></LeftMenu>
                <div className="product">                    
                    <ProductComponent onProductionDone={onProductionDone}
                    qtmulti={qtmulti} product = {world.products[0]} nbQuantity={nbQuantity} 
                    money={money} onProductBuy={onProductBuy}
                    quantite={productQuantities[0]} />

                    <ProductComponent onProductionDone={onProductionDone} 
                    qtmulti={qtmulti} product = {world.products[1]} nbQuantity={nbQuantity} 
                    money={money} onProductBuy={onProductBuy}
                    quantite={productQuantities[1]}  />

                    <ProductComponent onProductionDone={onProductionDone} 
                    qtmulti={qtmulti} product = {world.products[2]} nbQuantity={nbQuantity} 
                    money={money} onProductBuy={onProductBuy}
                    quantite={productQuantities[2]}  />

                    <ProductComponent onProductionDone={onProductionDone} 
                    qtmulti={qtmulti} product = {world.products[3]} nbQuantity={nbQuantity} 
                    money={money} onProductBuy={onProductBuy} 
                    quantite={productQuantities[3]} />

                    <ProductComponent onProductionDone={onProductionDone} 
                    qtmulti={qtmulti} product = {world.products[4]} nbQuantity={nbQuantity} 
                    money={money} onProductBuy={onProductBuy}
                    quantite={productQuantities[4]}  />

                    <ProductComponent onProductionDone={onProductionDone} 
                    qtmulti={qtmulti} product = {world.products[5]} nbQuantity={nbQuantity} 
                    money={money} onProductBuy={onProductBuy} 
                    quantite={productQuantities[5]} />
                </div>
            </div>
            <div>
                //ToastContainer closeOnClick className='snackBar' theme="light" position="bottom-right" autoClose={3000}
            </div>
            
        </div>
    )
}