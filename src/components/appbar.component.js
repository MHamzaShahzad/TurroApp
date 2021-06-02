import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Platform } from 'react-native';
import menu from '../assets/menu.png';
import { useNavigation } from '@react-navigation/native';
import Constants from '../utils/constants'

export default function Header() {
    const navigation = useNavigation();

    const openMenu = () => {
        navigation.openDrawer()
    }

    return (
        <View style={styles.container}>
            <View style={styles.menu}>
                <TouchableOpacity onPress={openMenu}>
                    <Image source={menu} style={{ width: 40, height: 40, marginLeft: 10, marginTop: 10}} />
                </TouchableOpacity>
            </View>
            <View style={styles.menu}>
                <Text style={styles.headerText}>Get Sawari</Text>
            </View>
            <View style={styles.menu}>
                
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: Constants.Colors.PRIMARY,
        height: Platform.OS === 'ios' ? 90 : 60,
        alignItems: 'center'
    },
    menu: {
        flex: 0.5,
        marginTop: Platform.OS === 'ios' ? 30 : 0,
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Constants.Colors.WHITE,
        alignSelf: 'center',
    },
});
