import { useEffect, useState } from "react"
import { transform } from "../util"
import { Product, World } from "../world"
import ProductComponent from "./ProductComponent"

type MainProps = {
    loadworld: World
    username: string
}

export default function Main({loadworld, username } : MainProps) {

    const [world, setWorld] = useState(JSON.parse(JSON.stringify(loadworld)) as World)
    
    const [multi, setMulti] = useState("x 1")    

    useEffect(() => {
        setWorld(JSON.parse(JSON.stringify(loadworld)) as World)
    }, [loadworld])

    return(
        <div>
            <img src= {"https://isiscapitalistgraphql.kk.kurasawa.fr/" + world.logo} />
            <div className="header">
                <div> {world.name} </div>
                <div> {world.money} </div>
                <div> {multi} </div>
                <div> {username} </div>
                <span dangerouslySetInnerHTML={{__html: transform(world.money)}}/>
            </div>
            <div className="main">
                <div> liste des boutons de menu </div>
                <div className="product">                    
                    <ProductComponent product = {world.products[0]} />
                    <ProductComponent product = {world.products[1]} />
                    <ProductComponent product = {world.products[2]} />
                    <ProductComponent product = {world.products[3]} />
                    <ProductComponent product = {world.products[4]} />
                    <ProductComponent product = {world.products[5]} />
                </div>
            </div>
        </div>
    )
}