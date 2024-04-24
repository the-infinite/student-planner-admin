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
</script>