import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import Constants from '../../utils/constants'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const SimpleCard = (props) => {
    return (
        <TouchableOpacity style={[styles.button, props.style]} onPress={props.customClick}>
            {props.image ? <MaterialCommunityIcons name={props.image} size={props.size} color={props.icon_color} /> : <></>}
            <Text style={[styles.text, props.style.text]}>{props.title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Constants.Colors.PRIMARY,
        color: Constants.Colors.WHITE,
        padding: 10,
        borderRadius: 5,
        margin: 5,
        height: 45,
        shadowColor: '#000',
        shadowOpacity: 0.3,
        elevation: 6,
        shadowRadius: 5,
        shadowOffset: { width: 1, height: 5 },
    },
    text: {
        color: Constants.Colors.WHITE,
        fontFamily: Constants.Fonts.FAMILY,
        fontSize: 16
    },
});

export default SimpleCard;