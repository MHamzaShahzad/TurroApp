import React, { useMemo, useState } from 'react';
import { View, Image, Text, SafeAreaView, ScrollView, FlatList, ActivityIndicator, StyleSheet, TextInput } from 'react-native';

import Constants from '../utils/constants'
import Picker from '../components/picker.component';
import SimpleCard from '../components/cards/simple.card.component';
import ImagePicker from 'react-native-image-crop-picker';
import APIUtils from '../utils/api.utils';
import Mytextinput from '../components/textinput.component';
import { useEffect } from 'react';
import UserCache from '../utils/cache.utils';
import TurroAPIUtils from '../models/turro.api.model';

var images = [];
export default function AddSawari({ props, navigation }) {
    const [userProfile, setUserProfile] = useState({});
    const [simages, setsImages] = useState([]);
    const [sawariMakes, setSawariMakes] = useState([]);
    const [sawariModels, setSawariModels] = useState([]);
    const [modelYears, setModelYears] = useState([]);
    const [carTypes, setCarTypes] = useState([]);

    const [apiLoader, setApiLoader] = useState(true);
    const [modelLoader, setModelLoader] = useState(true);


    let services = [
        { label: 'Football', value: 'football' },
        { label: 'Baseball', value: 'baseball' },
        { label: 'Hockey', value: 'hockey' },
    ]
    let car_assembly = [
        { label: 'Imported', value: '1' },
        { label: 'Local', value: '2' },
        { label: 'Sports', value: '3' },
        { label: 'Popular', value: '4' },
    ]
    let car_engin_type = [
        { label: 'Petrol', value: '1' },
        { label: 'Diesel', value: '2' },
        { label: 'Hybrid', value: '3' },
    ]
    let car_tranmission_list = [
        { label: 'Manual', value: '1' },
        { label: 'Automatic', value: '2' },
        { label: 'Both', value: '3' },
    ]
    let btw_city_list = [
        { label: 'Yes', value: '0' },
        { label: 'No', value: '1' },
    ]
    let driver_availability_list = [
        { label: 'Only With Driver', value: '1' },
        { label: 'Driver Available On Demand', value: '2' },
        { label: 'Without Driver', value: '3' }
    ]
    useEffect(() => {
        UserCache.UserData(Constants.USER_DATA)
            .then(data => {
                console.log("defaultApp -> data", JSON.stringify(data))
                setUserProfile(data)
            })
            .catch((error) => console.error(error))
        getDropDownData()
    }, [])
    const getDropDownData = () => {
        TurroAPIUtils.getMakes()
            .then(data => {
                console.log("Makes -> data", JSON.stringify(data))
                const makes = data.map((item, index) => {
                    return { label: item.name, value: item.id }
                })
                console.log("Sawari Makes -> data", JSON.stringify(makes))
                setSawariMakes(makes)
            })
            .catch((error) => console.error(error))
        TurroAPIUtils.getCarTypes()
            .then(data => {
                console.log("Car Types -> data", JSON.stringify(data))
                const makes = data.map((item, index) => {
                    return { label: item.name, value: item.name }
                })
                console.log("Sawari Car Types -> data", JSON.stringify(makes))
                setCarTypes(makes)
            })
            .catch((error) => console.error(error))
        TurroAPIUtils.getYears()
            .then(data => {
                console.log("Years -> data", JSON.stringify(data))
                const makes = data.map((item, index) => {
                    return { label: item.toString(), value: item }
                })
                console.log("Sawari Years -> data", JSON.stringify(makes))
                setModelYears(makes)
            })
            .catch((error) => console.error(error))
            .finally(() => setApiLoader(false))
    }
    const getModels = (value) => {
        setModelLoader(true)
        setData({
            ...data,
            make: value
        })
        TurroAPIUtils.getModels(value)
            .then(data => {
                console.log("Models -> data", JSON.stringify(data))
                const models = data.map((item, index) => {
                    return { label: item.model, value: item.id }
                })
                console.log("Sawari Models -> data", JSON.stringify(models))
                setSawariModels(models)
            })
            .catch((error) => console.error(error))
            .finally(() => setModelLoader(false))
    }

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
        }).then(responsImageData => {
            images = [];
            console.log(responsImageData)
            if (responsImageData.length < 6) {
                for (let i = 0; i < responsImageData.length; i++) {
                    images.push(responsImageData[i].path)//responsImageData[i].data=>base64 string
                    setData({
                        ...data, image: data.image.push({
                            uri: responsImageData[i].path,
                            name: responsImageData[i].filename ?? Math.floor(Math.random() * 100000000).toString(),
                            type: responsImageData[i].mime
                        })
                    })
                }
                console.log("Images array length = " + JSON.stringify(data.image))
                console.log("Images array with path " + JSON.stringify(images))
                setsImages(images)
            }
            else {
                alert("Only 5 images allow")
            }
        });
    }

    const [isLoading, seIsLoading] = useState(false);
    const [isDisable, setDisable] = React.useState(false);
    const [data, setData] = React.useState({
        make: '',
        model: '',
        model_year: '',
        variant: '',
        assembly: '',
        engine_capacity: '',
        sitting_capacity: '',
        color: '',
        engine_type: '',
        registration_city: '',
        pickup_city: '',
        car_mileage: '',
        car_rent: '',
        description: '',
        driver_availability: '',
        btw_city: '1',
        car_tranmission: '',
        car_type: '',
        image: []
    });
    //console.log("Add car data = " + JSON.stringify(data))
    const rentMyCar = async () => {
        console.log("fk_user_id = " + userProfile.id)
        if (data.make.length == 0) {
            setData({
                ...data
            });
            alert("Car Make not Empty")
        } else if (data.model.length == 0) {
            setData({
                ...data
            });
            alert("Car model not Empty")
        }
        else if (data.model_year.length == 0) {
            setData({
                ...data
            });
            alert("Car Years not Empty")
        }
        else if (data.variant.length == 0) {
            setData({
                ...data
            });
            alert("Car Make not Empty")
        }
        else if (data.assembly.length == 0) {
            setData({
                ...data
            });
            alert("Car Assembly not Empty")
        }
        else if (data.car_tranmission.length == 0) {
            setData({
                ...data
            });
            alert("Car Transmission not Empty")
        }
        else if (data.car_type.length == 0) {
            setData({
                ...data
            });
            alert("Car Type not Empty")
        }
        else if (data.engine_type.length == 0) {
            setData({
                ...data
            });
            alert("Car Engine Type not Empty")
        }
        else if (data.engine_capacity.length == 0) {
            setData({
                ...data
            });
            alert("Car Engin Capacity not Empty")
        }
        else if (data.sitting_capacity.length == 0) {
            setData({
                ...data
            });
            alert("Car Sitting Capacity not Empty")
        }
        else if (data.color.length == 0) {
            setData({
                ...data
            });
            alert("Car Color not Empty")
        }

        else if (data.registration_city.length == 0) {
            setData({
                ...data
            });
            alert("Car Registration not Empty")
        }
        else if (data.pickup_city.length == 0) {
            setData({
                ...data
            });
            alert("Car PickUp not Empty")
        }
        else if (data.driver_availability.length == 0) {
            setData({
                ...data
            });
            alert("Driver Availability field not Empty")
        }
        else if (data.car_mileage.length == 0) {
            setData({
                ...data
            });
            alert("Car mileage not Empty")
        }
        else if (data.car_rent.length == 0) {
            setData({
                ...data
            });
            alert("Car Rent not Empty")
        }

        /* 
                else if (data.btw_city.length == 0) {
                    setData({
                        ...data
                    });
                    alert("Between City field not Empty")
                } */
        else if (data.image.length == 0) {
            setData({
                ...data
            });
            alert("Image must be required")
        }
        else if (data.description.length == 0) {
            setData({
                ...data
            });
        }
        else {
            seIsLoading(true)
            setDisable(true)
            const formData = new FormData();
            formData.append('fk_user_id', userProfile.id);
            //formData.append('name', data.make);
            formData.append('fk_make_id', data.make);
            formData.append('fk_model_id', data.model);
            formData.append('model_year', data.model_year);
            formData.append('variant', data.variant);
            formData.append('assembly', data.assembly);
            formData.append('engine_capacity', data.engine_capacity);
            formData.append('sitting_capacity', data.sitting_capacity);
            formData.append('color', data.color);
            formData.append('engine_type', data.engine_type);
            formData.append('registration_city', data.registration_city);
            formData.append('pickup_city', data.pickup_city);
            formData.append('car_mileage', data.car_mileage);
            formData.append('car_rent', data.car_rent);
            formData.append('description', data.description);
            formData.append('driver_availability', data.driver_availability);
            formData.append('car_tranmission', data.car_tranmission);
            formData.append('car_type', data.car_type);
            formData.append('btw_city', data.btw_city);
            formData.append('image', data.image);
            console.log('Car Data = ' + JSON.stringify(formData))
            const url = Constants.BASE_URL + 'api/add/car';
            const result = await APIUtils.postApiMultipart('post', url, formData)
            console.log("RentMyCar API result: " + result)
            removeLoader()
            if (result === '' || undefined) {
                alert("Sorry user not register please try again!")
            } else {
                if (result === 1) {
                    alert("Car Added Successfully")
                    navigation.goBack();
                }
            }
        }
    }

    const removeLoader = () => {
        console.log("removeLoader called...")
        seIsLoading(false)
        setDisable(false)
    }

    return (
        <>
            <SafeAreaView style={{ flex: 1 }}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    {simages.length == 0 ?
                        <View >
                            <View style={style.imgstyleview}>
                                <Text style={style.usephoto}>Upload Photo</Text>
                                <SimpleCard style={{ width: 180, alignSelf: 'center', margin: 20 }} title="Choose From Library" customClick={() => pickImages("pick image")} />
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
                            />
                        </View>
                    }
                    {apiLoader ? <ActivityIndicator size='large' color={Constants.Colors.PRIMARY}></ActivityIndicator>
                        : (<>
                            <View>
                                <View style={style.outerTextViewNoBg}>
                                    <View style={style.innerTextView}>
                                        <Text style={style.textStyleTitle}>Car Make</Text>
                                        <Picker data={sawariMakes} title={placeholder} onValueChange={(value) => getModels(value)} />
                                    </View>
                                    <View style={style.innerTextView}>
                                        <Text style={style.textStyleTitle}>Car Model</Text>
                                        {modelLoader ? <Mytextinput editable={false} placeholder="Please..." color={Constants.Colors.LIGHT_GREY}></Mytextinput> :
                                            <Picker data={sawariModels} title={placeholder} onValueChange={(value) => setData({ ...data, model: value })} />

                                        }
                                    </View>
                                </View>
                                <View style={style.outerTextView}>
                                    <View style={style.innerTextView}>
                                        <Text style={style.textStyleTitle}>Car Year</Text>
                                        <Picker data={modelYears} title={placeholder} onValueChange={(value) => setData({ ...data, model_year: value })} />
                                    </View>
                                    <View style={style.innerTextView}>
                                        <Text style={style.textStyleTitle}>Car Assembly</Text>
                                        <Picker data={car_assembly} title={placeholder} onValueChange={(value) => setData({ ...data, assembly: value })} />
                                    </View>
                                </View>
                                <View style={style.outerTextViewNoBg}>
                                    <View style={style.innerTextView}>
                                        <Text style={style.textStyleTitle}>Car Varient</Text>
                                        <Mytextinput
                                            placeholder="Enter Value"
                                            onChangeText={(value) => setData({ ...data, variant: value })}
                                            style={{ padding: 10 }}
                                            color={Constants.Colors.WHITE}
                                        />
                                    </View>
                                    <View style={style.innerTextView}>
                                        <Text style={style.textStyleTitle}>Car Transmission</Text>
                                        <Picker data={car_tranmission_list} title={placeholder} onValueChange={(value) => setData({ ...data, car_tranmission: value })} />
                                    </View>
                                </View>
                                <View style={style.outerTextView}>
                                    <View style={style.innerTextView}>
                                        <Text style={style.textStyleTitle}>Car Type</Text>
                                        <Picker data={carTypes} title={placeholder} onValueChange={(value) => setData({ ...data, car_type: value })} />
                                    </View>
                                    <View style={style.innerTextView}>
                                        <Text style={style.textStyleTitle}>Engine Type</Text>
                                        <Picker data={car_engin_type} title={placeholder} onValueChange={(value) => setData({ ...data, engine_type: value })} />
                                    </View>
                                </View>
                                <View style={style.outerTextViewNoBg}>
                                    <View style={style.innerTextView}>
                                        <Text style={style.textStyleTitle}>Engine Capacity</Text>
                                        <Mytextinput
                                            placeholder="Enter Value"
                                            onChangeText={(value) => setData({ ...data, engine_capacity: value })}
                                            style={{ padding: 10 }}
                                            keyboardType="numeric"
                                            color={Constants.Colors.WHITE}
                                        />
                                    </View>
                                    <View style={style.innerTextView}>
                                        <Text style={style.textStyleTitle}>Seating Capacity</Text>
                                        <Mytextinput
                                            placeholder="Enter Value"
                                            onChangeText={(value) => setData({ ...data, sitting_capacity: value })}
                                            style={{ padding: 10 }}
                                            keyboardType="numeric"
                                            color={Constants.Colors.WHITE}
                                        />
                                    </View>
                                </View>
                                <View style={style.outerTextView}>
                                    <View style={style.innerTextView}>
                                        <Text style={style.textStyleTitle}>Body Color</Text>
                                        <Mytextinput
                                            placeholder="Enter Value"
                                            onChangeText={(value) => setData({ ...data, color: value })}
                                            style={{ padding: 10 }}
                                            color={Constants.Colors.WHITE}
                                        />
                                    </View>
                                    <View style={style.innerTextView}>
                                        <Text style={style.textStyleTitle}>Registration City</Text>
                                        <Mytextinput
                                            placeholder="Enter Value"
                                            onChangeText={(value) => setData({ ...data, registration_city: value })}
                                            style={{ padding: 10 }}
                                            color={Constants.Colors.WHITE}
                                        />
                                    </View>
                                </View>
                                <View style={style.outerTextViewNoBg}>
                                    <View style={style.innerTextView}>
                                        <Text style={style.textStyleTitle}>Pickup City</Text>
                                        <Mytextinput
                                            placeholder="Enter Value"
                                            onChangeText={(value) => setData({ ...data, pickup_city: value })}
                                            style={{ padding: 10 }}
                                            color={Constants.Colors.WHITE}
                                        />
                                    </View>
                                    <View style={style.innerTextView}>
                                        <Text style={style.textStyleTitle}>Driver Availability</Text>
                                        <Picker data={driver_availability_list} title={placeholder} onValueChange={(value) => setData({ ...data, driver_availability: value })} />
                                    </View>
                                </View>
                                <View style={style.outerTextView}>
                                    <View style={style.innerTextView}>
                                        <Text style={style.textStyleTitle}>Car Mileage</Text>
                                        <TextInput keyboardType="numeric" placeholder="Car mileage in km's" onChangeText={(value) => setData({ ...data, car_mileage: value })} />
                                    </View>
                                    <View style={style.innerTextView}>
                                        <Text style={style.textStyleTitle}>Car Rent (Rs)</Text>
                                        <TextInput keyboardType="numeric" placeholder="Car Rent(Rs)" onChangeText={(value) => setData({ ...data, car_rent: value })} />
                                    </View>
                                </View>
                                <View>
                                    <Text style={{
                                        fontFamily: Constants.Fonts.FAMILY,
                                        fontSize: 17, marginStart: 20, marginTop: 10
                                    }}>Description (Optional)</Text>
                                    <TextInput style={style.addDescription} multiline placeholder="Enter Here" color={Constants.Colors.BLACK}
                                        placeholderTextColor={Constants.Colors.GREY} onChangeText={(value) => setData({ ...data, description: value })} />
                                </View>
                            </View>
                        </>)}
                </ScrollView>
                <View style={{ marginTop: 24 }}>
                    {
                        isLoading ? (
                            <ActivityIndicator size='large' color={Constants.Colors.PRIMARY}></ActivityIndicator>
                        )
                            :
                            null
                    }
                </View>

            </SafeAreaView>
            <SimpleCard style={{ alignSelf: 'center', width: '40%', marginBottom: 20 }} title="Submit" customClick={rentMyCar} gone={isDisable} />
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