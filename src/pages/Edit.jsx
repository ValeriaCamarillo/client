import React, { useEffect, useState } from 'react'
import axios from "axios"
import { useParams, useNavigate } from 'react-router-dom'



const Edit = () => {

    // GET PATH VARIABLE
    const { product_id } = useParams()

    const navigate = useNavigate()

    // STATE
    const [title, setTitle] = useState("")
    const [price, setPrice] = useState("")
    const [description, setDescription] = useState("")

    const [errors, setErrors] = useState([]); 

    useEffect(() => {
        axios.get(`http://localhost:8000/api/products/${product_id}`)
            .then(res => {
                console.log(res.data)
                setTitle(res.data.title)
                setPrice(res.data.price)
                setDescription(res.data.description)
            })
            .catch(errors => console.log(errors))
    }, [])

    const updateProduct = (e) => {
        e.preventDefault()
        // CREATE BODY TO SENT OVER TO API
        let updatedBody = {
            "title": title,
            "price": price,
            "description": description
        }
        // MAKE A AXIOS REQUEST TO MY API
        axios.put(`http://localhost:8000/api/products/${product_id}`, updatedBody)
            .then(res => {
                // navigate(`/products`) REDIRECT TO DASH
                navigate(`/products/${product_id}`) // REDIRECT TO DETAILS
            })
            .catch(err=>{
                const errorResponse = err.response.data.errors; // Get the errors from err.response.data
                const errorArr = []; // Define a temp error array to push the messages in
                for (const key of Object.keys(errorResponse)) { // Loop through all errors and get the messages
                    errorArr.push(errorResponse[key].message)
                }
                // Set Errors
                setErrors(errorArr);
            })
    }

    return (
        <fieldset>
            <legend>Edit.jsx</legend>
            <form onSubmit={updateProduct}>
                <p>
                    Title:
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                </p>
                <p>
                    Price:
                    <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
                </p>
                <p>
                    Description:
                    <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
                </p>
                <button>Submit</button>
            </form>
            {
                errors.map((error) => <p>{error}</p>)
            }
        </fieldset>
    )
}

export default Edit