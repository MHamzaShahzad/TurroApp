import React, { useRef, useEffect, useState } from 'react'
import { StyleSheet, SafeAreaView, View, Image, TextInput, Text, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native'
import Moment from 'moment';

import Constants from '../utils/constants';
import SimpleCard from '../components/cards/simple.card.component';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import UserCache from '../utils/cache.utils'
import APIUtils from '../utils/api.utils';

export default function BookSawariScreen({ route, navigation }) {

    const dateTimePickerRef = useRef(null);

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
    const [isDateTimePickerVisible, setDateTimePickerVisibility] = useState(false);

    const [dateTime, setDateTime] = useState({ from: new Date(), to: new Date() });

    const [dateFrom, setDateFrom] = useState("Select date from");
    const [dateTo, setDateTo] = useState("Select date from");

    const [timeFrom, setTimeFrom] = useState("Select time from");
    const [timeTo, setTimeTo] = useState("Select time to");

    const showDatePicker = (element) => {
        dateTimePickerRef.current = element
        setDatePickerVisibility(true);
    };

    const showTimePicker = (element) => {
        dateTimePickerRef.current = element
        setTimePickerVisibility(true);
    };

    const showDateTimePicker = (element) => {
        dateTimePickerRef.current = element
        setDateTimePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const hideTimePicker = () => {
        setTimePickerVisibility(false);
    };

    const hideDateTimePicker = () => {
        setDateTimePickerVisibility(false);
    };

    const handleDateConfirm = (date) => {
        console.warn("A date has been picked: ", date)
        switch (dateTimePickerRef.current) {
            case 0:
                setDateTime({ ...dateTime, from: new Date(Moment(date).format()) })
                setDateFrom(Moment(date).format('YYYY-MM-DD'))
                break
            case 1:
                setDateTo(Moment(date).format('YYYY-MM-DD'))
                setDateTime({ ...dateTime, to: new Date(Moment(date).format()) })
                break
            default:
                console.log(dateTimePickerRef.current)
        }
        hideDatePicker();
        console.log(`Date Time: ${JSON.stringify(dateTime)}`)
    };

    const handleTimeConfirm = (time) => {
        console.warn("A time has been picked: ", time);
        console.log(Moment.duration(Moment(time).diff(Moment(time))).asHours())
        switch (dateTimePickerRef.current) {
            case 2:
                setTimeFrom(Moment(time).format('hh:mm A'))
                break
            case 3:
                setTimeTo(Moment(time).format('hh:mm A'))
                break
            default:
                console.log(dateTimePickerRef.current)
        }
        hideTimePicker();
    };

    const handleDateTimeConfirm = (selectedDateTime) => {
        console.warn("A date / time has been picked: ", selectedDateTime);
         switch (dateTimePickerRef.current) {
            case 4:
                setDateTime({ ...dateTime, from: selectedDateTime })
                setData({ ...data, 
                    date: Moment(selectedDateTime).format('YYYY-MM-DD'),
                    total_hours: Math.round(Moment.duration(Moment(dateTime.to).diff(Moment(selectedDateTime))).asHours())
                })
                break
            case 5:
                setDateTime({ ...dateTime,
                    to: selectedDateTime,
                })
                setData({ ...data, 
                    total_hours: Math.round(Moment.duration(Moment(selectedDateTime).diff(Moment(dateTime.from))).asHours())
                })
                break
            default:
                console.log(dateTimePickerRef.current)
        }
        // setData({ ...data, total_hours: Math.round(Moment.duration(Moment(dateTime.to).diff(Moment(dateTime.from))).asHours()) })
        // console.log(`Total Hours ${Math.round(Moment.duration(Moment(dateTime.to).diff(Moment(dateTime.from))).asHours())}`)
        hideDateTimePicker();
    };

    const { sawari } = route.params

    const [isLoading, seIsLoading] = useState(false);
    const [isDisable, setDisable] = useState(false);
    const [data, setData] = useState({
        fk_user_id: null,
        fk_car_id: sawari.id,
        pickup: '',
        destination: '',
        date: Moment(dateTime.from).format('YYYY-MM-DD'),
        total_hours: Math.round(Moment.duration(Moment(dateTime.to).diff(Moment(dateTime.from))).asHours()),
    });

    const [userProfile, setUserProfile] = useState({});
    useEffect(() => {
        UserCache.UserData(Constants.USER_DATA)
            .then(userProfileData => {
                setUserProfile(userProfileData)
                setData({ ...data, fk_user_id: userProfileData.id })
                console.log("defaultApp -> data", userProfileData.id)
            })
            .catch((error) => console.error(error))
            .finally( () => {
                // setData({ ...data, fk_car_id: sawari.id, date: Moment(dateTime.from).format('YYYY-MM-DD'), total_hours: Math.round(Moment.duration(Moment(dateTime.to).diff(Moment(dateTime.from))).asHours()) })
            })
    }, []);

    const rentMyCar = async () => {
        console.log(`Data: ${JSON.stringify(data)}`);
        console.log(`User Profile: ${JSON.stringify(userProfile)}`);
        console.log(`Sawari: ${JSON.stringify(sawari)}`);
        if (!data.fk_car_id) {
            console.log(`fk_car_id: ${data.fk_car_id}`)
        } else if (!data.fk_user_id) {
            console.log(`fk_user_id: ${data.fk_user_id}`)
        } else if (data.pickup.length == 0) {
            console.log(`pickup ${data.pickup}`)
        } else if (data.destination.length == 0) {
            console.log(`destination ${data.destination}`)
        } else if (data.date.length == 0) {
            console.log(`date ${data.date}`)
        } else {
            seIsLoading(true)
            setDisable(true)
            const formData = new FormData();
            formData.append('fk_user_id', data.fk_user_id);
            formData.append('fk_car_id', data.fk_car_id);
            formData.append('pickup', data.pickup);
            formData.append('destination', data.destination);
            formData.append('date', data.date);
            formData.append('total_hours', data.total_hours);
            formData.append('status', 0)
            console.log('Car Data = ' + JSON.stringify(formData))
            const url = Constants.BASE_URL + 'api/booking';
            const result = await APIUtils.postApi('post', url, formData)
            console.log("BookCar API result: " + result)
            removeLoader()
            if (result === '' || undefined) {
                alert("Sorry an error has occoured while booking, please try again!")
            } else {
                if (result === 1) {
                    alert("Booking Successfully")
                } else if (result === 2) {
                    alert("Error while booking")
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
        <SafeAreaView style={styles.container}>
            <View style={styles.container}>
                <ScrollView>
                    <View style={styles.container2, { display: 'none' }}>
                        <Text style={styles.textStyleFieldName}>Name</Text>
                        <TextInput placeholder="Your Name" value={userProfile.name} style={styles.inputFieldStyle} />
                    </View>
                    <View style={styles.container3, { display: 'none' }}>
                        <Text style={styles.textStyleFieldName}>Address</Text>
                        <TextInput placeholder="Your Address" style={styles.inputFieldStyle} />
                    </View>
                    <View style={styles.container3}>
                        <Text style={styles.textStyleFieldName}>Pickup Address</Text>
                        <TextInput placeholder="Your Pickup" onChangeText={(value) => setData({ ...data, pickup: value })} style={styles.inputFieldStyle} />
                    </View>
                    <View style={styles.container3}>
                        <Text style={styles.textStyleFieldName}>Destination Address</Text>
                        <TextInput placeholder="Your Destination" onChangeText={(value) => setData({ ...data, destination: value })} style={styles.inputFieldStyle} />
                    </View>
                    <View style={styles.container3}>
                        <Text style={styles.textStyleFieldName}>Date / Time From</Text>
                        <TouchableOpacity onPress={() => showDateTimePicker(4)} >
                            <TextInput placeholder="Your Date / Time From" value={Moment(dateTime.from).format('YYYY-MM-DD hh:mm a')} style={styles.inputFieldStyle} onPressIn={() => showDateTimePicker(4)} editable={false} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.container3}>
                        <Text style={styles.textStyleFieldName}>Date / Time To</Text>
                        <TouchableOpacity onPress={() => showDateTimePicker(5)} >
                            <TextInput placeholder="Your Date / Time To" value={Moment(dateTime.to).format('YYYY-MM-DD hh:mm a')} style={styles.inputFieldStyle} onPressIn={() => showDateTimePicker(5)} editable={false} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.container5, { display: 'none' }}>
                        <View style={styles.container6}>
                            <Text style={styles.textStyleFieldName}>Date From</Text>
                            <TouchableOpacity onPress={() => showDatePicker(0)} >
                                <TextInput placeholder="Your Date" value={dateFrom} style={styles.inputFieldStyle} onPressIn={() => showDatePicker(0)} editable={false} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.container6}>
                            <Text style={styles.textStyleFieldName}>Time From</Text>
                            <TouchableOpacity onPress={() => showTimePicker(2)}>
                                <TextInput placeholder="Your Time" value={timeFrom} style={styles.inputFieldStyle} onPressIn={() => showTimePicker(2)} editable={false} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.container5, { display: 'none' }}>
                        <View style={styles.container6}>
                            <Text style={styles.textStyleFieldName}>Date To</Text>
                            <TouchableOpacity onPress={() => showDatePicker(1)}>
                                <TextInput placeholder="Your Date" value={dateTo} style={styles.inputFieldStyle} onPressIn={() => showDatePicker(1)} editable={false} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.container6}>
                            <Text style={styles.textStyleFieldName}>Time To</Text>
                            <TouchableOpacity onPress={() => showTimePicker(3)}>
                                <TextInput placeholder="Your Time" value={timeTo} style={styles.inputFieldStyle} onPressIn={() => showTimePicker(3)} editable={false} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.container3, { display: 'none' }}>
                        <Text style={styles.textStyleFieldName}>Payment (Rs)</Text>
                        <TextInput placeholder="Your Payment(Rs)" style={styles.inputFieldStyle} />
                    </View>
                    <View style={styles.container4}>
                        <SimpleCard style={styles.signInButtonStyle} title={"Confirm Booking"} customClick={rentMyCar} gone={isDisable} />
                    </View>
                </ScrollView>
            </View>
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleDateConfirm}
                onCancel={hideDatePicker}
                minimumDate={{
                    0: new Date(),
                    1: dateTime.from
                }[dateTimePickerRef.current]}
            />
            <DateTimePickerModal
                isVisible={isTimePickerVisible}
                mode="time"
                onConfirm={handleTimeConfirm}
                onCancel={hideTimePicker}
            />
            <DateTimePickerModal
                isVisible={isDateTimePickerVisible}
                mode="datetime"
                onConfirm={handleDateTimeConfirm}
                onCancel={hideDateTimePicker}
                minimumDate={{
                    4: new Date(),
                    5: dateTime.from
                }[dateTimePickerRef.current]}
            />
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
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    container1: {
        alignItems: "center"
    },

    container2: {
        marginLeft: 20,
        marginRight: 20,
        marginTop: 20
    },

    container3: {
        marginLeft: 20,
        marginRight: 20,
        marginTop: 6
    },

    container4: {
        alignItems: "center",
        marginTop: 15
    },
    container5: {
        flexDirection: 'row',
        marginTop: 15
    },
    container6: {
        flex: 1,
        marginLeft: 20,
        marginRight: 20,
        marginTop: 6
    },
    appImage: {
        width: "60%",
        height: 110,
        marginTop: 60
    },

    sawariTextStyle: {
        fontSize: 34,
        fontWeight: 'bold',
        letterSpacing: 2,
        color: Constants.Colors.PRIMARY
    },

    textStyleFieldName: {
        fontSize: 16
    },

    inputFieldStyle: {
        height: 45,
        marginTop: 7,
        fontSize: 16,
        paddingLeft: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#DDDDDD",
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowRadius: 5,
        shadowOffset: { width: 1, height: 1 },
    },

    signInButtonStyle: {
        fontSize: 24,
        marginTop: 25,
        width: "70%",
        height: 50,
        textAlign: "center",
        paddingTop: 7,
        elevation: 5,
        backgroundColor: Constants.Colors.WHITE,
        fontWeight: 'bold',
        backgroundColor: Constants.Colors.PRIMARY,
        color: Constants.Colors.WHITE,
        borderRadius: 10,
    },

    doNotHaveAccountViewStyle: {
        flexDirection: "row",
        marginTop: 45
    },

    doNotHaveAccountTextStyle: {
        fontSize: 18
    },

    signUpTextStyle: {
        fontSize: 18,
        color: Constants.Colors.PRIMARY
    },
});