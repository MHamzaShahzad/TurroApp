import React,{useState} from 'react';
import { StyleSheet, Text, View, Image, StatusBar, TextInput, ScrollView } from 'react-native';

import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell, } from 'react-native-confirmation-code-field';

import app from '../assets/app_icon.png';

export default function OTPScreen({ navigation }) {
    const CELL_COUNT = 6;


    const [value, setValue] = useState('');
    const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({ value, setValue, });

    return (

        <View style={styles.container}>
            <View style={styles.container1}>
                <Image source={app} style={styles.appimg} />
                <Text style={styles.garitext}>GET GAARI</Text>
            </View>
            <ScrollView>
                <View style={styles.container2}>
                    <Text style={styles.fontextverification}>Number Verification</Text>
                    <Text style={styles.otptext}>Enter Your OTP</Text>
                    <Text style={styles.codesms}>Enter 6 Digit Code sent Via SMS</Text>
                    <View style={styles.root}>
                        <CodeField
                            ref={ref} {...props}
                            // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
                            value={value}
                            onChangeText={setValue}
                            cellCount={CELL_COUNT}
                            rootStyle={styles.codeFieldRoot}
                            keyboardType="number-pad"
                            textContentType="oneTimeCode"
                            renderCell={({ index, symbol, isFocused }) => (
                                <Text
                                    key={index}
                                    style={[styles.cell, isFocused && styles.focusCell]}
                                    onLayout={getCellOnLayoutHandler(index)}>
                                    {symbol || (isFocused ? <Cursor /> : null)}
                                </Text>
                            )}
                        />
                    </View>
                </View>
                <View style={styles.signincontainer}>
                    <View style={styles.alreadyaccountview}>
                        <Text style={styles.alreadyaccount}>Didn't receive the Code? </Text>
                        <Text style={styles.Signinext}>Send Again</Text>
                    </View>
                    <Text style={styles.Signuptext} >Verify</Text>
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
    otptext: {
        marginTop: 15,
        fontSize: 18,
        fontWeight: 'bold',
        color: "#ad001c",
    },
    codesms: {
        marginTop: 15,
        fontSize: 18,
    },
    fontextverification: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    signincontainer: {
        alignItems: "center",
        marginTop: 10
    },
    Signuptext: {
        fontSize: 24,
        marginTop: 50,
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
        marginTop: 30
    },
    alreadyaccount: {
        fontSize: 18
    },
    Signinext: {
        fontSize: 18,
        color: "#ad001c"
    },
    root: {
        flex: 1,
        padding: 20
    },

    codeFieldRoot: {
        marginTop: 20
    },
    cell: {
        width: "15%",
        height: 40,
        lineHeight: 38,
        fontSize: 24,
        borderWidth: 2,
        borderColor: '#00000030',
        textAlign: 'center',
    },
    focusCell: {
        borderColor: '#000',
    },

});
