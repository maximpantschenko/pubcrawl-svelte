<script>
import WelcomeNavigator from "../components/WelcomeNavigator.svelte";

import {getContext} from "svelte";

const pubcrawlService = getContext("PubcrawlService");
pubcrawlService.logout();
</script>
<WelcomeNavigator/>

<div class="box">
    <div class="columns">
        <div class="column">
            <section class="section">
                <h1 class="title">Welcome to PubCrawl</h1>
                <h2 class="subtitle">
                Join the community and explore Pubs around the world! <a href="/#/login"><b>Login</b></a> or <a href="/#/signup"><b>Sign Up</b></a>
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