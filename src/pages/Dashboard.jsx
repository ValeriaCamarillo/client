import {useState, useEffect} from 'react'
import axios from "axios"
import {Link} from "react-router-dom"

const Dashboard = () => {
    // STATE
    const [allProducts, setAllProducts] = useState([])
    const [refresh, setRefresh] = useState(false)

    useEffect(() => {
        axios.get("http://localhost:8000/api/products")
            .then(res => setAllProducts(res.data))
            .catch(errors => console.log(errors))
    }, [refresh])

    const dateFormat = dateString =>{
        let dateObj = new Date(dateString)
    }

    const deleteProduct = (product_id) => {
        axios.delete(`http://localhost:8000/api/products/${product_id}`)
            .then(res => {
                setRefresh(!refresh)
            })
            .catch(errors => console.log(errors))
    }

    // HANDLER
    return (
        <fieldset>
            <legend>Dashboard.jsx</legend>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Price</th>
                        <th>Description</th>
                        <th>Created At</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        allProducts.map((product) => {
                            const {_id, title, price, description, createdAt} = product
                            return(
                                <tr key={_id}>
                                    <td>{_id}</td>
                                    <td>{title}</td>
                                    <td>${price}</td>
                                    <td>{description}</td>
                                    <td>{createdAt}</td>
                                    <td>
                                        <Link to={`/products/${_id}`}>View</Link>
                                        <Link to={`/products/edit/${_id}`}> Edit </Link>
                                        <button onClick={() => deleteProduct(_id)}> Delete</button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </fieldset>
    )
}

export default Dashboard