<script>
import {LeafletMap} from '../services/leaflet-map';
//import L from 'leaflet';
import 'leaflet/dist/leaflet.css'; 
import jq from 'jquery';
import {createEventDispatcher, getContext, onMount} from "svelte";
import { push } from 'svelte-spa-router';

const pubcrawlService = getContext("PubcrawlService");
const dispatch = createEventDispatcher();

export let markersVisible = false;
export let showAddBtn = false;

const mapConfig = {
    location: {lat: 52.160858, lng: -7.152420},
    zoom: 8,
    minZoom: 1,
  };
let map = null;

onMount(async () => {
    map = new LeafletMap("map", mapConfig);
    map.showZoomControl();
    map.showLayerControl();

    map.imap.on("click", onMapClick);

    if(markersVisible){
        const pubs = await pubcrawlService.getAllPubs();
        pubs.forEach(pub => {
            addPubMarker(pub);
        });
    }
});

async function showPubInfo(getPubId){
    dispatch('pubMarkerClicked', {
        pub: getPubId,
    });
}

export function addPubMarker(pub) {
    //const pubStr = `${pub.name}`;
    const pubStr = `<button id="pubInfoBtn" class="js-modal-trigger leaflet-top leaflet-left" data-target="modal-js-example">open pub</button>`;
    //.setContent('<p>Hello world!<br />This is a nice popup.</p>');
    const marker = map.addMarker({lat: pub.lat, lng: pub.lng}, pubStr, "Pubs");
    //marker.on('click', () => push('/pub/'+pub._id));
    marker.on('click', () => showPubInfo(pub._id));
    map.moveTo(4, {lat: pub.lat, lng: pub.lng});
}

export function showPubOnMap(getPub){
    map.moveTo(8, {lat: getPub.lat, lng: getPub.lng});
}

export function onMapClick(e) {
            dispatch('clickedLocations', {
                lat: e.latlng.lat,
                lng: e.latlng.lng,
            });
}

export function moveToPub(zoom, getLat,getLng){
    map.moveTo(zoom, {lat: getLat, lng: getLng});
}
</script>

<div class="box" id="map" style="height: 95vh">
    {#if showAddBtn==true}
    <a href="/#/createpub">
        <button id="addBarBtn" class="button is-primary leaflet-bottom leaflet-right" title="Add Pub">
            <span class="icon is-small">
                <i class="fa-solid fa-plus"></i>
            </span>
        </button>
    </a>
    {/if}
</div>

<style>
    #addBarBtn{
        z-index: 9991;
        position: absolute;
        bottom: 50px;
        right: 50px;
        pointer-events: auto;
        border-radius: 50%;
    }

    #pubInfo{
        z-index: 9999;
        position: absolute;
        top: 50px;
        left: 50px;
        pointer-events: auto;
    }

    #pubInfoBtn{
        z-index: 9998;
        position: absolute;
        top: 50px;
        left: 50px;
        pointer-events: auto;
    }
</style>