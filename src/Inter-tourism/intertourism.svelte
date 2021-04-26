<script>
	import MiTable from './MiTable.svelte';
</script>

<main>
	<h1>Hola personas!</h1>
	<p>Aquí encontrará datos sobre el turismo internacional</p>
    <MiTable></MiTable>
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #28f1f1;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>