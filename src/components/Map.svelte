<script>
import {LeafletMap} from '../services/leaflet-map';
import 'leaflet/dist/leaflet.css'; 
import {getContext, onMount} from "svelte";

const pubcrawlService = getContext("PubcrawlService");

const mapConfig = {
    location: {lat: 52.160858, lng: -7.152420},
    zoom: 8,
    minZoom: 1,
};
let map = null;

onMount(async () => {
    map = new LeafletMap("map", mapConfig);
    map.showZoomControl();
    map.addLayerGroup('Pubs');
    map.showLayerControl();

    const pubs = await pubcrawlService.getAllPubs();
    pubs.forEach(pub => {
      addPubMarker(pub);
    });
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
</script>

<div class="box" id="map" style="height: 95vh">
    Hier sollte die Karte sein!
</div>