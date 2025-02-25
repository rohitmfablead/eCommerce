
import * as React from 'react';
import { View, Text, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from './src/screens/SplashScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import FlashMessage from 'react-native-flash-message';
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import BottomNavigation from './src/navigation/BottomNavigation';
import ProductDetails from './src/screens/ProductDetails';
import CheckoutScreen from './src/screens/CheckoutScreen';
import ThankYouScreen from './src/screens/ThankYouScreen';
import { StripeProvider } from '@stripe/stripe-react-native';

const Stack = createNativeStackNavigator();


export default function App() {

  // Alert.alert("SP_KEY Value", SP_KEY);

  return (
    <StripeProvider
      publishableKey="pk_test_51QvC5cPwOecqZ4beCc0hOhuNgHitOCug3ZkHD98HTjpmvxtuxi0uhKWsdiJ0HCux6BZngEqHIjronNojPcAo5nOd00Ez9yAiZ1" // Stripe Dashboard se lein
      // merchantIdentifier="merchant.com.yourapp" // Apple Pay ke liye
    >
    <Provider store={store}>
      <NavigationContainer>
      <FlashMessage position="top" />
      <Stack.Navigator screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Bottom" component={BottomNavigation} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="ProductDetails" component={ProductDetails} />
        <Stack.Screen name="CheckoutScreen" component={CheckoutScreen} />
        <Stack.Screen name="ThankYouScreen" component={ThankYouScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
    </StripeProvider>
  );
}


// import { StyleSheet, Text, View, Alert, SafeAreaView } from 'react-native'
// import React from 'react'
// import { SP_KEY } from '@env'
// import { StripeProvider } from '@stripe/stripe-react-native';
// import BaseLayout from './src/components/BaseLayout';
// import PaymentScreen from '../Demo/src/screens/PaymentScreen';

// const App = () => {
//   // Alert.alert("SP_KEY Value", SP_KEY);
//   return (
//     <BaseLayout>
//       {/* <View style={{ flex: 1, backgroundColor: 'red' }}> */}
//         <StripeProvider
//           publishableKey={SP_KEY}

//         >
//         <PaymentScreen/>
//         </StripeProvider>
//       {/* </View> */}
//     </BaseLayout>
//   )
// }

// export default App

// const styles = StyleSheet.create({})

