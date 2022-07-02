<script>
    import {pop, push} from "svelte-spa-router";
    import {getContext, onMount} from "svelte";
    import MainNavigator from "../components/MainNavigator.svelte";
    import jq from 'jquery';
    export let params;
    
    let errorMessage = "";
    let successMessage = "";
  
    const pubcrawlService = getContext("PubcrawlService");

    let noImages = true;

    let images = [];
    let name ="";
    let city ="";
  
    onMount(async () => {
        getImages();
    });

    async function getImages(){
        const pub = await pubcrawlService.getPubById(params.pubid);
        pub.images.forEach(function(image){
            images.push(image);
        });
        if(pub.images.length > 0) noImages = false;
        else noImages = true;
        images = images;
        name = pub.name;
        city = pub.city;
    }

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
            <span class="title">{name}</span>
        </div>
    </div>  
</div>

{#each images as image}
    <div class="box">
        <figure class="image is-3by2">
            <img src="{image}">
        </figure>
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