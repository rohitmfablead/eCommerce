import { Image, Keyboard, StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import React, { forwardRef, memo, useEffect, useState } from 'react';
import { Colors, DEVICE_STYLES, moderateScale } from '../utils/theme';

const CustomInputWithLabel = (props, ref) => {
  const {
    onSubmit,
    placeholder,
    onChangeText,
    multiline,
    maxLength,
    returnKeyLabel,
    returnKeyType,
    label,
    value,
    editable = true,
    leftIcon,
    rightIcon,
    inputRef,
    isSecured = false,
    leftIconSource,
    rightIconSource,
  } = props;

  const [isFocused, setIsFocused] = useState(false);

  const [hide, setHide] = useState(isSecured);


  const togglePasswordVisibility = () => {
    setHide(!hide);
  };

  useEffect(() => {
    Keyboard.addListener('keyboardDidHide', () => {
      Keyboard.dismiss()
    })
  }, [])

  return (
    <View style={styles.inputContaier} {...props}>
      <View
        style={[
          styles.textInputContainer,
          {
            backgroundColor: Colors.WHITE,

            borderBottomWidth: isFocused
              ? 1
              : null,
            borderColor: isFocused
              ? Colors.NATURAL_BLACK
              : Colors.NATURAL_BLACK,

            elevation: isFocused
              ? 1
              : 0
          },
        ]}>

        {leftIconSource && (
          <Image source={leftIconSource} style={styles.icon} />
        )}
        <TextInput
          style={styles.textInput}
          {...props}
          ref={inputRef}
          onSubmitEditing={onSubmit}
          cursorColor={Colors.PRIMARY_COLOR}
          placeholder={placeholder}
          placeholderTextColor={'#A4A4A4'}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          secureTextEntry={hide}

        />
        {isSecured && (
          <TouchableOpacity onPress={togglePasswordVisibility}>
            {rightIconSource && (
              <Image source={rightIconSource} style={styles.icon} />
            )}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default memo(forwardRef(CustomInputWithLabel));

const styles = StyleSheet.create({
  inputContaier: {
    alignSelf: 'center',
    width: '90%',
  },
  textInputContainer: {
    borderRadius: moderateScale(10),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: moderateScale(5),
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor:'gray'
  },
  textInput: {
    height: DEVICE_STYLES.SCREEN_HEIGHT * 0.07,
    borderRadius: moderateScale(10),
    width: '100%',
    fontSize: moderateScale(14),
    marginTop: moderateScale(2),
    // color: Colors.PRIMARY_COLOR,
    flex: 1,


  },
  textStyle: {
    fontSize: moderateScale(15),
    color: Colors.PRIMARY_COLOR,
    marginVertical: moderateScale(5),
  },

  leftIconContainer: {
    marginHorizontal: 5,
    alignSelf: 'center',
  },
  rightIconContainer: {
    marginHorizontal: 5,
    alignSelf: 'center',
  },
  icon: {
    width: moderateScale(20),
    height: moderateScale(20),
    resizeMode: 'contain',
    marginHorizontal: 10,
  },
});