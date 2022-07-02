<script>
    import MainNavigator from '../components/MainNavigator.svelte';
    import {getContext, onMount} from "svelte";
    import jq from 'jquery';
    import { push,pop } from 'svelte-spa-router';

    if(localStorage.pubcrawl == null){
        push("/login");
    }

    export let params;

    let loading = {
        value: 5,
        show: true,
    };

    let pub = null;

    let id = null;
    let name = "";
    let description = "";
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
        loading.value = 15;
        pub = await pubcrawlService.getPubById(id);
        // /api/pubs/editable/{id}
        
        loading.value = 35;
        //categoriesMusic = await pubcrawlService.getCategoriesMusicByIds(pub.categoriesMusic);
        /*
        name = pub.name;
        description = pub.description;
        city = pub.city;
        country = pub.country;
        lat = pub.lat;
        lng = pub.lng;
        img = pub.img;
        */
        canEdit = pub.canEdit;
        if(pub.categoriesMusic!=null) categoriesMusic = pub.categoriesMusic;
        getComments();
    });

    async function getComments(){
        loading.value = 50;
        comments = await pubcrawlService.getCommentsByPubId(pub._id);
        loading.value = 80;
        loading.show = false;
    }

    async function addComment(){
        const text = jq("#comment-textarea").val();

        const pubid = pub._id;
        const date = null;
        const likes = null;

        let success = await pubcrawlService.createComment(text, date, likes, pubid);
        if(success){
            successMessage = "Created Comment Succesfully";
            jq("#comment-textarea").val("");
        }else{
            errorMessage = "Couldn't Create the Comment";
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

    async function deletePub(id){
        let success = await pubcrawlService.deletePub(id);
        if(success){
            //push("/discover");
            goBack();
        }else{
            errorMessage = "Couldn't delete the Pub";
        }
    }

    async function deleteComment(commentid){
        let success = await pubcrawlService.deleteComment(commentid);
        if(success){
            successMessage = "Deleted Comment successfully";
            getComments();
        }else{
            errorMessage = "Couldn't delete Comment";
        }
    }

    async function deleteNotification(){
        jq(".notification").remove();
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
        <div class="columns is-12">
            <div class="column is-1">
                <a class="button" on:click={goBack}><i class="fa-solid fa-arrow-left"></i></a>
            </div>
            <div class="column">
                <span class="title">Pubs</span>
            </div>
        </div>
        
    </div>
</section>
<section class="section">
    <div class="box columns">
        <div class="column is-one-third">
            <figure class="image is-4by3">
                {#if pub.img}
                    <img src="{pub.img}" alt="Placeholder image">
                {:else}
                    <img src="/logo-on-frame.png" alt="Placeholder image">
                {/if}
            </figure>
        </div>
        <div class="column">
            <div class="media">
                <div class="media-content">
                    <h1 class="title">{pub.name}</h1>
                    <h2 class="subtitle">{pub.city}</h2>
                    <div class="columns">
                        <div class="column">
                            <p style="font-size: 20px">Description</p>
                            <p>{pub.description}</p>
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
                            <!--<div class="level-left">
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
                            </div>-->
                        </div>
                    </div>
                    <div class="columns">
                        <div class="column">
                            <div class="field is-grouped">
                                <div class="control">
                                    <a href="/#/gallery/{pub._id}" class="button is-link">Gallery</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="columns">
                        <div class="column">
                            {#if pub.canEdit}
                                <div class="field is-grouped">
                                    <div class="control">
                                        <a href="/#/editpub/{pub._id}" class="button is-primary">Edit</a>
                                    </div>
                                    <div class="control">
                                        <button on:click={() => {deletePub(pub._id)}} class="card-footer-item button is-danger">Delete</button>
                                    </div>
                                </div>
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
                    <p class="image is-32x32">
                        <img src="/user.png">
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
                <!--
                <nav class="level is-mobile">
                    <div class="level-left">
                        <a class="level-item" on:click={() => addLike(comment._id)}>
                            <span data-id="{comment._id}" class="liked-icon icon is-small"><i class="fa-regular fa-heart"></i></span>
                            <span style="margin-left: 5px">3</span>
                        </a>
                    </div>
                </nav>-->
                </div>
                <div class="media-right">
                    {#if pub.canEdit}
                        <button class="delete" on:click={() => deleteComment(comment._id)}></button>
                    {:else}
                        {#if comment.canEdit}
                            <button class="delete" on:click={() => deleteComment(comment._id)}></button>
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
                    <img src="/user.png">
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
<section>
    {#if successMessage}
        <div class="notification is-success">
            <a class="delete" on:click={() => {deleteNotification()}}></a>
            {successMessage}
        </div>
    {/if}
    {#if errorMessage}
        <div class="section">
            <div class="notification is-warning">
                <a class="delete" on:click={() => {deleteNotification()}}></a>
                {errorMessage}
            </div>
        </div>
    {/if}
</section>
{/if}
