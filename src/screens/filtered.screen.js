import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet, Text, View, Image, FlatList, ActivityIndicator } from 'react-native';
import AppContext from '../components/context.component';
import Constants from '../utils/constants';

export default function FilteredItemScreen({ route, navigation }) {

    const { sawariList } = route.params
    const [isLoading, setLoading] = useState(false)
    const appContext = React.useContext(AppContext);

    useEffect(async () => {
        setLoading(false)
    }, [])

    const Item = ({ item }) => (
        <View style={styles.item} onStartShouldSetResponder={() => navigation.navigate(Constants.NavigationItems.SawariDetailsScreen, { sawari: item })}>
            <Image style={styles.img} source={{ uri: "https://www.leaselink.co.nz/themes/sl-bootstrap/dist/images/nophoto.png" }} resizeMode={'cover'} />
            <View style={styles.viewcontainer}>
                <View style={styles.textview}>
                    <Text style={styles.text}>{appContext.makes.find((make) => (make.id == item.fk_make_id))?.name}</Text>
                    <Text style={styles.text}>{appContext.models.find((model) => (model.id == item.fk_model_id))?.model}</Text>
                    <Text style={styles.text}>{item.pickup_city}</Text>
                    <View style={styles.Rentview}>
                        <Text style={styles.text}>{item.car_rent}</Text>
                    </View>
                </View>
            </View>
        </View>
    );

    const renderItem = ({ item }) => <Item item={item} />;
    return (
        <View style={styles.container}>
            {isLoading ? <ActivityIndicator /> : <FlatList data={sawariList} renderItem={renderItem} keyExtractor={item => item.id} />}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    viewcontainer: {
        flex: 1,
        flexDirection: "row",
        paddingLeft: 5,
        paddingRight: 5
    },
    textview: {
        flex: 1
    },
    item: {
        flexDirection: "row",
        borderRadius: 10,
        alignSelf: "center",
        width: "95%",
        marginVertical: 4,
        elevation: 5,
        backgroundColor: "white"
    },
    text: {
        color: Constants.Colors.PRIMARY,
        fontFamily: Constants.Fonts.FAMILY,
        fontSize: 16
    },
    img: {
        width: "30%",
        height: 100,
        borderRadius: 10
    },
    Rentview: {
        alignItems: "flex-end"
    },
});

