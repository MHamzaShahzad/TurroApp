import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeDrawerNavigation from './drawer.navigation';

import Screens from '../screens'

const Stack = createStackNavigator();

function MainStackNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="SawariHome" screenOptions={ {headerBackTitleVisible: false} }>
                <Stack.Screen name="SawariHome" component={HomeDrawerNavigation} options={{ headerShown: false }} />
                <Stack.Screen name="SawariDetails" component={Screens.SawariDetailsScreen} options={{ title: "Sawari Details"}} />
                <Stack.Screen name="SawariListScreen" component={Screens.SawariListScreen} options={{ title: "Sawari List" }} />
                <Stack.Screen name="EmailLoginScreen" component={Screens.EmailLoginScreen} options={{ title: "Sawari Login" }} />
                <Stack.Screen name="NumberLoginScreen" component={Screens.NumberLoginScreen} options={{ title: "Sawari Login" }} />
                <Stack.Screen name="RegisterScreen" component={Screens.RegisterScreen} options={{ title: "Sawari Login" }} />
                <Stack.Screen name="OTPScreen" component={Screens.OTPScreen} options={{ title: "Sawari OTP" }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default MainStackNavigator;