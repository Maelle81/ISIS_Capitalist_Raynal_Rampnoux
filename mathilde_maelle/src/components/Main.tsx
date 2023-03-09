import { useEffect, useState } from "react"
import { ToastContainer } from "react-toastify"
//import { ToastContainer } from "react-bootstrap"
import { suiteGeoSomme, transform } from "../util"
import { Product, World } from "../world"
import Header from "./Header"
import LeftMenu from "./LeftMenu"
import ProductComponent from "./ProductComponent"

type MainProps = {
    loadworld: World
    username: string
}

export default function Main({loadworld, username } : MainProps) {

    const [world, setWorld] = useState(JSON.parse(JSON.stringify(loadworld)) as World)
    
    const [qtmulti, setMulti] = useState("x1")   
    const[score,setScore]=useState(world.score)
    const[money,setMoney]=useState(world.money) 
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        setWorld(JSON.parse(JSON.stringify(loadworld)) as World)
    }, [loadworld])

    function addToScore(gain : number){
        setScore(world.score+gain)
        setMoney(world.money+gain)
    }

    function onProductionDone(p: Product, qt: number): void {
        // calcul de la somme obtenue par la production du produit
        let gain = qt*(p.quantite * p.revenu)
        addToScore(gain)
    }

    function onProductBuy(qt:number, product:Product){
        const cout = suiteGeoSomme(product.cout, product.croissance, qt)
        let cost = qt*product.cout
        if(world.money >= product.cout){
            world.money -= cost
        }
    }  

    function positionButton(){
        switch(qtmulti){
            case "x1":
                setMulti("x10")
                setQuantity(10)
                break
            case "x10":
                setMulti("x100")
                setQuantity(100)
                break
            case "x100":
                setMulti("Max")
                
                break
            case "Max":
                setMulti("x1")
                setQuantity(1)
                break
            default:
                setMulti("x1")
                setQuantity(1)
        }
       
    }
    

    return(
        <div className="app">
            <Header username={username} qtmulti={qtmulti} positionButton={positionButton}  loadworld={loadworld} />
            <div className="main">
                <LeftMenu loadworld={loadworld}></LeftMenu>
                <div className="product">                    
                    <ProductComponent onProductionDone={onProductionDone} qtmulti={qtmulti} product = {world.products[0]} quantity={quantity}  />
                    <ProductComponent onProductionDone={onProductionDone} qtmulti={qtmulti} product = {world.products[1]} quantity={quantity}/>
                    <ProductComponent onProductionDone={onProductionDone} qtmulti={qtmulti} product = {world.products[2]} quantity={quantity}/>
                    <ProductComponent onProductionDone={onProductionDone} qtmulti={qtmulti} product = {world.products[3]} quantity={quantity}/>
                    <ProductComponent onProductionDone={onProductionDone} qtmulti={qtmulti} product = {world.products[4]} quantity={quantity}/>
                    <ProductComponent onProductionDone={onProductionDone} qtmulti={qtmulti} product = {world.products[5]} quantity={quantity}/>
                </div>
            </div>
            <ToastContainer/>
        </div>
    )
}