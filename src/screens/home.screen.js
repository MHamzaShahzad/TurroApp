import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, Text, SafeAreaView, ScrollView, TouchableOpacity, StatusBar, ActivityIndicator } from 'react-native';

import Header from '../components/appbar.component';
import HomeCard from '../components/cards/home.card.component';
import SimpleCard from '../components/cards/simple.card.component';
import Constants from '../utils/constants';
import Styles from '../styles/index';
import APIUtils from '../utils/api.utils';

export default function HomeScreen({ props, navigation }) {

    const [isLoading, setLoading] = useState(true);
    const [sawariList, setSawariList] = useState([]);

    const [sawarCategories, setSawariCategories] = useState(
        [{ key: 'Local' },
        { key: 'Imported' },
        { key: 'Popular' },
        { key: 'Sports Car' }]
    );

    const viewDetails = (sawari) => {
        navigation.navigate(Constants.NavigationItems.SawariDetailsScreen, {sawari})
    }

    const viewAll = (list) => {
        navigation.navigate(Constants.NavigationItems.SawariListScreen, {sawariList: list})
    }
    const applyFilter = (category) => {
        navigation.navigate(Constants.NavigationItems.FilterSawariScreen)
    }

    useEffect(() => {
        setLoading(true)
        APIUtils.getApi(Constants.BASE_URL + 'api/car_list')
            .then( data  => {
                console.log("defaultApp -> data", JSON.stringify(data))
                setSawariList(data)
            })
            .catch((error) => console.error(error))
            .finally(() => setLoading(false))
    }, []);

    return (
        <>
            <Header />
            <StatusBar barStyle={'light-content'} backgroundColor={Constants.Colors.PRIMARY} />
            <SafeAreaView style={{ flex: 1, }}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.GridViewBlockStyle}>
                        <SimpleCard style={{ height: 50, width: "100%" }} title="Search" customClick={() => applyFilter("search filter")} />
                    </View>
                    {/* <FlatList
                        data={sawarCategories}
                        renderItem={({ item }) =>
                            <View style={styles.GridViewBlockStyle}>
                                <SimpleCard style={{ height: 100, width: "100%" }} title="DATA" />
                            </View>
                        }
                        numColumns={2}
                    /> */}
                    {
                        isLoading == true ? ( <ActivityIndicator /> ) : (
                            <>
                                <View style={{ padding: 10, flex: 1, backgroundColor: '#cacaca', flexDirection: 'row' }}>
                                    <Text style={{ flex: 0.5 }}>Imported</Text>
                                    <TouchableOpacity onPress={() => viewAll(sawariList )} style={{ flex: 0.5, alignItems: 'flex-end' }}>
                                        <Text>View All</Text>
                                    </TouchableOpacity>
                                </View>
                                <FlatList
                                    horizontal
                                    showsHorizontalScrollIndicator={false}
                                    style={{ marginTop: 10, marginBottom: 10 }}
                                    data={sawariList}
                                    keyExtractor={( {id}, index) => index.toString()}
                                    renderItem={({ item }) => 
                                        <View style={styles.GridViewBlockStyle} key={item.id}>
                                            <HomeCard style={{ height: 200, width: 150 }} item={item} customClick={() => viewDetails(item)} />
                                        </View>
                                    }
                                />
                            </>)
                    }
                </ScrollView>
            </SafeAreaView>
        </>
    );
}

const styles = StyleSheet.create({
    GridViewBlockStyle: {
        flex: 1,
        margin: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
});