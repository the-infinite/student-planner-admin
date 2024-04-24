<script lang="ts">
	import type { MouseEventHandler } from "svelte/elements";

	export let onClick: MouseEventHandler<HTMLAnchorElement>;
	export let link: string;
	export let name: string;
	export let image: string;
	export let isActive: boolean;
	export let altText: string = "Drawer Item";
</script>

<div class="app-drawer-button flex flex-row {isActive ? "text-primary-700 app-active bg-white" : ""}">
	<img alt={altText} src={image} height="25" width="25"/>
	<a href={link} on:click={onClick}>{name}</a>
</div>
