import React from 'react'
import { StyleSheet, SafeAreaView, View, Image, TextInput, Text, ScrollView, TouchableOpacity } from 'react-native'

import Constants from '../utils/constants';
import SimpleCard from '../components/cards/simple.card.component';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Moment from 'moment'

export default function BookSawariScreen({ props, navigation }) {

    const [isDatePickerVisible, setDatePickerVisibility] = React.useState(false);
    const [isTimePickerVisible, setTimePickerVisibility] = React.useState(false);
    const [date, setDate] = React.useState({ from: "Select date from", to: "Select date to" })
    const [time, setTime] = React.useState({ from: "Select time from", to: "Select time to" })

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const showTimePicker = () => {
        setTimePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const hideTimePicker = () => {
        setTimePickerVisibility(false);
    };

    const handleDateConfirm = (date) => {
        console.warn("A date has been picked: ", date);
        setDate({ from: Moment(date).format('l'), to: Moment(date).format('l') })
        hideDatePicker();
    };

    const handleTimeConfirm = (time) => {
        console.warn("A time has been picked: ", time);
        Moment(time).format('LT').duration(Moment(time).format('LT'))
        setTime({ from: Moment(time).format('LT'), to: Moment(time).format('LT') })
        hideTimePicker();
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.container}>
                <ScrollView>
                    <View style={styles.container2}>
                        <Text style={styles.textStyleFieldName}>Name</Text>
                        <TextInput placeholder="Your Name" style={styles.inputFieldStyle} />
                    </View>
                    <View style={styles.container3}>
                        <Text style={styles.textStyleFieldName}>Address</Text>
                        <TextInput placeholder="Your Address" style={styles.inputFieldStyle} />
                    </View>
                    <View style={styles.container3}>
                        <Text style={styles.textStyleFieldName}>Pickup</Text>
                        <TextInput placeholder="Your Pickup" style={styles.inputFieldStyle} />
                    </View>
                    <View style={styles.container3}>
                        <Text style={styles.textStyleFieldName}>Destination</Text>
                        <TextInput placeholder="Your Destination" style={styles.inputFieldStyle} />
                    </View>
                    <View style={styles.container5}>
                        <View style={styles.container6}>
                            <Text style={styles.textStyleFieldName}>Date From</Text>
                            <TouchableOpacity onPress={showDatePicker} >
                                <TextInput placeholder="Your Date" value={date.from} style={styles.inputFieldStyle} onPressIn={showDatePicker} editable={false} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.container6}>
                            <Text style={styles.textStyleFieldName}>Time From</Text>
                            <TouchableOpacity onPress={showTimePicker}>
                                <TextInput placeholder="Your Time" value={time.from} style={styles.inputFieldStyle} onPressIn={showTimePicker} editable={false} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.container5}>
                        <View style={styles.container6}>
                            <Text style={styles.textStyleFieldName}>Date To</Text>
                            <TouchableOpacity onPress={showDatePicker}>
                                <TextInput placeholder="Your Date" value={date.to} style={styles.inputFieldStyle} onPressIn={showDatePicker} editable={false} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.container6}>
                            <Text style={styles.textStyleFieldName}>Time To</Text>
                            <TouchableOpacity onPress={showTimePicker}>
                                <TextInput placeholder="Your Time" value={time.to} style={styles.inputFieldStyle} onPressIn={showTimePicker} editable={false} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.container3}>
                        <Text style={styles.textStyleFieldName}>Payment (Rs)</Text>
                        <TextInput placeholder="Your Payment(Rs)" style={styles.inputFieldStyle} />
                    </View>

                    <View style={styles.container4}>
                        <SimpleCard style={styles.signInButtonStyle} title={"Confirm Booking"} customClick={showDatePicker} />
                    </View>
                </ScrollView>
            </View>
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleDateConfirm}
                onCancel={hideDatePicker}
            />
            <DateTimePickerModal
                isVisible={isTimePickerVisible}
                mode="time"
                onConfirm={handleTimeConfirm}
                onCancel={hideTimePicker}
            />
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