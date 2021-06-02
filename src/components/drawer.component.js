import React, { useState } from 'react';
import { Image, StyleSheet, Switch, Text, View, TouchableOpacity } from 'react-native';
import 'react-native-gesture-handler';
import logod from '../assets/app_icon.png';
import login from '../assets/login.png';
import globe from '../assets/globe.png';
import FaQ from '../assets/globe.png';
import feedback from '../assets/feedback.png';
import call from '../assets/call.png';
import Constants from '../utils/constants';

export default function DrawerContent({ props, navigation }) {
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

      <View style={styles.navItemContainer}>
        <Image source={login} style={styles.navItemIconStyle} resizeMode='contain' />
        <TouchableOpacity onPress={() => drawerNavigationItemClick('AuthScreen')}>
          <Text style={styles.navItemTextStyle}>Login or Sign Up</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.navItemContainer}>
        <Image source={globe} style={styles.navItemIconStyle} resizeMode='contain' />
        <TouchableOpacity>
          <Text style={styles.navItemTextStyle}>Visit Website</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.navItemContainer}>
        <Image source={FaQ} style={styles.navItemIconStyle} resizeMode='contain' />
        <TouchableOpacity>
          <Text style={styles.navItemTextStyle}>FAQ</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.navItemContainer}>
        <Image source={feedback} style={styles.navItemIconStyle} resizeMode='contain' />
        <TouchableOpacity>
          <Text style={styles.navItemTextStyle}>Feedback</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.navItemContainer}>
        <Image source={call} style={styles.navItemIconStyle} resizeMode='contain' />
        <TouchableOpacity>
          <Text style={styles.navItemTextStyle}>Call Us</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.container5}>
        <View style={styles.preferencecontainer}>
        </View>
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
