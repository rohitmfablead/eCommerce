
import { NavigationContainer } from '@react-navigation/native';

import {RootStackNavigator} from './RootStackNavigator'
export const AppNavigationContainer = () => {
    return(
        <NavigationContainer>
            <RootStackNavigator />
        </NavigationContainer>
    )
}