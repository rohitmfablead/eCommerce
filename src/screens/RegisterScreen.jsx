import { StyleSheet, Text, View, Alert, ScrollView, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BaseLayout from '../components/BaseLayout';
import { Colors } from '../utils/theme';
import BaseTextInput from '../components/BaseTextInput';
import BaseButton from '../components/BaseButton';
import { gmail, invisible, unlock, user } from '../assets/image';
import { showMessage } from 'react-native-flash-message';

const RegisterScreen = ({navigation}) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async () => {
        if (!firstName || !lastName || !email || !password) {
            showMessage({
                message: "Please fill in all fields",
                type: "danger",
            });
            return;
        }
    
        // Email validation regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showMessage({
                message: "Please enter a valid email address",
                type: "danger",
            });
            return;
        }
    
        const userData = {
            firstName,
            lastName,
            email,
            password,
        };
    
        try {
            await AsyncStorage.setItem('user', JSON.stringify(userData));
            showMessage({
                message: "Account created successfully!",
                type: "success",
            });
            navigation.navigate("Login");
        } catch (error) {
            showMessage({
                message: "Failed to save user data",
                type: "danger",
            });
        }
    };
    

    return (
        <BaseLayout>
           <ScrollView style={{paddingVertical:15}}>
           <View style={{ paddingHorizontal: 20, gap: 10 }}>
                <Text style={{ fontSize: 25, fontWeight: '600' }}>Create Account</Text>
                <Text style={{ color: Colors.NATURAL_BLACK, fontSize: 15 }}>
                    Fill in your details below to get started on a seamless shopping experience.
                </Text>
            </View>

            <View style={{ marginTop: 20, gap: 20 }}>
                <BaseTextInput
                    placeholder="Enter your First Name"
                    leftIconSource={user}
                    onChangeText={setFirstName}
                    value={firstName}
                />
                <BaseTextInput
                    placeholder="Enter your Last Name"
                    leftIconSource={user}
                    onChangeText={setLastName}
                    value={lastName}
                />
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

            <View style={{ paddingHorizontal: 20, paddingVertical: 15, gap: 5 }}>
                <Text style={{ color: Colors.NATURAL_BLACK, fontSize: 15 }}>
                    By clicking Create Account, you acknowledge you have read and agreed to our
                    <Text style={{ color: Colors.PRIMARY_COLOR }}> Terms of Use </Text>
                    and
                    <Text style={{ color: Colors.PRIMARY_COLOR }}> Privacy Policy</Text>
                </Text>
            </View>

            <View style={{ paddingHorizontal: 20 }}>
                <BaseButton name="Create Account" onPress={handleRegister} />
            </View>
             <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 10 }}>
                                <Text style={{ color: Colors.BLACK, fontSize: 15, fontWeight: '500' }}>Already have an account?</Text>
                                <TouchableOpacity onPress={()=>navigation.navigate("Login")}>
                                    <Text style={{ color: Colors.PRIMARY_COLOR, fontSize: 15, fontWeight: '500' }}>Login</Text>
                                </TouchableOpacity>
                            </View>
           </ScrollView>
        </BaseLayout>
    );
};

export default RegisterScreen;

const styles = StyleSheet.create({});
