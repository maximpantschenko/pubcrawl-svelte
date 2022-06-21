<script>
import PubsSideNav from '../components/PubsSideNav.svelte';
import MainNavigator from '../components/MainNavigator.svelte';
import Map from '../components/Map.svelte';

let pubsMap = null;

function showPubOnMap(event){
    pubsMap.showPubOnMap(event.detail.pub);
}

</script>

<MainNavigator/>
<div class="columns">
    <div class="column has-text-centerd relative md:fixed sm:w-full md:w-10/12 p-2 h-screen">
        <Map bind:this={pubsMap} markersVisible={true}/>
    </div>
    <div class="column has-text-centered is-one-quarter hidden md:block w-full md:w-2/12 ml-auto map-side is-95vh">
        <PubsSideNav on:pubClicked={showPubOnMap} />
        
    </div>
</div>

<style>
    .map-side{
        height: 95vh;
        overflow-y: scroll;
    }
</style>