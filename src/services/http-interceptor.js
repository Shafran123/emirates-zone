import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { environment} from "../enviornment/environment"

class HttpInterceptor {
  constructor() {
    const defaultOptions = {
      headers: {
        "Content-Type": "application/json",
        "Accept": "aplication/json",
        "Access-Control-Allow-Origin": "*",
      },
    };
    const instance = axios.create(defaultOptions);

    instance.interceptors.request.use(
      async (request) => {

      try {
        const authToken = await AsyncStorage.getItem("token");

        if (authToken) {
          request.headers.Authorization = "Bearer " + authToken;
        }
      } catch (error) {
        console.log(error)
      }
        return request;
      },
      (error) => {
        if (error.request) {
          // The request was made but no response was received
          console.log(
            "[ERROR]",
            " [HTTP Interceptor, The request was made but no response was received",
            error.request
          );
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log(
            "[ERROR]",
            " [HTTP Interceptor, Something happened in setting up the request ",
            error
          );
        }
        setTimeout(() => {}, 2000);
        return error;
      }
    );

    instance.interceptors.response.use((response) => {
        // console.log('[INFO]', ' [HTTP Interceptor, Server responded with a response', response);
  
        // Set success the notification
        if (response.data && response.data.message && response.data.message !== '') {
          const notification = {
            level: 1,
            message: response.data.message,
          };
        }
        return response;
      }, (error) => {
        setTimeout(() => {
  
        }, 2000);
        if (!error.response) {
  
          console.log('[ERROR]', ' [HTTP Interceptor, Network Error', error);
  
        } else {
          // The request was made and the server responded with a response
          console.log('[ERROR]', ' [HTTP Interceptor, The request was made and the server responded', error.response);
          if (error.response.status) {
            switch (error.response.status) {
              case 401: {
                // Set the unauthorized error notification
                const notification = {
                  level: 3,
                  message: 'You are not authorized to access this feature.',
                };
                break;
              }
              default: {
                console.log('[ERROR]', ' [HTTP Interceptor, Status Code', error.response.status);
                // Set the generic error notification
                const notification = {
                  level: 3,
                  message: error.response.data.message
                    ? error.response.data.message
                    : 'An unknown error has occurred. Please contact system administrator.',
                };
                break;
              }
            }
          }
          return Promise.reject(error);
        }
      });
  
      return instance;
  }
}

export default HttpInterceptor;
