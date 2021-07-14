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
                    <Text style={styles.text}>{appContext.makes.find((make) => (make.id == item.fk_make_id))?.name} {appContext.models.find((model) => (model.id == item.fk_model_id))?.model}, {item?.model_year}</Text>
                    <Text style={styles.textDescription}>{item?.description}</Text>
                    <View style={styles.viewcontainer}>
                        <Text style={styles.text, {flex: 0.5, color: Constants.Colors.PRIMARY, fontFamily: Constants.Fonts.FAMILY, fontWeight: 'bold'}}>{item.pickup_city}</Text>
                        <Text style={styles.text, {flex: 0.5, textAlign: 'right', color: Constants.Colors.GREY, fontFamily: Constants.Fonts.FAMILY, fontStyle: 'italic', fontWeight: 'bold'}}>{item.car_rent}</Text>
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
    textDescription: {
        padding: 5,
        color: Constants.Colors.GREY,
        fontFamily: Constants.Fonts.FAMILY,
    },
    text: {
        color: Constants.Colors.PRIMARY,
        fontFamily: Constants.Fonts.FAMILY,
        fontSize: 16,
        fontWeight: 'bold'
    },
    img: {
        width: "30%",
        height: 100,
        borderRadius: 10
    },
});

