import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import BaseLayout from './BaseLayout'
import { Colors } from '../utils/theme'

const CustomLoader = () => {
  return (
    <BaseLayout>
         <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
           <ActivityIndicator size="large" color={Colors.PRIMARY_COLOR}/>
         </View>
       </BaseLayout>
  )
}

export default CustomLoader

const styles = StyleSheet.create({})