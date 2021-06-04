import React, { useState } from 'react';
import {
    ScrollView,
    Text,
    View,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity
} from 'react-native';
import Styles from '../styles';
import FlatListSlider from '../components/imageSlider/flatlist.imageslider.component';
import SimpleCard from '../components/cards/simple.card.component';
import styles from '../styles';
import Constants from '../utils/constants';

export default function DescriptionScreen({ props, navigation }) {
    const [data, setData] = useState([
        {
            key: 0,
            image:
                'https://images.unsplash.com/photo-1567226475328-9d6baaf565cf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60',
            desc: 'Silent Waters in the mountains in midst of Himilayas',
        },
        {
            key: 1,
            image:
                'https://images.unsplash.com/photo-1455620611406-966ca6889d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1130&q=80',
            desc:
                'Red fort in India New Delhi is a magnificient masterpeiece of humans',
        },
        {
            key: 2,
            image:
                'https://images.unsplash.com/photo-1477587458883-47145ed94245?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
            desc:
                'Sample Description below the image for representation purpose only',
        },
        {
            key: 3,
            image:
                'https://images.unsplash.com/photo-1568700942090-19dc36fab0c4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
            desc:
                'Sample Description below the image for representation purpose only',
        },
        {
            key: 4,
            image:
                'https://images.unsplash.com/photo-1584271854089-9bb3e5168e32?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1051&q=80',
            desc:
                'Sample Description below the image for representation purpose only',
        },
    ]);
    // const screenWidth = Math.round(Dimensions.get('window').width);
    return (
        <>
            <SafeAreaView style={styles.AppStyles.container}>
                <ScrollView showsVerticalScrollIndicator={false} >
                    <FlatListSlider
                        data={data}
                        timer={5000}
                        onPress={item => alert(JSON.stringify(item))}
                        indicatorContainerStyle={{ position: 'absolute', bottom: 20 }}
                        indicatorActiveColor={Constants.Colors.PRIMARY}
                        indicatorInActiveColor={Constants.Colors.WHITE}
                        indicatorActiveWidth={30}
                        animation
                    />
                    <View style={{ padding: 10 }}>
                        <View style={style.outerTextViewNoBg}>
                            <View style={style.innerTextView}>
                                <Text style={style.textStyleHeading}>Toyota Corola</Text>
                            </View>
                            <View style={style.innerTextView}>
                                <Text style={style.textStyleHeading}>10000/Day</Text>
                            </View>
                        </View>
                        <View style={style.outerTextViewNoBg}>
                            <SimpleCard title="5" image='car' icon_color={Constants.Colors.WHITE} />
                            <SimpleCard title="Petrol" image='car' icon_color={Constants.Colors.WHITE} />
                            <SimpleCard title="Sedan" image='car' icon_color={Constants.Colors.WHITE} />
                            <SimpleCard title="Local" image='car' icon_color={Constants.Colors.WHITE} />
                            <SimpleCard title="Exp" image='car' icon_color={Constants.Colors.WHITE} />
                        </View>
                        <View style={style.outerTextView}>
                            <View style={style.innerTextView}>
                                <Text style={style.textStyleTitle}>Hello</Text>
                                <Text style={style.textStyle}>Hello</Text>
                            </View>
                            <View style={style.innerTextView}>
                                <Text style={style.textStyleTitle}>World</Text>
                                <Text style={style.textStyle}>World</Text>
                            </View>
                        </View>
                        <View style={style.outerTextViewNoBg}>
                            <View style={style.innerTextView}>
                                <Text style={style.textStyleTitle}>Hello</Text>
                                <Text style={style.textStyle}>Hello</Text>
                            </View>
                            <View style={style.innerTextView}>
                                <Text style={style.textStyleTitle}>World</Text>
                                <Text style={style.textStyle}>World</Text>
                            </View>
                        </View>
                        <View style={style.outerTextView}>
                            <View style={style.innerTextView}>
                                <Text style={style.textStyleTitle}>Hello</Text>
                                <Text style={style.textStyle}>Hello</Text>
                            </View>
                            <View style={style.innerTextView}>
                                <Text style={style.textStyleTitle}>World</Text>
                                <Text style={style.textStyle}>World</Text>
                            </View>
                        </View>
                        <View style={style.outerTextViewNoBg}>
                            <View style={style.innerTextView}>
                                <Text style={style.textStyleTitle}>Hello</Text>
                                <Text style={style.textStyle}>Hello</Text>
                            </View>
                            <View style={style.innerTextView}>
                                <Text style={style.textStyleTitle}>World</Text>
                                <Text style={style.textStyle}>World</Text>
                            </View>
                        </View>
                        <View>
                            <Text style={style.textStyleTitle}>Description</Text>
                            <Text style={style.textStyle}>lorem ipsum doller lorem ipsum doller lorem ipsum doller lorem ipsum doller lorem ipsum doller lorem ipsum doller lorem ipsum doller lorem ipsum doller lorem ipsum doller lorem ipsum doller lorem ipsum doller lorem ipsum doller lorem ipsum doller</Text>
                        </View>
                    </View>
                </ScrollView>
                <SimpleCard style={{}} title="Book Now" customClick={() => navigation.navigate(Constants.NavigationItems.BookSawariScreen)} />
            </SafeAreaView>
            <View style={style.bottomTabs}>
                <TouchableOpacity style={{ flex: 0.5, justifyContent: 'center', alignItems: 'center', backgroundColor: Constants.Colors.WHITE }}>
                    <Text>Make Call</Text>
                </TouchableOpacity>
                <View style={{ width: 1, height: "100%", backgroundColor: Constants.Colors.BLACK }}></View>
                <TouchableOpacity style={{ flex: 0.5, justifyContent: 'center', alignItems: 'center', backgroundColor: Constants.Colors.WHITE }}>
                    <Text>Send SMS</Text>
                </TouchableOpacity>
            </View>
        </>
    )
}

const style = StyleSheet.create({
    textStyleHeading: {
        textAlign: 'center',
        fontFamily: Constants.Fonts.FAMILY,
        fontSize: 20
    },
    textStyleTitle: {
        textAlign: 'center',
        fontFamily: Constants.Fonts.FAMILY,
        fontSize: 17
    },
    textStyle: {
        textAlign: 'center',
        fontFamily: Constants.Fonts.FAMILY,
    },
    outerTextView: {
        flex: 2, backgroundColor: '#cacaca', flexDirection: 'row', padding: 10, alignItems: 'center', justifyContent: 'space-evenly'
    },
    outerTextViewNoBg: {
        flex: 2, flexDirection: 'row', padding: 10, alignItems: 'center', justifyContent: 'space-evenly'
    },
    innerTextView: {
        flex: 2, flexDirection: 'column', padding: 10
    },
    bottomTabs: {
        backgroundColor: '#cacaca',
        height: 60,
        flexDirection: 'row',
    }
});