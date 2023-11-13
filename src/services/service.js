//node imports
import axios from "axios";

//local imports
import * as c from '../utils/constants'



class ApiService {
  getData(URL) {
    console.log("URL : "+c.API_URL + URL)
    return axios
      .get(c.API_URL + URL)
      .then(response => {
        console.log("Response : "+JSON.stringify(response.data))
        return response.data;
      })
      .catch(error => {
        console.log("Response : "+JSON.stringify(error))
        return error;

      });
  }

  postData(URL,params) {
    console.log("URL : "+c.API_URL + URL)
    return axios
      .post(c.API_URL + URL,params)
      .then(response => {
        console.log("Response : "+JSON.stringify(response.data))
        return response.data;
      })
      .catch(error => {
        console.log("Response : "+JSON.stringify(error))
        return error;
      });
  }
}

export default new ApiService();