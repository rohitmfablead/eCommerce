import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BaseLayout from '../components/BaseLayout';
import { Colors } from '../utils/theme';
import { showMessage } from 'react-native-flash-message';

const ProfileScreen = ({ navigation }) => {
    const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem('loginUser');
            showMessage({
                message: "Logout successful!",
                type: "success",
            });
            navigation.replace('Login');
        } catch (error) {
            showMessage({
                message: "An error occurred while logging out",
                type: "danger",
            });
        }
    };

    return (
        <BaseLayout>
            <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                <TouchableOpacity
                    style={styles.logoutButton}
                    onPress={handleLogout}
                >
                    <Text style={styles.logoutText}>Logout</Text>
                </TouchableOpacity>
            </View>
        </BaseLayout>
    );
};

export default ProfileScreen;

const styles = StyleSheet.create({
    logoutButton: {
        width: 100,
        height: 50,
        backgroundColor: Colors.PRIMARY_COLOR,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center'
    },
    logoutText: {
        color: Colors.WHITE,
        fontSize: 16,
        fontWeight: '600'
    }
});
