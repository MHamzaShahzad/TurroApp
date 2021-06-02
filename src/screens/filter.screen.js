import React from 'react';
import { SafeAreaView, View, StyleSheet, Text } from 'react-native';
import Constants from '../utils/constants';
import SearchPicker from '../components/picker.component';
import SimpleCard from '../components/cards/simple.card.component';

export default function FilterSawari({ props, navigation }) {
    let services = [
        { label: 'Football', value: 'football' },
        { label: 'Baseball', value: 'baseball' },
        { label: 'Hockey', value: 'hockey' },
    ]
    const placeholder1 = {
        label: 'Please select your car make',
        value: null,
    };
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Constants.Colors.WHITE }}>
            <View style={style.container}>
                <Text style={style.textStyleHeading}>Car Make</Text>
                <SearchPicker data={services} title={placeholder1}></SearchPicker>
                <Text style={style.textStyleHeading}>Car Model</Text>
                <SearchPicker data={services} title={placeholder1}></SearchPicker>
                <Text style={style.textStyleHeading}>City</Text>
                <SearchPicker data={services} title={placeholder1}></SearchPicker>
                <Text style={style.textStyleHeading}>Rent</Text>
                <SearchPicker data={services} title={placeholder1}></SearchPicker>
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
        borderRadius: 10, elevation: 3,
        margin: 16,
        padding: 16,
        shadowColor: '#000',
        shadowOpacity: 0.3,
        elevation: 6,
        shadowRadius: 5,
        shadowOffset: { width: 1, height: 5 },
        backgroundColor: Constants.Colors.WHITE
    },
    textStyleHeading: {
        fontFamily: Constants.Fonts.FAMILY,
        fontSize: 18,
        marginTop: 16, color: Constants.Colors.PRIMARY, fontWeight: 'normal'
    }
});