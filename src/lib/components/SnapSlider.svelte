<!--! This is nonfunctional and horridly incomplete. -->

<script>
	let sections = ['Section 1', 'Section 2', 'Section 3', 'Section 4', 'Section 5'];
</script>

<div class="slider">
	{#each sections as section}
		<section>
			<h1>{section}</h1>
		</section>
	{/each}
</div>

<style>
	* {
		box-sizing: border-box;
		margin: 0;
		padding: 0;
	}
	.slider {
		font-family: sans-serif;
		scroll-snap-type: x mandatory;
		display: flex;
		-webkit-overflow-scrolling: touch;
		overflow-x: scroll;
	}
	section {
		border-right: 1px solid white;
		padding: 1rem;
		min-width: 100vw;
		height: 100vh;
		scroll-snap-align: start;
		text-align: center;
		position: relative;
	}
	h1 {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		text-align: center;
		color: black;
		width: 100%;
		left: 0;
		font-size: calc(1rem + 3vw);
	}
</style>
