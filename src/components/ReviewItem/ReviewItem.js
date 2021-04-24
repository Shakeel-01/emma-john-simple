import React from 'react';

const ReviewItem = (props) => {
    const {name, quantity,key,price}=props.product;
    const reviewItemStyle = {borderBottom:'1px solid lightgray',
                            marginBottom:'5px',
                            paddingBottom:'5px',
                            marginLeft:'5px'
                            }
    return (
        <div style={reviewItemStyle}>
            <h4 className='product-name'>{name}</h4>
            <p>price: {price}</p>
            <h6>quantity: {quantity}</h6>
            <button onClick={()=>props.removeProduct(key)} className='main-btn'>Remove Item </button>
        </div>
    );
};

export default ReviewItem;