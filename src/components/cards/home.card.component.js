import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View, Image } from 'react-native';
import Constants from '../../utils/constants'
import AppContext from '../context.component';
import PlaceHolderIcon from '../../assets/placeholder.png'

const HomeCard = (props) => {
    const appContext = React.useContext(AppContext);
    return (
        <TouchableOpacity style={[styles.layout, { width: props.style?.width, height: props.style?.height }]} onPress={props.customClick}>
            <Image style={styles.image} source={{ uri: "https://www.leaselink.co.nz/themes/sl-bootstrap/dist/images/nophoto.png" }} resizeMode={'cover'} />
            <View style={styles.textView}>
                <Text style={styles.text}>{appContext.makes.find((make) => (make.id == props.item?.fk_make_id))?.name} {appContext.models.find((model) => (model.id == props.item?.fk_model_id))?.model}</Text>
                <Text style={[styles.text, { textAlign: 'right' }]}>{props.item?.variant}</Text>
            </View>
            <View style={styles.textView}>
                <Text style={styles.text}>{props.item?.registration_city}</Text>
                <Text style={[styles.text, { textAlign: 'right', fontStyle: 'italic' }]}>{props.item?.car_rent}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    layout: {
        backgroundColor: Constants.Colors.WHITE,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.3,
        elevation: 6,
        shadowRadius: 5,
        shadowOffset: { width: 1, height: 5 },
    },
    image: {
        flex: 0.7,
        borderRadius: 5,
    },
    textView: {
        flex: 0.15,
        flexDirection: 'row',
        padding: 5,
        alignItems: 'center',
    },
    text: {
        flex: 0.5,
        color: Constants.Colors.PRIMARY,
        fontFamily: Constants.Fonts.FAMILY,
    },
});

export default HomeCard;