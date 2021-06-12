import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, Text, SafeAreaView, ScrollView, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import HomeCard from '../components/cards/home.card.component';
import Header from '../components/appbar.component'
import Constants from '../utils/constants';
import UserCache from '../utils/cache.utils';
import TurroAPIUtils from '../models/turro.api.model';

export default function MySawariListScreen({ props, navigation }) {

    const [isLoading, setLoading] = useState(true);
    const [sawariList, setSawariList] = useState([]);
    const [userProfile, setUserProfile] = useState(null)

    const getUserData = async () => {
        UserCache.UserData(Constants.USER_DATA)
            .then(data => {
                console.log("defaultApp -> data", JSON.stringify(data))
                if (data != null) {
                    setUserProfile(data);
                    setLoading(true)
                    getUserSawaris(data.id)
                }
            })
            .catch((error) => {
                console.error(error)
            })
            .finally(() => {
                setLoading(false)
            })
    }

    const getUserSawaris = (id) => {
        TurroAPIUtils.getSawaris(null, id)
            .then(data => {
                console.log("defaultApp -> data", JSON.stringify(data))
                setSawariList(data)
            })
            .catch((error) => console.error(error))
            .finally(() => {
                setLoading(false)
            })
    }

    useEffect(() => {
        setLoading(true)
        getUserData()
    }, []);

    const addSawariComponent = <TouchableOpacity style={{ marginRight: 10, alignSelf: 'flex-end' }} onPress={() => (userProfile != null) ? navigation.navigate(Constants.NavigationItems.AddSawariScreen) : alert("Please login with your account first.")}>
        <MaterialCommunityIcons name="plus-thick" size={26} color={Constants.Colors.WHITE} />
    </TouchableOpacity>

    return (
        <>
            <Header headerComponent={addSawariComponent} />
            <SafeAreaView style={{ flex: 1, padding: 10 }}>
                {isLoading ? <ActivityIndicator /> :
                    <FlatList
                        data={sawariList}
                        renderItem={({ item }) =>
                            <View style={styles.GridViewBlockStyle}>
                                <HomeCard style={{ height: 350, width: '100%' }} item={item} customClick={() => navigation.navigate(Constants.NavigationItems.SawariDetailsScreen, { sawari: item })} />
                            </View>
                        }
                        showsVerticalScrollIndicator={false}
                    />
                }
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