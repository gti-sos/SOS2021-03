<script>
    import TableInterTourism from './MiTable.svelte';
    
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
    <Button id="Volverinfo" outline color="info" href="#/info">Volver a info</Button>

    
</main>