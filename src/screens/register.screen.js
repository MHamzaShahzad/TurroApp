import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView, TextInput, ScrollView, ActivityIndicator } from 'react-native';

import app from '../assets/app_icon.png';
import Constants from '../utils/constants';
import SimpleCard from '../components/cards/simple.card.component';
import registerApiCall from '../utils/api.utils';
export default function RegisterScreen({ navigation }) {
    const [isLoading, seIsLoading] = useState(false);
    const [isDisable, setDisable] = React.useState(false);
    const [data, setData] = React.useState({
        username: '',
        uphone: '',
        uemail: '',
        upass: '',
        ucpass: '',
        secureTextEntry: true,
        isValidName: true,
        isValidPhone: true,
        isValidEmail: true,
        isValidtionEmail: true,
        isValidPass: true,
        isValidCpass: true,

    });
    const registerUser = async () => {
        if (data.username.length == 0) {
            setData({
                ...data,
                isValidName: false
            });
        }
        else if (data.uemail.length == 0) {
            setData({
                ...data,
                isValidEmail: false
            });
        }
        else if (data.uphone.length == 0) {
            setData({
                ...data,
                isValidPhone: false
            });
        }
        else if (data.upass.length == 0) {
            setData({
                ...data,
                isValidPass: false
            });
        }
        else if (data.ucpass.length == 0) {
            setData({
                ...data,
                isValidCpass: false
            });
        }
        else {
            if (data.upass === data.ucpass) {
                seIsLoading(true)
                setDisable(true)
                const formData = new FormData();
                formData.append('name', data.username);
                formData.append('email', data.uemail);
                formData.append('phone', data.uphone);
                formData.append('password', data.upass);
                console.log('User Register Data = ' + JSON.stringify(formData))
                const url = Constants.BASE_URL + 'api/user/register';
                const result = await registerApiCall.postApi('post', url, formData)
                console.log("final result" + result)
                if (result === '' || undefined) {
                    removeLoader()
                    alert("Sorry user not register please try again!")
                }
                else {
                    if (result === 1) {
                        alert("User Register Successfully")
                        navigation.goBack();
                    }
                    else if (result === 2) {
                        alert("User Already Exist")
                        navigation.goBack();
                    }
                }

            }
            else {
                alert('Both Password not matched')
            }
        }
    }
    const removeLoader = () => {
        console.log("removeLoader called...")
        seIsLoading(false)
        setDisable(false)
    }
    const NameTextChange = (val) => {
        if (val.length == 0) {
            setData({
                ...data,
                username: val,
                isValidName: false
            });
        }
        else {
            setData({
                ...data,
                username: val,
                isValidName: true
            });
        }


    }
    const PhoneTextChange = (val) => {
        if (val.length == 0) {
            setData({
                ...data,
                uphone: val,
                isValidPhone: false
            });
        }
        else {
            setData({
                ...data,
                uphone: val,
                isValidPhone: true
            });
        }


    }
    const EmailTextChange = (val) => {
        if (val.length == 0) {
            setData({
                ...data,
                uemail: val,
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
                    uemail: val,
                    isValidtionEmail: false,
                    isValidEmail: true
                });

            }
            else {
                console.log("Email is Correct");
                setData({
                    ...data,
                    uemail: val,
                    isValidtionEmail: true,
                    isValidEmail: true
                });
            }
        }


    }
    const PassTextChange = (val) => {
        if (val.length == 0) {
            setData({
                ...data,
                upass: val,
                isValidPass: false
            });
        }
        else {
            setData({
                ...data,
                upass: val,
                isValidPass: true
            });
        }


    }
    const CpassTextChange = (val) => {
        if (val.length == 0) {
            setData({
                ...data,
                ucpass: val,
                isValidCpass: false
            });
        }
        else {
            setData({
                ...data,
                ucpass: val,
                isValidCpass: true
            });
        }


    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={styles.container1}>
                    <Image source={app} style={styles.appImage} resizeMode='contain' />
                    <Text style={styles.sawariTextStyle}>GET SAWARI</Text>
                </View>

                <View style={styles.container2}>
                    <Text style={styles.textStyleFieldName}>Name</Text>
                    <TextInput placeholder="Enter Name"
                        style={styles.inputFieldStyle}
                        placeholderTextColor={Constants.Colors.GREY}
                        onChangeText={(val) => NameTextChange(val)} />
                    {data.isValidName ? null : <Text style={{ color: '#FF0000' }}>Name must be required</Text>}
                </View>
                <View style={styles.container2}>
                    <Text style={styles.textStyleFieldName}>E-mail</Text>
                    <TextInput placeholder="Enter E-mail"
                        style={styles.inputFieldStyle}
                        placeholderTextColor={Constants.Colors.GREY}
                        onChangeText={(val) => EmailTextChange(val)} />
                    {data.isValidEmail ? null : <Text style={{ color: '#FF0000' }}>Email must be required</Text>}
                    {data.isValidtionEmail ? null : <Text style={{ color: '#FF0000' }}>Email not Valid</Text>}
                </View>
                <View style={styles.container2}>
                    <Text style={styles.textStyleFieldName}>Number</Text>
                    <TextInput placeholder="Enter Number"
                        style={styles.inputFieldStyle}
                        keyboardType="numeric"
                        placeholderTextColor={Constants.Colors.GREY}
                        onChangeText={(val) => PhoneTextChange(val)} />
                    {data.isValidPhone ? null : <Text style={{ color: '#FF0000' }}>Phone must be required</Text>}
                </View>
                <View style={styles.container2}>
                    <Text style={styles.textStyleFieldName}>Password</Text>
                    <TextInput placeholder="Enter Password"
                        style={styles.inputFieldStyle}
                        placeholderTextColor={Constants.Colors.GREY}
                        secureTextEntry={true}
                        onChangeText={(val) => PassTextChange(val)} />
                    {data.isValidPass ? null : <Text style={{ color: '#FF0000' }}>Password must be required</Text>}
                </View>
                <View style={styles.container2}>
                    <Text style={styles.textStyleFieldName}>Confirm Password</Text>
                    <TextInput placeholder="Enter Confirm Password"
                        style={styles.inputFieldStyle}
                        secureTextEntry={true}
                        placeholderTextColor={Constants.Colors.GREY}
                        onChangeText={(val) => CpassTextChange(val)} />
                    {data.isValidCpass ? null : <Text style={{ color: '#FF0000' }}>Pass must be required</Text>}
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
                <View style={styles.container3}>
                    <SimpleCard style={styles.signUpButtonStyle} title={"Sign Up"} customClick={registerUser} gone={isDisable} />
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
        elevation: 5,
        backgroundColor: Constants.Colors.WHITE,
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowRadius: 5,
        shadowOffset: { width: 1, height: 1 },
        color: Constants.Colors.BLACK,
        borderColor: '#FFFFFF',
    },
    invalidinput: {
        borderColor: '#FF0000',
        marginTop: 10,
        borderRadius: 5,
        padding: 10,
        borderWidth: 1,


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
