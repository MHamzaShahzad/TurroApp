import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Screens from '../screens'
import Constants from '../utils/constants';

const Tab = createBottomTabNavigator();

export default function HomeTabNavigation() {
    return (
        <Tab.Navigator barStyle={{ paddingBottom: 48 }} initialRouteName={Constants.NavigationItems.SawariHomeScreen} >

            <Tab.Screen name={Constants.NavigationItems.SawariHomeScreen} component={Screens.HomeScreen}
                options={{
                    title: "Get A Sawari",
                    headerShown: false, tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="car" color={color} size={26} />
                    ),
                }} />

            <Tab.Screen name={Constants.NavigationItems.MySawariListScreen} component={Screens.MySawariListScreen}
                options={{
                    title: "Rent My Sawari",
                    headerShown: false, tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="car" color={color} size={26} />
                    ),
                }} />

            {/* <Tab.Screen name="Account" component={Screens.HomeScreen}
                options={{
                    headerShown: false, tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="account-circle" color={color} size={26} />
                    ),
                }} /> */}

        </Tab.Navigator>
    );
}