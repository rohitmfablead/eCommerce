import { StyleSheet, Image } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import CartScreen from '../screens/CartScreen';
import { homes, house, shopping_cart, trolley, user, user2 } from '../assets/image';
import { Colors } from '../utils/theme';


const Tab = createBottomTabNavigator();

const BottomNavigation = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: '#fff',
                    height: 100,
                    borderTopRightRadius:20,
                    borderTopLeftRadius:20,
                    elevation:10
                   
                },
                tabBarLabelStyle: {
                    fontSize: 15,
                    fontWeight: 'bold',
                    paddingVertical:20
                },
                tabBarActiveTintColor: Colors.PRIMARY_COLOR,
                tabBarInactiveTintColor: 'gray',
                tabBarIcon: ({ focused }) => {
                    let iconSource;
                    if (route.name === 'Home') {
                        iconSource = focused ? house : homes;
                    } else if (route.name === 'Cart') {
                        iconSource = focused ? trolley : shopping_cart;
                    } else if (route.name === 'Profile') {
                        iconSource = focused ? user2 : user;
                    }
                    return <Image source={iconSource} style={styles.icon} />;
                },
            })}
        >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Cart" component={CartScreen} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
    );
};

export default BottomNavigation;

const styles = StyleSheet.create({
    icon: {
        width: 24,
        height: 24,
        resizeMode: 'contain',
        top:10
    },
});
