<script>
    import MainNavigator from "../components/MainNavigator.svelte";
    import {push} from "svelte-spa-router";

    if(localStorage.pubcrawl == null){
        push("/login");
    }
</script>

<MainNavigator/>
<div class="box">
    Hello from Home
</div>