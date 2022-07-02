<script>
    import jq from 'jquery';
    import MainNavigator from '../components/MainNavigator.svelte';
    import PubForm from '../components/PubForm.svelte';
    import Map from '../components/Map.svelte';
    import { push,pop } from 'svelte-spa-router';
    export let params;

    let pubsMap = null;
    
    let clickedLat;
    let clickedLng;

    if(localStorage.pubcrawl == null){
        push("/login");
    }

    function setLocations(event){
        clickedLat=event.detail.lat;
        clickedLng=event.detail.lng;
    }

    async function goBack(){
        pop();
    }

    /* TODOD: when going to edit pub on the map it should move to the current location */
    jq( document ).ready(function() {
        pubsMap.moveToPub(4,0,0);
    });
    
</script>
    
<MainNavigator/>
<div class="box">
    <div class="columns is-12">
        <div class="column is-1">
            <a class="button" on:click={goBack}><i class="fa-solid fa-arrow-left"></i></a>
        </div>
        <div class="column">
            <span class="title">Edit Pub</span>
        </div>
    </div>  
</div>
<div class="columns">
    <div class="column has-text-centerd relative md:fixed sm:w-full md:w-10/12 p-2 h-screen">
        <PubForm bind:lat={clickedLat} bind:lng={clickedLng} id={params.pubid} newpub={false}/>
    </div>
    <div class="column has-text-centered is-half hidden md:block w-full md:w-2/12 ml-auto map-side is-95vh">
        <Map bind:this={pubsMap} on:clickedLocations={setLocations} markersVisible={false} showAddBtn={false}/>
    </div>
</div>