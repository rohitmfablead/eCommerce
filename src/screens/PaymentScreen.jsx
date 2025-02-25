import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import BraintreeDropIn from 'react-native-braintree-dropin-ui';
import BaseLayout from '../components/BaseLayout';

const PaymentScreen = () => {

  const showBraintreeUI = async () => {
    try {
      const result = await BraintreeDropIn.show({
        clientToken: "YOUR_BRAINTREE_CLIENT_TOKEN",
        googlePay: true,
        applePay: true,
        paypal: true,
        cardDisabled: false,
        vaultManager: true,
      });
  
      if (result) {
        console.log("Nonce:", result.nonce);
        // Send nonce to backend for payment processing
      }
    } catch (error) {
      console.error(error);
    }
  };



  return (
   <BaseLayout>
   <Button onPress={}/>
   </BaseLayout>
  )
}

export default PaymentScreen

const styles = StyleSheet.create({})