import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View, Image } from 'react-native';
import Constants from '../../utils/constants'

const HomeCard = (props) => {
    return (
        <TouchableOpacity style={[styles.layout, { width: props.style?.width, height: props.style?.height }]} onPress={props.customClick}>
                <Image style={styles.image} source={{uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWOtpaoxvucsi4fj6-NBd08-FKGm_yJKrnctIOuMBh-BgWELKGnBcIEaaXF1OPnTZdXWM&usqp=CAU"}} resizeMode={'cover'}></Image>
                <View style={styles.textView}>
                    <Text style={styles.text}>{props.title}</Text>
                    <Text style={[styles.text, {textAlign: 'right'}]}>{props.title}</Text>
                </View>
                <View style={styles.textView}>
                    <Text style={styles.text}>{props.title}</Text>
                    <Text style={[styles.text, {textAlign: 'right'}]}>{props.title}</Text>
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