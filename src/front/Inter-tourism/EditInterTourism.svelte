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
    let updatedCountry = "XXXX";
    let updatedYear = 1234;
    let updatedArribals = 12345;
    let updatedDepartures = 12345;
    let updatedExpenditures = 12345;
    let errorMsg = "";

    onMount(getRegisters);

    async function getRegisters() {

        console.log("Fetching registers...");
        const res = await fetch("/api/v1/international-tourisms/" + params.country+ "/"+params.year);

        if (res.ok) {
            console.log("All OK");
            const json = await res.json();
            register = json;
            updatedCountry = register.country;
            updatedYear = parseInt(register.year);
            updatedArribals = parseFloat(register.numberofarribals);
            updatedDepartures = parseFloat(register.numberofdepartures);
            updatedExpenditures =parseFloat(register.expendituresbillion);
            console.log("Received register.");
        } else {
            errorMsg = res.status + ": " + res.statusText;
            console.log("ERROR!" + errorMsg);
        }
    }


    async function updateRegister() {

        console.log("Updating register..." + JSON.stringify(params.country)+ ", " + JSON.stringify(params.year));

        const res = await fetch("/api/v1/international-tourisms/" + params.country+ "/"+params.year, {
            method: "PUT",
            body: JSON.stringify({
                country: params.country,
                year: params.year, 
                numberofarribals: updatedArribals,
                numberofdepartures: updatedDepartures,
                expendituresbillion: updatedExpenditures
                
            }),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(function (res) {
            getRegisters();
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
    {#if errorMsg == "404"}
        <Alert color="danger" dismissible>
        No se ha podido actualizar su modificación, dato no encontrado.
        </Alert>
    {/if}
    {#if getRegisters} 
      <Alert color="success" dismissible>
       El dato ha sido actualizado con éxito!
      </Alert>
    {/if}

    <Button outline color="secondary" on:click="{pop}">Volver</Button>
</main>