// import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
// import React from 'react';
// import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

// import {BOTTOM_NAVIGATION_ROUTES} from './Routes';
// import {Colors, Fonts, moderateScale} from '../utils/theme';
// import {
//   HomeIcon,
//   HomeFocusIcon,
//   CategoryIcon,
//   CategoryFocusIcon,
//   MyCartFocusIcon,
//   MyCartIcon,
//   MyOrderFocusIcon,
//   MyOrderIcon,
//   ProfileFocusIcon,
//   ProfileIcon,
// } from '../assets/icons';

// const BottomTab = createBottomTabNavigator();

// const TabBarButtonComponent = ({
//   label,
//   accessibilityState,
//   focusedIcon,
//   notFocusedIcon,
//   onPress,
// }) => {
//   const isFocused = accessibilityState?.selected;
//   const FocusedIcon = focusedIcon;
//   const NotFocusedIcon = notFocusedIcon;

//   return (
//     <TouchableOpacity
//       accessibilityRole={'tab'}
//       activeOpacity={0.8}
//       onPress={onPress}
//       style={[
//         styles.tabButtonContainer,
//         {backgroundColor: '#F3F3F3' , justifyContent : 'center'},
//       ]}>
//       {isFocused ? (
//         <FocusedIcon key={'focused-icon'} />
//       ) : (
//         <NotFocusedIcon key={'unfocused-icon'} />
//       )}
//       <Text
//         style={[
//           styles.tabBarLabelStyle,
//           {color: isFocused ? Colors.PRIMARY_COLOR : '#F3F3F3'},
//         ]}>
//         {label}
//       </Text>
//     </TouchableOpacity>
//   );
// };

// const BottomNavigator = () => {
//   return (
//     <BottomTab.Navigator
//       screenOptions={{
//         headerShown: false,
//         tabBarShowLabel: true,
//         tabBarStyle: {
//           height: moderateScale(80),
//           borderTopWidth: 1,
//           backgroundColor:'#fff',
//           overflow : 'hidden'
//         },
//       }}>
//       <BottomTab.Screen
//         name="HomeScreen"
//         component={BOTTOM_NAVIGATION_ROUTES.HomeScreen}
//         options={{
//           title: 'Home',
//           tabBarButton: props => (
//             <TabBarButtonComponent
//               {...props}
//               focusedIcon={HomeFocusIcon}
//               notFocusedIcon={HomeIcon}
//               label={'Home'}
//             />
//           ),
//         }}
//       />
//       <BottomTab.Screen
//         name="CategoryScreen"
//         component={BOTTOM_NAVIGATION_ROUTES.CategoryScreen}
//         options={{
//           title: 'Category',
//           tabBarButton: props => (
//             <TabBarButtonComponent
//               {...props}
//               focusedIcon={CategoryFocusIcon}
//               notFocusedIcon={CategoryIcon}
//               label={'Category'}
//             />
//           ),
//         }}
//       />
//       <BottomTab.Screen
//         name="MyCartScreen"
//         component={BOTTOM_NAVIGATION_ROUTES.MyCartScreen}
//         options={{
//           title: 'MyCart',
//           tabBarButton: props => (
//             <TabBarButtonComponent
//               {...props}
//               focusedIcon={MyCartFocusIcon}
//               notFocusedIcon={MyCartIcon}
//               label={'Cart'}
//             />
//           ),
//         }}
//       />
//       <BottomTab.Screen
//         name="MyOrderScreen"
//         component={BOTTOM_NAVIGATION_ROUTES.MyOrderScreen}
//         options={{
//           title: 'MyOrder',
//           tabBarButton: props => (
//             <TabBarButtonComponent
//               {...props}
//               focusedIcon={MyOrderFocusIcon}
//               notFocusedIcon={MyOrderIcon}
//               label={'Order'}
//             />
//           ),
//         }}
//       />
//       <BottomTab.Screen
//         name="ProfileScreen"
//         component={BOTTOM_NAVIGATION_ROUTES.ProfileScreen}
//         options={{
//           title: 'Profile',
//           tabBarButton: props => (
//             <TabBarButtonComponent
//               {...props}
//               focusedIcon={ProfileFocusIcon}
//               notFocusedIcon={ProfileIcon}
//               label={'Profile'}
//             />
//           ),
//         }}
//       />
//     </BottomTab.Navigator>
//   );
// };

// export default BottomNavigator;

// const styles = StyleSheet.create({
//   tabButtonContainer: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'space-evenly',
//   },
//   tabBarLabelStyle: {
//     fontSize: moderateScale(12),
//     fontFamily : Fonts.SemiBold,

//   },
// });
