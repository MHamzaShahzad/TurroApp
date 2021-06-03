import React, { useState } from 'react';
import { View, StyleSheet, FlatList, SafeAreaView, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import HomeCard from '../components/cards/home.card.component';
import Constants from '../utils/constants';

export default function ItemsScreen({ props, navigation }) {
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

    React.useLayoutEffect(() => {
        navigation.setOptions({
          headerRight: () => (
            <MaterialIcons name="search" style={{marginRight: 10}} size={26} color={Constants.Colors.WHITE} onPress={() => navigation.navigate(Constants.NavigationItems.FilterSawariScreen)} />
          ),
        });
      }, [navigation]);

    return (
        <>
            <SafeAreaView style={{ flex: 1 }}>
                <FlatList
                    data={sawariList}
                    renderItem={({ item }) =>
                        <View style={styles.GridViewBlockStyle}>
                            <HomeCard style={{ height: 200, width: '100%' }} title="DATA" customClick={() => navigation.navigate(Constants.NavigationItems.SawariDetailsScreen)} />
                        </View>
                    }
                    numColumns={2}
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