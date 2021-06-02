import React from 'react';
import { StyleSheet, Text, View, Image, StatusBar, TextInput, ScrollView } from 'react-native';

import app from '../assets/app_icon.png';

export default function NumberLoginScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <View style={styles.container1}>
                <Image source={app} style={styles.appimg} />
                <Text style={styles.garitext}>GET GAARI</Text>
            </View>
            <ScrollView>
                <View style={styles.container2}>
                    <Text style={styles.fontext}>Number</Text>
                    <TextInput placeholder="Enter Number" style={styles.nameinput} />
                </View>
                <View style={styles.signincontainer}>
                    <Text style={styles.Signuptext} onPress={() => navigation.navigate("OTPScreen")} >Sign In</Text>
                    <View style={styles.alreadyaccountview}>
                        <Text style={styles.alreadyaccount}>Don't have an Account ? </Text>
                        <Text style={styles.Signinext}>Sign Up</Text>
                    </View>
                </View>
            </ScrollView>
            <StatusBar style="auto" />
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    container1: {
        alignItems: "center"
    },
    appimg: {
        width: "60%",
        height: 110,
        marginTop: 60
    },
    garitext: {
        fontSize: 34,
        fontWeight: 'bold',
        letterSpacing: 2,
        color: "#ad001c"
    },
    container2: {
        marginLeft: 20,
        marginRight: 20,
        marginTop: 40
    },
    nametext: {
        fontSize: 16
    },
    nameinput: {
        height: 45,
        marginTop: 7,
        fontSize: 18,
        paddingLeft: 10,
        borderRadius: 10,
        elevation: 5,
        backgroundColor: "white"
    },
    fontext: {
        fontSize: 16
    },
    signincontainer: {
        alignItems: "center",
        marginTop: 240
    },
    Signuptext: {
        fontSize: 24,
        marginTop: 25,
        width: "70%",
        height: 50,
        textAlign: "center",
        paddingTop: 7,
        elevation: 5,
        backgroundColor: "white",
        fontWeight: 'bold',
        backgroundColor: "#ad001c",
        color: "white",
        borderRadius: 10,
    },
    alreadyaccountview: {
        flexDirection: "row",
        marginTop: 45
    },
    alreadyaccount: {
        fontSize: 18
    },
    Signinext: {
        fontSize: 18,
        color: "#ad001c"
    },
});
