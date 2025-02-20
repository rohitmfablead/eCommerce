import { View, SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import React, { memo } from 'react';

const BaseLayout = ({ children }) => {
    return (
      
    <SafeAreaView style={styles.safeArea}>
        <View style={styles.content}>
            {children}
        </View>
    </SafeAreaView>


    );
};

export default memo(BaseLayout);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    safeArea: {
        flex: 1,
    },
    content: {
        flex: 1,
        paddingVertical: 20,
    },
});
