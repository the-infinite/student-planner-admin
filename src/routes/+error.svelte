<script lang="ts">
	import { page } from '$app/stores';
</script>

<div
	class="{$page.status > 499
		? 'bg-error-100'
		: 'bg-primary-100'} w-full h-96 flex flex-col justify-center items-center"
>
	{#if $page.status === 404}
		<i class="fas fa-circle-question text-primary-700 text-8xl mb-5"></i>
		<h1 class="text-primary-700 lg:text-3xl text-xl font-bold">
			We can't find what you're looking for
		</h1>
		<p class="mt-5 text-black text-sm lg:text-base text-center font-medium">
			This page or resource you are looking for does not exist. It might have been deleted or moved
			to a different location.
		</p>
	{:else if $page.status === 500}
		<i class="fas fa-circle-xmark text-error-700 text-8xl mb-5"></i>
		<h1 class="text-error-700 lg:text-3xl text-xl font-bold">It's not on you, it's on us</h1>
		<p
			class="mt-5 text-black text-sm lg:text-base text-center font-medium pl-5 pr-5 lg:w-modal w-full"
		>
			Something has gone horribly wrong. If this issue persists, please contact our support
			officers. We're really sorry though! By the time you see this, we should have been working on
			this!
		</p>
	{:else if $page.status === 401 || $page.status === 403}
		<i class="fas fa-shield-halved text-error-700 text-8xl mb-5"></i>
		<h1 class="text-error-700 lg:text-3xl text-xl font-bold">You shouldn't be here</h1>
		<p
			class="mt-5 text-black text-sm lg:text-base text-center font-medium pl-5 pr-5 lg:w-modal w-full"
		>
			You are currently not allowed to see this. A common solution to this might be that you need to
			log in. If you try to log in and this issue persists, please contact our support, and tell
			them everything that happened until you saw this screen. Note that you can also see this
			screen in the event that your account has been deactivated, restricted, or blocked. In such a
			case, it is even to be expected.
		</p>
	{/if}
</div>
