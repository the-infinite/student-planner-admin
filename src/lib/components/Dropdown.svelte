<script lang="ts">
	type DropdownItem = {
		id: string;
		name: string;
	};

	export let items: DropdownItem[];
	export let title: string;
	export let dropdownStyle: string = 'border-2 rounded-lg w-full border-primary-500/80';
	export let itemStyle: string = 'border-2 rounded-lg w-full border-primary-500/80';
	export let selected: DropdownItem;

	let defaultItems: DropdownItem[] = [
		{
			id: '??',
			name: title
		},

		...(items ?? [])
	];
</script>

<select class={dropdownStyle}>
	{#each defaultItems as item}
		<option
			value={item.id}
			class={itemStyle}
			on:click={function () {
				selected = item;
			}}>{item.name}</option
		>
	{/each}
</select>
