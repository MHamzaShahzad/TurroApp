import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeDrawerNavigation from './drawer.navigation';

import Screens from '../screens'
import Constants from '../utils/constants';

const Stack = createStackNavigator();

function MainStackNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="SawariHome" screenOptions={{
                headerBackTitleVisible: false,
                headerStyle: {
                    backgroundColor: Constants.Colors.PRIMARY,
                },
                headerTintColor: Constants.Colors.WHITE,
                headerTitleStyle: {
                    fontWeight: 'bold',
                    fontSize: 20
                },
            }}>
                <Stack.Screen name={Constants.NavigationItems.SawariHomeScreen} component={HomeDrawerNavigation} options={{ headerShown: false }} />
                <Stack.Screen name={Constants.NavigationItems.SawariDetailsScreen} component={Screens.SawariDetailsScreen} options={{ title: "Sawari Details" }} />
                <Stack.Screen name={Constants.NavigationItems.SawariListScreen} component={Screens.SawariListScreen} options={{ title: "Sawari List" }} />
                <Stack.Screen name={Constants.NavigationItems.EmailLoginScreen} component={Screens.EmailLoginScreen} options={{ title: "Sawari Login" }} />
                <Stack.Screen name={Constants.NavigationItems.NumberLoginScreen} component={Screens.NumberLoginScreen} options={{ title: "Sawari Login" }} />
                <Stack.Screen name={Constants.NavigationItems.RegisterScreen} component={Screens.RegisterScreen} options={{ title: "Sawari Register" }} />
                <Stack.Screen name={Constants.NavigationItems.OTPScreen} component={Screens.OTPScreen} options={{ title: "Sawari OTP" }} />
                <Stack.Screen name={Constants.NavigationItems.AddSawariScreen} component={Screens.SawariAddScreen} options={{ title: "Add Sawari" }} />
                <Stack.Screen name={Constants.NavigationItems.FilterSawariScreen} component={Screens.SawariFilterScreen} options={{ title: "Search Sawari" }} />
                <Stack.Screen name={Constants.NavigationItems.ProfileScreen} component={Screens.ProfileScreen} options={{ title: "Sawari Profile" }} />
                <Stack.Screen name={Constants.NavigationItems.FilteredItemScreen} component={Screens.FilteredItemScreen} options={{ title: "Filtered Sawari List" }} />
                <Stack.Screen name={Constants.NavigationItems.AdvanceFilterScreen} component={Screens.AdvanceFilterScreen} options={{ title: "Advacne Filter" }} />
                <Stack.Screen name={Constants.NavigationItems.BookSawariScreen} component={Screens.BookSawariScreen} options={{ title: "Book Sawari" }} />
                <Stack.Screen name={Constants.NavigationItems.ResetPasswordScreen} component={Screens.ResetPasswordScreen} options={{ title: "Reset Password" }} />
                <Stack.Screen name={Constants.NavigationItems.ForgetPasswordScreen} component={Screens.ForgetPasswordScreen} options={{ title: "Forget Password" }} />


            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default MainStackNavigator;