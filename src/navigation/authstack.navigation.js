import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeDrawerNavigation from './drawer.navigation';

import Screens from '../screens'
import Constants from '../utils/constants';

const Stack = createStackNavigator();

function AuthStackNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={Constants.NavigationItems.AuthScreen}>
                <Stack.Screen name={Constants.NavigationItems.EmailLoginScreen} component={Screens.EmailLoginScreen} options={{ title: "Sawari Login" }} />
                <Stack.Screen name={Constants.NavigationItems.NumberLoginScreen} component={Screens.NumberLoginScreen} options={{ title: "Sawari Login" }} />
                <Stack.Screen name={Constants.NavigationItems.RegisterScreen} component={Screens.RegisterScreen} options={{ title: "Sawari Register" }} />
                <Stack.Screen name={Constants.NavigationItems.OTPScreen} component={Screens.OTPScreen} options={{ title: "Sawari OTP" }} />
                <Stack.Screen name={Constants.NavigationItems.AuthScreen} component={Screens.AuthScreen} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default AuthStackNavigator;