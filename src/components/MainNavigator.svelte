<script>
    import jq from 'jquery';
    import { push } from 'svelte-spa-router';
    import {getContext, onMount} from "svelte";
    import PubcrawlBrand from './PubcrawlBrand.svelte';
    
    const pubcrawlService = getContext("PubcrawlService");
    let navCurrentUser = "";

    onMount(async () => {
      const getNavUser = await pubcrawlService.getCurrentUser();
      navCurrentUser = getNavUser.firstName + " " + getNavUser.lastName;
      console.log("navigation user");
      console.log(navCurrentUser);
    });

    jq(document).ready(function() {
  
      // Check for click events on the navbar burger icon
      jq(".navbar-burger").click(function() {
  
          // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
          jq(".navbar-burger").toggleClass("is-active");
          jq(".navbar-menu").toggleClass("is-active");
      });
    });

    async function showPubs(am){
      push('/pubs/'+am);
    }
  </script>
  
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <a class="navbar-item" href="/#/home">
        <PubcrawlBrand/>
      </a>
  
      <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>
  
    <div id="navbarBasicExample" class="navbar-menu">
      <div class="navbar-start">
        <!--<a href="/#/home" class="navbar-item">
          Home
        </a>-->
  
        <a href="/#/dashboard" class="navbar-item">
          Dashboard
        </a>
  
        <a href="/#/discover" class="navbar-item">
          Map
        </a>
  
        <div class="navbar-item has-dropdown is-hoverable">
          <a href="/#/pubs/all" class="navbar-link">
            Pubs
          </a>
  
          <div class="navbar-dropdown">
            <a href="/#/pubs/all" class="navbar-item">
              All Pubs
            </a>
            <a href="/#/pubs/my" class="navbar-item">
              My Pubs
            </a>
          </div>
        </div>
      </div>
  
      <div class="navbar-end">
        <div class="navbar-item has-dropdown is-hoverable">
          <a href="/#/account" class="navbar-link">
            {navCurrentUser}
          </a>

          <div class="navbar-dropdown">
            <a href="/#/account" class="navbar-item">
              My Account
            </a>
            <a href="/#/logout" class="navbar-item" style="color:red">
              Logout
            </a>
          </div>

          <!--<div class="buttons">
            <a href="/#/logout"class="button is-danger">
              <strong>Logout</strong>
            </a>
          </div>-->
        </div>
      </div>
    </div>
  </nav>