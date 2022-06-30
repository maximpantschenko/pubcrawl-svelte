<script>
  import {push} from "svelte-spa-router";
  import {getContext, onMount} from "svelte";
  import jq from 'jquery';

  export let id;
  export let newpub;

  let name = "";
  let description = "";
  let city = "";
  let country = "";
  export let lat = "";
  export let lng = "";
  let img = "";

  let categoriesMusic = [];

  let categoriesMusicSelectable = [];

  let errorMessage = "";

  const pubcrawlService = getContext("PubcrawlService");

  let fileInput = null;
  let files = null;


  onMount(async () => {
      console.log("on mount first");
      categoriesMusicSelectable = await pubcrawlService.getCategoriesMusic();
      //const pubs = await pubcrawlService.getAllPubs();
      fileInput = jq(".file-input");
      fileInput.change(setImageFileName);

      const categoryMusic = jq(".category-music-dropdown");
      categoryMusic.click(function() {
          if(categoryMusic.hasClass("is-active")) categoryMusic.removeClass("is-active");
          else categoryMusic.addClass("is-active");
      });

      jq( document ).ready(function() {
        console.log("document ready first");
        const categoryMusicItems = jq(".category-music-table .category-music-item");
        categoryMusicItems.each(function( index ) {
          const item = jq(this);
          initCategoriesOfPub(item);
          jq(item).click(function() {
            setSelectStatusCategoriesMusic(item);
            setCategoriesOfPub(categoryMusicItems);
          });
        });
      });
    
    });
  
  async function setImageFileName(){
    if(fileInput.prop("files").length > 0){
      jq(".file-name").text(jq(".file-input").prop("files")[0].name);
    }
  }

  async function setSelectStatusCategoriesMusic(item){
    if(item.hasClass("is-primary")) {
      item.removeClass("is-primary").addClass("is-danger");
      item.find(".category-music-icon").removeClass("fa-plus").addClass("fa-minus");
      categoriesMusic.push(item.attr("data-id"));
    } else {
      item.removeClass("is-danger").addClass("is-primary");
      item.find(".category-music-icon").removeClass("fa-minus").addClass("fa-plus");
    }
  }

  async function initCategoriesOfPub(item){
    for(var i=0; i<categoriesMusic.length; i++){
      if(categoriesMusic[i]==item.attr("data-id")){
        item.removeClass("is-primary").addClass("is-danger");
        item.find(".category-music-icon").removeClass("fa-plus").addClass("fa-minus");
      }
    }
  }

  async function setCategoriesOfPub(allCategories){
    categoriesMusic = [];
    allCategories.each(function( index ) {
      const item = jq(this);
      if(item.hasClass("is-danger")) categoriesMusic.push(item.attr("data-id"));
    });
  }

  async function getPub(){
    console.log("getPub first");
    let pub = await pubcrawlService.getPubById(id); 
    name = pub.name;
    description = pub.description;
    city = pub.city;
    country = pub.country;
    lat = pub.lat;
    lng = pub.lng;
    img = pub.img;
    pub.categoriesMusic.forEach(element => categoriesMusic.push(element._id));
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
    console.log("function updatePub catagoriesMusic");
    console.log(categoriesMusic);
    let success = await pubcrawlService.updatePub(id, name, description, city, country, lat, lng, img, categoriesMusic, files);
    if(success){
      push("/discover");
    }else{
      errorMessage = "Couldn't Update the Pub";
    }
  }

  async function createPub(){
    console.log("function create catagoriesMusic");
    console.log(categoriesMusic);
    let success = await pubcrawlService.createPub(name, description, city, country, lat, lng, img, categoriesMusic, files);
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
    let success = await pubcrawlService.deletePub(id);
    if(success){
      push("/discover");
    }else{
      errorMessage = "Couldn't delete the Pub";
    }
  }

  if(!newpub) getPub();
</script>

<form on:submit|preventDefault={updateOrCreate} id="pubform">
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
      <label class="label">Description</label>
      <div class="control">
        <textarea class="textarea" type="text" form="pubform" rows="5" placeholder="Enter Description" name="description" bind:value="{description}"></textarea>
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
      <label class="label">Category Music</label>
      <div class="control"> 
        <div class="category-music-dropdown dropdown">
          <div class="dropdown-trigger">
            <span class="button" aria-haspopup="true" aria-controls="dropdown-menu3">
              <span>Music Category</span>
              <span class="icon is-small">
                <i class="fas fa-angle-down" aria-hidden="true"></i>
              </span>
            </span>
          </div>
          <div class="dropdown-menu" id="dropdown-menu3" role="menu">
            <div class="dropdown-content" style="overflow:scroll;height:200px">
              <table class="table category-music-table is-fullwidth">
                <tbody>
                  {#each categoriesMusicSelectable as music}
                    <tr>
                      <td>{music.name}</td>
                      <td>
                        <span class="button category-music-item is-small is-primary" data-id="{music._id}">
                          <span class="icon is-small">
                            <i class="category-music-icon fas fa-plus"></i>
                          </span>
                        </span>
                      </td>
                    </tr>
                  {/each}
                </tbody>
              </table>
            </div>
          </div>
        </div>
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

<style>
 
</style>