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
	import InterGraph from './Inter-tourism/InterGraph.svelte';
	import MyGraph from './air-pollution/MyGraph.svelte';
	import MyGraph1 from './air-pollution/MyGraphAirPollution.svelte';

    
	
	const routes = {
		"/": Landing,
		"/info": App,
        "/air-pollution": AirPollution,
		"/air-pollution/:country/:year": EditAirPollution,
		"/air-pollution/graph": MyGraph1,
		"/international-tourisms": InterTourism,
		"/international-tourisms/:country/:year": EditIntertourism,
		"/international-tourisms/graph": InterGraph,
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
								<DropdownItem href="https://sos2021-03.herokuapp.com/api/v1/international-tourisms">Turismo internacional</DropdownItem>
								<DropdownItem href= "https://sos2021-03.herokuapp.com/api/v1/quality-of-life">Calidad de vida</DropdownItem>
							</DropdownMenu>
						</Dropdown>
					</Nav>
				</Collapse>
		</Navbar>
	
	</body>
	<Router {routes}/>
</main>