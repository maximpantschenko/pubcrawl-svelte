<script>
    import MainNavigator from '../components/MainNavigator.svelte';
    import PubList from '../components/PubList.svelte';
</script>

<MainNavigator/>
<div class="columns box">
    <p>hier kommen die filter in all pubs</p>
</div>
<PubList allPubs={false}/>
<style>
    .box{
        margin: 10px;
    }
</style>