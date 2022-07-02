<script>
    import Chart from 'svelte-frappe-charts';
    import {push} from "svelte-spa-router";
    import {getContext, onMount} from "svelte";

    const pubcrawlService = getContext("PubcrawlService");

    let pubs = [];
    let users = [];
    let citys = [];
    let countrys = [];

    let pubsByUser = null;
    let pubsByCity = null;
    let pubsByCountry = null;

    onMount(async () => {
      pubs = await pubcrawlService.getAllPubsExtra();
      setData();
      
    });

    //***************** set Objects ******************/
    function setUsers(){
      users = [];
      pubs.forEach(function(pub){
        let userExist = false; 
        for(let i=0; i<users.length; i++){
          if(users[i].email == pub.email) userExist = true;
        }
        if(userExist==false) users.push({firstName: pub.firstName, lastName: pub.lastName, email: pub.email});
      });
    }

    function setCitys(){
      citys = [];
      pubs.forEach(function(pub){
        let cityExist = false;
        for(let i=0; i<citys.length; i++){
          if(citys[i].name == pub.city) cityExist = true;
        }
        if(cityExist==false) citys.push({name: pub.city});
      });
    }

    function setCountrys(){
      countrys = [];
      pubs.forEach(function(pub){
        let countryExist = false;
        for(let i=0; i<countrys.length; i++){
          if(countrys[i].name == pub.country) countryExist = true;
        }
        if(countryExist==false) countrys.push({name: pub.country});
      });
    }

    //******************** set Labels *******************/
    function setLabelsByUser(){
      const labels = [];
      users.forEach(function(user){
        labels.push(user.firstName + " " + user.lastName);
      });
      return labels;
    }

    function setLabelsByCity(){
      const labels = [];
      citys.forEach(function(city){
        labels.push(city.name);
      });
      return labels;
    }

    function setLabelsByCountry(){
      const labels = [];
      countrys.forEach(function(country){
        labels.push(country.name);
      });
      return labels;
    }

    //*********************** set Values ****************/
    function setValuesByUser(){
      const values = [];
      users.forEach(function(user){
        let count = 0;
        for(let i=0; i<pubs.length; i++){
          if(user.email == pubs[i].email) count++;
        }
        values.push(count);
      });
      return values;
    }

    function setValuesByCity(){
      const values = [];
      citys.forEach(function(city){
        let count = 0;
        for(let i=0; i<pubs.length; i++){
          if(city.name == pubs[i].city) count++;
        }
        values.push(count);
      });
      return values;
    }

    function setValuesByCountry(){
      const values = [];
      countrys.forEach(function(country){
        let count = 0;
        for(let i=0; i<pubs.length; i++){
          if(country.name == pubs[i].country) count++;
        }
        values.push(count);
      });
      return values;
    }

    function setData(){
      setUsers();
      setCitys();
      setCountrys();

      pubsByUser = {
        labels: setLabelsByUser(),
        datasets: [
          {
              name: "Created Pubs",
              values: setValuesByUser(),
          }
        ]
      };

      pubsByCity = {
        labels: setLabelsByCity(),
        datasets: [
          {
            name: "Pubs in this City",
            values: setValuesByCity(),
          }
        ]
      };

      pubsByCountry = {
        labels: setLabelsByCountry(),
        datasets: [
          {
            name: "Pubs in this Country",
            values: setValuesByCountry(),
          }
        ]
      };
    }


  </script>
  
  {#if pubsByUser}
    <div class="columns box">
      <div class="column has-text-centered">
        <h1 class="title is-4">Created Pubs by Users</h1>
        <Chart data={pubsByUser} type="bar"/>
      </div>
    </div>
    <div class="columns box">
      <div class="column has-text-centered">
        <h1 class="title is-4">Created Pubs by Citys</h1>
        <Chart data={pubsByCity} type="bar"/>
      </div>
    </div>
    <div class="columns box">
      <div class="column has-text-centered">
        <h1 class="title is-4">Created Pubs by Countrys</h1>
        <Chart data={pubsByCountry} type="bar"/>
      </div>
    </div>
  {/if}


<style>
  .box{
    margin: 10px;
  }
</style>