import React, { useState } from 'react';
import { View, StyleSheet, FlatList, Text, SafeAreaView, ScrollView, TouchableOpacity, StatusBar } from 'react-native';

import Header from '../components/appbar.component';
import HomeCard from '../components/cards/home.card.component';
import SimpleCard from '../components/cards/simple.card.component';
import Constants from '../utils/constants';
import Styles from '../styles/index';

export default function HomeScreen({ props, navigation }) {
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

    const [sawarCategories, setSawariCategories] = useState(
        [{ key: 'One' },
        { key: 'Two' },
        { key: 'Three' },
        { key: 'Four' }]
    );

    const GetGridViewItem = (item) => {
        // Alert.alert(item);
        console.log(item)
    }

    const viewDetails = (sawari) => {
        navigation.navigate('SawariDetails')
    }

    const viewAll = (category) => {
        navigation.navigate('SawariListScreen')
    }
    const applyFilter = (category) => {
        navigation.navigate('FilterSawariScreen')
    }

    return (
        <>
            <Header />
            <StatusBar barStyle="light-content" backgroundColor={Constants.Colors.PRIMARY} />
            <SafeAreaView style={{ flex: 1, padding: 10 }}>
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
                    <View style={{ padding: 10, flex: 1, backgroundColor: '#cacaca', flexDirection: 'row' }}>
                        <Text style={{ flex: 0.5 }}>Imported</Text>
                        <TouchableOpacity onPress={viewAll} style={{ flex: 0.5, alignItems: 'flex-end' }}>
                            <Text>View All</Text>
                        </TouchableOpacity>
                    </View>
                    <FlatList
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        style={{ marginTop: 10, marginBottom: 10 }}
                        data={sawariList}
                        renderItem={({ item }) =>
                            <View style={styles.GridViewBlockStyle}>
                                <HomeCard style={{ height: 200, width: 150 }} title="DATA" customClick={viewDetails} />
                            </View>
                        }
                    />
                    <View style={{ padding: 10, flex: 1, backgroundColor: '#cacaca', flexDirection: 'row' }}>
                        <Text style={{ flex: 0.5 }}>Used</Text>
                        <TouchableOpacity onPress={viewAll} style={{ flex: 0.5, alignItems: 'flex-end' }}>
                            <Text>View All</Text>
                        </TouchableOpacity>
                    </View>
                    <FlatList
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        style={{ marginTop: 10, marginBottom: 10 }}
                        data={sawariList}
                        renderItem={({ item }) =>
                            <View style={styles.GridViewBlockStyle}>
                                <HomeCard style={{ height: 200, width: 150 }} title="DATA" customClick={viewDetails} />
                            </View>
                        }
                    />
                    <View style={{ padding: 10, flex: 1, backgroundColor: '#cacaca', flexDirection: 'row' }}>
                        <Text style={{ flex: 0.5 }}>You might also like</Text>
                        <TouchableOpacity onPress={viewAll} style={{ flex: 0.5, alignItems: 'flex-end' }}>
                            <Text>View All</Text>
                        </TouchableOpacity>
                    </View>
                    <FlatList
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        style={{ marginTop: 10, marginBottom: 10 }}
                        data={sawariList}
                        renderItem={({ item }) =>
                            <View style={styles.GridViewBlockStyle}>
                                <HomeCard style={{ height: 200, width: 150 }} title="DATA" customClick={viewDetails} />
                            </View>
                        }

                    />
                    <View style={{ padding: 10, flex: 1, backgroundColor: '#cacaca', flexDirection: 'row' }}>
                        <Text style={{ flex: 0.5 }}>You might also like</Text>
                        <TouchableOpacity onPress={viewAll} style={{ flex: 0.5, alignItems: 'flex-end' }}>
                            <Text>View All</Text>
                        </TouchableOpacity>
                    </View>
                    <FlatList
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        style={{ marginTop: 10, marginBottom: 10 }}
                        data={sawariList}
                        renderItem={({ item }) =>
                            <View style={styles.GridViewBlockStyle}>
                                <HomeCard style={{ height: 200, width: 150 }} title="DATA" customClick={viewDetails} />
                            </View>
                        }
                    />
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