import React, { useEffect } from 'react'
import Layout from '../../Components/Layout/Layout'
import {fetchCategories} from '../../Redux/Category/ActionCreator'
import {useDispatch, useSelector} from 'react-redux'

function Category() {

    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(fetchCategories())
    }, [])

    function RenderCategories({categories}){

        const categ = categories.map((cat) => {
            if (cat.categories){
                return RenderCategories(cat.categories)
            }
            else{
                return <li>{cat.name}</li>
            }
        })

        return <ul>{categ}</ul>
    }

    const Categories = useSelector(state => state.category.categories)
    const loading = useSelector(state => state.category.loading)
    const errMess = useSelector(state => state.category.errMess)

    console.log(Categories)
    console.log(Array.from(Categories))
    
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
            </Layout>
        )
    }
}

export default Category
