<script>
    import MainNavigator from '../components/MainNavigator.svelte';
    import PubForm from '../components/PubForm.svelte';
    export let params;
    </script>
    
    <MainNavigator/>
    <PubForm pubid={params.pubid}/>