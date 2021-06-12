import React, { useMemo, useState } from 'react';
import { View, Image, Text, SafeAreaView, ScrollView, FlatList, ActivityIndicator, StyleSheet, TextInput } from 'react-native';

import Constants from '../utils/constants'
import Picker from '../components/picker.component';
import SimpleCard from '../components/cards/simple.card.component';
import APIUtils from '../utils/api.utils';
import Mytextinput from '../components/textinput.component';
import { useEffect } from 'react';
import UserCache from '../utils/cache.utils';
import TurroAPIUtils from '../models/turro.api.model';

var images = [];
export default function AdvanceFilterScreen({ props, navigation }) {
    const [userProfile, setUserProfile] = useState({});

    const [sawariMakes, setSawariMakes] = useState([]);
    const [sawariModels, setSawariModels] = useState([]);
    const [modelYears, setModelYears] = useState([]);
    const [carTypes, setCarTypes] = useState([]);

    const [apiLoader, setApiLoader] = useState(true);
    const [modelLoader, setModelLoader] = useState(true);

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

    const [isLoading, seIsLoading] = useState(false);
    const [isDisable, setDisable] = React.useState(false);
    const [data, setData] = React.useState({
        make: null,
        model: null,
        model_year: null,
        variant: null,
        assembly: null,
        engine_capacity: null,
        sitting_capacity: null,
        color: null,
        engine_type: null,
        registration_city: null,
        pickup_city: null,
        car_mileage: null,
        min_car_rent: null,
        max_car_rent: null,
        driver_availability: null,
        btw_city: null,
        car_tranmission: null,
        car_type: null,
    });

    const filterSawariList = async () => {
        seIsLoading(true)
        setDisable(true)
        const formData = new FormData();
        if (data.make)
            formData.append('fk_make_id', data.make);
        if (data.model)
            formData.append('fk_model_id', data.model);
        if (data.model_year)
            formData.append('model_year', data.model_year);
        if (data.variant)
            formData.append('variant', data.variant);
        if (data.assembly)
            formData.append('assembly', data.assembly);
        if (data.engine_capacity)
            formData.append('engine_capacity', data.engine_capacity);
        if (data.sitting_capacity)
            formData.append('sitting_capacity', data.sitting_capacity);
        if (data.color)
            formData.append('color', data.color);
        if (data.engine_type)
            formData.append('engine_type', data.engine_type);
        if (data.registration_city)
            formData.append('registration_city', data.registration_city);
        if (data.pickup_city)
            formData.append('pickup_city', data.pickup_city);
        if (data.car_mileage)
            formData.append('car_mileage', data.car_mileage);
        if (data.min_car_rent)
            formData.append('min_car_rent', data.min_car_rent);
        if (data.max_car_rent)
            formData.append('max_car_rent', data.max_car_rent);
        if (data.driver_availability)
            formData.append('driver_availability', data.driver_availability);
        if (data.car_tranmission)
            formData.append('car_tranmission', data.car_tranmission);
        if (data.car_type)
            formData.append('car_type', data.car_type);
        if (data.btw_city)
            formData.append('btw_city', data.btw_city);
        console.log('Car Data = ' + JSON.stringify(formData))

        const url = Constants.BASE_URL + 'api/filter_car';
        APIUtils.postApi('post', url, formData).then(result => {
            console.log("Filter Cars API result: " + result)
            navigation.navigate(Constants.NavigationItems.FilteredItemScreen, { sawariList: result })
        }).catch(error => {
            alert("No item found!")
        }).finally(() => {
            setLoading(false)
            setDisable(false)
        })
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
                                        <Text style={style.textStyleTitle}>Min Sawari (Rs)</Text>
                                        <TextInput keyboardType="numeric" placeholder="Min Sawari Rent(Rs)" onChangeText={(value) => setData({ ...data, min_car_rent: value })} />
                                    </View>
                                    <View style={style.innerTextView}>
                                        <Text style={style.textStyleTitle}>Max Sawari Rent (Rs)</Text>
                                        <TextInput keyboardType="numeric" placeholder="Max Sawari Rent(Rs)" onChangeText={(value) => setData({ ...data, max_car_rent: value })} />
                                    </View>
                                </View>
                                <View style={style.outerTextViewNoBg}>
                                    <View style={style.innerTextView}>
                                        <Text style={style.textStyleTitle}>Car Mileage</Text>
                                        <TextInput keyboardType="numeric" placeholder="Car mileage in km's" onChangeText={(value) => setData({ ...data, car_mileage: value })} />
                                    </View>
                                </View> 
                            </View>
                        </>)}
                </ScrollView>
                <View style={{ marginTop: 30 }}>
                    {
                        isLoading ? (
                            <ActivityIndicator size='large' color={Constants.Colors.PRIMARY} />
                        )
                            :
                            null
                    }
                </View>
            </SafeAreaView>
            <SimpleCard style={{ alignSelf: 'center', width: '40%', marginBottom: 20 }} title="Submit" customClick={filterSawariList} gone={isDisable} />
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