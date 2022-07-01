<script>
    import MainNavigator from '../components/MainNavigator.svelte';
    import PubList from '../components/PubList.svelte';
    import {push} from "svelte-spa-router";

    if(localStorage.pubcrawl == null){
        push("/login");
    }
</script>

<MainNavigator/>
<div class="columns box">
    <p>hier kommen die filter in all pubs</p>
</div>
<PubList allPubs={false}/>
<style>
    .box{
        margin: 10px;
    }
</style>