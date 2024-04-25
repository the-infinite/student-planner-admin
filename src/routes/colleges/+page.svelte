<script lang="ts">
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import { getToastStore } from '@skeletonlabs/skeleton';

	export let data: PageData;

	// Do this one.
	const toastStore = getToastStore();

	// When this has been mounted...
	onMount(() => {
		if (data.error) {
			// This is fine.
			toastStore.trigger({
				message: data.error.message,
				background: 'variant-filled-error'
			});
		}
	});

	/**
	 * A helper function used to create a new one
	 */
	async function createNew() {
		window.location.assign('/colleges/new');
	}
</script>

<!-- Finally, the payment list view -->
<div class="flex flex-col">
	<div class="flex flex-row items-center pt-5 justify-between">
		<!-- The title of this page -->
		<h1 class="text-3xl text-black">All Colleges</h1>

		<!-- For filtering by month -->
		<button class="rounded-lg bg-primary-700 text-sm" on:click={createNew}>
			<div class="flex flex-row gap-2 pl-4 pr-4 pt-2 pb-2 items-center">
				<i class="fas fa-plus"></i>
				<p class="">Add College</p>
			</div>
		</button>
	</div>
	<div class="md:w-full w-screen">
		<table class="text-gray-500 w-full mt-6 text-sm overflow-x-scroll">
			<tr class="bg-gray-200 text-start">
				<th class="pl-1 pr-1 pt-3 pb-3 text-start w-fit">College Code</th>
				<th class="pl-1 pr-1 pt-3 pb-3 text-start w-fit">Name</th>
			</tr>
			<tbody>
				{#each data.colleges as college}
					<tr>
						<!-- For the college -->
						<td class="pl-2 pr-1 pt-3 pb-3 text-black text-xs text-start">
							{college.code}
						</td>

						<!-- For the department -->
						<td class="pl-2 pr-1 pt-3 pb-3 text-black text-xs text-start">
							{college.name}
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>
