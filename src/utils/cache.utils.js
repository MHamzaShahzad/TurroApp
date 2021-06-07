import AsyncStorage from '@react-native-async-storage/async-storage';

const UserData = async (key) => {
    try {
        console.log("success retrieveItem called...")
        const retrievedItem = await AsyncStorage.getItem(key);
        const item = JSON.parse(retrievedItem);
        return Promise.resolve(item);
    } catch (error) {
        console.log("Error " + error.message);
        return Promise.reject(error)

    }
}

export default { UserData }