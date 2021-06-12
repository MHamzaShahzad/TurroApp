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

const getModels = async (make_id = null) => {
    const params = (make_id) ? "?fk_make_id="+make_id : "?all"
    return await APIUtils.getApi(`${Constants.BASE_URL}api/models${params}`)
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

const getSawaris = async (car_id = null, user_id = null) => {
    let params = (car_id != null) ? "?id="+car_id : ""
    params += (user_id != null) ? "?fk_user_id="+user_id : ""
    return await APIUtils.getApi(`${Constants.BASE_URL}api/car_list${params}`)
        .then(data => {
            console.log("success called with data " + data)
            return Promise.resolve(data)

        }).catch(error => {
            console.log("error called: " + error);
            return Promise.reject(error)
        });
}

const getYears = async () => {
    return await APIUtils.getApi(Constants.BASE_URL + "api/model_year")
        .then(data => {
            console.log("success called with data " + JSON.stringify(data))
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
    getSawaris,
    getYears
}