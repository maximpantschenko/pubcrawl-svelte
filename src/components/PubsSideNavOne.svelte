<script>
import {push} from "svelte-spa-router";
import standardImage from "/src/assets/svelte.png"

    import {createEventDispatcher,getContext, onMount} from 'svelte';

    const dispatch = createEventDispatcher();

    const pubcrawlService = getContext("PubcrawlService");
    let pubs = [];
    let shortPubs = [];
    let shortLat;
    let shortLng;

    let errorMessage = "";

    onMount(async () =>{
        getAllPubs();
    });

    async function getAllPubs(){
        pubs = await pubcrawlService.getAllPubs();
        shortPubs = pubs;
        shortenLocations(shortPubs);
    }

    async function getClickedPub(getPub){
        dispatch('pubClicked', {
            pub: getPub,
        });
    }

    function shortenCoordinate(getCoordinate, maxLength){
        return getCoordinate.substring(0,maxLength);
    }

    function shortenLocations(getPubs){
        console.log("shorten pubs");
        console.log(getPubs);
        getPubs.forEach(function(item, index){
            if(item.lat.indexOf('-',0)!=-1) item.lat=shortenCoordinate(item.lat,(item.lat.indexOf('.', 0)+4));
            else item.lat=shortenCoordinate(item.lat,(item.lat.indexOf('.', 0)+2));
            if(item.lng.indexOf('-',0)!=-1) item.lng=shortenCoordinate(item.lng,(item.lat.indexOf('.', 0)+4));
            else item.lng=shortenCoordinate(item.lng,(item.lat.indexOf('.', 0)+2));
        })
    }

    export async function showPubOnSideNav(getPub){
        console.log("inside map: showPubOnSideNav");
        pubs = [];
        const pub = await pubcrawlService.getPubById(getPub);
        pubs.push(pub);
        shortPubs = pubs;
        shortenLocations(shortPubs);
        console.log("clicked pub on map");
        console.log(pub);
        shortenLocations(shortPubs);
    }

    async function deletePub(id){
        console.log(id);
        let success = await pubcrawlService.deletePub(id);
        if(success){
            //push("/discover");
            location.reload();
        }else{
            errorMessage = "Couldn't delete the Pub";
        }
    }
</script>

<a class="button box" on:click={() => {getAllPubs()}}>
    Show All
</a>
{#each shortPubs as pub}
    <div class="card">
        <div class="card-image">
            <figure class="image is-2by1">
                {#if pub.img}
                    <img src="{pub.img}" alt="Placeholder image">
                {:else}
                    <img src="/src/assets/logo-on-frame.png" alt="Placeholder image">
                {/if}
            </figure>
        </div>
        <div class="card-content">
            <div class="media">
            <div class="media-content">
                <p class="title is-4">{ pub.name }</p>
                <p class="subtitle is-6">{ pub.city }</p>
            </div>
            </div>

            <div class="content">
                <p>
                    <button on:click={() => {getClickedPub(pub)}} class="ui icon-text button">
                        <span>lat: { pub.lat }, lng: { pub.lng }</span> 
                        <span class="icon">
                            <i class="fa-solid fa-location-dot"></i>
                        </span>
                    </button>
                </p>
            </div>
        </div>
        <footer class="card-footer">
            <!--<a href="#" class="card-footer-item">Save</a>-->
            <a href="/#/pub/{pub._id}" class="card-footer-item button is-primary">Details</a>
            <!--<a href="/#/editpub/{pub._id}" class="card-footer-item button is-primary">Edit</a>-->
            <!--<button on:click={() => {deletePub(pub._id)}} class="card-footer-item button is-danger">Delete</button>-->
            <!--<div class="field is-grouped is-grouped-right">
                <p class="control">
                    <button on:click={deletePub} class="button is-danger">Delete</button>
                </p>
                <p class="control">
                    <a href="/#/editpub/{pub._id}" class="card-footer-item"> 
                        <button class="button is-primary">Edit</button>
                    </a>
                </p>
              </div>-->
        </footer>
    </div>
{/each}

<style>
    .card{
        margin-bottom: 10px;
    }
</style>