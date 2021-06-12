import React from 'react';
import {
    SafeAreaView,
    Text,
    View,
    StatusBar,
    Image
} from 'react-native';
import Styles from '../styles';
import Constants from '../utils/constants';
import logoCS from '../assets/app_icon.png';

export default function SplashScreen() {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Constants.Colors.PRIMARY }}>
            <StatusBar barStyle="light-content" backgroundColor={Constants.Colors.PRIMARY} />
            <View style={Styles.AppStyles.container}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Image source={logoCS} style={{ width: 200, height: 150 }} resizeMode={'contain'}></Image>
                    <Text style={[Styles.AppStyles.font, Styles.AppStyles.textColorWhite, { fontSize: 24, fontWeight: 'bold' }]}>CHALO TURRO</Text>
                </View>
            </View>
        </SafeAreaView>
    )
}