import React from 'react'
import { StyleSheet, SafeAreaView, View, Image, TextInput, Text, ScrollView } from 'react-native'
import app from '../assets/app_icon.png';
import Constants from '../utils/constants';
import SimpleCard from '../components/cards/simple.card.component';
import { Value } from 'react-native-reanimated';
export default function BookSawariScreen({ props, navigation }) {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.container}>

                <ScrollView>
                    <View style={styles.container2}>
                        <Text style={styles.textStyleFieldName}>Name</Text>
                        <TextInput placeholder="Your Name" style={styles.inputFieldStyle} />
                    </View>
                    <View style={styles.container3}>
                        <Text style={styles.textStyleFieldName}>Address</Text>
                        <TextInput placeholder="Your Address" style={styles.inputFieldStyle} />
                    </View>
                    <View style={styles.container3}>
                        <Text style={styles.textStyleFieldName}>Pickup</Text>
                        <TextInput placeholder="Your Pickup" style={styles.inputFieldStyle} />
                    </View>
                    <View style={styles.container3}>
                        <Text style={styles.textStyleFieldName}>Destination</Text>
                        <TextInput placeholder="Your Destination" style={styles.inputFieldStyle} />
                    </View>
                    <View style={styles.container5}>
                        <View style={styles.container6}>
                            <Text style={styles.textStyleFieldName}>Date</Text>
                            <TextInput placeholder="Your Date" style={styles.inputFieldStyle} />
                        </View>
                        <View style={styles.container6}>
                            <Text style={styles.textStyleFieldName}>Time</Text>
                            <TextInput placeholder="Your Time" style={styles.inputFieldStyle} />
                        </View>
                    </View>
                    <View style={styles.container3}>
                        <Text style={styles.textStyleFieldName}>Payment (Rs)</Text>
                        <TextInput placeholder="Your Payment(Rs)" style={styles.inputFieldStyle} />
                    </View>

                    <View style={styles.container4}>
                        <SimpleCard style={styles.signInButtonStyle} title={"Confirm Booking"} />

                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    )
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
        marginTop: 20
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
    container5: {
        flexDirection: 'row',
        marginTop: 15
    },
    container6: {
        flex: 1,
        marginLeft: 20,
        marginRight: 20,
        marginTop: 6
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
        fontSize: 16,
        paddingLeft: 10,
        borderRadius: 10,
        borderWidth:1,
        borderColor:"#DDDDDD",
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