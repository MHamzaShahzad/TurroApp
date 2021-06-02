import React from 'react';
import {Image, SafeAreaView, TouchableOpacity} from 'react-native';

export default function AddSawari({props, navigation}) {
    return ( 
        <SafeAreaView style={{flex: 1}}>
            <>
                <TouchableOpacity>
                    <Image source={{uri: 'https://user-images.githubusercontent.com/20684618/31289519-9ebdbe1a-aae6-11e7-8f82-bf794fdd9d1a.png', height: 150, width: '100%'}} />
                </TouchableOpacity>
            </>
        </SafeAreaView>
    );
}