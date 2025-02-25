import { StyleSheet, Text, View, TouchableOpacity, FlatList } from "react-native";
import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import BaseLayout from "../components/BaseLayout";
import { useDispatch } from "react-redux";
import { clearCart } from "../redux/cartSlice";

const ThankYouScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const { orderId, totalAmount, cartItems, shippingAddress } = route.params || {};
  const dispatch = useDispatch();

  const handleBackToHome = () => {
    dispatch(clearCart());
    navigation.navigate("Bottom");
  };

  return (
    <BaseLayout>
      <View style={styles.container}>
        <Text style={styles.title}>🎉 Thank You for Your Purchase! 🎉</Text>

        {orderId && <Text style={styles.text}>Payment ID: {orderId}</Text>}
        {totalAmount && <Text style={styles.text}>Total Amount: ₹{totalAmount.toFixed(2)}</Text>}

        <Text style={styles.subTitle}>Shipping Address:</Text>
        <Text style={styles.text}>{shippingAddress?.fullName}</Text>
        <Text style={styles.text}>{shippingAddress?.phoneNumber}</Text>
        <Text style={styles.text}>{shippingAddress?.street}, {shippingAddress?.city}</Text>
        <Text style={styles.text}>{shippingAddress?.state} - {shippingAddress?.zipCode}</Text>

        {/* Order Summary */}
        <Text style={styles.subTitle}>Order Summary:</Text>
        <FlatList
          data={cartItems}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.orderItem}>
              <Text style={styles.text}>{item.title} - ₹{parseFloat(item.price).toFixed(2)} x {item.quantity || 1}</Text>
            </View>
          )}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={handleBackToHome}

        >
          <Text style={styles.buttonText}>Back to Home</Text>
        </TouchableOpacity>
      </View>
    </BaseLayout>
  );
};

export default ThankYouScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  subTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 20,
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
  },
  orderItem: {
    padding: 10,
    backgroundColor: "#f8f9fa",
    borderRadius: 5,
    marginVertical: 5,
    width: "100%",
  },
  button: {
    marginTop: 20,
    backgroundColor: "#53a20e",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
