import React from 'react';
import { StyleSheet, Text, View, Image, TextInput, ScrollView } from 'react-native';

import app from '../assets/app_icon.png';
import Constants from '../utils/constants';
import SimpleCard from '../components/cards/simple.card.component';

export default function NumberLoginScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.container1}>
                    <Image source={app} style={styles.appImage} resizeMode='contain' />
                    <Text style={styles.sawaariTextStyle}>GET SAWARI</Text>
                </View>

                <View style={styles.container2}>
                    <Text style={styles.textStyleFieldName}>Number</Text>
                    <TextInput placeholder="Enter Number" style={styles.inputFieldStyle} />
                </View>
                <View style={styles.container3}>
                    <SimpleCard style={styles.signInButtonStyle} title={"Sign In"} customClick={() => navigation.navigate(Constants.NavigationItems.OTPScreen)} />
                    <View style={styles.doNotHaveAccountViewStyle}>
                        <Text style={styles.doNotHaveAccountTextStyle}>Don't have an Account ? </Text>
                        <Text style={styles.signUpTextStyle} onPress={() => navigation.navigate(Constants.NavigationItems.RegisterScreen)}>Sign Up</Text>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    container1: {
        alignItems: "center"
    },

    container2: {
        marginLeft: 20,
        marginRight: 20,
        marginTop: 40
    },

    container3: {
        alignItems: "center",
        marginTop: 240
    },

    appImage: {
        width: "60%",
        height: 110,
        marginTop: 60
    },

    sawaariTextStyle: {
        fontSize: 34,
        fontWeight: 'bold',
        letterSpacing: 2,
        color: Constants.Colors.PRIMARY
    },

    inputFieldStyle: {
        height: 45,
        marginTop: 7,
        fontSize: 18,
        paddingLeft: 10,
        borderRadius: 10,
        elevation: 5,
        backgroundColor: Constants.Colors.WHITE,
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowRadius: 5,
        shadowOffset: { width: 1, height: 1 },
    },

    textStyleFieldName: {
        fontSize: 16
    },

    signInButtonStyle: {
        fontSize: 24,
        marginTop: 25,
        width: "70%",
        height: 50,
        textAlign: "center",
        paddingTop: 7,
        elevation: 5,
        backgroundColor: Constants.Colors.WHITE,
        fontWeight: 'bold',
        backgroundColor: Constants.Colors.PRIMARY,
        color: Constants.Colors.WHITE,
        borderRadius: 10,
    },

    doNotHaveAccountViewStyle: {
        flexDirection: "row",
        marginTop: 45
    },

    doNotHaveAccountTextStyle: {
        fontSize: 18
    },

    signUpTextStyle: {
        fontSize: 18,
        color: Constants.Colors.PRIMARY
    },
});
