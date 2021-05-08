<script>
    import {
        onMount
    } from "svelte";

    import {
        pop
    } from "svelte-spa-router";
    
    import { Alert } from 'sveltestrap';
      

    import Table from "sveltestrap/src/Table.svelte";
    import Button from "sveltestrap/src/Button.svelte";

    export let params = {};
    let register = {};
    let updatedCountry = "";
    let updatedYear = 0;
    let updatedArribals = 0.0;
    let updatedDepartures = 0.0;
    let updatedExpenditures = 0.0;
    let errorMsg = "";

    onMount(getRegisters);

    async function getRegisters() {

        console.log("Fetching registers...");
        const res = await fetch("/api/v1/international-tourisms/" + params.country+ "/"+params.year);

        if (res.ok) {
            console.log("All OK");
            const json = await res.json();
            register = json;
            updatedCountry = params.country;
            updatedYear = parseInt(params.year);
            updatedArribals = register.numberofarribals;
            updatedDepartures = register.numberofdepartures;
            updatedExpenditures = register.expendituresbillion;
            console.log("Received modifications.");
        } else if(res.status == 404){
            window.alert("El dato: " + params.country + " " + params.year + " no existe");
        
        }
    }


    async function updateRegister() {

        console.log("Updating register..." + JSON.stringify(params.country)+ ", " + JSON.stringify(params.year));

        const res = await fetch("/api/v1/international-tourisms/" + params.country+ "/"+params.year, {
            method: "PUT",
            body: JSON.stringify({
                country: params.country,
                year: parseInt(params.year), 
                numberofarribals: updatedArribals,
                numberofdepartures: updatedDepartures,
                expendituresbillion: updatedExpenditures
                
            }),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(function (res) {
            getRegisters();
            if(res.ok){
                SuccessMsg = res.status + ": " + res.statusText;
                console.log("OK!" + SuccessMsg);

            }else if(res.status == 400){
                window.alert("Datos no son válidos");
            }
        });



    }
</script>
<main>
    <h3>Editar registro con pais <strong>{params.country}</strong> y año <strong>{params.year}</strong></h3>
        <Table bordered>
            <thead>
                <tr>
                    <th>Pais</th>
                    <th>Año</th>
                    <th>Número de llegadas</th>
                    <th>Número de salidas</th>
                    <th>Gastos en billones</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{updatedCountry}</td>
                    <td>{updatedYear}</td>


                    <td><input bind:value="{updatedArribals}"></td>
                    <td><input bind:value="{updatedDepartures}"></td>
                    <td><input bind:value="{updatedExpenditures}"></td>
                    <td> <Button outline  color="primary" on:click={updateRegister}>Actualizar</Button> </td>
                </tr>
        </tbody>
        </Table>
    {#if !errorMsg}
        <p style="color: green">{SuccessMsg}. País actualizado con éxito</p>
    {/if}
    <Button outline color="secondary" on:click="{pop}">Volver</Button>
</main>