import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


const Create = () => {

    const navigate = useNavigate()

    //STATE//
    const [title, setTitle] = useState("")
    const [price, setPrice] = useState("")
    const [description, setDescription] = useState ("")
    const [errors, setErrors] = useState([]);

    const createProduct = (e) => {
        e.preventDefault()
        //CREATE BODY TO SEND OVER TO API 
        let body = {
            "title" : title,
            "price" : price,
            "description" : description
        }
        // MAKE AN AXIOS REQUEST TO MY API
        axios.post("http://localhost:8000/api/products", body)
        //SUCCESSFUL RESPONSE 
            .then(res => {
                console.log(res.data)
                setTitle("")
                setPrice("")
                setDescription("")
                navigate("/products")
            })

        //UNSUCESSFUL RESPONSE
            .catch(err => {
                const errorResponse = err.response.data.errors;
                const errorArr = [];
                for (const key of Object.keys(errorResponse)) {
                    errorArr.push(errorResponse[key].message)
                }
                setErrors(errorArr);
            })
    }

    return (
    <fieldset>
        <legend>Create.jsx</legend>
        <form onSubmit={createProduct}>
        <p>
            Title:
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}/>
        </p>
        <p>
            Price:
            <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
        </p>
        <p>
            Description:
            <input type="text" value={description} onChange={(e) => setDescription(e.target.value)}/>
        </p>
        <button>Submit</button>
        </form>
        {
            errors.map((error) => <p>{error}</p>)
        }
    </fieldset>
  )
}

export default Create