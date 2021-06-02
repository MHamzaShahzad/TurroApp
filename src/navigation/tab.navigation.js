import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Screens from '../screens'

const Tab = createBottomTabNavigator();

export default function HomeTabNavigation() {
    return (
        <Tab.Navigator barStyle={{ paddingBottom: 48 }} initialRouteName="HomeSawari">

            <Tab.Screen name="AddSawari" component={Screens.MySawariListScreen}
                options={{
                    title: "Rent My Sawari",
                    headerShown: false, tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="car" color={color} size={26} />
                    ),
                }} />

            <Tab.Screen name="HomeSawari" component={Screens.HomeScreen}
                options={{
                    title: "Get A Sawari",
                    headerShown: false, tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="car" color={color} size={26} />
                    ),
                }} />

            <Tab.Screen name="Account" component={Screens.HomeScreen}
                options={{
                    headerShown: false, tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="account-circle" color={color} size={26} />
                    ),
                }} />

        </Tab.Navigator>
    );
}