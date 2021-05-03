<script>
    import TableAirPollution from './AirPollutionTable.svelte';
    import {
        pop
    } from "svelte-spa-router";
    import Button from "sveltestrap/src/Button.svelte";
</script>
<head>
    <title>Contaminacion del aire</title>
</head>
<main>
    <h1>
        Estadisticas de muerte por contaminacion del aire:
    </h1>
    <TableAirPollution/>
    <Button outline color="secondary" on:click="{pop}">Volver</Button>

    
</main>