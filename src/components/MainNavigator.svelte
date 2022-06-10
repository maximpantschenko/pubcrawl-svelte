<script>
    import jq from 'jquery';
    import PubcrawlBrand from './PubcrawlBrand.svelte';
    
    jq(document).ready(function() {
  
      // Check for click events on the navbar burger icon
      jq(".navbar-burger").click(function() {
  
          // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
          jq(".navbar-burger").toggleClass("is-active");
          jq(".navbar-menu").toggleClass("is-active");
      });
    });
  
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
        <a href="/#/home" class="navbar-item">
          Home
        </a>
  
        <a href="/#/dashboard" class="navbar-item">
          Dashboard
        </a>
  
        <a href="/#/discover" class="navbar-item">
          Discover
        </a>
  
        <div class="navbar-item has-dropdown is-hoverable">
          <a href="#d" class="navbar-link">
            More
          </a>
  
          <div class="navbar-dropdown">
            <a href="#d" class="navbar-item">
              About
            </a>
            <a href="#d" class="navbar-item">
              Jobs
            </a>
            <a href="#d" class="navbar-item">
              Contact
            </a>
            <hr class="navbar-divider">
            <a href="#d" class="navbar-item">
              Report an issue
            </a>
          </div>
        </div>
      </div>
  
      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            <a href="/#/logout"class="button is-primary">
              <strong>Logout</strong>
            </a>
          </div>
        </div>
      </div>
    </div>
  </nav>