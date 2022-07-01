<script>
    import jq from 'jquery';
    import {push} from "svelte-spa-router";
    import MainNavigator from '../components/MainNavigator.svelte';
    import PubForm from '../components/PubForm.svelte';
    import Map from '../components/Map.svelte';
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

    /* TODOD: when going to edit pub on the map it should move to the current location */
    jq( document ).ready(function() {
        console.log("current locations: ");
        console.log(clickedLat);
        console.log(clickedLng);
        pubsMap.moveToPub(4,0,0);
    });
    
</script>
    
<MainNavigator/>

<div class="columns">
    <div class="column has-text-centerd relative md:fixed sm:w-full md:w-10/12 p-2 h-screen">
        <PubForm bind:lat={clickedLat} bind:lng={clickedLng} id={null} newpub={true}/>
    </div>
    <div class="column has-text-centered is-half hidden md:block w-full md:w-2/12 ml-auto map-side is-95vh">
        <Map bind:this={pubsMap} on:clickedLocations={setLocations} markersVisible={false} id={null}/>
    </div>
</div>