import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { Colors, DEVICE_STYLES, Fonts, moderateScale } from '../utils/theme';
import { useNavigation } from '@react-navigation/native';
import { Maasage, Search } from '../assets/icons'
import { Profile } from '../assets/images';
import Ionicons from "react-native-vector-icons/Ionicons";

const Baseheader = ({ label, externelStyle = {} }) => {
  const navigation = useNavigation();

  return (
    <View>
      <View
        style={{
          height: DEVICE_STYLES.SCREEN_HEIGHT * 0.1,
          width: '100%',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginHorizontal: moderateScale(15),
            gap: moderateScale(15),
          }}>
          <TouchableOpacity  style={{ width: 50, height: 50, borderRadius: 25, alignItems: 'center', justifyContent: 'center',overflow:'hidden' }}>
            <Image source={Profile} style={{ width: "100%", height: "100%" }} />
          </TouchableOpacity>
          <Text style={[styles.ContainerLabel, externelStyle]}>
            {label}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginHorizontal: moderateScale(15),
            gap: moderateScale(15),
          }}>
          <TouchableOpacity style={{width:50,height:50,borderRadius:25,backgroundColor:'rgba(0,0,0,.2)',justifyContent:'center',alignItems:'center'}}>
          <Ionicons name="chatbox-ellipses-outline" size={25} color="#fff" />           
           {/* <Image source={Maasage} style={{ width: 24, height: 24 }} /> */}
          </TouchableOpacity>
          <TouchableOpacity style={{width:50,height:50,borderRadius:25,backgroundColor:'rgba(0,0,0,.2)',justifyContent:'center',alignItems:'center'}}>
          <Ionicons name="search-outline" size={25} color="#fff" />           
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Baseheader;

const styles = StyleSheet.create({
  ContainerLabel: {
    fontSize: moderateScale(25),
    fontFamily: Fonts.Bold,
    color: Colors.WHITE,
  },
});
