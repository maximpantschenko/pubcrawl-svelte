<script>
import {push} from "svelte-spa-router";

    import {createEventDispatcher,getContext, onMount} from 'svelte';

    export let publistid;

    const dispatch = createEventDispatcher();

    const pubcrawlService = getContext("PubcrawlService");
    let pubs = [];
    let shortPubs = [];
    let shortLat;
    let shortLng;

    let errorMessage = "";

    onMount(async () =>{
        pubs = await pubcrawlService.getAllPubs();
        shortPubs = pubs;
        shortenLocations(shortPubs);
    });

    async function getClickedPub(getPub){
        dispatch('pubClicked', {
            pub: getPub,
        });
    }

    function shortenCoordinate(getCoordinate, maxLength){
        return getCoordinate.substring(0,maxLength);
    }

    function shortenLocations(getPubs){
        getPubs.forEach(function(item, index){
            if(item.lat.indexOf('-',0)!=-1) item.lat=shortenCoordinate(item.lat,(item.lat.indexOf('.', 0)+4));
            else item.lat=shortenCoordinate(item.lat,(item.lat.indexOf('.', 0)+2));
            if(item.lng.indexOf('-',0)!=-1) item.lng=shortenCoordinate(item.lng,(item.lat.indexOf('.', 0)+4));
            else item.lng=shortenCoordinate(item.lng,(item.lat.indexOf('.', 0)+2));
        })
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

{#each shortPubs as pub}
    <div class="card">
        <div class="card-image">
            <figure class="image is-2by1">
            <img src="{pub.img}" alt="Placeholder image">
            </figure>
        </div>
        <div class="card-content">
            <div class="media">
            <div class="media-left">
                <figure class="image is-48x48">
                <img src="{pub.img}" alt="Placeholder image">
                </figure>
            </div>
            <div class="media-content">
                <p class="title is-4">{ pub.name }</p>
                <p class="subtitle is-6">{ pub.city }</p>
            </div>
            </div>

            <div class="content">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Phasellus nec iaculis mauris. <a>@bulmaio</a>.
                <a href="#">#css</a> <a href="#">#responsive</a>
                <br>
                <time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time>
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
            <a href="/#/editpub/{pub._id}" class="card-footer-item button is-primary">Edit</a>
            <button on:click={() => {deletePub(pub._id)}} class="card-footer-item button is-danger">Delete</button>
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