import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Product from '../Product/Product';

const Detail = () => {
    const{ productKey }= useParams();
    const [product, setProduct] = useState({})

    useEffect(()=>{
        fetch('https://gentle-brushlands-93265.herokuapp.com/product/'+ productKey)
        .then(res => res.json())
        .then(data => setProduct(data))
    },[productKey])

    // const product=fakeData.find(pd=>pd.key===productKey);
    console.log(product)
    return (
        <div>
            <h1>{productKey} Detail coming soon</h1>
            <Product showAddCart={false} product={product}></Product>
        </div>
    );
};

export default Detail;