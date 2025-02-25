import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Image, FlatList, StyleSheet, Alert, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import BaseLayout from "../components/BaseLayout";
import { back } from "../assets/image";
import { Colors, DEVICE_STYLES } from "../utils/theme";
import RazorpayCheckout from "react-native-razorpay";
import { makePayment, processPayment, processStripePayment } from "../services/paymentService";
import PayPalCheckout from "../components/PayPalCheckout";
import PaymentScreen from "./PaymentScreen";
import { useStripe } from '@stripe/stripe-react-native';

const CheckoutScreen = () => {
    const navigation = useNavigation();
    const [paymentMethod, setPaymentMethod] = useState("Razorpay");
    console.log(paymentMethod, "---------")
    const { initPaymentSheet, presentPaymentSheet } = useStripe();
    const cartItems = useSelector((state) => state.cart.items) || [];

    const total = cartItems.reduce((sum, item) => sum + parseFloat(item.price) * (item.quantity || 1), 0);
    const totalProducts = cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0);

    const shippingFee = 10;
    const finalTotal = total - shippingFee;

    const staticAddress = {
        fullName: "Rohit Maurya",
        phoneNumber: "9506658558",
        street: "Udhana Darwaja Surat",
        city: "Surat",
        state: "GJ",
        zipCode: "394221",
    };


    const createPaymentIntent = async (amount, currency) => {
        try {
            const response = await fetch('https://api.stripe.com/v1/payment_intents', {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer sk_test_51QvC5cPwOecqZ4beW18fsbuMo77pMuJSjM0rDa7rnN9r03NkfiA7Wqd8Au3vPMfyxeydZCgHZtZDDHXFtos1hzt100dcUOJc5M',
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    amount: (amount * 100).toString(),
                    currency: currency,
                    'payment_method_types[]': 'card',
                }).toString(),
            });
            return await response.json();
        } catch (error) {
            console.error('Error creating payment intent:', error);
            throw error;
        }
    };

    const makePayment = async () => {
        try {
            const paymentIntent = await createPaymentIntent(finalTotal, 'USD');
            const { error } = await initPaymentSheet({
                paymentIntentClientSecret: paymentIntent.client_secret,
                merchantDisplayName: 'demo',
                returnURL: 'demo://stripe-redirect',

            });

            if (!error) {
                const { error: paymentError } = await presentPaymentSheet();
                if (!paymentError) {

                    navigation.navigate("ThankYouScreen", {
                        totalAmount: finalTotal,
                        cartItems: cartItems,
                        paymentMethod: paymentMethod,
                        shippingAddress: staticAddress,
                    });

                } else {
                    Alert.alert('Payment Failed', paymentError.message);
                }
            } else {
                Alert.alert('Payment Sheet Error', error.message);
            }
        } catch (error) {
            Alert.alert('Payment Error', error.message);
        }
    };











    const handlePayment = async () => {
        if (!paymentMethod) {
            Alert.alert("Payment Error", "Please select a payment method.");
            return;
        }

        // Alert.alert("Processing Payment", `You have selected ${paymentMethod}. Processing your payment...`);

        const paymentData = {
            amount: finalTotal,
            name: staticAddress.fullName,
            email: "test@example.com",
            contact: staticAddress.phoneNumber,
            cartItems: cartItems,
            paymentMethod: paymentMethod,
            address: staticAddress,
            navigation
        };


        if (paymentMethod === "Razorpay") {
            await processPayment(paymentData);

        } else if (paymentMethod === "PayPal") {
            makePayment()

        } else if (paymentMethod === "Stripe") {
            await makePayment();

        } else {
            Alert.alert("Error", "Invalid payment method selected.");
        }
    };










    return (
        <BaseLayout>
            <ScrollView style={{ flex: 1, backgroundColor: "#f8f9fa", paddingHorizontal: 15 }}>
                <Text style={{ fontSize: 20, fontWeight: "bold", marginVertical: 15, textAlign: 'center' }}>Checkout</Text>

                <TouchableOpacity style={styles.BackContainer} onPress={() => navigation.goBack()}>
                    <Image style={styles.like} source={back} />
                </TouchableOpacity>

                {/* Order Summary */}
                <View style={styles.card}>
                    <Text style={styles.sectionTitle}>Order Summary</Text>
                    <FlatList
                        data={cartItems}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            <View style={styles.orderItem}>
                                <Image resizeMode="contain" source={{ uri: item.image }} style={styles.productImage} />
                                <View style={{ gap: 5 }}>
                                    <Text style={styles.productTitle}>{item.title}</Text>
                                    <Text style={styles.productPrice}>${parseFloat(item.price).toFixed(2)}</Text>
                                </View>
                            </View>
                        )}
                    />
                </View>

                {/* Shipping Address */}
                <View style={styles.card}>
                    <Text style={styles.sectionTitle}>Shipping Address</Text>
                    <Text style={styles.addressText}>{staticAddress.fullName}</Text>
                    <Text style={styles.addressText}>{staticAddress.phoneNumber}</Text>
                    <Text style={styles.addressText}>{staticAddress.street}</Text>
                    <Text style={styles.addressText}>{staticAddress.city}, {staticAddress.state} {staticAddress.zipCode}</Text>
                </View>

                {/* Payment Methods */}
                <View style={styles.card}>
                    <Text style={styles.sectionTitle}>Payment Method</Text>
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        {[
                            { method: "Razorpay", icon: "💳" },
                            { method: "PayPal", icon: "💰" },
                            { method: "Stripe", icon: "💳" }
                        ].map(({ method, icon }) => (
                            <TouchableOpacity
                                key={method}
                                onPress={() => setPaymentMethod(method)}
                                style={[
                                    styles.paymentButton,
                                    { backgroundColor: paymentMethod === method ? Colors.PRIMARY_COLOR : "#f1f1f1" },
                                ]}
                            >
                                <Text style={{ fontSize: 14, color: paymentMethod === method ? "white" : "black", fontWeight: "bold" }}>
                                    {icon} {method}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                <View style={{ height: 200 }} />
            </ScrollView>

            {/* Bottom Summary and Place Order Button */}
            <View style={styles.bottomContainer}>
                <View style={styles.priceRow}>
                    <Text style={styles.priceText}>Total</Text>
                    <Text style={styles.priceText}>${total.toFixed(2)}</Text>
                </View>
                <View style={styles.priceRow}>
                    <Text style={styles.priceText}>Shipping Fee</Text>
                    <Text style={styles.priceText}>$10</Text>
                </View>
                <View style={styles.divider} />
                <View style={styles.priceRow}>
                    <Text style={styles.subtotalText}>Subtotal</Text>
                    <Text style={styles.subtotalText}>${finalTotal.toFixed(2)}</Text>
                </View>
                <TouchableOpacity style={styles.placeOrderButton} onPress={handlePayment}>
                    <Text style={styles.placeOrderText}>Place Order</Text>
                </TouchableOpacity>
            </View>
        </BaseLayout>
    );
};

export default CheckoutScreen;

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 16,
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "500",
        marginBottom: 8,
    },
    orderItem: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 12,
        paddingVertical: 15,
    },
    productImage: {
        width: 50,
        height: 50,
        borderRadius: 8,
        marginRight: 12,
    },
    productTitle: {
        fontSize: 15,
        fontWeight: "400",
    },
    productPrice: {
        fontSize: 14,
        color: Colors.NATURAL_BLACK,
    },
    addressText: {
        fontSize: 16,
    },
    paymentButton: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 12,
        borderRadius: 8,
        marginHorizontal: 5,
    },
    bottomContainer: {
        position: 'absolute',
        bottom: 0,
        height: DEVICE_STYLES.SCREEN_HEIGHT * .25,
        backgroundColor: Colors.WHITE,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        justifyContent: 'center',
        width: '100%',
        alignSelf: 'center',
        elevation: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
    },
    priceRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        marginVertical: 10,
    },
    priceText: {
        fontSize: 14,
        fontWeight: "500",
    },
    subtotalText: {
        fontSize: 16,
        fontWeight: "600",
    },
    divider: {
        marginVertical: 15,
        width: '90%',
        height: .5,
        backgroundColor: Colors.PRIMARY_COLOR,
        alignSelf: 'center',
    },
    placeOrderButton: {
        height: 50,
        backgroundColor: Colors.PRIMARY_COLOR,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: "center",
        width: '90%',
        alignSelf: 'center',
        top: 10,
    },
    placeOrderText: {
        fontSize: 18,
        color: "white",
        fontWeight: "bold",
    },
    BackContainer: {

        borderRadius: 20,
        position: 'absolute',
        left: 10,
        top: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    like: {
        width: 24,
        height: 24,
        resizeMode: 'contain',
    },
});
