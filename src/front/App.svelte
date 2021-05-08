<script>
	import Router from 'svelte-spa-router';
	import NotFound from './NotFound.svelte';
	

	
	import App from './principal.svelte';

    import AirPollution from './air-pollution/HomeAirPollution.svelte';
    import Landing from './Landing.svelte';
	import EditAirPollution from './air-pollution/EditAirPollution.svelte';
	import InterTourism from './Inter-tourism/HomeInterTourism.svelte';
	import EditIntertourism from './Inter-tourism/EditInterTourism.svelte';

    
	
	const routes = {
		"/": Landing,
		"/info": App,
        "/air-pollution": AirPollution,
		"/air-pollution/:country/:year": EditAirPollution,
		"/international-tourisms": InterTourism,
		"/international-tourisms/:country/:year": EditIntertourism,
		"/international-tourisms/:country/": InterTourism,
		"/international-tourisms/:year/": InterTourism,
        "*": NotFound
	}
	
 
  
</script>
<main>
	
	<Router {routes}/>
</main>