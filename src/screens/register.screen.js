import React from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView, TextInput, ScrollView } from 'react-native';

import app from '../assets/app_icon.png';
import Constants from '../utils/constants';
import SimpleCard from '../components/cards/simple.card.component';

export default function RegisterScreen({ navigation }) {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.container1}>
                <Image source={app} style={styles.appImage} resizeMode='contain'/>
                <Text style={styles.sawariTextStyle}>GET SAWARI</Text>
            </View>
            <ScrollView>
                <View style={styles.container2}>
                    <Text style={styles.textStyleFieldName}>Name</Text>
                    <TextInput placeholder="Enter Name" style={styles.inputFieldStyle} />
                </View>
                <View style={styles.container2}>
                    <Text style={styles.textStyleFieldName}>E-mail</Text>
                    <TextInput placeholder="Enter E-mail" style={styles.inputFieldStyle} />
                </View>
                <View style={styles.container2}>
                    <Text style={styles.textStyleFieldName}>Number</Text>
                    <TextInput placeholder="Enter Number" style={styles.inputFieldStyle} />
                </View>
                <View style={styles.container2}>
                    <Text style={styles.textStyleFieldName}>Password</Text>
                    <TextInput placeholder="Enter Password" style={styles.inputFieldStyle} />
                </View>
                <View style={styles.container2}>
                    <Text style={styles.textStyleFieldName}>Confirm Password</Text>
                    <TextInput placeholder="Enter Confirm Password" style={styles.inputFieldStyle} />
                </View>
                <View style={styles.container3}>
                    <SimpleCard style={styles.signUpButtonStyle} title={"Sign Up"} />
                    <View style={styles.alreadyHaveAccountView}>
                        <Text style={styles.alreadyHaveAccountTextStyle}>Already have an Account ? </Text>
                        <Text style={styles.signInTextStyle} onPress={() => navigation.navigate(Constants.NavigationItems.AuthScreen)}>Sign In</Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
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
        marginTop: 10
    },

    container3: {
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
    
    signUpButtonStyle: {
        fontSize: 24,
        marginTop: 25,
        width: "60%",
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

    alreadyHaveAccountView: {
        flexDirection: "row",
        marginTop: 28
    },

    alreadyHaveAccountTextStyle: {
        fontSize: 18
    },

    signInTextStyle: {
        fontSize: 18,
        color: Constants.Colors.PRIMARY
    },

});
