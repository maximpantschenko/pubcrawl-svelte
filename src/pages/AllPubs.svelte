<script>
    import MainNavigator from '../components/MainNavigator.svelte';
    import PubList from '../components/PubList.svelte';
    import {push} from "svelte-spa-router";

    if(localStorage.pubcrawl == null){
        push("/login");
    }
</script>

<MainNavigator/>
<PubList allPubs={true}/>


<style>
    .box{
        margin: 10px;
    }
</style>