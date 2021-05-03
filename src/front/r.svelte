<script>
	import Router from 'svelte-spa-router';
	import NotFound from './NotFound.svelte';
	

	
	import App from './App.svelte';

    import AirPollution from './air-pollution/HomeAirPollution.svelte';
    import Landing from './Landing.svelte';
	import EditAirPollution from './air-pollution/EditAirPollution.svelte';

    /*
	import EditFood from './foodConsumption/EditFood.svelte';
	import HomeFood from './foodConsumption/HomeFood.svelte';
	import HomeObesity from './obesity/HomeObesity.svelte';
	import EditObe from './obesity/EditObe.svelte';
	import JustOneSanity from './sanity/JustOneSanity.svelte';
	*/
	
	const routes = {
		"/": Landing,
		"/app": App,
        "/air-pollution": AirPollution,
		"/air-pollution/:country/:year": EditAirPollution,
        "*": NotFound
        /*
		"/foodconsumption-stats": HomeFood,
		"/foodconsumption-stats/:country/:year/:foodtype": EditFood,
		"/obesity-stats": HomeObesity,
		"/obesity-stats/:country/:year": EditObe,
        "/sanity-stats/:country/:year": JustOneSanity,
		*/
		
		
	}
	
 
  
</script>
<main>
	
	<Router {routes}/>
</main>