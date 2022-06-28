<script>
    import MainNavigator from '../components/MainNavigator.svelte';
    import {getContext, onMount} from "svelte";
    import jq from 'jquery';
    import { pop } from 'svelte-spa-router';

    export let params;

    let loading = {
        value: 5,
        show: true,
    };

    let pub = null;

    let id = null;
    let name = "";
    let city = "";
    let country = "";
    let lat = "";
    let lng = "";
    let img = "";
    let categoriesMusic = [];
    let canEdit;

    let comments = [];

    let errorMessage = "";
    let successMessage = "";

    const pubcrawlService = getContext("PubcrawlService");

    onMount(async () => {
        id = params.pubid;
        console.log("id is");
        console.log(params.pubid);
        loading.value = 15;
        pub = await pubcrawlService.getPubById(id);
        // /api/pubs/editable/{id}
        
        loading.value = 35;
        //categoriesMusic = await pubcrawlService.getCategoriesMusicByIds(pub.categoriesMusic);
        /*
        name = pub.name;
        city = pub.city;
        country = pub.country;
        lat = pub.lat;
        lng = pub.lng;
        img = pub.img;
        */
        canEdit = pub.canEdit;
        categoriesMusic = pub.categoriesMusic;
        console.log("get pub categoies");
        console.log(pub);
        getComments();
        console.log("comments");
        console.log(comments);
    });

    async function getComments(){
        loading.value = 50;
        comments = await pubcrawlService.getCommentsByPubId(pub._id);
        loading.value = 80;
        loading.show = false;
    }

    async function addComment(){
        console.log("in addComment");
        const text = jq("#comment-textarea").val();
        console.log(text);

        const pubid = pub.id;
        const date = null;
        const likes = null;
        console.log("addComment svelte");
        console.log(text);

        let success = await pubcrawlService.createComment(text, date, likes, pubid);
        if(success){
            successMessage = "Created Comment Succesfully";
        }else{
            errorMessage = "Couldn't Create the Pub";
        }

        getComments();
        
    }

    async function triggerLike(commentid){
        jq(".liked-icon").each(function( index ) {
            const item = jq(this);
            if(item.attr("data-id")==commentid){
                if(item.find("i").hasClass("fa-regular")) {
                    item.find("i").removeClass("fa-regular").addClass("fa-solid");
                } 
                else {
                    item.find("i").removeClass("fa-solid").addClass("fa-regular");
                } 
            }
        });
    }

    async function addLike(commentid){
        triggerLike(commentid);
    }

    async function goBack(){
        pop();
    }
</script>

<MainNavigator/>

{#if loading.show}
    <section>
        <div class="box">
            <progress class="progress is-primary" value="{loading.value}" max="100">15%</progress>
        </div>
    </section>
{:else}
<section>
    <div class="box">
        <a class="button" on:click={goBack}><i class="fa-solid fa-arrow-left"></i></a>
    </div>
</section>
<section class="section">
    <div class="box columns">
        <div class="column is-one-third">
            <figure class="image is-4by3">
                <img src="{pub.img}" alt="Placeholder image">
            </figure>
        </div>
        <div class="column">
            <div class="media">
                <div class="media-content">
                    <h1 class="title">{pub.name}</h1>
                    <h2 class="subtitle">{pub.city}</h2>
                    <div class="columns">
                        <div class="column">
                            <p style="font-size: 20px">Description: </p>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ornare magna eros, eu pellentesque tortor vestibulum ut. Maecenas non massa sem. Etiam finibus odio quis feugiat facilisis.
                            </p>
                        </div>
                    </div>
                    <div class="columns">
                        <div class="column">
                            <p style="font-size: 20px">Location: </p>
                            <p>{pub.city}, {pub.country}</p>
                            <p>Lat: {pub.lat}, Lng: {pub.lng}</p>
                        </div>
                    </div>
                    <div class="columns">
                        <div class="column">
                            <p style="font-size: 20px">Type of Music: </p>
                            <div class="tags are-small">
                                {#each categoriesMusic as music}
                                    <span class="tag">{music.name}</span>
                                {/each}
                            </div>
                            <p style="font-size: 20px">Rating: </p>
                            <div class="level-left">
                                {#each categoriesMusic as music}
                                    <a class="level-item">
                                        <span class="icon is-small"><i class="fa-solid fa-star"></i></span>
                                    </a>
                                {/each}
                                {#each categoriesMusic as music}
                                    <a class="level-item">
                                        <span class="icon is-small"><i class="fa-regular fa-star"></i></span>
                                    </a>
                                {/each}
                            </div>
                        </div>
                    </div>
                    <div class="columns">
                        <div class="column">
                            {#if pub.canEdit}
                                <a class="button">Edit</a>
                            {/if}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    {#each comments as comment}
        <div class="box">
            <article class="media">
                <figure class="media-left">
                    <p class="image is-256x256">
                        <img src="https://bulma.io/images/placeholders/128x128.png">
                    </p>  
                </figure>
                <div class="media-content">
                <div class="content">
                    <p>
                    <strong>{comment.firstName} {comment.lastName}</strong> <small>{comment.email}</small> <small>{comment.date}</small>
                    <br>
                        {comment.text}
                    </p>
                </div>
                <nav class="level is-mobile">
                    <div class="level-left">
                        <a class="level-item">
                            <span class="icon is-small"><i class="fas fa-reply"></i></span>
                        </a>
                        <a class="level-item">
                            <span class="icon is-small"><i class="fas fa-retweet"></i></span>
                        </a>
                        <a class="level-item" on:click={() => addLike(comment._id)}>
                            <span data-id="{comment._id}" class="liked-icon icon is-small"><i class="fa-regular fa-heart"></i></span>
                            <span style="margin-left: 5px">3</span>
                        </a>
                    </div>
                </nav>
                </div>
                <div class="media-right">
                    {#if pub.canEdit}
                        <button class="delete"></button>
                    {:else}
                        {#if comment.canEdit}
                            <button class="delete"></button>
                        {/if}
                    {/if}
                </div>
            </article>
        </div>
    {/each}
    <div class="box">
        <article class="media">
            <figure class="media-left">
            <p class="image is-64x64">
                <img src="https://bulma.io/images/placeholders/128x128.png">
            </p>
            </figure>
            <div class="media-content">
            <div class="field">
                <p class="control">
                    <textarea id="comment-textarea" class="textarea" placeholder="Add a comment..."></textarea>
                </p>
            </div>
            <div class="field">
                <p class="control">
                    <button on:click={() => {addComment()}} class="button is-primary">Post comment</button>
                </p>
            </div>
            </div>
        </article>
    </div>
</section>
    {#if successMessage}
        <p>{successMessage}</p>
    {/if}
{/if}
