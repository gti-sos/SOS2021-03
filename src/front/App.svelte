<script>
	import Router from 'svelte-spa-router';
	import NotFound from './NotFound.svelte';
	

	
	import App from './principal.svelte';

    import AirPollution from './air-pollution/HomeAirPollution.svelte';
    import Landing from './Landing.svelte';
	import EditAirPollution from './air-pollution/EditAirPollution.svelte';

    
	
	const routes = {
		"/": Landing,
		"/app": App,
        "/air-pollution": AirPollution,
		"/air-pollution/:country/:year": EditAirPollution,
        "*": NotFound
        
		
		
	}
	
 
  
</script>
<main>
	
	<Router {routes}/>
</main>