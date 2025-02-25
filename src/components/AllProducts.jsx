import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import { heart, heart1 } from '../assets/image';
import { Colors } from '../utils/theme';

const AllProducts = ({ data, HandleLike, likedProducts, HandleNavigate }) => {
    const itemsPerPage = 6;
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);

    const paginatedData = data.slice(0, currentPage * itemsPerPage);

    const loadMoreProducts = () => {
        if (paginatedData.length < data.length && !loading) {
            setLoading(true);
            setTimeout(() => {
                setCurrentPage(prevPage => prevPage + 1);
                setLoading(false);
            }, 5000);
        }
    };

    return (
        <View style={styles.container}>
            <FlatList
                numColumns={2}
                data={paginatedData}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => {
                    const isLiked = likedProducts.some((likedItem) => likedItem.id === item.id);

                    return (
                        <TouchableOpacity style={styles.box} onPress={() => HandleNavigate(item)}>
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
                            <TouchableOpacity
                                style={styles.likeContainer}
                                onPress={() => HandleLike(item)}
                            >
                                <Image
                                    style={styles.like}
                                    source={isLiked ? heart1 : heart}
                                />
                            </TouchableOpacity>
                        </TouchableOpacity>
                    );
                }}
                onEndReached={loadMoreProducts}
                onEndReachedThreshold={0.1}
                ListFooterComponent={loading ? <ActivityIndicator size="large" color={Colors.PRIMARY_COLOR} /> : null}
                contentContainerStyle={{ paddingHorizontal: 20 }}
                columnWrapperStyle={{ justifyContent: 'space-between' }}
            />
        </View>
    );
};

export default AllProducts;

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
        resizeMode: 'contain',
    },
    likeContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        position: 'absolute',
        right: 5,
        top: 5,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.6)',
    },
    like: {
        width: 24,
        height: 24,
        resizeMode: 'contain',
    },
    textContainer: {
        paddingHorizontal: 5,
        gap: 10,
    },
    title: {
        fontSize: 15,
        fontWeight: '500',
        color: Colors.NATURAL_BLACK,
        textTransform: 'uppercase',
    },
    price: {
        fontSize: 16,
        color: Colors.BLACK,
        fontWeight: 'bold',
    },
    ratingContainer: {
        flexDirection: 'row',
    },
});
