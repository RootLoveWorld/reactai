import { useEffect } from "react"
import {Test1,Test2} from './../learnTest'

function Miracle() {
    useEffect(() => { 
        console.log('Miracle 组件已挂载');
    }, [])


    return (<div>
        
        <Test1/>
        <Test2/>
        
        </div>)
}

export default Miracle