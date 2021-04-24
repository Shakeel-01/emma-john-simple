import React, { useEffect, useState } from 'react';
import { clearLocalShoppingCart, getDatabaseCart, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';
import image from '../../images/giphy.gif'
import { useHistory } from 'react-router';

const Review = () => {
    const [cart, setCart]=useState([])
    const [orderPlaced, setOrderPlaced]=useState(false)
    const history = useHistory()
    
    const handleProceedCheckout=()=>{
        history.push('/shipment')
    }

    const removeProduct =(productKey)=>{
        console.log('remove clicked', productKey)
        const newCart = cart.filter(pd=>pd.key!==productKey)
        setCart(newCart)
        removeFromDatabaseCart(productKey)
    }
    useEffect(()=>{
        const savedCart = getDatabaseCart()
        const productKeys = Object.keys(savedCart);
        console.log(productKeys)

        fetch("https://gentle-brushlands-93265.herokuapp.com/productsByKeys",{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(productKeys)
        })
        .then(res=>res.json())
        .then(data=>setCart(data))

    },[])
    let thankYou;
    if(orderPlaced){
        thankYou= <img src={image}></img>
    }
    return (
        <div className='twin-container'>
            <div className='product-container'>
           {
               cart.map(pd=><ReviewItem 
                key={pd.key}
                removeProduct={removeProduct}
                product={pd}></ReviewItem>)
           }
           {thankYou}
        </div>
        <div className='cart-container'>
            <Cart cart={cart}></Cart>
            <button onClick={handleProceedCheckout} className='main-btn'>Proceed Checkout</button>
        </div>
        </div>
    );
};

export default Review;