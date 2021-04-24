import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { userContext } from '../../App';
import { getDatabaseCart, clearLocalShoppingCart} from '../../utilities/databaseManager';
import ProcessPayment from '../ProcessPayment/ProcessPayment';
import './Shipment.css'

const Shipment = () => {
    const { register, handleSubmit, watch, errors } = useForm();
    const [loggedInUser, setLoggedInUser] = useContext(userContext)
    const [shippingData, setShippingData] = useState(null)
    const onSubmit = data => {
      setShippingData(data)
    };

    const handlePaymentSuccess = paymentId =>{
      const savedCart=getDatabaseCart()
      const orderDetails = {...loggedInUser, 
        products:savedCart, 
        shipment:shippingData, 
        paymentId,
        orderedTime: new Date()}

      fetch('https://gentle-brushlands-93265.herokuapp.com/addOrder',{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify(orderDetails)
      })
      .then(res=>res.json())
      .then(data=>{
        clearLocalShoppingCart();
        alert('Your Order placed successfully')
      })
    }
  
    console.log(watch("example")); // watch input value by passing the name of it
  
    return (
     <div className="row">
       <div style={{display: shippingData? 'none':'block'}} className="col-md-6">
       <form className='ship-form' onSubmit={handleSubmit(onSubmit)}>
      
      <input name="name" defaultValue={loggedInUser.name} ref={register({ required: true })} placeholder='Your name' />
      {errors.name && <span className='error'>Name is required</span>}
      <input name="email" defaultValue={loggedInUser.email} ref={register({ required: true })} placeholder='Email' />
      {errors.email && <span className='error'>Email is required</span>}
      <input name="address"  ref={register({ required: true })} placeholder='Shipping address' />
      {errors.address && <span className='error'>Address is required</span>}
      <input name="phone"  ref={register({ required: true })} placeholder='Phone no' />
      {errors.phone && <span className='error'>Phone is required</span>}
      <input type="submit" />
    </form>
       </div>
       <div style={{display: shippingData? 'block':'none'}} className="col-md-6">
         <ProcessPayment handlePayment={handlePaymentSuccess}></ProcessPayment>
       </div>
     </div>
    );
};

export default Shipment;