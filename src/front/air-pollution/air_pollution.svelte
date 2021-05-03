<script>
	import Router from  'svelte-spa-router';
	import AirPollution from './air-pollution/air_pollution.svelte';
	import Home from './Home.svelte';
	import NotFound from './NotFound.svelte';

	const routes = {
		"/" : Home,
		"*" : NotFound,
		"/air-pollution": AirPollution
		
	}
</script>

	<head>
		<title>Contaminacion del aire</title>
	</head>
	<main>
		<h1>
			Estadisticas de muerte por contaminacion del aire:
		</h1>
		<Router {routes} />
		
	</main>


