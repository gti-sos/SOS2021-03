<script>
	
    let contacts = []
    async function getElements(){
        console.log("Fetching registers ...");
        const res = await fetch("/elements");
        if(res.ok){
            console.log("OK!");
            const json = await res.json();
            elements = json;
            console.log('All done!');
        }else{
            console.log("Error!");
        }
    }
    getElements();

</script>

<main>
	<h1>Muertes por contaminacion del aire</h1>
	
</main>

