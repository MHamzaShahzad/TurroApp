import React from 'react';
import { StyleSheet, Text, View, Image, TextInput, ScrollView } from 'react-native';

import app from '../assets/app_icon.png';
import Constants from '../utils/constants';
import SimpleCard from '../components/cards/simple.card.component';

export default function EmailLoginScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <View style={styles.container1}>
                <Image source={app} style={styles.appImage} resizeMode='contain'/>
                <Text style={styles.sawariTextStyle}>GET SAWARI</Text>
            </View>
            <ScrollView>
                <View style={styles.container2}>
                    <Text style={styles.textStyleFieldName}>E-mail</Text>
                    <TextInput placeholder="Enter E-mail" style={styles.inputFieldStyle} />
                </View>
                <View style={styles.container3}>
                    <Text style={styles.textStyleFieldName}>Password</Text>
                    <TextInput placeholder="Password" style={styles.inputFieldStyle} />
                </View>
                <Text style={{ margin: 20, fontSize: 18 }}>Forget Password?</Text>
                <View style={styles.container4}>
                    <SimpleCard style={styles.signInButtonStyle} title={"Sign In"} />
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
        marginLeft: 20,
        marginRight: 20,
        marginTop: 6
    },

    container4: {
        alignItems: "center",
        marginTop: 15
    },

    appImage: {
        width: "60%",
        height: 110,
        marginTop: 60
    },

    sawariTextStyle: {
        fontSize: 34,
        fontWeight: 'bold',
        letterSpacing: 2,
        color: Constants.Colors.PRIMARY
    },

    textStyleFieldName: {
        fontSize: 16
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
