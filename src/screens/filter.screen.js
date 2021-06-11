import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, StyleSheet, Text, ActivityIndicator } from 'react-native';
import Constants from '../utils/constants';
import DropDownPicker from '../components/picker.component';
import SimpleCard from '../components/cards/simple.card.component';
import TurroAPIUtils from '../models/turro.api.model';
import TextInput from '../components/textinput.component';

export default function FilterSawari({ props, navigation }) {

    const [isLoading, setLoading] = useState(true);
    const [sawariMakes, setSawariMakes] = useState([]);
    const [sawariModels, setSawariModels] = useState([]);

    const [data, setData] = React.useState({
        fk_make_id: null,
        fk_model_id: null,
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
        description: null,
        driver_availability: null,
        btw_city: null,
        car_tranmission: null,
        car_type: null,
    });

    ///*** Drop Down Picker Place Holders */
    const placeholder1 = {
        label: 'Please select your car make',
        value: null,
    };
    const placeholder2 = {
        label: 'Please select your car model',
        value: null,
    };
    const placeholder3 = 'Please enter your city'
    const placeholder4 = 'Select your rent range in Rupees'

    const AdvanceFilter = (category) => {
        navigation.navigate(Constants.NavigationItems.AdvanceFilterScreen)
    }

    useEffect(() => {
        setLoading(true)
        getMakes()
    }, []);

    const getMakes = () => {
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
            .finally(() => setLoading(false))
    }

    const getModels = (value) => {
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
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Constants.Colors.WHITE }}>
            <View style={style.container}>
                {isLoading == true ? <ActivityIndicator /> :
                    (<>
                        <Text style={style.textStyleHeading}>Car Make</Text>
                        <DropDownPicker data={sawariMakes} title={placeholder1} onValueChange={(value) => getModels(value)} />
                        <Text style={style.textStyleHeading}>Car Model</Text>
                        <DropDownPicker data={sawariModels} title={placeholder2} onValueChange={(value) => console.log(value)} />
                        <Text style={style.textStyleHeading}>City</Text>
                        <TextInput
                            placeholder={placeholder3}
                            onChangeText={(value) => setData({ ...data, city: value })}
                            style={{ padding: 10 }}
                        />
                        <View style={style.outerTextViewNoBg}>
                            <View style={style.innerTextView}>
                                <Text style={style.textStyleHeading}>Min Rent (Rs)</Text>
                                <TextInput keyboardType="numeric" placeholder="Min Rent (Rs)" onChangeText={(value) => setData({ ...data, min_car_rent: value })} />
                            </View>
                            <View style={style.innerTextView}>
                                <Text style={style.textStyleHeading}>Max Rent (Rs)</Text>
                                <TextInput keyboardType="numeric" placeholder="Max Rent (Rs)" onChangeText={(value) => setData({ ...data, max_car_rent: value })} />
                            </View>
                        </View>
                        <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 16 }}>
                            <SimpleCard style={{ width: 120, height: 50 }} title={"Search"} />
                        </View>
                        <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 8 }}>
                            <SimpleCard style={{ width: 180, height: 50, flexDirection: "row", backgroundColor: Constants.Colors.WHITE, text: { color: Constants.Colors.PRIMARY } }}
                                title={"Advanced Search"} image={"plus"} size={24} icon_color={Constants.Colors.PRIMARY} customClick={() => AdvanceFilter("Advance Filter")} />
                        </View>
                    </>)}
            </View>
        </SafeAreaView>
    );
}
const style = StyleSheet.create({
    container: {
        flex: 1,
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
    },
    outerTextViewNoBg: {
        flex: 2, flexDirection: 'row', justifyContent: 'space-evenly'
    },
    innerTextView: {
        flex: 2, flexDirection: 'column', padding: 10
    },
});