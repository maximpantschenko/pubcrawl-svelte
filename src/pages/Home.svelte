<script>
    import MainNavigator from '../components/MainNavigator.svelte';
    import jq from 'jquery';
    import { push,pop } from 'svelte-spa-router';

    if(localStorage.pubcrawl == null){
        push("/login");
    }
</script>

<MainNavigator/>
<div class="box">
    <div class="columns">
        <div class="column">
            <section class="section">
                <h1 class="title">Welcome to PubCrawl</h1>
                <h2 class="subtitle">
                    <a href="/#/discover"><b>Explore Pubs now</b></a>
                </h2>
            </section>
        </div>
        <div class="column">
                <figure class="image">
                    <img src="/logo-on-frame.png">
                  </figure>
        </div>
    </div>
</div>