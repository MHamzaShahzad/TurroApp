import React from 'react';
import { StyleSheet } from 'react-native';
import Constants from '../utils/constants'

const AppStyles = StyleSheet.create({
    container: {
        flex: 1,
    },
    appFont: {
        fontFamily: Constants.Fonts.FAMILY,
    },
    textColorWhite: {
        color: Constants.Colors.WHITE
    },
    textColorPrimary: {
        color: Constants.Colors.PRIMARY
    }
});

export default AppStyles