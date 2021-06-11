import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import Constants from '../utils/constants'
const Mytextinput = (props) => {
    return (
        <View style={{
            paddingStart: 10,
            height: 45,
            marginTop: 16,
            borderRadius: 50,
            shadowRadius: 5,
            borderColor: "#EEEEEE",
            borderWidth: 1,
            backgroundColor: props.color,
            shadowColor: '#000',
            shadowOpacity: 0.1,
            elevation: 1,
            justifyContent: 'center'
        }}>
            <TextInput
                underlineColorAndroid="transparent"
                placeholder={props.placeholder}
                placeholderTextColor={Constants.Colors.GREY}
                keyboardType={props.keyboardType}
                onChangeText={props.onChangeText}
                numberOfLines={props.numberOfLines}
                multiline={props.multiline}
                onSubmitEditing={props.onSubmitEditing}
                style={props.style}
                value={props.value}
                editable={props.editable}
            />
        </View>
    );
};
const styles = StyleSheet.create({
    layout: {
        paddingStart: 10,
        height: 45,
        marginTop: 16,
        borderRadius: 50,
        shadowRadius: 5,
        borderColor: "#EEEEEE",
        borderWidth: 1,
        backgroundColor: Constants.Colors.WHITE,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        elevation: 1,
        justifyContent: 'center'
    }
});

export default Mytextinput;