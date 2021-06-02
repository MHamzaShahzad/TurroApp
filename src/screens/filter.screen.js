import React from 'react';
import { SafeAreaView, View, StyleSheet, Text } from 'react-native';
import Constants from '../utils/constants';
import SearchPicker from '../components/picker.component';
import SearchButton from '../components/cards/simple.card.component';
import SimpleCard from '../components/cards/simple.card.component';

export default function FilterSawari({ props, navigation }) {
    let services = ['Choose Option', 'one', 'two', 'three', 'four', 'five']

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={style.container}>
                <Text style={style.textStyleHeading}>Car Make</Text>
                <SearchPicker data={services} title={"Please select your car make"}></SearchPicker>
                <Text style={style.textStyleHeading}>Car Model</Text>
                <SearchPicker data={services} title={"Please select your car model"}></SearchPicker>
                <Text style={style.textStyleHeading}>City</Text>
                <SearchPicker data={services} title={"Please select your city"}></SearchPicker>
                <Text style={style.textStyleHeading}>Rent</Text>
                <SearchPicker data={services} title={"Select your rent rate in Rupees"}></SearchPicker>
                <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 16 }}>
                    <SimpleCard style={{ width: 120, height: 50 }} title={"Search"}></SimpleCard>
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 8 }}>
                    <SimpleCard style={{ width: 180, height: 50, flexDirection: "row", backgroundColor: Constants.Colors.WHITE, text: { color: Constants.Colors.PRIMARY } }}
                        title={"Advanced Search"} image={"plus"} size={24} icon_color={Constants.Colors.PRIMARY}></SimpleCard>
                </View>
            </View>
        </SafeAreaView>
    );
}
const style = StyleSheet.create({
    container: {
        flex: 1,
        paddingStart: 16, paddingEnd: 16,
        backgroundColor: Constants.Colors.WHITE
    },
    textStyleHeading: {
        fontFamily: Constants.Fonts.FAMILY,
        fontSize: 18,
        marginTop: 16, color: Constants.Colors.PRIMARY, fontWeight: 'normal'
    }
});