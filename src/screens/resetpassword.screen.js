import React, { useState } from 'react'
import { StyleSheet, SafeAreaView, View, Image, TextInput, Text, ScrollView, TouchableOpacity, ActivityIndicator, UIManager } from 'react-native'
import Moment from 'moment';

import Constants from '../utils/constants';
import SimpleCard from '../components/cards/simple.card.component';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import UserCache from '../utils/cache.utils'
import APIUtils from '../utils/api.utils';

export default function ResetPasswordScreen({ route, navigation }) {
    const [data, setData] = useState({
        old_pass: '',
        new_pass: '',
        isValid_Old_Pass: true,
        isValid_New_Pass: true
    });
    const [isLoading, setLoading] = React.useState(false)
    const [isDisable, setDisable] = React.useState(false);
    const { u_id } = route.params;
    console.log("user id  =" + u_id)
    const updatePassword = async () => {
        if (data.old_pass.length == 0) {
            setData({
                ...data,
                isValid_Old_Pass: false
            });
        }
        else if (data.new_pass.length == 0) {
            setData({
                ...data,
                isValid_New_Pass: false
            });
        }
        else {
            setDisable(true)
            setLoading(true)
            console.log("Update Success")
            const formData = new FormData();
            formData.append('id', u_id);
            formData.append('old_password', data.old_pass);
            formData.append('new_password', data.new_pass);
            console.log('User Update Password Data = ' + JSON.stringify(formData))
            const url = Constants.BASE_URL + 'api/password_update';
            const result = await APIUtils.postApi('post', url, formData)
            console.log("User Update Password API result: " + result)
            removeLoader()
            if (result === '' || undefined) {
                alert("Sorry can't update try again!")
            } else {
                if (result === 1) {
                    alert("Password Update Success")
                    navigation.goBack()
                } else if (result === 0) {
                    alert("Old password not matched")
                }
            }
        }
    }
    const removeLoader = () => {
        setDisable(false)
        setLoading(false)
    }
    const oldPassCTextChange = (val) => {
        if (val.length == 0) {
            setData({
                ...data,
                old_pass: val,
                isValid_Old_Pass: false
            });
        }
        else {
            setData({
                ...data,
                old_pass: val,
                isValid_Old_Pass: true
            });
        }

    }
    const newPassCTextChange = (val) => {
        if (val.length == 0) {
            setData({
                ...data,
                new_pass: val,
                isValid_New_Pass: false
            });
        }
        else {
            setData({
                ...data,
                new_pass: val,
                isValid_New_Pass: true
            });
        }

    }
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.container}>
                <ScrollView>
                    <View style={styles.container2}>
                        <Text style={styles.textStyleFieldName}>Old Password</Text>
                        <TextInput onChangeText={(val) => oldPassCTextChange(val)} secureTextEntry={true} placeholder="Your Old Password" style={styles.inputFieldStyle} />
                        {data.isValid_Old_Pass ? null : <Text style={{ color: '#FF0000', marginTop: 8 }}>Field not empty</Text>}
                    </View>
                    <View style={styles.container3}>
                        <Text style={styles.textStyleFieldName}>New Password</Text>
                        <TextInput onChangeText={(val) => newPassCTextChange(val)} secureTextEntry={true} placeholder="Your New password" style={styles.inputFieldStyle} />
                        {data.isValid_New_Pass ? null : <Text style={{ color: '#FF0000', marginTop: 8 }}>Field not empty</Text>}
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
                    <SimpleCard style={{ alignSelf: 'center', width: '90%', marginTop: 20 }} title="Update Password" customClick={() => updatePassword()} gone={isDisable} />
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
    }
    ,
    textStyleFieldName: {
        fontSize: 16
    },

    inputFieldStyle: {
        height: 45,
        marginTop: 7,
        fontSize: 16,
        paddingLeft: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#DDDDDD",
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowRadius: 5,
        shadowOffset: { width: 1, height: 1 },
    },


});