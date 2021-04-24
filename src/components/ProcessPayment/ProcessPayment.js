import React from 'react';
import { CardElement, Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CardForm from './CardForm';
import SplitForm from './SplitForm';

const stripePromise = loadStripe('pk_test_51Ie1rkEebNxs9S83j1gxftQRjDx56DDj9TuyIe5clQNlVDUZeoBVpAKG2sLVW3venSHRcV3N1LsXkdkCRx4HoVuy00N09egrDS');

const ProcessPayment = ({handlePayment}) => {
    return (
        <div>
            <Elements stripe={stripePromise}>
                <CardForm handlePayment={handlePayment}></CardForm>
            </Elements>
        </div>
    );
};

export default ProcessPayment;