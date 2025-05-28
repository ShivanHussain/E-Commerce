import React from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

const CustomPayPalButton = ({ amount, onSuccess, onError, formData }) => {
  if (!amount || isNaN(amount) || amount <= 0) {
    return null;
  }

  return (
    <PayPalScriptProvider
      options={{
        'client-id': process.env.REACT_APP_PAYPAL_CLIENT_ID,
        currency: 'USD',
      }}
    >
      <PayPalButtons
        style={{ layout: 'vertical', shape: 'rect' }}
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: amount.toString(),
                  currency_code: 'USD',
                },
              },
            ],
            payer: {
              name: {
                given_name: formData.fullName,
              },
              email_address: formData.email,
              phone: {
                phone_number: {
                  national_number: formData.phone,
                },
              },
            },
          });
        }}
        onApprove={(data, actions) => {
          return actions.order.capture().then((details) => {
            onSuccess?.(details);
          });
        }}
        onError={(err) => {
          console.error('PayPal Error:', err);
          onError?.(err);
        }}
      />
    </PayPalScriptProvider>
  );
};


export default CustomPayPalButton;
