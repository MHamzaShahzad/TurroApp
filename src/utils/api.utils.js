import axios from 'axios';
const postApi = async (method, url, formData) => {
    return await axios({
        method: method,
        url: url,
        data: formData,
        
    }).then(response => {
        console.log("success called with status " + response.status)
        return Promise.resolve(response.data)

    }).catch(error => {
        console.log("error called: " + error);
        return Promise.reject(error)
    });
}

const postApiMultipart = async (method, url, formData) => {
    return await axios({
        method: method,
        url: url,
        data: formData,
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }).then(response => {
        console.log("success called with status " + response.status)
        return Promise.resolve(response.data)

    }).catch(error => {
        console.log("error called");
        return Promise.reject(error)
    });
}

const getApi = async (url) => {
    return await axios.get(url).then(response => {
        console.log("success called with status " + response.status)
        return Promise.resolve(response.data)

    }).catch(error => {
        console.log("error called");
        return Promise.reject(error)
    });
}
export default { postApi, getApi, postApiMultipart }