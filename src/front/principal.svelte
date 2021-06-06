<script> 
	import Qof from './quality_of_life/quality_of_life.svelte';
	
	import {
    	Button,
    	Modal,
    	ModalBody,
   		ModalFooter,
   		ModalHeader
  	} from 'sveltestrap';

  let opena = false;
  
  const togglea = () =>{
  	
  	(opena = !opena);
  } 
</script>

<head>
<title>Readme fichero</title>
</head>

<main>
	<h1>SOS2021-03</h1>
	
	
	<h3>Proyecto</h3>
	<div>Nuestras fuentes de información están orientadas a analizar la relación que existe entre como la calidad de vida puede influenciar al turismo y este ver si al viajar más, es decir, se usan más transportes, hace que aumente la contaminación del aire y las muertes que esto conlleva.</div>
	
	<a href="https://github.com/gti-sos/SOS2021-03.git" class="btn btn-outline-warning" role="button" aria-pressed="true">REPOSITORIO DE GITHUB</a>
	<br>
	<br>
	<h3><a href="https://sos2021-03.herokuapp.com/#/integrations">Integraciones</a></h3>
	<br>
	<br>
	<h3><a href="https://sos2021-03.herokuapp.com/#/analytics">Gráfica grupal</a></h3>
	<br>
	<br>
	<h3><a href="https://sos2021-03.herokuapp.com/#/about.svelte">Vídeos explicativos</a></h3>
	<br>
	<br>
	
	<div> <h3>API's</h3></div>
	<ul>

		<li><a href="https://sos2021-03.herokuapp.com/api/v1/air-pollution">Air-pollutions deaths</a> (developed by Joan Villalonga)</li>
		<li><a href="https://sos2021-03.herokuapp.com/api/v2/international-tourisms">Inter Tourisms</a> (developed by Paula Garrido Lerma)</li>
		<li><a href="https://sos2021-03.herokuapp.com/api/v1/quality-of-life">Quality of life indexes</a> (developed by Ayman Alaoui Mhammedi)</li>

	</ul>
	<h3>Miembros del grupo</h3>
	<ul>
		<li>
			<h5>Desarrollado por Joan Villalonga Alvaro.</h5> 
			
			<table>
				<thead>
					
				</thead>
				<tr>
					<td>
						<a href="https://github.com/joavilalv" class="btn btn-outline-warning" role="button" aria-pressed="true">Perfil de GITHUB</a>
					</td>
					<td>
						
					</td>
					<td>
						<a href="https://ourworldindata.org/grapher/death-rates-from-air-pollution" class="btn btn-outline-warning" role="button" aria-pressed="true">FUENTE: air-pollution</a>
					</td>
				</tr>
			</table>
			
			<br>
			
			 
			<table>
				<thead>
					Estadísticas de muertes por contaminación del aire:
				</thead>
				<tr>
					<td>
						<a href="#/air-pollution" id="air-pollution" class="btn btn-outline-warning" role="button" aria-pressed="true">FRONT-END</a>
					</td>
					<td>
						<a href="https://sos2021-03.herokuapp.com/api/v1/air-pollution" class="btn btn-outline-warning" role="button" aria-pressed="true">API Muertes por contaminación del aire</a>
					</td>
				</tr>
				<tr>
					<td>
						<a href="https://documenter.getpostman.com/view/14974548/TzJoE1G7" class="btn btn-outline-warning" role="button" aria-pressed="true">TEST de POSTMAN</a>
					</td>
					<td>
						<a href="https://sos2021-03.herokuapp.com/api/integrations/air-pollution/" class="btn btn-outline-warning" role="button" aria-pressed="true">API DISPONIBLE PARA INTEGRACIONES</a>
					</td>
				</tr>
			</table>

		</li>
		<br>
		

		<li><h5>Desarrollado por Paula Garrido Lerma.</h5> 
			
			
			<a href="https://github.com/Paula0008" class="btn btn-outline-info" role="button" aria-pressed="true">Cuenta de Github</a>
			<a href="https://data.worldbank.org/indicator/ST.INT.RCPT.XP.ZS?end=2018&most_recent_year_desc=false&start=2018&view=map&year=1995" class="btn btn-outline-info" role="button" aria-pressed="true">Fuente utilizada: international-tourisms</a>
			<br>
			<br>
			
			Turismo internacional: 
			<br>
			<br>
			<a href="#/international-tourisms" class="btn btn-outline-info" role="button" aria-pressed="true">Ver estadísticas(front-end)</a>
			<br>
			<a href="https://sos2021-03.herokuapp.com/api/v1/international-tourisms" class="btn btn-outline-info" role="button" aria-pressed="true">API turismo internacional v1</a>
			<br>
			<a href="https://sos2021-03.herokuapp.com/api/v2/international-tourisms" class="btn btn-outline-info" role="button" aria-pressed="true">API turismo internacional v2</a>
			<br>
			<a href="https://documenter.getpostman.com/view/9683446/TzJoE1Zk" class="btn btn-outline-info" role="button" aria-pressed="true">Test de POSTMAN v1</a>
			<br>
			<a href="https://documenter.getpostman.com/view/9683446/TzXzEHnh" class="btn btn-outline-info" role="button" aria-pressed="true">Test de POSTMAN v2</a>

		</li>

	   <li><h5>Indices de calidad de vida:</h5>  
			<div><a href="https://documenter.getpostman.com/view/14967959/TzJydbsW">- POSTMAN: https://documenter.getpostman.com/view/14967959/TzJydbsW</a>
			<a href= "https://sos2021-03.herokuapp.com/api/v1/quality-of-life">[https://sos2021-03.herokuapp.com/api/v1/quality-of-life] (developed by [Ayman Alaoui Mhammedi](https://github.com/AymanAlaouiMhammedi))</a></div>
			<div> - [Ayman Alaoui Mhammedi]<a href="https://github.com/AymanAlaouiMhammedi">https://github.com/AymanAlaouiMhammedi)</a></div>
			<p>
				
				<Button outline color="warning" on:click={togglea}>Mostrar</Button>
				<Modal isOpen={opena} {togglea} size= 'lg'>
				<ModalHeader {togglea}>Calidad de vida:</ModalHeader>
				<ModalBody>
					<Qof/>
				</ModalBody>
				<ModalFooter>
				<Button color="secondary" on:click={togglea}>Cerrar</Button>
				</ModalFooter>
				</Modal>
			</p>
		   
		</li>
	</ul>



	
</main>

<style>
	main {
		text-align: left;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}
	h1 {
		color: #5ea8d3;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}
	
	ul {
		width: fit-content;
	}
	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>