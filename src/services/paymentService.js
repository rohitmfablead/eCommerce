
import RazorpayCheckout from "react-native-razorpay";
import { Alert } from "react-native";
const keyId = "rzp_test_VSBRBr3etdQEAV"

const Secret_key = "shi6wL5jqLTTwE6P0aZ5oUEx"
export const processPayment = async ({ amount, name, email, contact, cartItems, paymentMethod, address, navigation }) => {
    try {
        const options = {
            description: "Payment for your order",
            image: "https://i.imgur.com/3g7nmJC.jpg",
            currency: "INR",
            key: keyId,
            amount: amount * 100,  // Convert to paise
            name: name,
            prefill: {
                email: email,
                contact: contact,
                name: name,
            },
            theme: { color: "#53a20e" },
        };

        const data = await RazorpayCheckout.open(options);

        if (data.razorpay_payment_id) {
            navigation.navigate("ThankYouScreen", {
                orderId: data.razorpay_payment_id,
                totalAmount: amount,
                cartItems: cartItems,  // Pass cart items
                paymentMethod: paymentMethod,  // Pass selected payment method
                shippingAddress: address,  // Pass address details
            });
        }
    } catch (error) {
        Alert.alert("Payment Failed", error?.description || "Something went wrong!");
    }
};
