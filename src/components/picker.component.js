import React, { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet, View, Image } from 'react-native';
import Constants from '../utils/constants'
import RNPickerSelect from 'react-native-picker-select';

const DropDownPicker = (props) => {
    const [listData, setListData] = React.useState(props.data)
    const [selectedValue, setSValue] = React.useState('')

    const noop = (value) => {
        console.log(value)
        setSValue(value)
        props.onValueChange(value)
    };

    return (
        <View style={styles.layout} >
            <RNPickerSelect
                style={{ inputAndroid: { color: 'black' } }}
                placeholder={props.title}
                onValueChange={noop}
                value={selectedValue}
                items={listData}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    layout: {
        padding: 10,
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

export default DropDownPicker;