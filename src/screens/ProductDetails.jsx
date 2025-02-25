import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import BaseLayout from '../components/BaseLayout';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../redux/cartSlice';
import { Colors } from '../utils/theme';
import { back, heart, heart1, shopping_cart } from '../assets/image';
import { toggleLike } from '../redux/likeSlice';

const ProductDetails = ({ route, navigation }) => {
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.items) || [];
    const likedProducts = useSelector((state) => state.likeSlice.likedProducts);
    const { item } = route.params;
    const isLiked = likedProducts.some((likedItem) => likedItem.id === item.id);

    if (!item) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>Product not found.</Text>
            </View>
        );
    }

    const inCart = cartItems.some((cartItem) => cartItem.id === item.id);

    const handleLike = () => {
        dispatch(toggleLike(item));
    };


    const handleAddToCart = () => {
        if (inCart) {
            dispatch(removeFromCart(item.id));
        } else {
            dispatch(addToCart(item));
        }
    };

    return (
        <BaseLayout>
            <View style={styles.container}>
                {/* Like Button */}

                <View style={styles.likeContainer}>
                    <TouchableOpacity onPress={handleLike}>
                        <Image style={styles.like} source={isLiked ? heart1 : heart} />
                    </TouchableOpacity>
                    <View>
                        <Image style={styles.like} source={shopping_cart} />
                    </View>
                </View>
                {cartItems.length > 0 && (
                    <TouchableOpacity 
                    // onPress={()=>navigation.jumpTo("cart")}
                    style={{
                        position: 'absolute',
                        right: 10,
                        top: 5,
                        width: 25,
                        height: 25,
                        borderRadius: 12.5,
                        backgroundColor: Colors.PRIMARY_COLOR,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Text style={{
                            color: Colors.WHITE,
                            fontSize: 14,
                            fontWeight: 'bold'
                        }}>
                            {cartItems.length}
                        </Text>
                    </TouchableOpacity>
                )}


                <TouchableOpacity style={styles.BackContainer} onPress={() => navigation.goBack()}>
                    <Image style={styles.like} source={back} />
                </TouchableOpacity>

                {/* Product Image */}
                <Image source={{ uri: item.image }} style={styles.image} />

                {/* Product Details */}
                <View style={styles.detailsContainer}>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.price}>${item.price}</Text>
                    <Text style={styles.description}>{item.description}</Text>

                    {/* Add to Cart Button */}
                    <TouchableOpacity
                        style={[
                            styles.cartButton,
                            { backgroundColor: inCart ? Colors.RED : Colors.PRIMARY_COLOR }
                        ]}
                        onPress={handleAddToCart}
                    >
                        <Text style={styles.cartButtonText}>
                            {inCart ? 'Remove from Cart' : 'Add to Cart'}
                        </Text>
                    </TouchableOpacity>

                    {/* Checkout Button */}
                    {/* <TouchableOpacity
                        style={[styles.cartButton, { backgroundColor: Colors.SECONDARY_COLOR }]}
                        onPress={() => navigation.navigate('Checkout', { item })}
                    >
                        <Text style={[styles.cartButtonText, { color: Colors.BLACK }]}>
                            Checkout
                        </Text>
                    </TouchableOpacity> */}
                </View>
            </View>
        </BaseLayout>
    );
};

export default ProductDetails;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 20,
        backgroundColor: Colors.WHITE,
    },
    likeContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        position: 'absolute',
        right: 30,
        top: 10,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row', gap: 15,

    },
    BackContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        position: 'absolute',
        left: 10,
        top: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    like: {
        width: 24,
        height: 24,
        resizeMode: 'contain',
    },
    image: {
        width: 200,
        height: 250,
        resizeMode: 'contain',
        alignSelf: 'center',
        marginBottom: 20,
    },
    detailsContainer: {
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.NATURAL_BLACK,
        marginBottom: 10,
    },
    price: {
        fontSize: 22,
        color: Colors.PRIMARY_COLOR,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    description: {
        fontSize: 15,
        color: Colors.NATURAL_BLACK,
        marginBottom: 20,
    },
    cartButton: {
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        width: '100%',
        marginVertical: 10,
    },
    cartButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        fontSize: 18,
        color: Colors.RED,
    },
});
