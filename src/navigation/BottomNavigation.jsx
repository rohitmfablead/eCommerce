import { StyleSheet, Image } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import CartScreen from '../screens/CartScreen';
import WishlistScreen from '../screens/WishlistScreen';
import { heart, heart1, homes, house, shopping_cart, trolley, user, user2 } from '../assets/image';
import { Colors } from '../utils/theme';
import { useSelector } from 'react-redux';
import PaymentScreen from '../screens/PaymentScreen';

const Tab = createBottomTabNavigator();

const BottomNavigation = () => {
    const likedProducts = useSelector((state) => state.likeSlice.likedProducts);
    const cartItems = useSelector((state) => state.cart.items) || [];

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: '#fff',
                    height: 100,
                    borderTopRightRadius: 20,
                    borderTopLeftRadius: 20,
                    elevation: 10,
                },
                tabBarLabelStyle: {
                    fontSize: 15,
                    fontWeight: 'bold',
                    paddingVertical: 20,
                },
                tabBarActiveTintColor: Colors.PRIMARY_COLOR,
                tabBarInactiveTintColor: 'gray',
                tabBarIcon: ({ focused }) => {
                    let iconSource;
                    if (route.name === 'Home') {
                        iconSource = focused ? house : homes;
                    } else if (route.name === 'Cart') {
                        iconSource = focused ? trolley : shopping_cart;
                    } else if (route.name === 'Wishlist') {
                        iconSource = focused ? heart1 : heart;
                    } else if (route.name === 'Profile') {
                        iconSource = focused ? user2 : user;
                    }
                    return <Image source={iconSource} style={styles.icon} />;
                },
                tabBarBadge: 
                    route.name === 'Wishlist' && likedProducts.length > 0 
                        ? likedProducts.length 
                        : route.name === 'Cart' && cartItems.length > 0 
                        ? cartItems.length 
                        : null,
                tabBarBadgeStyle: {
                    backgroundColor: Colors.PRIMARY_COLOR,
                    color: '#fff',
                    fontSize: 12,
                },
            })}
        >
            {/* <Tab.Screen name="Payment" component={PaymentScreen} /> */}
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Cart" component={CartScreen} />
            <Tab.Screen name="Wishlist" component={WishlistScreen} />
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
        top: 10,
    },
});
