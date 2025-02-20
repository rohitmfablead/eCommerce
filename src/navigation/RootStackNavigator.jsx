import React from 'react';
import { STACK_NAVIGATION_KEYS } from './StackNavigationKeys';
import { STACK_NAVIGATION_ROUTES } from './Routes';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        animation: 'slide_from_right',
        headerShown: false,
        statusBarTranslucent: false,
        statusBarStyle: 'light',
       
      }}
      >
      <Stack.Screen
        name={STACK_NAVIGATION_KEYS.SPLASH_SCREEN}
        component={STACK_NAVIGATION_ROUTES.SplashScreen}
      />
      <Stack.Screen
        name={STACK_NAVIGATION_KEYS.HOME_SCREEN}
        component={STACK_NAVIGATION_ROUTES.HomeScreen}
      />
     
      
    </Stack.Navigator>
  );
};

export default RootNavigator;
