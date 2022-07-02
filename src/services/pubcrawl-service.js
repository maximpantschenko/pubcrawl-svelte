import axios from "axios";
import { params } from "svelte-spa-router";
import {user} from "../stores";

export class PubcrawlService {
  baseUrl = "https://calm-cove-09278.herokuapp.com";
  //baseUrl = "http://localhost:4000";

  constructor(baseUrl) {
    this.baseUrl = baseUrl;
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
    localStorage.removeItem("donation");
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

  async getUserById(id){
    try{
      const response = await axios.get(this.baseUrl + "/api/users/"+id);
      return response.data;
    } catch (error){
      return false;
    }
  }

  async getCurrentUser(){
    try{
      const response = await axios.get(this.baseUrl + "/api/users/current");
      return response.data;
    } catch (error){
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

  async getAllPubsExtra(){
    try{
      const response = await axios.get(this.baseUrl + "/api/pubs/extra");
      return response.data;
    } catch(error){
      return [];
    }
  }

  async getMyPubs(){
    try{
      const response = await axios.get(this.baseUrl + "/api/pubs/currentuser");
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

  async getPubSearchName(string){
    try{
      const response = await axios.get(this.baseUrl + "/api/pubs/searchname/"+string);
      return response.data;
    } catch (error){
      return [];
    }
  }

  async getPubSearch(searchString){
    try{
      const response = await axios.get(this.baseUrl + "/api/pubs/search/"+searchString);
      return response.data;
    } catch (error){
      return [];
    }
  }

  async getCategoriesMusic(){
    try{
      const response = await axios.get(this.baseUrl + "/api/getCategoriesMusic/");
      return response.data;
    } catch (error){
      return [];
    }
  }

  /*
  async getCategoriesMusicByIds(categoriesMusicIds){
    try{
      const form = new FormData();
      categoriesMusicIds.forEach(element => form.append("ids",element));

      const url = this.baseUrl + "/api/getCategoriesMusicByIds";

      const result = await axios({
        method: 'post',
        url: url,
        data: form,
        headers: {'Content-Type': 'multipart/form-data' }
      })
      .then(function (response) {
        //handle success
      })
      .catch(function (response) {
        //handle error
      });
      return result;
    }catch(error){
      return [];
    }
  }*/

  async createPub(name, description, city, country, lat, lng, img, categoriesMusic, file){
    try{

      const form = new FormData();
      form.append("name",name);
      form.append("description", description);
      form.append("city",city);
      form.append("country",country);
      form.append("lat",lat);
      form.append("lng",lng);
      categoriesMusic.forEach(element => form.append("categoriesMusic",element));
      if(file!=null) form.append("file", file[0]);

      const url = this.baseUrl + "/api/pubs/create";

      await axios({
        method: 'post',
        url: url,
        data: form,
        headers: {'Content-Type': 'multipart/form-data' }
      })
      .then(function (response) {
        //handle success
      })
      .catch(function (response) {
        //handle error
      });

      return true;
    }catch(error){
      return false;
    }
  }

  async updatePub(pubid, name, description, city, country, lat, lng, img, categoriesMusic, file) {
    try {
      const form = new FormData();
      form.append("name",name);
      form.append("description", description);
      form.append("city",city);
      form.append("country",country);
      form.append("lat",lat);
      form.append("lng",lng);
      form.append("img",img);
      categoriesMusic.forEach(element => form.append("categoriesMusic",element));
      if(file!=null) form.append("file", file[0]);

      const url = this.baseUrl + "/api/updatepub/"+pubid;

      //await axios.post(this.baseUrl + "/api/updatepub/"+pubDetails.pubid, pubDetails);
      await axios({
        method: 'post',
        url: url,
        data: form,
        headers: {'Content-Type': 'multipart/form-data' }
      })
      .then(function (response) {
        //handle success
      })
      .catch(function (response) {
        //handle error
      });
      return true;
    } catch (error) {
      return false;
    }
  }

  async uploadImage(pubid, file) {
    try {
      const form = new FormData();
      if(file!=null) form.append("file", file[0]);

      const url = this.baseUrl + "/api/pubs/uploadimage/"+pubid;

      await axios({
        method: 'post',
        url: url,
        data: form,
        headers: {'Content-Type': 'multipart/form-data' }
      })
      .then(function (response) {
        //handle success
      })
      .catch(function (response) {
        //handle error
      });
      return true;
    } catch (error) {
      return false;
    }
  }

  /*
  async deleteImage(pubid, image){
    try {
      const response = await axios.post(this.baseUrl + "/api/pubs/deleteimage/" + pubid, image);
      return response.status == 200;
    } catch (error) {
      return false;
    }
  }
  */

  async deletePub(pubid) {
    try {
      await axios.delete(this.baseUrl + "/api/pubs/"+pubid);
      return true;
    } catch (error) {
      return false;
    }
  }

  // /api/comments/add

  async createComment(text, date, likes, pubid){
    try{
      const form = new FormData();
      form.append("text", text);
      //form.append("city",city);
      //form.append("likes", likes);
      form.append("pubid", pubid);

      const url = this.baseUrl + "/api/comments/add";

      await axios({
        method: 'post',
        url: url,
        data: form,
        headers: {'Content-Type': 'multipart/form-data' }
      })
      .then(function (response) {
        //handle success
        console.log("success response of axios");
        console.log(response.config);
      })
      .catch(function (response) {
        //handle error
        console.log("error response of axios");
        console.log(response.config);
      });

      return true;
    }catch(error){
      console.log(error);
      return false;
    }
  }

  async deleteComment(id){
    try {
      await axios.delete(this.baseUrl + "/api/comments/delete/"+id);
      return true;
    } catch (error) {
      return false;
    }
  }

  async getCommentsByPubId(id){
    try{
      const response = await axios.get(this.baseUrl + "/api/comments/bypubid/"+id);
      return response.data;
    } catch (error){
      return false;
    }
  }

}