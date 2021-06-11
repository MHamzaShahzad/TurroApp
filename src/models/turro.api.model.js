import APIUtils from '../utils/api.utils'
import Constants from '../utils/constants'

const getMakes = async () => {
    return await APIUtils.getApi(Constants.BASE_URL + "api/makes")
        .then(data => {
            console.log("success called with data " + JSON.stringify(data))
            return Promise.resolve(data)

        }).catch(error => {
            console.log("error called: " + error);
            return Promise.reject(error)
        });
}

const getModels = async (make_id) => {
    return await APIUtils.getApi(`${Constants.BASE_URL}api/models?fk_make_id=${make_id}`)
        .then(data => {
            console.log("success called with data " + data)
            return Promise.resolve(data)

        }).catch(error => {
            console.log("error called: " + error);
            return Promise.reject(error)
        });
}

const getCarTypes = async () => {
    return await APIUtils.getApi(Constants.BASE_URL + "api/car_types")
        .then(data => {
            console.log("success called with data " + data)
            return Promise.resolve(data)

        }).catch(error => {
            console.log("error called: " + error);
            return Promise.reject(error)
        });
}

const getUsers = async (user_id = 0) => {
    const params = (user_id != 0) ? "?id="+user_id : ""
    return await APIUtils.getApi(`${Constants.BASE_URL}api/user_list${params}`)
        .then(data => {
            console.log("success called with data " + data)
            return Promise.resolve(data)

        }).catch(error => {
            console.log("error called: " + error);
            return Promise.reject(error)
        });
}

const getSawaris = async (car_id = 0) => {
    const params = (car_id != 0) ? "?id="+car_id : ""
    return await APIUtils.getApi(`${Constants.BASE_URL}api/car_list${params}`)
        .then(data => {
            console.log("success called with data " + data)
            return Promise.resolve(data)

        }).catch(error => {
            console.log("error called: " + error);
            return Promise.reject(error)
        });
}

export default {
    getMakes,
    getModels,
    getCarTypes,
    getUsers,
    getSawaris
}