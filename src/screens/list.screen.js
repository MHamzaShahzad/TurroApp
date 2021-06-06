import React, { useState } from 'react';
import { View, StyleSheet, FlatList, SafeAreaView, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import HomeCard from '../components/cards/home.card.component';
import Constants from '../utils/constants';

export default function ItemsScreen({ route, navigation }) {

    const { sawariList } = route.params;

    const viewDetails = (sawari) => {
        navigation.navigate(Constants.NavigationItems.SawariDetailsScreen, {sawari})
    }

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <MaterialIcons name="search" style={{ marginRight: 10 }} size={26} color={Constants.Colors.WHITE} onPress={() => navigation.navigate(Constants.NavigationItems.FilterSawariScreen)} />
            ),
        });
    }, [navigation]);

    return (
        <>
            <SafeAreaView style={{ flex: 1 }}>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={sawariList}
                    keyExtractor={({ id }, index) => index.toString()}
                    renderItem={({ item }) =>
                        <View style={styles.GridViewBlockStyle} key={item.id}>
                            <HomeCard style={{ height: 200, width: '100%' }} item={item} customClick={() => viewDetails(item)} />
                        </View>
                    }
                    numColumns={2}
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