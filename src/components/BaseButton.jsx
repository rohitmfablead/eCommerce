import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { Colors, Fonts, moderateScale } from '../utils/theme'

const BaseButton = (
    {
        name, onPress, disabled
    }
) => {


    return (

        <TouchableOpacity
            onPress={onPress}
            activeOpacity={.8}
            style={[styles.btnContainer]}
        // disabled={disabled}
        >
            <Text style={styles.btnText}>{name}</Text>
        </TouchableOpacity>

    )
}

export default BaseButton

const styles = StyleSheet.create({
    btnContainer: {
        width: '100%',
        height: moderateScale(50),
        backgroundColor: Colors.PRIMARY_COLOR,
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
        marginVertical: moderateScale(30),
        borderRadius: moderateScale(10)
    },
    btnText: {
        color: Colors.WHITE,
        fontSize: moderateScale(18),
        fontWeight: '600'
    }
})