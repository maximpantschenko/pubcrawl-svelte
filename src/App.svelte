<script>
import Main from "./pages/Main.svelte"
import Login from "./pages/Login.svelte"
import Signup from "./pages/Signup.svelte"
import Dashboard from "./pages/Dashboard.svelte";
import Router from "svelte-spa-router";
import WelcomeNavigator from "./components/WelcomeNavigator.svelte";
import Home from "./pages/Home.svelte";
import Discover from "./pages/Discover.svelte";

  let routes = {
    "/": Main,
    "/login": Login,
    "/signup": Signup,
    "/main": Main,
    "/dashboard": Dashboard,
    "/home": Home,
    "/discover": Discover,
    "/logout": Main,
  }
</script>

<div class="container">
  <Router {routes}/>
</div>
