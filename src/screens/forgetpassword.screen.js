import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TextInput, ScrollView, ActivityIndicator } from 'react-native';

import app from '../assets/app_icon.png';
import Constants from '../utils/constants';
import SimpleCard from '../components/cards/simple.card.component';
import APIUtils from '../utils/api.utils';
export default function ForgetPasswordScreen({ navigation }) {
    const [data, setData] = useState({
        email: '',
        isValidEmail: true,
        isValidtionEmail: true
    });
    const [isLoading, setLoading] = React.useState(false)
    const [isDisable, setDisable] = React.useState(false);

    const forgetPasswrod = async () => {
        if (data.email.length == 0) {
            setData({
                ...data,
                isValidEmail: false
            });
        }
        else {
            setDisable(true)
            setLoading(true)
            console.log("Forget Success Called...")
            const formData = new FormData();
            formData.append('email', data.email);
            console.log('Forget passwrod email data = ' + JSON.stringify(formData))
            const url = Constants.BASE_URL + 'api/password_update';
            const result = await APIUtils.postApi('post', url, formData)
            console.log("User Forget Password API result: " + result)
            removeLoader()
            if (result === '' || undefined) {
                alert("Sorry can't send email try again!")
            } else {
                if (result === 1) {
                    alert("Forget password Email Send Successfully to your Email")
                    navigation.goBack()
                } else if (result === 0) {
                    alert("Cannot send email try again!")
                }
                else if (result === 2) {
                    alert("Your Email not exist")
                }
            }
        }
    }
    const removeLoader = () => {
        setDisable(false)
        setLoading(false)
    }
    const EmailTextChange = (val) => {
        if (val.length == 0) {
            setData({
                ...data,
                email: val,
                isValidEmail: false,
                isValidtionEmail: true,
            });
        }
        else {

            console.log(val);
            let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            if (reg.test(val) === false) {
                console.log("Email is Not Correct");
                setData({
                    ...data,
                    email: val,
                    isValidtionEmail: false,
                    isValidEmail: true
                });

            }
            else {
                console.log("Email is Correct");
                setData({
                    ...data,
                    email: val,
                    isValidtionEmail: true,
                    isValidEmail: true
                });
            }
        }


    }

    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.container1}>
                    <Image source={app} style={styles.appImage} resizeMode='contain' />
                    <Text style={styles.sawaariTextStyle}>GET SAWARI</Text>
                </View>

                <View style={styles.container2}>
                    <Text style={styles.textStyleFieldName}>Enter Youe Email</Text>
                    <TextInput onChangeText={(val) => EmailTextChange(val)} placeholder="Your Email" style={styles.inputFieldStyle} />
                    {data.isValidEmail ? null : <Text style={{ color: '#FF0000' }}>Email must be required</Text>}
                    {data.isValidtionEmail ? null : <Text style={{ color: '#FF0000' }}>Email not Valid</Text>}
                </View>
                <View style={{ marginTop: 24 }}>
                    {
                        isLoading ? (
                            <ActivityIndicator size='large' color={Constants.Colors.PRIMARY}></ActivityIndicator>
                        )
                            :
                            null
                    }
                </View>
                <SimpleCard style={styles.signInButtonStyle} title={"Submit"} customClick={() => forgetPasswrod()} />
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
        marginTop: 50,
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
        alignSelf: 'center'
    }


});
