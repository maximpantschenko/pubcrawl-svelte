<script>
    import MainNavigator from '../components/MainNavigator.svelte';
    import {getContext, onMount} from "svelte";
    import {push} from "svelte-spa-router";
    import {user} from "../stores";
    let firstName = "";
    let lastName = "";
    let email = "";
    let password = "";

    const pubcrawlService = getContext("PubcrawlService");

    let errorMessage = "";

    if(localStorage.pubcrawl == null){
        push("/login");
    }else{
        onMount(async () => {
            const user = await pubcrawlService.getCurrentUser();
            firstName = user.firstName;
            lastName = user.lastName;
            email = user.email;
            password = user.password;
        });
    }

    async function updateUser() {
    let success = await pubcrawlService.signup(firstName, lastName, email, password)
    if (success) {
      push("/login");
    } else {
      errorMessage = "Error Trying to update your account details";
    }
  }
</script>

<MainNavigator/>
<div class="box">
    <h1 class="title">Account</h1>
</div>
<div class="box">
    <form on:submit|preventDefault={updateUser}>
        <div class="field is-horizontal">
          <div class="field-body">
            <div class="field">
              <label for="firstname" class="label">First Name</label>
              <input bind:value={firstName} id="firstname" class="input" type="text" placeholder="Enter first name" name="firstName">
            </div>
            <div class="field">
              <label for="lastname" class="label">Last Name </label>
              <input bind:value={lastName}  id="lastname" class="input" type="text" placeholder="Enter last name" name="lastName">
            </div>
          </div>
        </div>
        <div class="field">
          <label for="email" class="label">Email</label>
          <input bind:value={email} id="email" class="input" type="text" placeholder="Enter email" name="email">
        </div>
        <div class="field">
          <label for="password" class="label">Password</label>
          <input bind:value={password} id="password" class="input" type="password" placeholder="Enter Password" name="password">
        </div>
        <div class="field is-grouped">
          <button class="button is-link">Save</button>
        </div>
    </form>
</div>