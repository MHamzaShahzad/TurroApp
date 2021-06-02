import React from 'react';
import { StyleSheet, Text, View, Image, StatusBar, TextInput, ScrollView } from 'react-native';

import app from '../assets/app_icon.png';

export default function RegisterScreen({ navigation }) {
    return (

        <View style={styles.container}>
            <View style={styles.container1}>
                <Image source={app} style={styles.appimg} />
                <Text style={styles.garitext}>GET GAARI</Text>
            </View>
            <ScrollView>
                <View style={styles.container2}>
                    <Text style={styles.nametext}>Name</Text>
                    <TextInput placeholder="Enter Name" style={styles.nameinput} />
                </View>
                <View style={styles.container3}>
                    <Text style={{ fontSize: 16 }}>E-mail</Text>
                    <TextInput placeholder="Enter E-mail" style={styles.nameinput} />
                </View>
                <View style={styles.container3}>
                    <Text style={{ fontSize: 16 }}>Number</Text>
                    <TextInput placeholder="Enter Number" style={styles.nameinput} />
                </View>
                <View style={styles.container3}>
                    <Text style={{ fontSize: 16 }}>Password</Text>
                    <TextInput placeholder="Password" style={styles.nameinput} />
                </View>
                <View style={styles.container3}>
                    <Text style={styles.fontext}>Confirm Password</Text>
                    <TextInput placeholder="Confirm Password" style={styles.nameinput} />
                </View>
                <View style={styles.container4}>

                    <Text style={styles.Signuptext} onPress={() => navigation.navigate("Signin")} >Sign up</Text>

                    <View style={styles.alreadyaccountview}>
                        <Text style={styles.alreadyaccount}>Already have an Account ? </Text>
                        <Text style={styles.Signinext}>Sign In</Text>
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
        marginTop: 10
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
    container3: {
        marginLeft: 20,
        marginRight: 20,
        marginTop: 6
    },
    fontext: {
        fontSize: 16
    },
    container4: {
        alignItems: "center",
        marginTop: 15
    },
    Signuptext: {
        fontSize: 24,
        marginTop: 25,
        width: "60%",
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
        marginTop: 28
    },
    alreadyaccount: {
        fontSize: 18
    },
    Signinext: {
        fontSize: 18,
        color: "#ad001c"
    },
});
