<script>
import {createEventDispatcher,getContext, onMount} from 'svelte';

import jq from 'jquery';

    const dispatch = createEventDispatcher();

    const pubcrawlService = getContext("PubcrawlService");

    let pubs = [];
    export let allPubs = true;

    let nameNoSpace = "";
    let cityNoSpace = "";
    let countryNoSpace = "";

    var searchName = "";
    var searchCity = "";
    var searchCountry = "";

    let errorMessage = "";

    onMount(async () =>{
        getPubs();
        jq('#searchInputName').on('input', function() {
            jq(this).removeClass("is-danger");
            nameNoSpace = jq(this).val().toString().replace(/\s+/g, '');
            searchName = jq(this).val().toString();
            getPubs();
        });

        jq('#searchInputCity').on('input', function() {
            jq(this).removeClass("is-danger");
            cityNoSpace = jq(this).val().toString().replace(/\s+/g, '');
            searchCity = jq(this).val().toString();
            getPubs();
        });

        jq('#searchInputCountry').on('input', function() {
            jq(this).removeClass("is-danger");
            countryNoSpace = jq(this).val().toString().replace(/\s+/g, '');
            searchCountry = jq(this).val().toString();
            getPubs();
        });
    });

    async function getPubs(){
        if(nameNoSpace.length == 0 && cityNoSpace.length == 0 && countryNoSpace.length == 0){
            console.log("don't search, get all or my pubs");
            if(allPubs){
                //return all pubs
                pubs = await pubcrawlService.getAllPubs();
            }else{
                //return just the pubs of the user
                pubs = await pubcrawlService.getMyPubs();
            }
        }else{
            console.log("search string");
            search();
        }
    }

    /*async function searchName(string){
        pubs = await pubcrawlService.getPubSearchName(string);
    }*/

    async function search(){
        console.log("search for: ");
        console.log("name: "+searchName);
        console.log("city: "+searchCity);
        console.log("country: "+searchCountry);
        let searchString = "";
        if(searchName.length!=0 && await checkString(searchName) !=null) {
            searchString += searchName;
            jq("#searchInputName").removeClass("is-danger");
        }else{
            jq("#searchInputName").addClass("is-danger");
            if(searchName.length==0) jq("#searchInputName").removeClass("is-danger");
        }
        searchString += "&";
        if(searchCity.length!=0 && await checkString(searchCity) !=null) {
            searchString += searchCity;
            jq("#searchInputCity").removeClass("is-danger");
        }else{
            jq("#searchInputCity").addClass("is-danger");
            if(searchCity.length==0) jq("#searchInputCity").removeClass("is-danger");
        }
        searchString += "&";
        if(searchCountry.length!=0 && await checkString(searchCountry) !=null) {
            searchString += searchCountry;
            jq("#searchInputCountry").removeClass("is-danger");
        }else{
            jq("#searchInputCountry").addClass("is-danger");
            if(searchCountry.length==0) jq("#searchInputCountry").removeClass("is-danger");
        }
        console.log(searchString);
        pubs = await pubcrawlService.getPubSearch(searchString);
    }

    async function checkString(string){
        //   /^([a-zA-Z0-9\u0600-\u06FF\u0660-\u0669\u06F0-\u06F9 _.-]+)$/
        let pattern = /^([a-zA-Z0-9\u0600-\u06FF\u0660-\u0669\u06F0-\u06F9 _.-]+)$/;
        let result = string.match(pattern);
        console.log(string+": is valid "+result);
        return result;
    }

</script>

<div class="field is-horizontal box">
    <div class="field-body">
      <div class="field">
        <p class="control has-icons-left">
            <input id="searchInputName" class="input" type="text" placeholder="Search by Name">
            <span class="icon is-small is-left">
                <i class="fa-solid fa-beer-mug-empty"></i>
            </span>
        </p>
      </div>
      <div class="field">
        <p class="control has-icons-left">
            <input id="searchInputCity" class="input" type="text" placeholder="Search by City">
            <span class="icon is-small is-left">
                <i class="fa-solid fa-city"></i>
            </span>
        </p>
      </div>
      <div class="field">
        <p class="control has-icons-left">
            <input id="searchInputCountry" class="input" type="text" placeholder="Search by Country">
            <span class="icon is-small is-left">
                <i class="fa-solid fa-flag"></i>
            </span>
        </p>
      </div>
    </div>
</div>
{#each pubs as pub}
<a href="/#/pub/{pub._id}">
    <div class="box">
        <article class="media">
            <figure class="media-left">
            <p class="image is-128x128">
                <img src="{pub.img}">
            </p>
            </figure>
            <div class="media-content">
                <div class="content">
                    <p class="title is-4">{ pub.name }</p>
                    <p class="subtitle is-6">{ pub.city }, {pub.country}</p>
                    <p>{ pub.description }</p>
                </div>
                <!--
                <nav class="level is-mobile">
                    <div class="level-left">
                        <a class="level-item">
                            <span class="icon is-small"><i class="fas fa-reply"></i></span>
                        </a>
                        <a class="level-item">
                            <span class="icon is-small"><i class="fas fa-retweet"></i></span>
                        </a>
                    </div>
                </nav>-->
            </div>
            <!--
            <div class="media-right">
                <a class="level-item">
                    <span class="icon is-small"><i class="fas fa-heart"></i></span>
                </a>
            </div>-->
        </article>
    </div>
</a>
{/each}

<div class="box">
    <a href="/#/createpub" class="button is-primary is-fullwidth">
        <span class="icon is-small">
            <i class="fas fa-plus"></i>
        </span>
        <span>Create New Pub</span>
    </a>
</div>

<style>
    .box{
        margin: 10px;
    }
</style>