<script lang="ts">
	import '../app.postcss';

	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { AppShell, AppBar, Avatar, Drawer, initializeStores, storePopup, Modal, Toast, getDrawerStore, getToastStore } from '@skeletonlabs/skeleton';
	
	// For other things.
	import MediaQuery from '$lib/components/MediaQuery.svelte';
	import Navigation from '$lib/components/Navigation.svelte';
	import SizedBox from '$lib/components/SizedBox.svelte';	

	// Initialize the stores.
	initializeStores();

	// Fetch the drawer store
	const drawerStore = getDrawerStore();
	const toastStore = getToastStore();

	/**
	 * The drawer store.
	 */
	function drawerOpen(): void {
		drawerStore.open();
	}

	// Do these things.
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });
</script>

<Modal />

<!-- For mobile and tablet screens -->
<MediaQuery query="(max-width: 1024px)" let:matches>
	{#if matches}
		<Toast position="b" />
	{:else}
		<!-- For desktop screens -->
		<Toast position="tr" />
	{/if}
</MediaQuery>

<Drawer
	bgBackdrop="bg-transparent"
	shadow=""
	bgDrawer="bg-transparent"
	width="w-70"
	on:backdrop={drawerStore.close}
>
	<Navigation />
</Drawer>

<AppShell slotSidebarLeft="w-0 lg:w-52 bg-primary-700">
	<!-- For the header on top -->
	<svelte:fragment slot="header">
		<AppBar class="lg:hidden" background="bg-primary-700">
			<svelte:fragment slot="lead">
				<button class="btn btn-sm mr-4" on:click={drawerOpen}>
					<span>
						<svg viewBox="0 0 100 100" class="fill-token w-4 h-4">
							<rect width="100" height="20" />
							<rect y="40" width="80" height="20" x="10" />
							<rect y="80" width="100" height="20" />
						</svg>
					</span>
				</button>
			</svelte:fragment>

			<svelte:fragment slot="trail">
				<div class="flex flex-row items-center">
					<!-- For the email thing -->
					<button
						class="pb-1 pt-1 pl-2 pr-2 w-fit h-fit border rounded-md text-center items-center justify-center mr-2"
					>
						<i class="fas fa-envelope text-white"></i>
					</button>

					<!-- For the avatar widget -->
					<Avatar initials="SH" fill="fill-gray-900" background="bg-gray-300" width="w-14" />

					<!-- Some extra spacing before this one -->
					<SizedBox width="w-4" />

					<!-- More user related info. -->
					<div class="flex flex-col">
						<p class="text-white font-bold text-sm">Student Helper</p>
						<p class="text-white text-sm">Administator</p>
						<p class="text-white text-sm">admin@calebuniversity.edu.ng</p>
					</div>
				</div>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>

	<!-- For the sidebar in the left. -->
	<svelte:fragment slot="sidebarLeft">
		<Navigation />
	</svelte:fragment>

	<!-- Router Slot -->
	<div class="p-10 bg-surface-300 overflow-y-scroll pb-32 h-fit min-h-screen">
		<!-- If this is not the settings page -->
		<MediaQuery query="(max-width: 1024px)" let:matches>
			{#if matches}
				<h2 class="text-black text-xl">Welcome, Admin 👋</h2>
				<h3 class="text-gray-700 text-sm">Here's what happened since you left</h3>
			{:else}
				<!-- For desktop screens. -->
				<div class="flex flex-row justify-between">
					<div class="flex flex-col">
						<h2 class="text-black text-xl">Welcome, Admin 👋</h2>
						<h3 class="text-gray-600 text-sm">Here's what happened since you left</h3>
					</div>

					<div class="flex flex-row items-center">
						<!-- For the avatar widget -->
						<Avatar initials="SH" fill="fill-gray-900" background="bg-gray-300" width="w-14" />

						<!-- Some extra spacing before this one -->
						<SizedBox width="w-4" />

						<!-- More user related info. -->
						<div class="flex flex-col">
							<p class="text-black font-bold text-sm">Student Helper</p>
							<p class="text-gray-800 text-sm">Administator</p>
							<p class="text-gray-700 text-sm">admin@calebuniversity.edu.ng</p>
						</div>
					</div>
				</div>
			{/if}
		</MediaQuery>

		<!-- Some space -->
		<SizedBox height="h-8" />

		<!-- Finally show the actual contents here. -->
		<slot />
	</div>
</AppShell>
