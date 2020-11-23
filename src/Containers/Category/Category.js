import React, { useEffect, useState } from 'react'
import Layout from '../../Components/Layout/Layout'
import {fetchCategories, addCategory} from '../../Redux/Category/ActionCreator'
import {useDispatch, useSelector} from 'react-redux'
import {Modal, Button, Row, Col, Form} from 'react-bootstrap'

function Category() {

    const dispatch = useDispatch()

    const [showModal, setShowModal] = useState(false)
    const [categoryName, setCategoryName] = useState('')
    const [categoryImg, setCategoryImg] = useState('')
    const [parentCateg, setParentCateg] = useState('')

    useEffect(()=>{
        dispatch(fetchCategories())
    }, [])

    var token = localStorage.getItem('token')
    const Categories = Object.values(useSelector(state => state.category.categories))
    const loading = useSelector(state => state.category.loading)
    const errMess = useSelector(state => state.category.errMess)

    const handleSubmit = e => {
        e.preventDefault()
        setShowModal(false)
        const CategoryData = new FormData()
        if (categoryName == '' /*|| categoryImg == ''*/){
            alert('Unable to Add the category')
        }
        else{
            CategoryData.append('name' , categoryName)
            if (categoryImg != '') CategoryData.append('categImg', categoryImg)
            if (parentCateg != '') CategoryData.append('parentId', parentCateg)
            dispatch(addCategory(CategoryData, token))
        }
    }


    function RenderCategories({categor}){

        let categ = []
        for(let cat of categor){
            categ.push(
                <li key={cat.name}>
                    {cat.name}
                    {
                        cat.categories ? <RenderCategories categor={cat.categories} /> : null
                    }
                    </li>
            )
        }

        return <ul>{categ}</ul>
    }

    const CategorySelect = Categories.map((cat)=>{
        return <option key={cat._id} value={cat._id}>{cat.name}</option>
    })
    
    if(loading){
        return (
            <Layout sidebar>
                <h3>Category</h3>
                <p>Loading . . . </p>
            </Layout>
        )
    }
    else if(errMess){
        return (
            <Layout sidebar>
                <h3>Category</h3>
                <p>{errMess}</p>
            </Layout>
        )
    }

    else{
        return (
            <Layout sidebar>
                <h3>Category</h3>
                <Row>
                    <Col sm={8}>
                        <RenderCategories categor={Categories} />
                    </Col>
                    <Col sm={4}>
                        <Button onClick={()=> setShowModal(!showModal)}>Add Category</Button>
                    </Col>
                </Row>
                <Modal show={showModal} onHide = {()=>setShowModal(!showModal)}>
                    <Modal.Header closeButton>
                        Add A New Category
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group>
                            <Form.Label>Category Name</Form.Label>
                            <Form.Control type='text' value={categoryName} 
                            placeholder='Category Name' 
                            onChange={(e)=>setCategoryName(e.target.value)}/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Parent Category</Form.Label>
                                <Form.Control as='select' value={parentCateg} 
                                onChange={(e) => setParentCateg(e.target.value)}>
                                    <option key='Null' value=''>Select a Parent</option>
                                    {CategorySelect}
                                </Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Category Picture</Form.Label>
                                <Form.File onChange={(e)=> setCategoryImg(e.target.files[0])} />
                            </Form.Group>
                            <Button type='submit' onClick={handleSubmit}>ADD</Button>
                            </Form>
                    </Modal.Body>
                </Modal>
            </Layout>
        )
    }
}

export default Category
