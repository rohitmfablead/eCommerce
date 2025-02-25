import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { heart, heart1 } from '../assets/image';
import { Colors } from '../utils/theme';

const SpecialComponent = ({ data, HandleNavigate, cartItems, HandleLike, likedProducts }) => {
    return (
        <View style={styles.container}>
            <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
                contentContainerStyle={{ paddingHorizontal: 20 }}
                data={data.slice(1, 5)}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => {
                    // const inCart = cartItems.some((cartItem) => cartItem.id === item.id);
                   const isLiked = likedProducts.some((likedItem) => likedItem.id === item.id);


                    return (
                        <TouchableOpacity 
                        onPress={()=>HandleNavigate(item)}
                        style={styles.box}>
                            <View style={styles.imageContainer}>
                                <Image style={styles.image} source={{ uri: item.image }} />
                            </View>
                            <View style={styles.textContainer}>
                                <Text numberOfLines={1} style={styles.title}>{item.title}</Text>
                                <Text style={styles.price}>${item.price}</Text>
                                <View style={styles.ratingContainer}>
                                    <Text style={styles.ratingText}>⭐ {item.rating.rate} ({item.rating.count})</Text>
                                </View>
                            </View>

                            {/* Like Button */}
                            <TouchableOpacity style={styles.likeContainer} onPress={() => HandleLike(item)}>
                                <Image 
                                    style={styles.like} 
                                    source={isLiked ? heart1 : heart} 
                                />
                            </TouchableOpacity>

                            {/* Add/Remove Cart Button */}
                            {/* <TouchableOpacity
                                style={[
                                    styles.cartButton, 
                                    { backgroundColor: inCart ? Colors.RED : Colors.PRIMARY_COLOR }
                                ]}
                                onPress={() => cartHandle(item)}
                            >
                                <Text style={styles.cartButtonText}>
                                    {inCart ? 'Remove from Cart' : 'Add to Cart'}
                                </Text>
                            </TouchableOpacity> */}
                        </TouchableOpacity>
                    );
                }}
            />
        </View>
    );
};



export default SpecialComponent;

const styles = StyleSheet.create({
    container: {},
    box: {
        width: 170,
        height: 280,
        borderRadius: 10,
        marginVertical: 10,
        padding: 10,
        backgroundColor: '#fff',
        elevation: 5,
        alignItems: 'center',
    },
    imageContainer: {
        alignItems: 'center',
        paddingVertical: 15,
    },
    image: {
        width: 120,
        height: 150,
        resizeMode: 'contain'
    },
    likeContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        position: 'absolute',
        right: 5,
        top: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    like: {
        width: 24,
        height: 24,
        resizeMode: 'contain'
    },
    textContainer: {
        paddingHorizontal: 5,
        gap: 10
    },
    title: {
        fontSize: 15,
        fontWeight: '500',
        color: Colors.NATURAL_BLACK,
        textAlign: 'center',
    },
    price: {
        fontSize: 16,
        color: Colors.BLACK,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    cartButton: {
        width: '100%',
        padding: 8,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 10,
    },
    cartButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});
