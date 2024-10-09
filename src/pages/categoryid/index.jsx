import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import instance from "../../utils/instance.js";
import BottomMenu from "../../components/BottomMenu/index.jsx";

function Index(props) {

    const {categoryId} = useParams()

    useEffect(() => {
        getProductsByCategory(categoryId)
    }, [categoryId]);


    const getProductsByCategory = (categoryId) => {
        instance.get('/v1/product', {
            params: {
                categoryId
            }
        }).then(res => {
            console.log(res.data)
        })
    }


    return (
        <div>
            <h1>Category</h1>
            <BottomMenu/>
        </div>
    );
}

export default Index;