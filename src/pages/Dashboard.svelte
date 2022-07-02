<script>
    import MainNavigator from "../components/MainNavigator.svelte";
    import PubChart from "../components/PubChart.svelte";
    import {push} from "svelte-spa-router";

    if(localStorage.pubcrawl == null){
        push("/login");
    }
</script>
    
<MainNavigator/>
<div class="notification is-link">
    Hello from Dashboard
</div>

<PubChart/>