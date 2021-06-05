import React, { useState } from 'react';
import { View, Image, Text, SafeAreaView, ScrollView, FlatList, TouchableOpacity, StyleSheet, TextInput } from 'react-native';

import Constants from '../utils/constants'
import Picker from '../components/picker.component';
import SimpleCard from '../components/cards/simple.card.component';
import ImagePicker from 'react-native-image-crop-picker';
var images = [];
export default function AddSawari({ props, navigation }) {
    const [simages, setsImages] = useState([]);
    let services = [
        { label: 'Football', value: 'football' },
        { label: 'Baseball', value: 'baseball' },
        { label: 'Hockey', value: 'hockey' },
    ]
    const placeholder = {
        label: 'Please select your car make',
        value: null,
    };
    const pickImages = (msg) => {
        console.log(msg)
        ImagePicker.openPicker({
            multiple: true,// To support multiple image selection
            quality: 1.0,
            maxWidth: 500,
            maxHeight: 500,
        }).then(image => {
            images = [];
            console.log(image)
            if (image.length < 6) {
                for (i = 0; i < image.length; i++) {
                    images.push(image[i].path)//image[i].data=>base64 string
                }
                console.log("Images array length = " + images.length)
                console.log("Images array with path " + JSON.stringify(images))
                setsImages(images)
            }
            else {
                alert("Only 5 images allow")
            }

        });
    }

    return (
        <>
            <SafeAreaView style={{ flex: 1 }}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    {simages.length == 0 ?
                        <View >
                            <View style={style.imgstyleview}>
                                <Text style={style.usephoto}>Upload Photo</Text>
                                <SimpleCard style={{width: 180, alignSelf: 'center', margin: 20}} title="Choose From Library" customClick={() => pickImages("pick image")}/>
                            </View>
                        </View>
                        :
                        <View style={{ flex: 1 }}>
                            <FlatList
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                                keyExtractor={(item, index) => index.toString()}
                                style={{ marginTop: 10, marginBottom: 10 }}
                                data={simages}
                                renderItem={({ item }) =>
                                    <View style={style.GridViewBlockStyle}>
                                        <Image source={{ uri: item }} style={{ width: "100%", height: 150, borderRadius: 10, }} resizeMode={'cover'}></Image>
                                    </View>
                                }
                            ></FlatList>
                        </View>
                    }
                    <View style={style.outerTextViewNoBg}>
                        <View style={style.innerTextView}>
                            <Text style={style.textStyleTitle}>Car Make</Text>
                            <Picker data={services} title={placeholder} />
                        </View>
                        <View style={style.innerTextView}>
                            <Text style={style.textStyleTitle}>Car Model</Text>
                            <Picker data={services} title={placeholder} />
                        </View>
                    </View>
                    <View style={style.outerTextView}>
                        <View style={style.innerTextView}>
                            <Text style={style.textStyleTitle}>Car Year</Text>
                            <Picker data={services} title={placeholder} />
                        </View>
                        <View style={style.innerTextView}>
                            <Text style={style.textStyleTitle}>Car Assembly</Text>
                            <Picker data={services} title={placeholder} />
                        </View>
                    </View>
                    <View style={style.outerTextViewNoBg}>
                        <View style={style.innerTextView}>
                            <Text style={style.textStyleTitle}>Card Varient</Text>
                            <Picker data={services} title={placeholder} />
                        </View>
                        <View style={style.innerTextView}>
                            <Text style={style.textStyleTitle}>Car Transmission</Text>
                            <Picker data={services} title={placeholder} />
                        </View>
                    </View>
                    <View style={style.outerTextView}>
                        <View style={style.innerTextView}>
                            <Text style={style.textStyleTitle}>Car Type</Text>
                            <Picker data={services} title={placeholder} />
                        </View>
                        <View style={style.innerTextView}>
                            <Text style={style.textStyleTitle}>Engine Type</Text>
                            <Picker data={services} title={placeholder} />
                        </View>
                    </View>
                    <View style={style.outerTextViewNoBg}>
                        <View style={style.innerTextView}>
                            <Text style={style.textStyleTitle}>Engine Capacity</Text>
                            <Picker data={services} title={placeholder} />
                        </View>
                        <View style={style.innerTextView}>
                            <Text style={style.textStyleTitle}>Seating Capacity</Text>
                            <Picker data={services} title={placeholder} />
                        </View>
                    </View>
                    <View style={style.outerTextView}>
                        <View style={style.innerTextView}>
                            <Text style={style.textStyleTitle}>Body Color</Text>
                            <Picker data={services} title={placeholder} />
                        </View>
                        <View style={style.innerTextView}>
                            <Text style={style.textStyleTitle}>Registration City</Text>
                            <Picker data={services} title={placeholder} />
                        </View>
                    </View>
                    <View style={style.outerTextViewNoBg}>
                        <View style={style.innerTextView}>
                            <Text style={style.textStyleTitle}>Pickup City</Text>
                            <Picker data={services} title={placeholder} />
                        </View>
                        <View style={style.innerTextView}>
                            <Text style={style.textStyleTitle}>Driver Availability</Text>
                            <Picker data={services} title={placeholder} />
                        </View>
                    </View>
                    <View style={style.outerTextView}>
                        <View style={style.innerTextView}>
                            <Text style={style.textStyleTitle}>Car Mileage</Text>
                            <TextInput placeholder="Car mileage in km's"></TextInput>
                        </View>
                        <View style={style.innerTextView}>
                            <Text style={style.textStyleTitle}>Car Rent (Rs)</Text>
                            <TextInput placeholder="Car Rent(Rs)"></TextInput>
                        </View>
                    </View>
                    <View>
                        <Text style={{
                            fontFamily: Constants.Fonts.FAMILY,
                            fontSize: 17, marginStart: 20, marginTop: 10
                        }}>Description (Optional)</Text>
                        <TextInput style={style.addDescription} multiline placeholder="Enter Here" color={Constants.Colors.BLACK}
                            placeholderTextColor={Constants.Colors.GREY} />
                    </View>
                </ScrollView>
            </SafeAreaView>
            <SimpleCard style={{ alignSelf: 'center', width: '40%', marginBottom: 20 }} title="Submit" />
        </>
    );
}

const style = StyleSheet.create({
    textStyleHeading: {
        textAlign: 'center',
        fontFamily: Constants.Fonts.FAMILY,
        fontSize: 20
    },
    GridViewBlockStyle: {
        width: 150,
        margin: 5,
        backgroundColor: Constants.Colors.WHITE,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.3,
        elevation: 6,
        shadowRadius: 5,
        shadowOffset: { width: 1, height: 5 },
    },
    textStyleTitle: {

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
    usephoto: {
        textAlign: 'center',
        fontSize: 24,
        paddingTop: 50,
        fontWeight: 'bold'
    },
    imgstyleview: {
        flex: 1,
        height: 200,
        borderRadius: 8,
        borderWidth: 1,
        borderStyle: "dashed",
        borderRadius: 10,
        margin: 16,
        borderColor: Constants.Colors.PRIMARY,
    }
    ,
    libraryphoto: {
        width: 180,
        height: 40,
        textAlign: 'center',
        alignSelf: 'center',
        fontSize: 16,
        marginTop: 24,
        backgroundColor: Constants.Colors.PRIMARY,
        color: "white",
        paddingTop: 7,
        borderRadius: 60,

    },
});