<script>
    import MainNavigator from "../components/MainNavigator.svelte";
    import PubChart from "../components/PubChart.svelte";
    import {push} from "svelte-spa-router";

    if(localStorage.pubcrawl == null){
        push("/login");
    }
</script>
    
<MainNavigator/>
<div class="columns box">
    <h1 class="title">Charts</h1>
</div>
<PubChart/>

<style>
    .box{
        margin: 10px;
    }
</style>