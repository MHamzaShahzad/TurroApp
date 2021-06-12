import {Linking, Platform, Alert} from 'react-native'

const openSMSApp = (phoneNumber, message) => {
    const separator = Platform.OS === 'ios' ? '&' : '?' 
    const url = `sms:${phoneNumber}${separator}body=${message}`
    Linking.canOpenURL(url).then(supported => {
        if (!supported) {
          console.log('Unsupported url: ' + url)
        } else {
          return Linking.openURL(url)
        }
      }).catch(err => console.error('An error occurred', err))
}

const openCallDialer = (phoneNumber) => {
    let phone = null;
    if (Platform.OS !== 'android') {
        phone = `telprompt:${phoneNumber}`;
      }
      else  {
        phone = `tel:${phoneNumber}`;
      }
      Linking.canOpenURL(phone)
      .then(supported => {
        if (!supported) {
          Alert.alert('Phone number is not available');
        } else {
          return Linking.openURL(phone);
        }
      })
      .catch(err => console.log(err));
}

export { openSMSApp, openCallDialer }