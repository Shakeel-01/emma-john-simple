import React from 'react';
import './Product.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faShoppingCart } from '@fortawesome/free-solid-svg-icons'

const Product = (props) => {
    // console.log(props);
    const { img, name, seller, price, stock } = props.product;
    return (
        <div className='product'>
            <div>
                <img src={img} alt="" />
            </div>
            <div>
                <h3 className='product-name'>{name}</h3>
                <p><small>by: {seller}</small></p>
                <p>${price}</p>
                <p><small>only {stock} left in stock-order now</small></p>
                <button onClick={()=>props.handleAddProduct(props.product)} className='main-btn'><FontAwesomeIcon icon={faShoppingCart} />Add to cart</button>
            </div>
        </div>
    );
};

export default Product;