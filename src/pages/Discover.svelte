<script>
    import {push} from "svelte-spa-router";
    import PubsSideNavOne from '../components/PubsSideNavOne.svelte';
    import MainNavigator from '../components/MainNavigator.svelte';
    import Map from '../components/Map.svelte';

    let pubsMap = null;
    let pubSideNav = null;

    if(localStorage.pubcrawl == null){
        push("/login");
    }

    function showPubOnMap(event){
        pubsMap.showPubOnMap(event.detail.pub);
    }

    function showPubOnSideNav(event){
        pubSideNav.showPubOnSideNav(event.detail.pub);
    }

</script>

<MainNavigator/>
    <div class="columns box">
        <h1 class="title">Map</h1>
    </div>
    <div class="columns box">
        <div class="column has-text-centerd relative md:fixed sm:w-full md:w-10/12 p-2 h-screen">
            <Map bind:this={pubsMap} on:pubMarkerClicked={showPubOnSideNav} markersVisible={true} showAddBtn={true}/>
        </div>
        <div class="column has-text-centered is-one-quarter hidden md:block w-full md:w-2/12 ml-auto map-side is-95vh">
            <PubsSideNavOne bind:this={pubSideNav} on:pubClicked={showPubOnMap}/>
            
        </div>
    </div>
    

<style>
    .map-side{
        height: 95vh;
        overflow-y: scroll;
    }

    .box{
        margin: 10px;
    }

</style>