<script>
    import {pop, push} from "svelte-spa-router";
    import {getContext, onMount} from "svelte";
    import MainNavigator from "../components/MainNavigator.svelte";
    import jq from 'jquery';
    export let params;
    
    let errorMessage = "";
    let successMessage = "";

    let loading = {
      value: 10,
      show: false,
  };
  
    const pubcrawlService = getContext("PubcrawlService");
  
    let fileInput = null;
    let files = null;
    let pub = null;
    let images = [];
    let noImages = true;
  
  
    onMount(async () => {
        getImages();
        fileInput = jq(".file-input");
        fileInput.change(setImageFileName);
    });

    async function setImageFileName(){
        if(fileInput.prop("files").length > 0){
            jq(".file-name").text(jq(".file-input").prop("files")[0].name);
        }
    }

    async function getImages(){
        loading.show = true;
        pub = await pubcrawlService.getPubById(params.pubid);
        pub.images.forEach(function(image){
            images.push(image);
        });
        images = images;
        if(pub.images.length > 0) noImages = false;
        else noImages = true;
        loading.show = false;
    }

    async function uploadImage(){
        loading.show = true;
        const success = await pubcrawlService.uploadImage(params.pubid, files);
        if(success){
            successMessage = "Uploaded Image successfully";
            getImages();
        }else{
            errorMessage = "Couldn't upload Image";
        }
        loading.show = false;
    }

    /*
    async function deleteImage(image){
        const success = await pubcrawlService.deleteImage(params.pubid, image);
        if(success){
            successMessage = "Deleted Image successfully";
        }else{
            errorMessage = "Couldn't delete Image";
        }
    }
    */

    async function goBack(){
        pop();
    }

</script>

<MainNavigator/>
<div class="box">
    <div class="columns is-12">
        <div class="column is-1">
            <a class="button" on:click={goBack}><i class="fa-solid fa-arrow-left"></i></a>
        </div>
        <div class="column">
            <span class="title">Edit Gallery</span>
        </div>
    </div>  
</div>
<div class="box">
    <form on:submit|preventDefault={uploadImage} id="pubform">
        <label>Upload a Image</label>
        <div class="field">
            <div class="control">
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
        </div>
        <div class="field is-grouped is-grouped-right">
            <p class="control">
              <a class="button is-light" on:click={goBack}>Cancel</a>
            </p>
            <p class="control">
              <button type="submit" class="button is-primary">Save</button>
            </p>
        </div>
    </form>
    {#if loading.show}
      <progress class="progress is-small is-primary" max="100" style="margin-top: 10px">15%</progress>
    {/if}
</div>

{#each images as image}
    <div class="box">
        <figure class="image is-3by2">
            <img src="{image}">
        </figure>
        <!--
        <div class="field is-grouped is-grouped-right" style="margin-top: 10px">
            <p class="control">
              <a class="button is-danger" on:click={() => {deleteImage(image)}}>Delete</a>
            </p>
        </div>
        -->
    </div>
{/each}

{#if noImages }
    <div class="box">
        <div class="notification is-link is-light">
            This Pub has no Gallery
        </div>
    </div>
{/if}
<style>
    .box{
        margin: 10px;
    }
</style>