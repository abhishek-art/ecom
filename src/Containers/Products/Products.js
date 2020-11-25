import React, {useState, useEffect} from 'react'
import Layout from '../../Components/Layout/Layout'
import {Modal, Button, Row, Col, Form} from 'react-bootstrap'
import {useSelector, useDispatch} from 'react-redux'
import {fetchProducts} from '../../Redux/Product/ActionCreator'

function Products() {

    const [productName, setProductName] = useState('')
    const [price, setPrice] = useState(0)
    const [description, setDescription] = useState('')
    const [profilePictures, setProfilePictures] = useState('')
    const [category, setCategory] = useState('')
    const [showModal, setShowModal] = useState(false)

    const token = localStorage.getItem('token')

    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(fetchProducts(token))
    }, [])

    const Categories = Object.values(useSelector(state => state.category.categories))

    const CategorySelect = Categories.map((cat)=>{
        return <option key={cat._id} value={cat._id}>{cat.name}</option>
    })

    const handleSubmit = (e) => {
        e.preventDefault()
    }

    return (
        <Layout sidebar>
            <h3>Products</h3>
            <Button onClick={() => setShowModal(!showModal)} >Add Product</Button>
            <Modal show={showModal} onHide = {()=>setShowModal(!showModal)}>
                    <Modal.Header closeButton>
                        Add A New Product
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group>
                            <Form.Label>Product Name</Form.Label>
                            <Form.Control type='text' value={productName} 
                            placeholder='Product Name' 
                            onChange={(e)=>setProductName(e.target.value)}/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Price</Form.Label>
                                <Form.Control type='text' value={price} 
                                placeholder='Price' 
                                onChange={(e)=>setPrice(e.target.value)}/>    
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Category</Form.Label>
                                <Form.Control as='select' value={category} 
                                onChange={(e) => setCategory(e.target.value)}>
                                    <option key='Null' value=''>Select a Category</option>
                                    {CategorySelect}
                                </Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Description</Form.Label>
                                <Form.Control type='text' value={description} 
                                placeholder='Description' 
                                onChange={(e)=>setDescription(e.target.value)}/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>
                                    Profile Pictures
                                </Form.Label>
                                <Form.File onChange={(e)=> setProfilePictures(e.target.files[0])} />
                            </Form.Group>
                            <Button type='submit' onClick={handleSubmit}>ADD</Button>
                            </Form>
                    </Modal.Body>
                </Modal>
        </Layout>
    )
}

export default Products