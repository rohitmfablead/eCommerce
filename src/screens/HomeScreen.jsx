import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Modal, Button } from 'react-native';
import React, { useEffect, useState } from 'react';
import BaseLayout from '../components/BaseLayout';
import { bell, filter, search } from '../assets/image';
import { Colors, moderateScale } from '../utils/theme';
import CustomSwiper from '../components/CustomSwiper';
import { categories, images, PaypalkeyId, paypalSecreate_kay } from '../mock/DummyData';
import SpecialComponent from '../components/SpecialComponent';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../redux/productSlice';
import AllProducts from '../components/AllProducts';
import { toggleLike } from '../redux/likeSlice';
import CustomLoader from '../components/CustomLoader';
// import PayPal from "react-native-paypal";

const HomeScreen = ({ navigation }) => {

  // const PayWithPayPal = async () => {
  //   try {
  //     const result = await PayPal.pay({
  //       clientId: paypalSecreate_kay,
  //       environment: PayPal.SANDBOX,
  //       price: "10.00",
  //       currency: "USD",
  //       description: "Your Product Description",
  //     });
  
  //     if (result?.status === "COMPLETED") {
  //       Alert.alert("Payment Successful", `Transaction ID: ${result.id}`);
  //       console.log("✅ Payment Successful:", result);
  //     } else {
  //       Alert.alert("Payment Failed", "Transaction was not completed.");
  //       console.log("❌ Payment Failed:", result);
  //     }
  //   } catch (error) {
  //     console.log("🚨 Payment Error:", error);
  //     Alert.alert("Payment Error", error.message || "Something went wrong");
  //   }
  // };







  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.product);
  const likedProducts = useSelector((state) => state.likeSlice.likedProducts);

  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterModalVisible, setFilterModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [sortOrder, setSortOrder] = useState(null);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');


  useEffect(() => {
    console.log("jkjjjjj", categories)
  }, []);


  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading) return <CustomLoader />;
  if (error) return <BaseLayout>
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>{error}</Text>;
    </View>
  </BaseLayout>

  const HandleLike = (product) => {
    dispatch(toggleLike(product));
  };

  const HandleNavigate = (item) => {
    navigation.navigate("ProductDetails", { item: item });
  };

  // Filter products based on searchQuery, category, price range, and sorting
  let filteredProducts = products.filter((product) =>
    product?.title?.toLowerCase()?.includes(searchQuery.toLowerCase()) &&
    (selectedCategory ? product.category === selectedCategory : true) &&
    (minPrice ? product.price >= parseFloat(minPrice) : true) &&
    (maxPrice ? product.price <= parseFloat(maxPrice) : true)
  );

  if (sortOrder === "asc") {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortOrder === "desc") {
    filteredProducts.sort((a, b) => b.price - a.price);
  }

  return (
    <BaseLayout>



      {/* <Button title="Pay with PayPal" onPress={PayWithPayPal} />; */}


      <ScrollView>
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBox}>
            <Image source={search} style={styles.icon} />
            <TextInput
              style={{ flex: 1 }}
              placeholder='Search products...'
              value={searchQuery}
              onChangeText={(text) => setSearchQuery(text)}
            />
            <TouchableOpacity onPress={() => setFilterModalVisible(true)}>
              <Image source={filter} style={styles.icon} />
            </TouchableOpacity>
          </View>
          <Image source={bell} style={[styles.icon, { left: 10 }]} />
        </View>

        {/* Show Only All Products When Searching */}
        {searchQuery ? (
          <View>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>All Products</Text>
            </View>
            <AllProducts
              HandleNavigate={HandleNavigate}
              data={filteredProducts}
              HandleLike={HandleLike}
              likedProducts={likedProducts}
            />
          </View>
        ) : (
          <>
            {/* Swiper */}
            <View style={{ height: 300, marginVertical: 15 }}>
              <CustomSwiper images={images} />
            </View>

            {/* Special Offers */}
            <View>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Special Offers</Text>
                <Text style={styles.sectionLink}>See More</Text>
              </View>
              <SpecialComponent
                HandleNavigate={HandleNavigate}
                data={products}
                HandleLike={HandleLike}
                likedProducts={likedProducts}
              />
            </View>

            {/* All Products */}
            <View>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>All Products</Text>
              </View>
              <AllProducts
                HandleNavigate={HandleNavigate}
                data={filteredProducts}
                HandleLike={HandleLike}
                likedProducts={likedProducts}
              />
            </View>
          </>
        )}

        {/* Filter Modal */}
        <Modal animationType="slide" transparent={true} visible={isFilterModalVisible} onRequestClose={() => setFilterModalVisible(false)}>
          <TouchableOpacity onPress={() => setFilterModalVisible(false)} activeOpacity={0.9} style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Filter Products</Text>

              {/* Sorting Options */}
              <Text style={styles.sectionLabel}>Sort by Price</Text>
              <View style={styles.row}>
                <TouchableOpacity onPress={() => setSortOrder("asc")} style={[styles.filterButton, sortOrder === "asc" && styles.selectedFilter]}>
                  <Text style={[styles.filterText, sortOrder === "asc" && styles.selectedText]}>Low to High</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setSortOrder("desc")} style={[styles.filterButton, sortOrder === "desc" && styles.selectedFilter]}>
                  <Text style={[styles.filterText, sortOrder === "desc" && styles.selectedText]}>High to Low</Text>
                </TouchableOpacity>
              </View>

              {/* Price Range Filter */}
              <Text style={styles.sectionLabel}>Price Range</Text>
              <View style={styles.row}>
                <TextInput style={styles.priceInput} placeholder="Min Price" keyboardType="numeric" value={minPrice} onChangeText={(text) => setMinPrice(text)} />
                <Text style={{ fontSize: 18 }}> - </Text>
                <TextInput style={styles.priceInput} placeholder="Max Price" keyboardType="numeric" value={maxPrice} onChangeText={(text) => setMaxPrice(text)} />
              </View>

              {/* Category Selection */}
              <Text style={styles.sectionLabel}>Select Category</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginVertical: 10 }}>
                {categories.map((category) => (
                  <TouchableOpacity key={category.name} onPress={() => setSelectedCategory(category.name)} style={[styles.categoryButton, selectedCategory === category.name && styles.selectedCategory]}>
                    <Text style={[styles.categoryText, selectedCategory === category.name && styles.selectedCategoryText]}>{category.name}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>


              <View style={{ paddingVertical: 30, width: '100%', height: "100", flexDirection: 'row', justifyContent: 'space-between' }}>
                <TouchableOpacity
                  style={{ justifyContent: 'center', alignItems: 'center', width: '40%', height: "50", borderRadius: 20, backgroundColor: Colors.SECONDARY_COLOR, }}
                  onPress={() => { setSelectedCategory(null); setSortOrder(null); setMinPrice(""); setMaxPrice(""); }}>
                  <Text style={styles.clearFilter}>Clear Filters</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{ justifyContent: 'center', alignItems: 'center', width: '40%', height: "50", borderRadius: 20, backgroundColor: Colors.PRIMARY_COLOR, }}
                  onPress={() => setFilterModalVisible(false)}>
                  <Text style={styles.clearFilter}>Apply Filters</Text>
                </TouchableOpacity>

              </View>
            </View>
          </TouchableOpacity>
        </Modal>
      </ScrollView>
    </BaseLayout>
  );
};

export default HomeScreen;
const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  searchBox: {
    alignItems: 'center',
    width: '85%',
    height: 50,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderRadius: 20,
    borderColor: Colors.BORDER,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  icon: {
    width: moderateScale(20),
    height: moderateScale(20),
    resizeMode: 'contain',
    marginHorizontal: 10,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  sectionTitle: {
    color: Colors.BLACK,
    fontSize: 20,
    fontWeight: '500',
  },
  sectionLink: {
    color: Colors.PRIMARY_COLOR,
    fontSize: 15,
    fontWeight: '500',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    width: '100%',
    alignItems: 'center',
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.BLACK,
    marginBottom: 15,
  },
  sectionLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.BLACK,
    alignSelf: 'flex-start',
    marginTop: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginVertical: 10,
  },
  filterButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.PRIMARY_COLOR,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  selectedFilter: {
    backgroundColor: Colors.PRIMARY_COLOR,
  },
  filterText: {
    fontSize: 14,
    color: Colors.PRIMARY_COLOR,
  },
  selectedText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  priceInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: Colors.BORDER,
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: '#f9f9f9',
    textAlign: 'center',
  },
  categoryButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.BORDER,
    marginRight: 8,
    backgroundColor: '#f9f9f9',
  },
  selectedCategory: {
    backgroundColor: Colors.PRIMARY_COLOR,
    borderColor: Colors.PRIMARY_COLOR,
  },
  categoryText: {
    fontSize: 14,
    color: Colors.BLACK,
  },
  selectedCategoryText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  clearFilter: {
    color: Colors.WHITE,
    // marginTop: 15,
    fontSize: 16,
    fontWeight: '500',
  },
  applyButton: {
    // marginTop: 15,
    // width: '100%',
    backgroundColor: Colors.PRIMARY_COLOR,
    // paddingVertical: 12,
    borderRadius: 10,
    // alignItems: 'center',
  },
  applyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
