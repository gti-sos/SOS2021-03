<script>
    import TableInterTourism from './MiTable.svelte';
    import {
        pop
    } from "svelte-spa-router";
    import Button from "sveltestrap/src/Button.svelte";
</script>
<head>
    <title>Turismo Internacional</title>
</head>
<main>
    <h1>
        Estadisticas sobre el turismo internacional:
    </h1>
    <TableInterTourism/>
    <Button outline color="info" on:click="{pop}">Volver</Button>

    
</main>