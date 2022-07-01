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
    <a class="navbar-item" href="/#/main">
      <PubcrawlBrand/>
    </a>

    <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </a>
  </div>

  <div id="navbarBasicExample" class="navbar-menu">

    <div class="navbar-end">
      <div class="navbar-item">
        <div class="buttons">
          <a href="/#/signup"class="button is-primary">
            <strong>Sign Up</strong>
          </a>
          <a href="/#/login" class="button is-light">
            Log in
          </a>
        </div>
      </div>
    </div>
  </div>
</nav>