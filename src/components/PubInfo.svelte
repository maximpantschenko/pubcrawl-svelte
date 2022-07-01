<script context="module">
    import jq from 'jquery';
// Add a click event on buttons to open a specific modal

let pubInfoDialog = null;
let pub = {
    name: '',
    description: '',
    city: '',
    country: '',
    lat: '',
    lng: '',
    img: '',
}

export function openPubInfo(getPub){
    console.log("getPub");
    console.log(getPub.name);
    pub = getPub;
    setValuesInUi();
    pubInfoDialog.classList.add('is-active');
}

export function closePubInfo(){
    pubInfoDialog.classList.remove('is-active');
}

function setValuesInUi(){
    jq(".pubName").text(pub.name);
    jq(".pubDescription").text(pub.description);
    jq(".pubCity").text(pub.city);
    //jq(".pubCountry").text(pub.country);
    jq(".pubLat").text(pub.lat);
    jq(".pubLng").text(pub.lng)
    jq(".pubImg").attr("src",pub.img);
}

document.addEventListener('DOMContentLoaded', () => {
    const modal = "modal-js-example";
    pubInfoDialog = document.getElementById(modal);
    console.log("pubinfodialog");
    console.log(pubInfoDialog);

  // Add a click event on various child elements to close the parent modal
  (document.querySelectorAll('.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button') || []).forEach(($close) => {
    const $target = $close.closest('.modal');

    $close.addEventListener('click', () => {
      closePubInfo();
    });
  });

  // Add a keyboard event to close all modals
  document.addEventListener('keydown', (event) => {
    const e = event || window.event;

    if (e.keyCode === 27) { // Escape key
      closePubInfo();
    }
  });
});
</script>

    <div id="modal-js-example" class="modal">
        <div class="modal-background"></div>
      
        <div class="modal-content">
          <div class="box">
            <div class="card">
                <div class="card-image">
                  <figure class="image is-2by1">
                    <img src="" class="pubImg" alt="Placeholder image">
                  </figure>
                </div>
                <div class="card-content">
                  <div class="media">
                    <div class="media-left">
                      <figure class="image is-48x48">
                        <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image">
                      </figure>
                    </div>
                    <div class="media-content">
                      <p class="pubName title is-4"></p>
                      <p class="pubCity subtitle is-6"></p>
                    </div>
                  </div>
              
                  <div class="content">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Phasellus nec iaculis mauris. <a>@bulmaio</a>.
                    <a href="#">#css</a> <a href="#">#responsive</a>
                    <br>
                    <time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time>
                    <p>
                        lat: <span class="pubLat"></span>, lng: <span class="pubLng"></span> 
                        <span class="icon">
                            <i class="fa-solid fa-location-dot"></i>
                        </span>
                    </p>
                  </div>
            </div>
          </div>
        </div>
    </div>
</div>

  <style>
 
  </style>