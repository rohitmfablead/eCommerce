import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { heart, LOGO } from '../assets/image';
import { Colors } from '../utils/theme';

const AllProducts = ({ data }) => {
    return (
        <View style={styles.container}>
            <FlatList
                numColumns={2}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 20 }}
                columnWrapperStyle={{ justifyContent: 'space-between' }} 
                data={data.slice(1, 5)}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <View style={styles.box}>
                        <View style={styles.imageContainer}>
                            <Image style={styles.image} source={{ uri: item.image }} />
                        </View>
                        <View style={styles.textContainer}>
                            <Text numberOfLines={1} style={styles.title}>{item.title}</Text>
                            <Text style={styles.price}>{item.price}</Text>
                            <View style={styles.ratingContainer}>
                                <Text style={styles.ratingText}>⭐ {item.rating.rate} ({item.rating.count})</Text>
                            </View>
                        </View>
                        <TouchableOpacity style={styles.likeButton}>
                            <Image style={styles.like} source={heart} />
                        </TouchableOpacity>
                    </View>
                )}
            />

        </View>
    );
};

export default AllProducts;

const styles = StyleSheet.create({
    container: {
        // paddingVertical: 10,
    },
    box: {
        width: '48%',
        height: 280,
        borderRadius: 10,
        marginVertical: 10,
        padding: 10,
        backgroundColor: '#fff',
        elevation: 5,
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
        textTransform: 'uppercase'
    },
    price: {
        fontSize: 16,
        color: Colors.BLACK,
        fontWeight: 'bold'
    },
    originalPrice: {
        fontSize: 12,
        textDecorationLine: 'line-through',
        color: 'gray',
    },
    ratingContainer: {
        flexDirection: 'row',

    },
    star: {
        fontSize: 14,
        marginHorizontal: 2,
    },
    likeButton:{
        width: 40,
        height: 40,
        borderRadius: 20,
       
        position: 'absolute',
        right: 5,
        top: 5,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
