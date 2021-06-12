import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, Alert, Text, View, TouchableOpacity } from 'react-native';
import 'react-native-gesture-handler';
import logod from '../assets/app_icon.png';
import login from '../assets/login.png';
import globe from '../assets/globe.png';
import FaQ from '../assets/globe.png';
import feedback from '../assets/feedback.png';
import man from '../assets/man.png';
import call from '../assets/call.png';
import Constants from '../utils/constants';
import UserCache from '../utils/cache.utils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { openCallDialer } from '../utils/common.utils'
import { openInbox, openComposer } from "react-native-email-link";

var u_data;
export default function DrawerContent({ props, navigation }) {

  const [userName, setUserName] = useState('')

  useEffect(() => {
    console.log("Drawer content called..")
    getUserData()
  }, [])

  const getUserData = async () => {
    u_data = await UserCache.UserData(Constants.USER_DATA);
    if (u_data != null) {
      setUserName(u_data.name)
    } else {
      setUserName('')
    }
    console.log(u_data)
  }

  const drawerNavigationItemClick = (navigateTo) => {
    navigation.closeDrawer();
    navigation.navigate(navigateTo);
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Image source={logod} style={styles.headerImage} resizeMode='contain' />
        <Text style={styles.textStyleHeader}>Turro</Text>
      </View>
      {userName === '' ?
        <View style={styles.navItemContainer}>
          <Image source={login} style={styles.navItemIconStyle} resizeMode='contain' />
          <TouchableOpacity onPress={() => drawerNavigationItemClick(Constants.NavigationItems.AuthScreen)}>
            <Text style={styles.navItemTextStyle}>Login or Sign Up</Text>
          </TouchableOpacity>
        </View>
        :
        <View style={styles.navItemContainer}>
          <Image source={man} style={styles.navItemIconStyle} resizeMode='contain' />
          <TouchableOpacity onPress={() => drawerNavigationItemClick(Constants.NavigationItems.ProfileScreen)}>
            <Text style={styles.navItemTextStyle}>{userName}</Text>
          </TouchableOpacity>
        </View>
      }

      <View style={styles.navItemContainer}>
        <Image source={feedback} style={styles.navItemIconStyle} resizeMode='contain' />
        <TouchableOpacity onPress={() =>
          openComposer({
            to: "support@example.com",
            subject: "I have a question",
            body: "Hi, can you help me with...",
          })
        }>
          <Text style={styles.navItemTextStyle}>Feedback</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.navItemContainer}>
        <Image source={call} style={styles.navItemIconStyle} resizeMode='contain' />
        <TouchableOpacity onPress={() => openCallDialer("03001234567")}>
          <Text style={styles.navItemTextStyle}>Call Us</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  headerContainer: {
    marginTop: 30,
    flexDirection: 'column'
  },

  navItemContainer: {
    marginTop: 10,
    flexDirection: 'row',
  },

  headerImage: {
    height: 80,
    width: '80%',
    marginLeft: 20,
    marginBottom: 7,
    borderWidth: 1,
    marginTop: 15,
    borderColor: '#fff',
  },

  navItemIconStyle: {
    width: 35,
    height: 35,
    marginLeft: 20,
    marginTop: 20,
  },

  textStyleHeader: {
    fontSize: 25,
    fontFamily: Constants.Fonts.FAMILY,
    color: Constants.Colors.PRIMARY,
    textAlign: 'center',
    fontWeight: 'bold'
  },

  navItemTextStyle: {
    marginTop: 28,
    marginLeft: 28,
    fontWeight: 'bold'
  },
});
