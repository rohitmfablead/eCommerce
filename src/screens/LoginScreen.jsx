import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BaseLayout from '../components/BaseLayout';
import { Colors } from '../utils/theme';
import BaseTextInput from '../components/BaseTextInput';
import BaseButton from '../components/BaseButton';
import { gmail, invisible, unlock } from '../assets/image';
import { showMessage } from 'react-native-flash-message';

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        if (!email || !password) {
            showMessage({
                message: "Please fill in all fields",
                type: "danger",
            });
            return;
        }
    
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showMessage({
                message: "Please enter a valid email address",
                type: "danger",
            });
            return;
        }
    
        try {
            const storedUserData = await AsyncStorage.getItem('user');
    
            if (storedUserData) {
                const { email: savedEmail, password: savedPassword } = JSON.parse(storedUserData);
    
                if (email === savedEmail && password === savedPassword) {
                    // ✅ Store email without JSON.stringify (since it's a string)
                    await AsyncStorage.setItem('loginUser', savedEmail);
    
                    showMessage({
                        message: "Login successful!",
                        type: "success",
                    });
    
                    navigation.replace('Bottom');
                } else {
                    showMessage({
                        message: "Invalid email or password",
                        type: "danger",
                    });
                }
            } else {
                showMessage({
                    message: "No registered user found",
                    type: "danger",
                });
            }
        } catch (error) {
            showMessage({
                message: "An error occurred while logging in",
                type: "danger",
            });
        }
    };
    

    return (
        <BaseLayout>
            <ScrollView style={{ paddingVertical: 15 }}>
                <View style={{ paddingHorizontal: 20, gap: 10 }}>
                    <Text style={{ fontSize: 25, fontWeight: '600' }}>Welcome Back!</Text>
                    <Text style={{ color: Colors.NATURAL_BLACK, fontSize: 15 }}>
                        Enter your email to start shopping and get awesome deals today!
                    </Text>
                </View>

                <View style={{ marginTop: 20, gap: 20 }}>
                    <BaseTextInput
                        placeholder="Enter your Email"
                        leftIconSource={gmail}
                        onChangeText={setEmail}
                        value={email}
                    />
                    <BaseTextInput
                        placeholder="Enter your Password"
                        leftIconSource={unlock}
                        isSecured
                        rightIconSource={invisible}
                        onChangeText={setPassword}
                        value={password}
                    />
                </View>

                <TouchableOpacity style={{ paddingHorizontal: 20, paddingVertical: 15 }}>
                    <Text style={{ color: Colors.PRIMARY_COLOR, fontSize: 15 }}>Forgot your password?</Text>
                </TouchableOpacity>

                <View style={{ paddingHorizontal: 20 }}>
                    <BaseButton name="Login" onPress={handleLogin} />
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 10 }}>
                    <Text style={{ color: Colors.BLACK, fontSize: 15, fontWeight: '500' }}>Dont have an account?</Text>
                    <TouchableOpacity onPress={() => navigation.navigate("Register")}>
                        <Text style={{ color: Colors.PRIMARY_COLOR, fontSize: 15, fontWeight: '500' }}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </BaseLayout>
    );
};

export default LoginScreen;

const styles = StyleSheet.create({});
