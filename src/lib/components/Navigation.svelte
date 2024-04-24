<script lang="ts">
	import { getDrawerStore } from '@skeletonlabs/skeleton';
	import DrawerButton from './DrawerButton.svelte';
	import { browser } from '$app/environment';
	import SizedBox from './SizedBox.svelte';

	// Get the drawer
	const drawerStore = getDrawerStore();
	let selectedItemIndex: number;

	//? If we are running in the browser...
	if (browser) {
		if (window.location.pathname.startsWith('/users')) {
			selectedItemIndex = 1;
		} else if (window.location.pathname.startsWith('/colleges')) {
			selectedItemIndex = 2;
		} else if (window.location.pathname.startsWith('/departments')) {
			selectedItemIndex = 3;
		} else {
			selectedItemIndex = 0;
		}
	}

	// Close this drawer.
	function drawerClose(index: number): void {
		// Now, we need a more permanent solution.
		selectedItemIndex = index;
		drawerStore.close();
	}
</script>

<nav class="list-nav p-4 bg-primary-700 h-full">
	<ul>
		<li>
			<SizedBox height="h-24" /> 
		</li>
		<li>
			<DrawerButton
				name="Schedules"
				link="/"
				image="/icon{selectedItemIndex === 0 ? '/dark' : ''}/menu.svg"
				onClick={() => drawerClose(0)}
				isActive={selectedItemIndex === 0}
			/>
		</li>
		<li>
			<DrawerButton
				name="Users"
				link="/users"
				image="/icon{selectedItemIndex === 1 ? '/dark' : ''}/user.svg"
				onClick={() => drawerClose(1)}
				isActive={selectedItemIndex === 1}
			/>
		</li>
		<li>
			<DrawerButton
				name="Colleges"
				link="/colleges"
				image="/icon{selectedItemIndex === 2 ? '/dark' : ''}/school.svg"
				onClick={() => drawerClose(2)}
				isActive={selectedItemIndex === 2}
			/>
		</li>
		<li>
			<DrawerButton
				name="Department"
				link="/departments"
				image="/icon{selectedItemIndex === 3 ? '/dark' : ''}/report.svg"
				onClick={() => drawerClose(3)}
				isActive={selectedItemIndex === 3}
			/>
		</li>
	</ul>
</nav>
