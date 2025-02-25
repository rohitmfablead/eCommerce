import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BaseLayout from '../components/BaseLayout';
import { Colors } from '../utils/theme';
import { remove } from '../assets/image';
import { removeFromCart } from '../redux/cartSlice';

const CartScreen = ({navigation}) => {
  const cartItems = useSelector((state) => state.cart.items) || [];

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + parseFloat(item.price) * (item.quantity || 1),
    0
  );

  const totalProducts = cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0);

  const dispatch = useDispatch();

  const handleRemoveFromCart = (item) => {
    dispatch(removeFromCart(item.id));
  };
  const HandleNavigate = (item) => {
    navigation.navigate("ProductDetails", { item: item });
  };
  const renderItem = ({ item }) => (
    <TouchableOpacity
                   
                   onPress={()=>HandleNavigate(item)}
    style={styles.itemContainer}>
      <Image source={{ uri: item.image }} style={styles.itemImage} />
      <View style={styles.itemDetails}>
        <Text numberOfLines={1} style={styles.itemName}>{item.title}</Text>
        <Text style={styles.itemPrice}>Price: ${parseFloat(item.price).toFixed(2)}</Text>
        {/* <Text style={styles.itemQuantity}>Quantity: {item.quantity || 1}</Text> */}
        <Text numberOfLines={2} style={styles.itemDescription}>{item.description}</Text>
      </View>
      <TouchableOpacity style={styles.removeButton} onPress={() => handleRemoveFromCart(item)}>
        <Image style={styles.removeIcon} source={remove} />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <BaseLayout>
      <View style={{ flex: 1 }}>
        <Text style={styles.header}>Your Cart</Text>
        {cartItems.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Your cart is empty</Text>
          </View>
        ) : (
          <FlatList
            data={cartItems}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
          />
        )}
      </View>

      {cartItems.length > 0 ? (
        <View style={styles.summaryContainer}>
          {/* <Text style={styles.summaryText}>Total Items: {totalProducts}</Text> */}
          <Text style={styles.summaryText}>
            Total Price: ${isNaN(totalPrice) ? '0.00' : totalPrice.toFixed(2)}
          </Text>
          <TouchableOpacity onPress={()=>navigation.navigate("CheckoutScreen")} style={styles.checkoutButton}>
            <Text style={styles.checkoutText}>Proceed to Checkout</Text>
          </TouchableOpacity>
        </View>
      ) : null}
    </BaseLayout>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  header: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    paddingVertical: 10,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 18,
    color: '#777',
    marginTop: 20,
  },
  itemContainer: {
    flexDirection: "row",
    backgroundColor: "#f9f9f9",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: "center",
  },
  itemImage: {
    width: 80,
    height: 80,
    resizeMode: "contain",
    borderRadius: 8,
    marginRight: 12,
  },
  itemDetails: {
    flex: 1,
    gap: 5
  },
  itemName: {
    fontSize: 16,
    fontWeight: "600",  // Fixed issue
  },
  itemPrice: {
    fontSize: 14,
    color: Colors.PRIMARY_COLOR,
    fontWeight: "bold",
  },
  itemQuantity: {
    fontSize: 14,
    color: "#333",
    fontWeight: "bold",
  },
  itemDescription: {
    fontSize: 12,
    color: "#555",
    marginTop: 4,
  },
  summaryContainer: {
    borderTopWidth: 1,
    borderColor: "gray",
    backgroundColor: Colors.WHITE,
    paddingVertical: 15,
    paddingHorizontal: 20,
    elevation: 5,
    marginBottom:-25
  },
  summaryText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  checkoutButton: {
    marginTop: 15,
    backgroundColor: Colors.PRIMARY_COLOR,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    elevation: 3,
    justifyContent:'center',
    alignItems:'center'
  },
  checkoutText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  removeButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginBottom:60
  },
  removeIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain'
  },
});
