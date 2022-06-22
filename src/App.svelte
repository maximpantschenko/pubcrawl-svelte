<script>
import Main from "./pages/Main.svelte"
import Login from "./pages/Login.svelte"
import Signup from "./pages/Signup.svelte"
import Dashboard from "./pages/Dashboard.svelte";
import Router from "svelte-spa-router";
import Home from "./pages/Home.svelte";
import EditPub from "./pages/EditPub.svelte";
import CreatePub from "./pages/CreatePub.svelte";
import Discover from "./pages/Discover.svelte";
import { PubcrawlService } from "./services/pubcrawl-service";
import { setContext } from "svelte";

  //setContext("PubcrawlService", new PubcrawlService("https://calm-cove-09278.herokuapp.com"));
  setContext("PubcrawlService", new PubcrawlService("http://localhost:4000"));
  let routes = {
    "/": Main,
    "/login": Login,
    "/signup": Signup,
    "/main": Main,
    "/dashboard": Dashboard,
    "/home": Home,
    "/discover": Discover,
    "/logout": Main,
    "/editpub/:pubid": EditPub,
    "/createpub/:publistid": CreatePub,
  }
</script>

<div class="container">
  <Router {routes}/>
</div>


