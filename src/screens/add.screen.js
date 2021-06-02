import React from 'react';
import { View, Image, Text, SafeAreaView, ScrollView, TouchableOpacity, StyleSheet, TextInput } from 'react-native';

import Constants from '../utils/constants'
import Picker from '../components/picker.component';
import SimpleCard from '../components/cards/simple.card.component';
import constants from '../utils/constants';

export default function AddSawari({ props, navigation }) {
    let services = [
        { label: 'Football', value: 'football' },
        { label: 'Baseball', value: 'baseball' },
        { label: 'Hockey', value: 'hockey' },
    ]
    const placeholder = {
        label: 'Please select your car make',
        value: null,
    };

    return (
        <>
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <TouchableOpacity>
                    <Image source={{ uri: 'https://user-images.githubusercontent.com/20684618/31289519-9ebdbe1a-aae6-11e7-8f82-bf794fdd9d1a.png', height: 150, width: '100%' }} />
                </TouchableOpacity>
                <View style={style.outerTextViewNoBg}>
                    <View style={style.innerTextView}>
                        <Text style={style.textStyleTitle}>Hello</Text>
                        <Picker data={services} title={placeholder} />
                    </View>
                    <View style={style.innerTextView}>
                        <Text style={style.textStyleTitle}>World</Text>
                        <Picker data={services} title={placeholder} />
                    </View>
                </View>
                <View style={style.outerTextView}>
                    <View style={style.innerTextView}>
                        <Text style={style.textStyleTitle}>Hello</Text>
                        <Picker data={services} title={placeholder} />
                    </View>
                    <View style={style.innerTextView}>
                        <Text style={style.textStyleTitle}>World</Text>
                        <Picker data={services} title={placeholder} />
                    </View>
                </View>
                <View style={style.outerTextViewNoBg}>
                    <View style={style.innerTextView}>
                        <Text style={style.textStyleTitle}>Hello</Text>
                        <Picker data={services} title={placeholder} />
                    </View>
                    <View style={style.innerTextView}>
                        <Text style={style.textStyleTitle}>World</Text>
                        <Picker data={services} title={placeholder} />
                    </View>
                </View>
                <View style={style.outerTextView}>
                    <View style={style.innerTextView}>
                        <Text style={style.textStyleTitle}>Hello</Text>
                        <Picker data={services} title={placeholder} />
                    </View>
                    <View style={style.innerTextView}>
                        <Text style={style.textStyleTitle}>World</Text>
                        <Picker data={services} title={placeholder} />
                    </View>
                </View>
                <View style={style.outerTextViewNoBg}>
                    <View style={style.innerTextView}>
                        <Text style={style.textStyleTitle}>Hello</Text>
                        <Picker data={services} title={placeholder} />
                    </View>
                    <View style={style.innerTextView}>
                        <Text style={style.textStyleTitle}>World</Text>
                        <Picker data={services} title={placeholder} />
                    </View>
                </View>
                <View>
                    <Text style={style.textStyleTitle}>Description</Text>
                    <TextInput style={style.addDescription} multiline placeholder="Enter Here" color={Constants.Colors.BLACK}
                        placeholderTextColor={Constants.Colors.GREY} />
                </View>
            </ScrollView>
        </SafeAreaView>
        <SimpleCard style={{ alignSelf: 'center', width: '40%', margin: 20 }} title="Submit" />
        </>
    );
}

const style = StyleSheet.create({
    textStyleHeading: {
        textAlign: 'center',
        fontFamily: Constants.Fonts.FAMILY,
        fontSize: 20
    },
    textStyleTitle: {
        textAlign: 'center',
        fontFamily: Constants.Fonts.FAMILY,
        fontSize: 17
    },
    textStyle: {
        textAlign: 'center',
        fontFamily: Constants.Fonts.FAMILY,
    },
    outerTextView: {
        flex: 2, backgroundColor: '#cacaca', flexDirection: 'row', padding: 10, alignItems: 'center', justifyContent: 'space-evenly'
    },
    outerTextViewNoBg: {
        flex: 2, flexDirection: 'row', padding: 10, alignItems: 'center', justifyContent: 'space-evenly'
    },
    innerTextView: {
        flex: 2, flexDirection: 'column', padding: 10
    },
    addDescription: {
        marginLeft: 20,
        marginRight: 20,
        marginTop: 5,
        borderWidth: 1,
        height: 100,
        borderRadius: 7,
        color: Constants.Colors.BLACK,
        textAlignVertical: "top",
        paddingLeft: 7,
        paddingTop: 7,
        paddingRight: 7,
        paddingBottom: 7,
        borderColor: Constants.Colors.GREY,
    },
});