<script>
	import { Collapse,Navbar,NavbarToggler,NavbarBrand,Nav,NavItem,NavLink,Dropdown,UncontrolledDropdown,DropdownToggle,DropdownMenu,DropdownItem } from 'sveltestrap';
	let isOpen=false;
	let isOpena=false;
	function handleUpdate(event) {
    isOpena = event.detail.isOpen;
  }
	import Router from 'svelte-spa-router';
	import NotFound from './NotFound.svelte';
	

	
	import App from './principal.svelte';

    import AirPollution from './air-pollution/HomeAirPollution.svelte';
    import Landing from './Landing.svelte';
	import EditAirPollution from './air-pollution/EditAirPollution.svelte';
	import InterTourism from './Inter-tourism/HomeInterTourism.svelte';
	import EditIntertourism from './Inter-tourism/EditInterTourism.svelte';
	import InterGraph from './Inter-tourism/Graphs.svelte';
	import MyGraph1 from './air-pollution/MyGraphAirPollution.svelte';
	import impAirPollution1 from './air-pollution/integraciones/sanityApi.svelte';
	import impAirPollution2 from './air-pollution/integraciones/obesityApi.svelte';
	import allIntegrations from './Integrations.svelte';
  	import extAirPollution1 from './air-pollution/integraciones/externalApi1.svelte';
	import extAirPollution2 from './air-pollution/integraciones/externalApi2.svelte';
	import graphITAP from './GraphITAP.svelte';
	import about from './about.svelte';
	import inteG02 from './Inter-tourism/integration/inteG02.svelte';
	import inteG04 from './Inter-tourism/integration/inteG04.svelte';
	import inteG08 from './Inter-tourism/integration/inteG08.svelte';
	import inteG10 from './Inter-tourism/integration/inteG10.svelte';
	import inteExt1 from './Inter-tourism/integration/inteExt1.svelte';
	import inteExt2 from './Inter-tourism/integration/inteExt2.svelte';
    
	
	const routes = {
		"/": Landing,
		"/info": App,
        "/air-pollution": AirPollution,
		"/integrations" : allIntegrations,
		"/air-pollution/:country/:year": EditAirPollution,
		"/air-pollution/graph": MyGraph1,
		"/air-pollution/integrationSanity" : impAirPollution1,
		"/air-pollution/integrationObesity" : impAirPollution2,
		"/air-pollution/external1" : extAirPollution1,
		"/air-pollution/external2" : extAirPollution2,
		"/international-tourisms": InterTourism,
		"/international-tourisms/:country/:year": EditIntertourism,
		"/international-tourisms/graph": InterGraph,
		"/international-tourisms/inteG02" : inteG02,
		"/international-tourisms/inteG04" : inteG04,
		"/international-tourisms/inteG08": inteG08,
		"/international-tourisms/inteG10": inteG10,
		"/international-tourisms/external1" : inteExt1,
		"/international-tourisms/external2" : inteExt2,
		"/analytics": graphITAP,
		"/about": about,
        "*": NotFound
		
	}

 
  
</script>
<main>
	<body >
		<Navbar color="light" light expand="md" >
			<NavbarToggler on:click={() => (isOpena = !isOpena)} />
				<Collapse {isOpena} navbar expand="md" on:update={handleUpdate}>
					<Nav navbar >
						<NavItem  >
							<NavLink  active href="#/">Inicio</NavLink>
						</NavItem>
						<NavItem  >
							<NavLink  active href="#/info">Información</NavLink>
						</NavItem>
						<NavItem  >
							<NavLink  active href="#/analytics">Gráfica grupal</NavLink>
						</NavItem>
						<NavItem>
							<NavLink href="#/air-pollution">Contaminación del aire</NavLink>
						</NavItem>
						<NavItem>
							<NavLink href="#/international-tourisms">Turismo Internacional</NavLink>
						</NavItem>
						<Dropdown {isOpen} toggle="{() => isOpen = !isOpen}">
							<DropdownToggle nav caret>
							API's
							</DropdownToggle>
							<DropdownMenu>
								<DropdownItem href= "https://sos2021-03.herokuapp.com/api/v1/air-pollution">Contaminación del aire</DropdownItem>
								<DropdownItem href="https://sos2021-03.herokuapp.com/api/v2/international-tourisms">Turismo internacional</DropdownItem>
								<DropdownItem href= "https://sos2021-03.herokuapp.com/api/v1/quality-of-life">Calidad de vida</DropdownItem>
							</DropdownMenu>
						</Dropdown>
					</Nav>
				</Collapse>
		</Navbar>
	
	</body>
	<Router {routes}/>
</main>