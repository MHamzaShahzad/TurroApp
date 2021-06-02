import React from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, Image, StatusBar, ScrollView, TouchableOpacity } from 'react-native';

import car from '../assets/app_icon.png';
import arrow from '../assets/login.png';


const DATA = [
    { id: '1', title: 'First Item', },
    { id: '2', title: 'Second Item', },
    { id: '3', title: 'Third Item', },
    { id: '4', title: 'Third Item', },
    { id: '5', title: 'Third Item', },
    { id: '6', title: 'Third Item', },
    { id: '7', title: 'Third Item', },
    { id: '8', title: 'Third Item', },
    { id: '9', title: 'Third Item', },
    { id: '10', title: 'Third Item', },
    { id: '11', title: 'Third Item', },
    { id: '12', title: 'Third Item', },
    { id: '13', title: 'Third Item', },
    { id: '14', title: 'Third Item', },
    { id: '15', title: 'Third Item', },
    { id: '16', title: 'Third Item', },
    { id: '11', title: 'Third Item', },
    { id: '12', title: 'Third Item', },
    { id: '13', title: 'Third Item', },
    { id: '14', title: 'Third Item', },
    { id: '15', title: 'Third Item', },
    { id: '16', title: 'Third Item', },
];

const Item = ({ title }) => (
    <View style={styles.item}>
        <TouchableOpacity>
            <Text style={styles.title}>{title}</Text>
        </TouchableOpacity>
    </View>
);

export default function ChooseItem() {
    const renderItem = ({ item }) => <Item title={item.title} />;

    return (
        <View style={styles.container}>
            <View style={styles.titleView}>
                <Image source={car} style={styles.carimg} />
                <Text style={styles.garitext}>GET SAWARI</Text>
            </View>
            <Text style={styles.selectCity}>Select City</Text>
            <FlatList numColumns={2} data={DATA} renderItem={renderItem} keyExtractor={(item, index) => index} />
            <View style={styles.gridView}>
                <Image source={arrow} style={styles.arrowImage} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    item: {
        borderColor: '#D3D3D3',
        borderWidth: 1,
        borderRadius: 60,
        padding: 5,
        marginVertical: 12,
        marginHorizontal: 30,
        width: "36%",
        height: 45
    },
    title: {
        fontSize: 18,
        textAlign: "center",
        paddingTop: 4,
    },
    titleView: {
        flexDirection: "row",
        paddingTop: 35,
        paddingLeft: 30
    },
    carimg: {
        width: "25%",
        height: 80
    },
    garitext: {
        paddingTop: 13,
        fontSize: 28,
        paddingLeft: 15,
        fontWeight: 'bold',
        color: "#fa9b17",
        letterSpacing: 1
    },
    selectCity: {
        paddingLeft: 30,
        fontSize: 24,
        paddingBottom: 10
    },
    gridView: {
        borderWidth: 1,
        width: "15%",
        height: 60,
        alignSelf: "center",
        paddingBottom: 20,
        borderRadius: 40,
        backgroundColor: "#fa9b17"
    },
    arrowImage: {
        width: "60%",
        height: 50,
        alignSelf: "center",
        marginVertical: 3,
    },
});