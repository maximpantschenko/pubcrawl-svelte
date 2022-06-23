<script>
  import {push} from "svelte-spa-router";
  import {getContext} from "svelte";
  import jq from 'jquery';

  export let id;
  export let newpub;

  let name = "";
  let city = "";
  let country = "";
  export let lat = "";
  export let lng = "";
  let img = "";

  let errorMessage = "";

  const pubcrawlService = getContext("PubcrawlService");

  let fileInput = null;
  let files = null;

  jq( document ).ready(function() {
    fileInput = jq(".file-input");
    fileInput.change(setImageFileName);
  });
  
  async function setImageFileName(){
    if(fileInput.prop("files").length > 0){
      jq(".file-name").text(jq(".file-input").prop("files")[0].name);
    }
  }

  async function getPub(){
    let pub = await pubcrawlService.getPubById(id); 
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
    let success = await pubcrawlService.updatePub(id, name, city, country, lat, lng, img, files);
    if(success){
      push("/discover");
    }else{
      errorMessage = "Couldn't Update the Pub";
    }
  }

  async function createPub(){
    let success = await pubcrawlService.createPub(id, name, city, country, lat, lng, img, files);
    if(success){
      push("/discover");
    }else{
      errorMessage = "Couldn't Create the Pub";
    }
  }

  async function updateOrCreate(){
    if(!newpub) updatePub();
    else createPub();
  }

  async function deletePub(){
    console.log(id);
    let success = await pubcrawlService.deletePub(id);
    if(success){
      push("/discover");
    }else{
      errorMessage = "Couldn't delete the Pub";
    }
  }

  if(!newpub) getPub();
</script>

<form on:submit|preventDefault={updateOrCreate}>
    <div class="card">
      <div class="card-image">
        <figure class="image">
          <img src={img} alt="Image of Pub">
        </figure>
      </div>
      <div id="file-select" class="file has-name is-fullwidth">
        <label class="file-label"> <input class="file-input" name="imagefile" type="file" accept="image/png, image/jpeg" bind:files>
          <span class="file-cta">
            <span class="file-icon">
              <i class="fas fa-upload"></i>
            </span>
            <span class="file-label">
              Choose a file…
            </span>
           </span>
          <span class="file-name"></span>
        </label>
        <!--<button type="submit" class="button is-info">Upload</button>-->
      </div>
    </div>

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
  
    

    <div class="field is-grouped is-grouped-right">
      <p class="control">
        <button class="button is-light">Cancel</button>
      </p>
      {#if !newpub}
        <p class="control">
          <button on:click={deletePub} class="button is-danger">Delete</button>
        </p>
      {/if}
      <p class="control">
        <button type="submit" class="button is-primary">Save</button>
      </p>
    </div>

  </form>

{#if errorMessage}
  <div class="section">
    {errorMessage}
  </div>
{/if}