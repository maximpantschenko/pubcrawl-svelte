<script>
import { latLng } from 'leaflet';

    import {createEventDispatcher,getContext, onMount} from 'svelte';

    const dispatch = createEventDispatcher();

    const pubcrawlService = getContext("PubcrawlService");
    let pubs = [];

    onMount(async () =>{
        pubs = await pubcrawlService.getAllPubs();
    });

    async function getClickedPub(getPub){
        dispatch('pubClicked', {
            pub: getPub,
        });
    }
</script>

{#each pubs as pub}
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
            <a href="#" class="card-footer-item">Edit</a>
            <a href="#" class="card-footer-item">Delete</a>
        </footer>
    </div>
{/each}

<style>
    .card{
        margin-bottom: 10px;
    }
</style>