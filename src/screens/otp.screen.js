import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';

import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell, } from 'react-native-confirmation-code-field';

import app from '../assets/app_icon.png';
import Constants from '../utils/constants';
import SimpleCard from '../components/cards/simple.card.component';

export default function OTPScreen({ navigation }) {
    const CELL_COUNT = 6;

    const [value, setValue] = useState('');
    const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({ value, setValue, });

    return (
        <View style={styles.container}>
            <View style={styles.container1}>
                <Image source={app} style={styles.appImage} resizeMode='contain'/>
                <Text style={styles.sawariTextStyle}>GET SAWARI</Text>
            </View>
            <ScrollView>
                <View style={styles.container2}>
                    <Text style={styles.numberVerificationTextStyle}>Number Verification</Text>
                    <Text style={styles.otpTextStyle}>Enter Your OTP</Text>
                    <Text style={styles.enterCodeTextStyle}>Enter 6 Digit Code sent Via SMS</Text>
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
                <View style={styles.container3}>
                    <View style={styles.didNotReceiveCodeViewStyle}>
                        <Text style={styles.didNotReceiveCodeTextStyle}>Didn't receive the Code? </Text>
                        <Text style={styles.sendCodeAgainTextStyle}>Send Again</Text>
                    </View>
                    <SimpleCard style={styles.verifyAndSignInButtonStyle} title={"Verify"} />
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
        alignItems: "center",
        marginTop: 10
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

    otpTextStyle: {
        marginTop: 15,
        fontSize: 18,
        fontWeight: 'bold',
        color: Constants.Colors.PRIMARY,
    },

    enterCodeTextStyle: {
        marginTop: 15,
        fontSize: 18,
    },

    numberVerificationTextStyle: {
        fontSize: 18,
        fontWeight: 'bold',
    },

    verifyAndSignInButtonStyle: {
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
    },

    didNotReceiveCodeViewStyle: {
        flexDirection: "row",
        marginTop: 30
    },

    didNotReceiveCodeTextStyle: {
        fontSize: 18
    },

    sendCodeAgainTextStyle: {
        fontSize: 18,
        color: Constants.Colors.PRIMARY
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
