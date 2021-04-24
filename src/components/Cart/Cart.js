import React from 'react';


const Cart = (props) => {
    const cart = props.cart
    // const total=cart.reduce((total, prd)=>total+prd.price,0)
    let total=0;
    for(let i=0; i<cart.length; i++){
        const product= cart[i];
        total=total+product.price*product.quantity || 1;
    }
    let shipping=0;
    if(total>35){
        shipping=0;
    }
    else if(total>15){
        shipping=8.99;
    }
    else if(total>0){
        shipping=12.99;
    }

    const tax =( total*0.1).toFixed(2);
    const grandTotal = (total+shipping+Number(tax)).toFixed(2)
    return (
        <div>
            <h5>order summary</h5>
            <p>Items Ordered: {cart.length}</p>
            <p>product price: {total}</p>
            <p>VAT: {tax}</p>
            <p>shipping: {shipping}</p>
            <p>total price:{grandTotal} </p>
            {
                props.children
            }
        </div>
    );
};

export default Cart;