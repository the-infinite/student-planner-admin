<script lang="ts">
	import { browser } from "$app/environment";
	import type { PageData } from "./$types";

	export let data: PageData
	
	//? Only in the browser end of things do we log this for now.
	if(browser) {
		console.log(data)
	}
</script>