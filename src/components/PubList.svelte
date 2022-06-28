<script>
import {createEventDispatcher,getContext, onMount} from 'svelte';

import jq from 'jquery';

    const dispatch = createEventDispatcher();

    const pubcrawlService = getContext("PubcrawlService");

    let pubs = [];
    export let allPubs = true;

    let errorMessage = "";

    onMount(async () =>{
        jq('#searchInput').on('input', function() {
            console.log("etwas getippt");
        });
        if(allPubs){
            //return all pubs
            pubs = await pubcrawlService.getAllPubs();
        }else{
            //return just the pubs of the user
            pubs = await pubcrawlService.getMyPubs();
        }
    });

</script>
<div class="columns box">
    <input id="searchInput" class="input" type="text" placeholder="Search">
</div>
{#each pubs as pub}
<a href="/#/pub/{pub._id}">
    <div class="box">
        <article class="media">
            <figure class="media-left">
            <p class="image is-128x128">
                <img src="{pub.img}">
            </p>
            </figure>
            <div class="media-content">
            <div class="content">
                <p class="title is-4">{ pub.name }</p>
                <p class="subtitle is-6">{ pub.city }, {pub.country}</p>
                <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ornare magna eros, eu pellentesque tortor vestibulum ut. Maecenas non massa sem. Etiam finibus odio quis feugiat facilisis.
                </p>
            </div>
            <nav class="level is-mobile">
                <div class="level-left">
                    <a class="level-item">
                        <span class="icon is-small"><i class="fas fa-reply"></i></span>
                    </a>
                    <a class="level-item">
                        <span class="icon is-small"><i class="fas fa-retweet"></i></span>
                    </a>
                </div>
            </nav>
            </div>
            <div class="media-right">
                <a class="level-item">
                    <span class="icon is-small"><i class="fas fa-heart"></i></span>
                </a>
            </div>
        </article>
    </div>
</a>
{/each}

<style>
    .box{
        margin: 10px;
    }
</style>