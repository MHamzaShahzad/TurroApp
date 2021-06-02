import React, { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet, View, Image } from 'react-native';
import Constants from '../utils/constants'
import { Picker } from '@react-native-picker/picker';
const DropDownPicker = (props) => {
    const [listData, setListData] = React.useState(props.data)
    console.log("list data " + listData)
    console.log("selected value  " + props.title)

    let serviceItems = listData.map((s, i) => {
        return <Picker.Item key={i} value={s} label={s} />
    });

    return (
        <View style={styles.layout} >
            <Picker
                selectedValue={props.title} mode='dropdown'
                useNativeAndroidPickerStyle={false} >
                {serviceItems}
            </Picker>
        </View>
    );
};

const styles = StyleSheet.create({
    layout: {
        marginTop:16,
        borderRadius: 10,
        shadowRadius: 5,borderColor:"#EEEEEE",borderWidth:1,backgroundColor:Constants.Colors.WHITE,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        elevation: 1,
    }
});

export default DropDownPicker;