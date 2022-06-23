import axios from "axios";
import { latLng } from "leaflet";
import {user} from "../stores";

export class PubcrawlService {
  //baseUrl = "https://calm-cove-09278.herokuapp.com";
  baseUrl = "http://localhost:4000";

  constructor(baseUrl) {
    this.baseUrl = baseUrl;
    console.log(this.baseUrl);
    const pubcrawlCredentials = localStorage.pubcrawl;
    if (pubcrawlCredentials) {
      const savedUser = JSON.parse(pubcrawlCredentials);
      user.set({
        email: savedUser.email,
        token: savedUser.token,
      });
      axios.defaults.headers.common["Authorization"] = "Bearer " + savedUser.token;
    }
  }

  async login(email, password) {
    try {
      const response = await axios.post(`${this.baseUrl}/api/users/authenticate`, {email, password});
      axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.token;
      if (response.data.success) {
        user.set({
          email: email,
          token: response.data.token,
        });
        localStorage.pubcrawl = JSON.stringify({email:email, token:response.data.token});
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  }

  async logout() {
    user.set({
      email: "",
      token: "",
    });
    axios.defaults.headers.common["Authorization"] = "";
    localStorage.removeItem("pubcrawl");
  }

  async signup(firstName, lastName, email, password) {
    try {
      const userDetails = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
      };
      await axios.post(this.baseUrl + "/api/users", userDetails);
      return true;
    } catch (error) {
      return false;
    }
  }

  async getAllPubs(){
    try{
      const response = await axios.get(this.baseUrl + "/api/pubs");
      return response.data;
    } catch (error){
      return [];
    }
  }

  async getPubById(id){
    try{
      const response = await axios.get(this.baseUrl + "/api/pubs/"+id);
      return response.data;
    } catch (error){
      return false;
    }
  }

  async createPub(publistid, name, city, country, lat, lng, img, file){
    try{
      const pubDetails = {
        name: name,
        city: city,
        country: country,
        lat: lat,
        lng: lng,
        img: img,
      };
      if(file!=null) pubDetails.file = file[0];

      const url = this.baseUrl + "/api/publists/"+publistid+"/createpub";

      //await axios.post(this.baseUrl + "/api/publists/"+publistid+"/createpub", pubDetails);
      await axios({
        method: 'post',
        url: url,
        data: pubDetails,
        headers: {'Content-Type': 'multipart/form-data' }
      })
      .then(function (response) {
        //handle success
        console.log(response);
      })
      .catch(function (response) {
        //handle error
        console.log(response);
      });

      return true;
    }catch(error){
      console.log(error);
      return false;
    }
  }

  async updatePub(pubid, name, city, country, lat, lng, img, file) {
    try {
      const pubDetails = {
        pubid: pubid,
        name: name,
        city: city,
        country: country,
        lat: lat,
        lng: lng,
        img: img,
      };
      if(file!=null) pubDetails.file=file[0];

      const url = this.baseUrl + "/api/updatepub/"+pubDetails.pubid;

      //await axios.post(this.baseUrl + "/api/updatepub/"+pubDetails.pubid, pubDetails);
      await axios({
        method: 'post',
        url: url,
        data: pubDetails,
        headers: {'Content-Type': 'multipart/form-data' }
      })
      .then(function (response) {
        //handle success
        console.log(response);
      })
      .catch(function (response) {
        //handle error
        console.log(response);
      });
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async deletePub(pubid) {
    try {
      await axios.delete(this.baseUrl + "/api/pubs/"+pubid);
      return true;
    } catch (error) {
      return false;
    }
  }


}