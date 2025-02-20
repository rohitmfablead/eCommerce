import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect } from 'react'
import BaseLayout from '../components/BaseLayout'
import { bell, camera, search, user } from '../assets/image'
import { Colors, moderateScale } from '../utils/theme'
import CustomSwiper from '../components/CustomSwiper'
import { images } from '../mock/DummyData'
import SpecialComponent from '../components/SpecialComponent'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts } from '../redux/productSlice'
import AllProducts from '../components/AllProducts'
import { addToCart } from '../redux/cartSlice'

const HomeScreen = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading) return <ActivityIndicator size="large" />;
  if (error) return <Text>Error: {error}</Text>;

  // const Handlecart = (item) => {
  //   dispatch(addToCart(item))
  // }
  return (
    <BaseLayout>
      <ScrollView>
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 10 }}>
          <View style={{ alignItems: 'center', width: '85%', height: 50, backgroundColor: '#fff', borderWidth: 1, borderRadius: 20, borderColor: Colors.BORDER, flexDirection: 'row', justifyContent: 'space-between' }}>
            <Image source={search} style={styles.icon} />
            <TextInput style={{ flex: 1 }} placeholder='Search candles...' />
            <Image source={camera} style={styles.icon} />
          </View>
          <Image source={bell} style={[styles.icon, { left: 10 }]} />
        </View>
        <View style={{ height: 300, marginVertical: 15 }}>
          <CustomSwiper images={images} />
        </View>
        <View>
          <View style={{ flexDirection: "row", justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 15 }}>
            <Text style={{ color: Colors.BLACK, fontSize: 20, fontWeight: "500" }}>Special Offers</Text>
            <Text style={{ color: Colors.PRIMARY_COLOR, fontSize: 15, fontWeight: "500" }}>See More</Text>
          </View>
          <SpecialComponent data={products}
            // cartHandle={Handlecart}
          />
        </View>
        <View>
          <View style={{ flexDirection: "row", justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 15 }}>
            <Text style={{ color: Colors.BLACK, fontSize: 20, fontWeight: "500" }}>All Products</Text>
            {/* <Text style={{ color: Colors.PRIMARY_COLOR, fontSize: 15, fontWeight: "500" }}>See More</Text> */}
          </View>
          <AllProducts data={products} />
        </View>
      </ScrollView>
    </BaseLayout>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  icon: {
    width: moderateScale(20),
    height: moderateScale(20),
    resizeMode: 'contain',
    marginHorizontal: 10,
  },
})


