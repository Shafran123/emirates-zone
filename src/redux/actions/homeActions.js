import AsyncStorage from "@react-native-async-storage/async-storage";
import { environment } from "../../enviornment/environment";
import { HttpInterceptor } from "../../services";
import { GET_ALL_DRIVERS, GET_ALL_FLIGHTS } from "./config";

const http = new HttpInterceptor();

export const registerUser = (data, callback) => (dispatch) => {
    console.log(data);
    const endpoint = `${environment.api_base_url}/register`

    return http.post(endpoint, data).then(res => {
        console.log(res.data);

        AsyncStorage.setItem("token", res.data.token);
        AsyncStorage.setItem("user", JSON.stringify(res.data.user));

        callback(true)
    }).catch(err => {
        console.log(err);
        callback(false)
    })
}


export const loginUser = (data, callback) => (dispatch) => {
    console.log(data);
    const endpoint = `${environment.api_base_url}/login`

    return http.post(endpoint, data).then(res => {
        console.log(res.data , 'eeeoeo');

        AsyncStorage.setItem("token", res.data.token);
        AsyncStorage.setItem("user", JSON.stringify(res.data.user));

        callback(true)
    }).catch(err => {
        console.log(err , 'eeeoeo');
        callback(false)
    })
}


export const logoutUser = (callback) => (dispatch) => {
    const endpoint = `${environment.api_base_url}/logout`

    return http.post(endpoint).then(res => {
        console.log(res.data);
        AsyncStorage.clear();
        callback(true)
    }).catch(err => {
        console.log(err);
        callback(false)
    })
}


export const getAllDrivers = (callback) => (dispatch) => {
    const endpoint = `${environment.api_base_url}/drivers`

    return http.get(endpoint).then(res => {
        console.log(res.data);
        dispatch({
            type: GET_ALL_DRIVERS,
            payload: (res.data),
        });
        callback(true)
    }).catch(err => {
        console.log(err);
        callback(false)
    })
}

export const addDriverDetails = (data, callback) => (dispatch) => {
    const endpoint = `${environment.api_base_url}/drivers`

    return http.post(endpoint, data).then(res => {
        console.log(res.data);

        callback(true)
    }).catch(err => {
        console.log(err);
        callback(false)
    })
}


export const udpateDriverDetails = (data, callback) => (dispatch) => {
    const endpoint = `${environment.api_base_url}/drivers/${data?.id}`

    return http.put(endpoint, data).then(res => {
        console.log(res.data);

        callback(true)
    }).catch(err => {
        console.log(err);
        callback(false)
    })
}

export const deleteDriver = (data, callback) => (dispatch) => {
    const endpoint = `${environment.api_base_url}/drivers/${data?.id}`

    return http.delete(endpoint).then(res => {
        console.log(res.data);
        callback(true)
    }).catch(err => {
        console.log(err);
        callback(false)
    })
}

export const getFlights = (page, callback) => (dispatch) => {
    const endpoint = `https://api.instantwebtools.net/v1/passenger?page=${page}&size=10`

    //console.log(endpoint, 'endpoint');

    return http.get(endpoint).then(res => {
        //console.log(res.data)
        dispatch({
            type: GET_ALL_FLIGHTS,
            payload: (res.data.data),
        });
        callback(true)
    }).catch(err => {
        console.log(err);
        callback(false)
    })
}
