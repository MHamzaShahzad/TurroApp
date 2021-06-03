import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeTabNavigation from './tab.navigation';
import DrawerContent from '../components/drawer.component';
import Screens from '../screens';
import Constants from '../utils/constants'
const Drawer = createDrawerNavigator();

export default function HomeDrawerNavigation() {
    return (
        <Drawer.Navigator  initialRouteName="DrawerBottomTabs" drawerContent={(props) => <DrawerContent {...props} />} >
            <Drawer.Screen name={Constants.NavigationItems.DrawerBottomTabs} component={HomeTabNavigation} options={{ headerShown: false }} />
            <Drawer.Screen name={Constants.NavigationItems.AuthScreen} component={Screens.AuthScreen} options={{ title: "Sawari Login" }} />
        </Drawer.Navigator>
    );
}