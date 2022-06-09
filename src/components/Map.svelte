<script>
import MainNavigator from "../components/WelcomeNavigator.svelte";
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
    //map.addLayerGroup('Donations');
    //map.showLayerControl();
});
</script>

<div class="box" id="map" style="height: 95vh">
    Hier sollte die Karte sein!
</div>