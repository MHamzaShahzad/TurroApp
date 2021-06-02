import React from 'react';
import {
    SafeAreaView,
    Text,
    View,
    Image,
    TouchableOpacity
} from 'react-native';
import Styles from '../styles';
import SimpleCard from '../components/cards/simple.card.component';
import logoCS from '../assets/app_icon.png';
import closeIcon from '../assets/icon_close.png';


export default function AuthScreen({navigation}) {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={Styles.AppStyles.container}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ alignItems: 'center', alignSelf: 'flex-end', marginRight: 10}}>
                    <Image source={closeIcon} style={{height: 30, width: 30}} resizeMode='contain' />
                </TouchableOpacity>
                <View style={{ flex: 0.5, alignItems: 'center', justifyContent: 'flex-end' }}>
                    <Image source={logoCS} style={{ width: 200, height: 130 }} resizeMode={'contain'}></Image>
                    <Text style={[Styles.AppStyles.font, Styles.AppStyles.textColorPrimary, { fontSize: 18, fontWeight: 'bold' }]}>CHALO TURRO</Text>
                </View>
                <View style={{ flex: 0.4, alignItems: 'center', justifyContent: 'flex-end' }}>
                    <SimpleCard style={{ width: 170 }} title="Sign In With Email" customClick={() => { navigation.navigate('EmailLoginScreen') }} />
                    <SimpleCard style={{ width: 170 }} title="Sign In With Number" customClick={() => { navigation.navigate('NumberLoginScreen') }} />
                </View>
                <TouchableOpacity style={{ position: 'absolute', bottom: 0, margin: 20, alignSelf: 'center' }} onPress={() => {navigation.navigate('RegisterScreen')}}>
                    <Text style={[Styles.AppStyles.textColorPrimary, Styles.AppStyles.appFont, {fontWeight: 'bold',}]} >SIGN UP</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}