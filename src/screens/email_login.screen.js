import React from 'react';
import { StyleSheet, Text, View, Image, TextInput, ScrollView, ActivityIndicator } from 'react-native';
import app from '../assets/app_icon.png';
import Constants from '../utils/constants';
import SimpleCard from '../components/cards/simple.card.component';
import AsyncStorage from '@react-native-async-storage/async-storage';
import loginApiCall from '../utils/api.utils';
import { StackActions } from '@react-navigation/native';
var u_json_data;
export default function EmailLoginScreen({ navigation }) {
    const [isLoading, setLoading] = React.useState(false)
    const [data, setData] = React.useState({
        uemail: '',
        upass: '',
        isValidEmail: true,
        isValidPass: true,
    });
    const [isDisable, setDisable] = React.useState(false);
    const LoginUser = async () => {

        if (data.uemail.length == 0) {
            setData({
                ...data,
                isValidEmail: false
            });
        }
        else if (data.upass.length == 0) {
            setData({
                ...data,
                isValidPass: false
            });
        }
        else {
            setData({
                ...data,
                isLoading: true,
            });
            setDisable(true)
            setLoading(true)
            console.log("All data valid")
            const url = Constants.BASE_URL + 'api/user/login?email=' +
                data.uemail + '&password=' + data.upass;
            console.log("URL = " + url)
            const result = await loginApiCall.getApi(url)
            console.log("Login data  = " + JSON.stringify(result))
            removeLoader()
            if (result === '' || undefined) {
                alert("Sorry not login try again!")
            }
            else if (result === 0) {
                alert("User not exist with this email account")
            }
            else if (result === 1) {
                alert("Incorrect password")
            }
            else {
                u_json_data = JSON.stringify(result);
                console.log("Response Data into object Form" + u_json_data);
                try {
                    console.log("save user data called...")
                    AsyncStorage.setItem(Constants.USER_DATA, u_json_data)
                } catch (e) {
                    console.log("Error = " + e)
                    // saving error
                }
                navigation.dispatch(StackActions.popToTop());
                navigation.replace(Constants.NavigationItems.SawariHomeScreen)
            }
        }
    }
    const removeLoader = () => {
        console.log("removeLoader called...")
        setLoading(false)
        setDisable(false)
    }
    const EmailTextChange = (val) => {
        if (val.length == 0) {
            setData({
                ...data,
                uemail: val,
                isValidEmail: false
            });
        }
        else {
            setData({
                ...data,
                uemail: val,
                isValidEmail: true
            });
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
    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.container1}>
                    <Image source={app} style={styles.appImage} resizeMode='contain' />
                    <Text style={styles.sawariTextStyle}>GET SAWARI</Text>
                </View>

                <View style={styles.container2}>
                    <Text style={styles.textStyleFieldName}>E-mail</Text>
                    <TextInput placeholder="Enter E-mail" style={styles.inputFieldStyle}
                        color={Constants.Colors.BLACK}
                        placeholderTextColor={Constants.Colors.GREY}
                        onChangeText={(val) => EmailTextChange(val)} />
                    {data.isValidEmail ? null : <Text style={{ color: '#FF0000' }}>Email must be required</Text>}
                </View>
                <View style={styles.container3}>
                    <Text style={styles.textStyleFieldName}>Password</Text>
                    <TextInput placeholder="Password"
                        style={styles.inputFieldStyle}
                        secureTextEntry={true}
                        color={Constants.Colors.BLACK}
                        placeholderTextColor={Constants.Colors.GREY}
                        onChangeText={(val) => PassTextChange(val)} />
                    {data.isValidPass ? null : <Text style={{ color: '#FF0000' }}>Password must be required</Text>}
                </View>
                <Text style={{ margin: 20, fontSize: 18 }}>Forget Password?</Text>
                <View style={{ marginTop: 24 }}>
                    {
                        isLoading ? (
                            <ActivityIndicator size='large' color={Constants.Colors.PRIMARY}></ActivityIndicator>
                        )
                            :
                            null
                    }

                </View>
                <View style={styles.container4}>
                    <SimpleCard style={styles.signInButtonStyle} title={"Sign In"} customClick={LoginUser} gone={isDisable} />
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
        fontSize: 16,
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
