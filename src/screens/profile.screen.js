import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TextInput, ScrollView, Alert, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontistoIcons from 'react-native-vector-icons/Fontisto';
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome';
import AntDesignIcons from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Constants from '../utils/constants';
import SimpleCard from '../components/cards/simple.card.component';
import UserCache from '../utils/cache.utils';

export default function Profile({ props, navigation }) {
    const [userProfile, setUserProfile] = useState({});
    useEffect(() => {
        UserCache.UserData(Constants.USER_DATA)
            .then( data  => {
                console.log("defaultApp -> data", JSON.stringify(data))
                setUserProfile(data)
            })
            .catch((error) => console.error(error))
    }, {});

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <MaterialCommunityIcons name="logout" style={{ marginRight: 10 }} size={26} color={Constants.Colors.WHITE} onPress={logout} />
            ),
        });
    }, [navigation]);
    
    const logout = () => {
        Alert.alert(
          'Confirm',
          'Do you want to logout of your account ?',
          [
            {
              text: 'Ok',
              onPress: async () => {
                try {
                  await AsyncStorage.removeItem(Constants.USER_DATA)
                  navigation.goBack()
                } catch (e) {
                  console.log(e);
                }
              },
            },
            {
              text: 'Cancel',
            }
          ],
          { cancelable: false }
        );
      }

    return (
        <View style={styles.container}>
            <View style={styles.imageViewContainer}>
                <View style={styles.profileImageView}>
                    <FontAwesomeIcons name={'user'} color={Constants.Colors.PRIMARY} size={50} />
                </View>
            </View>
            <ScrollView style={{ marginTop: 50 }}>
                <View style={styles.inputFiledLayout}>
                    <FontAwesomeIcons name={'user-o'} color={Constants.Colors.PRIMARY} size={22} />
                    <TextInput style={styles.inputFieldText} value={userProfile?.name} placeholder=" Enter Name " />
                </View>
                <View style={styles.inputFiledLayout}>
                    <FontistoIcons name={'email'} color={Constants.Colors.PRIMARY} size={22} />
                    <TextInput style={styles.inputFieldText} value={userProfile?.email} placeholder=" Enter E-mail " />
                </View>
                <View style={styles.inputFiledLayout}>
                    <FontAwesomeIcons name={'mobile'} color={Constants.Colors.PRIMARY} size={22} />
                    <TextInput style={styles.inputFieldText} value={userProfile?.contact} placeholder=" Enter Phone Number " />
                </View>
                <View style={styles.inputFiledLayout}>
                    <AntDesignIcons name={'idcard'} color={Constants.Colors.PRIMARY} size={22} />
                    <TextInput style={styles.inputFieldText} placeholder=" Enter CNIC " />
                </View>
                <View style={styles.inputFiledLayout}>
                    <MaterialCommunityIcons name={'home-city-outline'} color={Constants.Colors.PRIMARY} size={22} />
                    <TextInput style={styles.inputFieldText} placeholder=" Enter City Name " />
                </View>
                <View style={styles.inputFiledLayout}>
                    <AntDesignIcons name={'home'} color={Constants.Colors.PRIMARY} style={styles.nameimg} size={22} />
                    <TextInput style={styles.inputFieldText} placeholder=" Enter Address " />
                </View>
                <SimpleCard style={{ alignSelf: 'center', width: '40%', marginTop: 20 }} title="Edit Profile" />
            </ScrollView>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },

    imageViewContainer: {
        backgroundColor: Constants.Colors.PRIMARY,
        height: 170,
        borderBottomRightRadius: 90,
        borderBottomLeftRadius: 90
    },

    profileImageView: {
        width: "24%",
        alignSelf: "center",
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 123,
        height: 93,
        borderWidth: 0.3,
        borderRadius: 60,
        backgroundColor: Constants.Colors.WHITE,
    },

    inputFieldText: {
        paddingLeft: 30,
        fontSize: 18,
    },

    inputFiledLayout: {
        borderBottomWidth: 0.5,
        padding: 20,
        flexDirection: "row",
        paddingLeft: 20,
        borderColor: "#808080"
    },

    editprofile: {
        alignSelf: "center",
        alignItems: 'center',
        justifyContent: 'center',
        width: "40%",
        backgroundColor: '#000',
        height: 45,
        textAlign: "center",
        fontSize: 20,
        fontWeight: "bold",
        borderRadius: 10,
        color: "white",
    },
});
