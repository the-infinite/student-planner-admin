<script lang="ts">
	import { ProgressRadial, getToastStore } from '@skeletonlabs/skeleton';

	// Do this one.
	const toastStore = getToastStore();
	var course: string;
	var name: string;

	var loading = false;

	/**
	 * Helper function used to print an error to the screen.
	 * @param message THe error message to print.
	 */
	function showError(message: string) {
		toastStore.trigger({
			message: message,
			background: 'variant-filled-error'
		});

		// Now it is no longer loading.
		loading = false;
	}

	async function createNew() {
		// Yeah, it is loading.
		loading = true;

		//? If the topic is not set...
		if (!course || course?.trim().length === 0) {
			showError(
				'You are required to pass a department code. It is usually 2 to 5 characters long. A valid example is CSC.'
			);
		}

		//? If the subject is not set when we expect it to be...
		else if (!name || name?.trim().length === 0) {
			showError('You are required to add the full name of this department.');
		}

		//? Since all is good and fine.
		else {
			const department = {
				course: course.toUpperCase(),
				name
			};

			// Now it is time to post this to the database.
			const response = await fetch('/api/department', {
				method: 'POST',
				body: JSON.stringify(department)
			});

			//? First, if the schedule was created successfully...
			if (response.ok) {
				toastStore.trigger({
					message: await response.text(),
					background: 'variant-filled-success'
				});
			}

			//? This failed so show failure.
			else {
				showError(await response.text());
			}

			// Now it is loading.
			loading = false;
		}
	}
</script>

<!-- Flex on these ones boy -->
<form
	class="bg-white w-full min-h-80 rounded-xl h-fit pt-10 pb-10 md:pl-16 md:pr-16 pr-10 pl-10 flex flex-col gap-3 text-black"
>
	<div class="text-black flex flex-col mb-5">
		<h2 class="text-black text-xl font-semibold">Add a new department</h2>
		<h3 class="text-sm">Required fields have a *</h3>
	</div>

	<!-- For the topic of the event or class -->
	<input
		class="border-2 rounded-lg w-full placeholder-black/45 border-primary-500/80"
		type="text"
		bind:value={course}
		placeholder="Enter the department code*"
	/>

	<!-- For the subejct of the event or class -->
	<input
		class="border-2 rounded-lg w-full placeholder-black/45 border-primary-500/80"
		type="text"
		bind:value={name}
		placeholder="Enter the department name*"
	/>

	<!-- This is the department to use -->
	<button
		class="btn bg-primary-500 flex flex-row justify-start text-white w-full text-left mt-10"
		on:click={createNew}
	>
		{#if loading}
			<ProgressRadial width="w-5" />
		{:else}
			<p class="text-left flex">Create department</p>
		{/if}
	</button>
</form>
