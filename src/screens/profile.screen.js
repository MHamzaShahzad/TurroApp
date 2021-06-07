import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TextInput, ScrollView, Alert, TouchableOpacity, ActivityIndicator } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontistoIcons from 'react-native-vector-icons/Fontisto';
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome';
import AntDesignIcons from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackActions } from '@react-navigation/native';
import Constants from '../utils/constants';
import SimpleCard from '../components/cards/simple.card.component';
import UserCache from '../utils/cache.utils';
import { Button } from 'react-native-paper';
import APIUtils from '../utils/api.utils';

export default function Profile({ props, navigation }) {
    const [userProfile, setUserProfile] = useState({});
    const [isLoading, setLoading] = React.useState(false)
    const [isDisable, setDisable] = React.useState(false);
    const [validation, setValidation] = React.useState({
        isValidName: true,
        isValidPhone: true,
        isValidEmail: true,
        isValidtionEmail: true,
        isValidPass: true,
        isValidCpass: true,
    });
    useEffect(() => {
        UserCache.UserData(Constants.USER_DATA)
            .then(data => {
                console.log("defaultApp -> data", JSON.stringify(data))
                setUserProfile(data)
            })
            .catch((error) => console.error(error))
    }, []);

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <MaterialCommunityIcons name="logout" style={{ marginRight: 10 }} size={26} color={Constants.Colors.WHITE} onPress={logout} />
            ),
        });
    }, [navigation]);
    const updateProfile = async () => {
        if (userProfile.name.length == 0) {
            setValidation({
                ...validation,
                isValidName: false
            });
        }
        else if (userProfile.email == 0) {
            setValidation({
                ...validation,
                isValidEmail: false
            });
        }
        else if (userProfile.contact == 0) {
            setValidation({
                ...validation,
                isValidPhone: false
            });
        }
        else {
            setDisable(true)
            setLoading(true)
            console.log("" + JSON.stringify(userProfile))
            const formData = new FormData();
            formData.append('id', userProfile.id);
            formData.append('name', userProfile.name);
            formData.append('email', userProfile.email);
            formData.append('contact', userProfile.contact);
            formData.append('city_name', userProfile.city_name);
            formData.append('cnic', userProfile.cnic);
            formData.append('address', userProfile.address);
            console.log('User Update Data = ' + JSON.stringify(formData))
            const url = Constants.BASE_URL + 'api/update_user';
            const result = await APIUtils.postApi('post', url, formData)
            console.log("User Update API result: " + result)
            removeLoader()
            if (result === '' || undefined) {
                alert("Sorry can't update try again!")
            } else {
                if (result === 1) {
                    alert("User Data Update")
                    try {
                        console.log("save user data called...")
                        AsyncStorage.setItem(Constants.USER_DATA, JSON.stringify(userProfile))
                    } catch (e) {
                        console.log("Error = " + e)
                        // saving error
                    }
                    navigation.dispatch(StackActions.popToTop());
                    navigation.replace(Constants.NavigationItems.SawariHomeScreen)
                } else if (result === 0) {
                    alert("User Data not update try again!")
                    navigation.goBack();
                }
            }
        }
    }
    const removeLoader = () => {
        setDisable(false)
        setLoading(false)
    }
    const NameTextChange = (val) => {
        if (val.length == 0) {
            setUserProfile({
                ...userProfile,
                name: val
            });
            setValidation({
                ...validation,
                isValidName: false
            });
        }
        else {
            setUserProfile({
                ...userProfile,
                name: val
            });
            setValidation({
                ...validation,
                isValidName: true
            });
        }


    }
    const PhoneTextChange = (val) => {
        if (val.length == 0) {
            setUserProfile({
                ...userProfile,
                contact: val
            });
            setValidation({
                ...validation,
                isValidPhone: false
            });
        }
        else {
            setUserProfile({
                ...userProfile,
                contact: val
            });
            setValidation({
                ...validation,
                isValidPhone: true
            });
        }


    }
    const EmailTextChange = (val) => {
        if (val.length == 0) {
            setUserProfile({
                ...userProfile,
                email: val,

            });
            setValidation({
                ...validation,

                isValidEmail: false,
                isValidtionEmail: true,
            });
        }
        else {

            console.log(val);
            let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            if (reg.test(val) === false) {
                console.log("Email is Not Correct");
                setUserProfile({
                    ...userProfile,
                    email: val,

                });
                setValidation({
                    ...validation,
                    isValidtionEmail: false,
                    isValidEmail: true
                });

            }
            else {
                console.log("Email is Correct");
                setUserProfile({
                    ...userProfile,
                    email: val,
                    isValidtionEmail: true,
                    isValidEmail: true
                });
                setValidation({
                    ...validation,
                    isValidtionEmail: true,
                    isValidEmail: true
                });
            }
        }
    }
    const CnicTextChange = (val) => {
        if (val.length == 0) {
            setUserProfile({
                ...userProfile,
                cnic: val,

            });
        }
        else {
            setUserProfile({
                ...userProfile,
                cnic: val,

            });
        }


    }
    const CityTextChange = (val) => {
        if (val.length == 0) {
            setUserProfile({
                ...userProfile,
                city_name: val,
            });
        }
        else {
            setUserProfile({
                ...userProfile,
                city_name: val,

            });
        }
    }
    const AddressTextChange = (val) => {
        if (val.length == 0) {
            setUserProfile({
                ...userProfile,
                address: val,
            });
        }
        else {
            setUserProfile({
                ...userProfile,
                address: val,

            });
        }
    }
    const logout = () => {
        Alert.alert(
            'Confirm',
            'Do you want to logout of your account ?',
            [
                {
                    text: 'Ok',
                    onPress: async () => {
                        try {
                            await AsyncStorage.removeItem(Constants.USER_DATA)
                            navigation.dispatch(StackActions.popToTop());
                            navigation.replace(Constants.NavigationItems.SawariHomeScreen)
                        } catch (e) {
                            console.log(e);
                        }
                    },
                },
                {
                    text: 'Cancel',
                }
            ],
            { cancelable: false }
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.imageViewContainer}>
                <View style={styles.profileImageView}>
                    <FontAwesomeIcons name={'user'} color={Constants.Colors.PRIMARY} size={36} />
                </View>
            </View>
            <ScrollView style={{ marginTop: 30 }}>
                <View style={styles.inputFiledLayout}>
                    <FontAwesomeIcons name={'user-o'} color={Constants.Colors.PRIMARY} size={22} style={styles.iconStyle} />
                    <View style={{ flexDirection: 'column' }}>
                        <TextInput onChangeText={(val) => NameTextChange(val)} style={styles.inputFieldText} value={userProfile?.name} placeholder=" Enter Name " />
                        {validation.isValidName ? null : <Text style={{ color: '#FF0000', marginStart: 24 }}>You can't empty your name</Text>}
                    </View>
                </View>
                <View style={styles.inputFiledLayout}>
                    <FontistoIcons name={'email'} color={Constants.Colors.PRIMARY} size={22} style={styles.iconStyle} />
                    <View style={{ flexDirection: 'column' }}>
                        <TextInput onChangeText={(val) => EmailTextChange(val)} style={styles.inputFieldText} value={userProfile?.email} placeholder=" Enter E-mail " />
                        {validation.isValidEmail ? null : <Text style={{ color: '#FF0000', marginStart: 24 }}>You can't empty your email</Text>}
                        {validation.isValidtionEmail ? null : <Text style={{ color: '#FF0000' }}>Email not Valid</Text>}
                    </View>
                </View>
                <View style={styles.inputFiledLayout}>
                    <FontAwesomeIcons name={'mobile'} color={Constants.Colors.PRIMARY} size={22} style={styles.iconStyle} />
                    <View style={{ flexDirection: 'column' }}>
                        <TextInput onChangeText={(val) => PhoneTextChange(val)} keyboardType="numeric" style={[styles.inputFieldText]} value={"" + userProfile?.contact} placeholder=" Enter Phone Number " />
                        {validation.isValidPhone ? null : <Text style={{ color: '#FF0000', marginStart: 24 }}>You can't empty your phone</Text>}
                    </View>
                </View>
                <View style={styles.inputFiledLayout}>
                    <AntDesignIcons name={'idcard'} color={Constants.Colors.PRIMARY} size={22} style={styles.iconStyle} />
                    <TextInput keyboardType="numeric"
                        style={styles.inputFieldText}
                        value={"" + userProfile?.cnic}
                        placeholder=" Enter CNIC "
                        onChangeText={(val) => CnicTextChange(val)}
                    />
                </View>
                <View style={styles.inputFiledLayout}>
                    <MaterialCommunityIcons name={'home-city-outline'} color={Constants.Colors.PRIMARY} size={22} style={styles.iconStyle} />
                    <TextInput style={styles.inputFieldText}
                        value={userProfile?.city_name}
                        placeholder=" Enter City Name "
                        onChangeText={(val) => CityTextChange(val)}
                    />
                </View>
                <View style={styles.inputFiledLayout}>
                    <AntDesignIcons name={'home'} color={Constants.Colors.PRIMARY} style={styles.nameimg} size={22} style={styles.iconStyle} />
                    <TextInput onChangeText={(val) => AddressTextChange(val)} style={styles.inputFieldText} value={userProfile?.address} placeholder=" Enter Address " />
                </View>
                <View style={{ width: 200, marginTop: 8 }}>
                    <Button icon="onepassword" uppercase={false} color={Constants.Colors.PRIMARY} mode="text" onPress={() => navigation.navigate("ResetPasswordScreen", { u_id: userProfile.id })}>
                        Reset Password ?
                </Button>
                </View>
                <View style={{ marginTop: 12 }}>
                    {
                        isLoading ? (
                            <ActivityIndicator size='large' color={Constants.Colors.PRIMARY}></ActivityIndicator>
                        )
                            :
                            null
                    }

                </View>
                <SimpleCard style={{ alignSelf: 'center', width: '90%', marginTop: 20 }} title="Update Profile" customClick={() => updateProfile()} gone={isDisable} />
            </ScrollView>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },

    imageViewContainer: {
        backgroundColor: Constants.Colors.PRIMARY,
        height: 90,
        borderBottomRightRadius: 90,
        borderBottomLeftRadius: 90
    },

    profileImageView: {
        width: 70,
        alignSelf: "center",
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 55,
        height: 70,
        borderWidth: 0.3,
        borderRadius: 60,
        backgroundColor: Constants.Colors.WHITE,
    },

    inputFieldText: {
        paddingLeft: 30,
        fontSize: 18,
    },

    inputFiledLayout: {
        borderBottomWidth: 0.5,
        padding: 20,
        flexDirection: "row",
        paddingLeft: 20,
        borderColor: "#808080"
    },

    editprofile: {
        alignSelf: "center",
        alignItems: 'center',
        justifyContent: 'center',
        width: "40%",
        backgroundColor: '#000',
        height: 45,
        textAlign: "center",
        fontSize: 20,
        fontWeight: "bold",
        borderRadius: 10,
        color: "white",
    },
    iconStyle: {
        marginTop: 14
    }
});
