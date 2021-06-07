import React, { useState, useEffect } from 'react';
import {
    ScrollView,
    Text,
    View,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
} from 'react-native';

import Styles from '../styles';
import FlatListSlider from '../components/imageSlider/flatlist.imageslider.component';
import SimpleCard from '../components/cards/simple.card.component';
import styles from '../styles';
import Constants from '../utils/constants';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import APIUtils from '../utils/api.utils';
import { openSMSApp, openCallDialer } from '../utils/common.utils'

export default function DescriptionScreen({ route, navigation }) {
    const { sawari } = route.params
    const [renterProfile, setRenterProfile] = useState({});

    const [data, setData] = useState([
        {
            key: 0,
            image:
                'https://images.unsplash.com/photo-1567226475328-9d6baaf565cf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60',
            desc: 'Silent Waters in the mountains in midst of Himilayas',
        },
        {
            key: 1,
            image:
                'https://images.unsplash.com/photo-1455620611406-966ca6889d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1130&q=80',
            desc:
                'Red fort in India New Delhi is a magnificient masterpeiece of humans',
        },
        {
            key: 2,
            image:
                'https://images.unsplash.com/photo-1477587458883-47145ed94245?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
            desc:
                'Sample Description below the image for representation purpose only',
        },
        {
            key: 3,
            image:
                'https://images.unsplash.com/photo-1568700942090-19dc36fab0c4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
            desc:
                'Sample Description below the image for representation purpose only',
        },
        {
            key: 4,
            image:
                'https://images.unsplash.com/photo-1584271854089-9bb3e5168e32?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1051&q=80',
            desc:
                'Sample Description below the image for representation purpose only',
        },
    ]);

    useEffect(() => {
        APIUtils.getApi(Constants.BASE_URL + 'api/user_list?id=' + sawari.fk_user_id)
            .then(data => {
                console.log("defaultApp -> data", JSON.stringify(data))
                setRenterProfile(data)
            })
            .catch((error) => console.error(error))
    }, []);

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <View style={{ flexDirection: 'row' }}>
                    <MaterialIcons name="add-ic-call" style={{ marginRight: 20 }} size={26} color={Constants.Colors.WHITE} onPress={() => openCallDialer(renterProfile.contact)} />
                    <MaterialIcons name="sms" style={{ marginRight: 16 }} size={26} color={Constants.Colors.WHITE} onPress={() => openSMSApp(renterProfile.contact, `Hi ${renterProfile.name} I want to inquire about your ${sawari.make ?? sawari.name} ${sawari.model} for rent`)} />
                </View>
            ),
        });
    }, [navigation]);

    // const screenWidth = Math.round(Dimensions.get('window').width);
    return (
        <>
            <SafeAreaView style={styles.AppStyles.container}>
                <ScrollView showsVerticalScrollIndicator={false} >
                    <FlatListSlider
                        data={data}
                        timer={5000}
                        onPress={item => alert(JSON.stringify(item))}
                        indicatorContainerStyle={{ position: 'absolute', bottom: 20 }}
                        indicatorActiveColor={Constants.Colors.PRIMARY}
                        indicatorInActiveColor={Constants.Colors.WHITE}
                        indicatorActiveWidth={30}
                        animation
                    />
                    <View style={{ padding: 10 }}>
                        <View style={style.outerTextViewNoBg}>
                            <View style={style.innerTextView}>
                                <Text style={style.textStyleHeading}>{sawari.make ?? sawari.name} {sawari.model}</Text>
                            </View>
                            <View style={style.innerTextView}>
                                <Text style={style.textStyleHeading}>{sawari.car_rent}</Text>
                            </View>
                        </View>
                        <View style={style.outerTextViewNoBg}>
                            <SimpleCard title={sawari.sitting_capacity} image='car-seat' icon_color={Constants.Colors.WHITE} />
                            <SimpleCard title={
                                {
                                    1: 'Petrol',
                                    2: 'Diesel',
                                    3: 'Hybrid',
                                    null: '-'
                                }[sawari.engine_type]
                            } image='engine' icon_color={Constants.Colors.WHITE} />
                            <SimpleCard title={sawari.car_type ?? '-'} image='car' icon_color={Constants.Colors.WHITE} />
                            <SimpleCard title={
                                {
                                    1: 'Imported',
                                    2: 'Local',
                                    3: 'Sports',
                                    4: 'Popular',
                                    null: '-'
                                }[sawari.assembly]
                            } image='car' icon_color={Constants.Colors.WHITE} />
                        </View>
                        <View style={style.outerTextView}>
                            <View style={style.innerTextView}>
                                <Text style={style.textStyleTitle}>Model Year</Text>
                                <Text style={style.textStyle}>{sawari.model_year}</Text>
                            </View>
                            <View style={style.innerTextView}>
                                <Text style={style.textStyleTitle}>Sawari Variant</Text>
                                <Text style={style.textStyle}>{sawari.variant}</Text>
                            </View>
                        </View>
                        <View style={style.outerTextViewNoBg}>
                            <View style={style.innerTextView}>
                                <Text style={style.textStyleTitle}>Sawari Transmission</Text>
                                <Text style={style.textStyle}>
                                    {
                                        {
                                            1: 'Manual',
                                            2: 'Automatic',
                                            null: '-'
                                        }[sawari.car_tranmission]
                                    }
                                </Text>
                            </View>
                            <View style={style.innerTextView}>
                                <Text style={style.textStyleTitle}>Engine Capacity</Text>
                                <Text style={style.textStyle}>{sawari.engine_capacity}</Text>
                            </View>
                        </View>
                        <View style={style.outerTextView}>
                            <View style={style.innerTextView}>
                                <Text style={style.textStyleTitle}>Body Color</Text>
                                <Text style={style.textStyle}>{sawari.color}</Text>
                            </View>
                            <View style={style.innerTextView}>
                                <Text style={style.textStyleTitle}>Sawari Mileage</Text>
                                <Text style={style.textStyle}>{sawari.car_mileage}</Text>
                            </View>
                        </View>
                        <View style={style.outerTextViewNoBg}>
                            <View style={style.innerTextView}>
                                <Text style={style.textStyleTitle}>Registration City</Text>
                                <Text style={style.textStyle}>{sawari.registration_city}</Text>
                            </View>
                            <View style={style.innerTextView}>
                                <Text style={style.textStyleTitle}>Pickup City</Text>
                                <Text style={style.textStyle}>{sawari.pickup_city}</Text>
                            </View>
                        </View>
                        <View style={style.outerTextView}>
                            <View style={style.innerTextView}>
                                <Text style={style.textStyleTitle}>Renter's Name</Text>
                                <Text style={style.textStyle}>{renterProfile.name}</Text>
                            </View>
                            <View style={style.innerTextView}>
                                <Text style={style.textStyleTitle}>Between Cities</Text>
                                <Text style={style.textStyle}>
                                    {
                                        {
                                            0: 'Yes',
                                            1: 'No',
                                            null: '-'
                                        }[sawari.btw_city]
                                    }
                                </Text>
                            </View>
                        </View>
                        <View style={style.outerTextViewNoBg}>
                            <View style={style.innerTextView}>
                                <Text style={style.textStyleTitle}>Driver Availibility</Text>
                                <Text style={style.textStyle}>
                                    {
                                        {
                                            1: 'Only With Driver',
                                            2: 'Driver Available On Demand',
                                            3: 'Without Driver',
                                            null: '-'
                                        }[sawari.driver_availability]
                                    }
                                </Text>
                            </View>
                        </View>
                        <View>
                            <Text style={style.textStyleTitle}>Description</Text>
                            <Text style={style.textStyle}>{sawari.description}</Text>
                        </View>
                    </View>
                </ScrollView>
                {/* <View style={style.bottomTabs}>
                    <TouchableOpacity style={{ flex: 0.5, justifyContent: 'center', alignItems: 'center', backgroundColor: Constants.Colors.WHITE }}>
                        <Text>Make Call</Text>
                    </TouchableOpacity>
                    <View style={{ width: 1, height: "100%", backgroundColor: Constants.Colors.BLACK }}></View>
                    <TouchableOpacity style={{ flex: 0.5, justifyContent: 'center', alignItems: 'center', backgroundColor: Constants.Colors.WHITE }}>
                        <Text>Send SMS</Text>
                    </TouchableOpacity>
                </View> */}
            </SafeAreaView>
            <SimpleCard style={{ marginBottom: 20, width: '40%', alignSelf: 'center' }} title="Book Now" customClick={() => navigation.navigate(Constants.NavigationItems.BookSawariScreen)} />
        </>
    )
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
    bottomTabs: {
        backgroundColor: '#cacaca',
        height: 60,
        flexDirection: 'row',
    }
});