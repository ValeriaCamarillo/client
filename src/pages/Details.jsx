import { useEffect, useState } from 'react'
import axios from "axios"
import { useParams } from 'react-router-dom'

const Details = () => {

    const {product_id} = useParams()

    // STATE
    const [oneProduct, setOneProduct] = useState(null)

    useEffect(() => {
        axios.get(`http://localhost:8000/api/products/${product_id}`)
            .then(res => setOneProduct(res.data))
            .catch(errors => console.log(errors))
    }, [])

    return (
        <fieldset>
            <legend>Details.jsx</legend>
            {/* TERNARY OPERATOR */}
            {
                (oneProduct) ? 
                <>
                    <h1>Title: {oneProduct.title}</h1>
                    <h1>Price: ${oneProduct.price}</h1>
                    <h1>Description: {oneProduct.description}</h1>
                </> : <h1>Loading....</h1>
            }

        </fieldset>
    )
}

export default Details