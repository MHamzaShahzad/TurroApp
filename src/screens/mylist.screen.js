import React, { useState } from 'react';
import { View, StyleSheet, FlatList, Text, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import HomeCard from '../components/cards/home.card.component';
import Header from '../components/appbar.component'
import Constants from '../utils/constants';
import UserCache from '../utils/cache.utils';
export default function MySawariListScreen({ props, navigation }) {
    const [sawariList, setSawariList] = useState(
        [{ key: 'One' },
        { key: 'Two' },
        { key: 'Three' },
        { key: 'Four' },
        { key: 'Five' },
        { key: 'Six' },
        { key: 'Seven' },
        { key: 'Eight' },
        { key: 'Nine' },
        { key: 'Ten' },
        { key: 'Eleven' },
        { key: 'Twelve' },
        { key: 'Thirteen' },
        { key: 'Fourteen' },
        { key: 'Fifteen' },
        { key: 'Sixteen' },
        { key: 'Seventeen' },
        { key: 'Eighteen' },
        { key: 'Nineteen' },
        { key: 'Twenty' }]);

    const GetGridViewItem = (item) => {
        // Alert.alert(item);
        console.log(item)
    }
    const getUserData = async () => {
        const u_data = await UserCache.UserData(Constants.USER_DATA);
        if (u_data != null) {
            navigation.navigate(Constants.NavigationItems.AddSawariScreen)
        }
        else {
            alert("please first login with your account")
        }
        console.log(u_data)
    }
    const addSawariComponent = <TouchableOpacity style={{ marginRight: 10, alignSelf: 'flex-end' }} onPress={() => getUserData()}>
        <MaterialCommunityIcons name="plus-thick" size={26} color={Constants.Colors.WHITE} />
    </TouchableOpacity>

    return (
        <>
            <Header headerComponent={addSawariComponent} />
            <SafeAreaView style={{ flex: 1, padding: 10 }}>
                <FlatList
                    data={sawariList}
                    renderItem={({ item }) =>
                        <View style={styles.GridViewBlockStyle}>
                            <HomeCard style={{ height: 350, width: '100%' }} title="DATA" customClick={() => navigation.navigate(Constants.NavigationItems.SawariDetailsScreen)} />
                        </View>
                    }
                    showsVerticalScrollIndicator={false}
                />
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