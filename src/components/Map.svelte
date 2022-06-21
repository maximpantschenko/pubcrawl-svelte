<script>
import {LeafletMap} from '../services/leaflet-map';
//import L from 'leaflet';
import 'leaflet/dist/leaflet.css'; 
import jq from 'jquery';
import {createEventDispatcher, getContext, onMount} from "svelte";

const pubcrawlService = getContext("PubcrawlService");
const dispatch = createEventDispatcher();

export let markersVisible = false;


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

export function addPubMarker(pub) {
    const pubStr = `${pub.name}`;
    map.addMarker({lat: pub.lat, lng: pub.lng}, pubStr, "Pubs");
    map.moveTo(4, {lat: pub.lat, lng: pub.lng});
}

export function showPubOnMap(getPub){
    console.log("inside map: showPubOnMap");
    map.moveTo(8, {lat: getPub.lat, lng: getPub.lng});
}

export function onMapClick(e) {
            console.log("You clicked the map at position: ");
            console.log("lat: "+e.latlng.lat);
            console.log("lng:"+e.latlng.lng);

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
    Hier sollte die Karte sein!
</div>