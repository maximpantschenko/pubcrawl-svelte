<script>
  import {push} from "svelte-spa-router";
  import {getContext} from "svelte";

  export let pubid;

  let id = "";
  let name = "";
  let city = "";
  let country = "";
  export let lat = "";
  export let lng = "";
  let img = "";

  let errorMessage = "";

  const pubcrawlService = getContext("PubcrawlService");
  async function getPub(){
    let pub = await pubcrawlService.getPubById(pubid); 
    id = pubid;
    name = pub.name;
    city = pub.city;
    country = pub.country;
    lat = pub.lat;
    lng = pub.lng;
    img = pub.img;

    if(!pub){
      errorMessage = "Couldn't find pub";
    }else{

    }
  }

  export function setLocations(_lat,_lng){
    lat=_lat;
    lng=_lng;
  }

  async function updatePub(){
    let success = await pubcrawlService.updatePub(pubid, name, city, country, lat, lng, img);
    if(success){
      push("/discover");
    }else{
      errorMessage = "Couldn't Update the Pub";
    }
  }

  getPub();
</script>

<form on:submit|preventDefault={updatePub}>
    <label>Enter Pub Details:</label>
    <div class="field">
      <label class="label">Name</label>
      <div class="control">
        <input class="input" type="text" placeholder="Enter Name" name="name" bind:value="{name}">
      </div>
    </div>
  
    <div class="field">
      <label class="label">City</label>
      <div class="control">
        <input class="input" type="text" placeholder="Enter City" name="city" bind:value="{city}">
      </div>
    </div>
  
    <div class="field">
      <label class="label">Country</label>
      <div class="control">
        <input class="input" type="text" placeholder="Enter Country" name="country" bind:value="{country}">
      </div>
    </div>
  
    <div class="field">
      <label class="label">Latitude</label>
      <div class="control">
        <input class="input input-lat" type="text" placeholder="Latitude" name="lat" bind:value="{lat}">
      </div>
    </div>
  
    <div class="field">
      <label class="label">Longitude</label>
      <div class="control">
        <input class="input input-lng" type="text" placeholder="Longitude" name="lng" bind:value="{lng}">
      </div>
    </div>
  
    <button class="button is-primary">Save</button>
  </form>

{#if errorMessage}
  <div class="section">
    {errorMessage}
  </div>
{/if}