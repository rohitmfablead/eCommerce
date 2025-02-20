import { StyleSheet, View, Dimensions, Image } from 'react-native';
import React from 'react';
import Swiper from 'react-native-swiper';
import { Banner, banner1, banner2 } from '../assets/image';
import { Colors } from '../utils/theme';

const { width, height } = Dimensions.get('window');



const CustomSwiper = ({images}) => {
    return (
        <View style={styles.container}>
            <Swiper
                style={styles.wrapper}
                // showsButtons={true}
                autoplay={true}
                dotColor="#ccc"
                activeDotColor={Colors.PRIMARY_COLOR}
                paginationStyle={styles.pagination}
            >
                {images.map((image, index) => (
                    <View key={index} style={styles.slide}>
                        <Image source={image} style={styles.image} />
                    </View>
                ))}
            </Swiper>
        </View>
    );
};

export default CustomSwiper;

const styles = StyleSheet.create({
    container: {
        flex: 1,
       
    },
    wrapper: {},
    slide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: width,
        height: height * 0.3,
    },
    image: {
        width: width,
        height: height * 0.3,
        resizeMode: 'contain',
    },
    pagination: {
        position: 'absolute',
        bottom: -15,
    }
});
