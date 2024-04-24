<script lang="ts">
	export let height: string = "h-0";
	export let width: string = "w-0";
</script>

<div class="{height} {width}">
	<slot />
</div>
