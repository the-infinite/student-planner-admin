<script lang="ts">
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import { InputChip, ProgressRadial, getToastStore } from '@skeletonlabs/skeleton';
	import { Constants } from '$lib/constants';

	export let data: PageData;
	var level: number | 'Open';
	var topic: string | null;
	var subject: string | null;
	var description: string | null;
	var dayOfWeek: string = 'date';
	var type: string;
	var startsAt: string;
	var endsAt: string;
	var college: string;
	var department: string;
	var hosts: string[] = [];

	var loading = false;

	// Do this one.
	const toastStore = getToastStore();

	// When this has been mounted...
	onMount(() => {
		if (data.error) {
			// This is fine.
			showError(data.error.message);
		}
	});

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

	/**
	 * Helper function used to check if this is a case where you CAN show the date picker button.
	 */
	function isSpecialDay(value: string): boolean {
		// This is fine.
		const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

		// If this is a cannonical date.
		return days.indexOf(value.toLowerCase()) === -1 && value !== Constants.openSchedulesReference;
	}

	/**
	 * Encodes the time in the manner stored in the backend.
	 */
	function getTime(time: string): number {
		return Number.parseInt(time.replace(':', ''));
	}

	/**
	 * A helper function used to ensure that whatever is getting saved in our database CAN be understood by the mobile app.
	 */
	function getDate(day: string): string {
		if (day.indexOf('-') === -1) {
			return day;
		}

		// Parse this date first.
		const date = new Date(day);

		// Return this value.
		return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
	}

	/**
	 * A helper function used to create a new one
	 */
	async function createNew() {
		const isClass = Object.freeze(type === Constants.reminderTypeClass);

		// Yeah, it is loading.
		loading = true;

		//? If the topic is not set...
		if (!topic || topic?.trim().length === 0) {
			showError('You are required to pass a topic.');
		}

		//? If the subject is not set when we expect it to be...
		else if (isClass && (!subject || subject?.trim().length === 0)) {
			showError(
				'All classes must have attached subjects. The subject of a class is the name of the associated course.'
			);
		}

		//? If the starting time is all outta whack.
		else if (!startsAt) {
			showError('You are required to choose a starting time.');
		}

		//? If the ending time is all outta whack.
		else if (!endsAt) {
			showError('You are required to choose an ending time.');
		}

		//? If the start time is greater than the end time.
		else if (getTime(startsAt) > getTime(endsAt)) {
			showError('Starting time cannot be after ending time.');
		}

		//? This cannot be the final choice
		else if (dayOfWeek === 'date') {
			showError('You are required to choose a specific date or frequency');
		}

		//? If the description is not set.
		else if (!description || description?.trim().length === 0) {
			showError(
				'You are required to add a description to this reminder. For events a description should give a summary of its goals.'
			);
		}

		//? Since all is good and fine.
		else {
			const schedule = {
				level:
					level === Constants.openSchedulesReference ? level : Number.parseInt(level as string),
				topic,
				subject,
				description,
				day: getDate(dayOfWeek),
				type,
				starts: getTime(startsAt),
				ends: getTime(endsAt),
				college,
				department,
				hosts
			};

			// Now it is time to post this to the database.
			const response = await fetch('/api/schedules', {
				method: 'POST',
				body: JSON.stringify(schedule)
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
		<h2 class="text-black text-xl font-semibold">Create a Scheduled Reminder</h2>
		<h3 class="text-sm">Required fields have a *</h3>
	</div>

	<!-- For the topic of the event or class -->
	<input
		class="border-2 rounded-lg w-full placeholder-black/45 border-primary-500/80"
		type="text"
		bind:value={topic}
		placeholder={type === Constants.reminderTypeClass
			? 'Enter the topic eg CSC345*'
			: "Enter the topic eg 'Church Service'*"}
	/>

	<!-- For the subejct of the event or class -->
	<input
		class="border-2 rounded-lg w-full placeholder-black/45 border-primary-500/80"
		type="text"
		bind:value={subject}
		placeholder={type === Constants.reminderTypeClass ? 'Enter the subject*' : 'Enter the subject'}
	/>

	<!-- For choosing the college associated this event or class -->
	<div class="flex flex-row items-center">
		<p class="text-black mr-4 w-60">Choose the college:</p>
		<select class="w-full text-black rounded-md" bind:value={college}>
			<option value={Constants.openSchedulesReference}>All Colleges</option>
			{#each data.colleges as college}
				<option value={college.code}>{college.name}</option>
			{/each}
		</select>
	</div>

	<!-- For choosing the department associated this event or class -->
	<div class="flex flex-row items-center">
		<p class="text-black mr-4 w-60">Choose the department:</p>
		<select class="w-full text-black rounded-md" bind:value={department}>
			<option value={Constants.openSchedulesReference}>All Departments</option>
			{#each data.departments as department}
				<option value={department.course}>{department.name}</option>
			{/each}
		</select>
	</div>

	<!-- For choosing the level associated with it -->
	<div class="flex flex-row items-center">
		<p class="text-black mr-4 w-60">Choose the level:</p>
		<select class="w-full text-black rounded-md" bind:value={level}>
			<option value={Constants.openSchedulesReference}>All Levels</option>
			<option value="100">100 Level Only</option>
			<option value="200">200 Level Only</option>
			<option value="300">300 Level Only</option>
			<option value="400">400 Level Only</option>
			<option value="500">500 Level Only</option>
			<option value="600">600 Level Only</option>
			<option value="700">700 Level Only</option>
			<option value="800">800 Level Only</option>
			<option value="900">900 Level Only</option>
		</select>
	</div>

	<!-- For the type of this reminder -->
	<div class="flex flex-row items-center">
		<p class="text-black mr-4 w-60">Choose the type:</p>
		<select class="w-full text-black rounded-md" bind:value={type}>
			<option value={Constants.reminderTypeClass}>Class</option>
			<option value={Constants.reminderTypeEvent}>Event</option>
		</select>
	</div>

	<!-- For the starting time -->
	<div class="flex flex-row items-center">
		<p class="text-black mr-4 w-60">Starting time:</p>
		<input
			class="border-2 rounded-lg w-full placeholder-black/45 border-primary-500/80"
			type="time"
			bind:value={startsAt}
			placeholder="Choose starting time*"
		/>
	</div>

	<!-- For the closing time -->
	<div class="flex flex-row items-center">
		<p class="text-black mr-4 w-60">Ending time:</p>
		<input
			class="border-2 rounded-lg w-full placeholder-black/45 border-primary-500/80"
			type="time"
			bind:value={endsAt}
			placeholder="Choose ending time*"
		/>
	</div>

	<!-- How often does this happen -->
	{#if dayOfWeek.indexOf('-') === -1}
		<div class="flex flex-row items-center">
			<p class="text-black mr-4 w-60">Choose frequency:</p>
			<select class="w-full text-black rounded-md" bind:value={dayOfWeek}>
				<option value="date">Specific Date</option>
				<option value={Constants.openSchedulesReference}>Every Day</option>
				<option value="sunday">Every Sunday</option>
				<option value="monday">Every Monday</option>
				<option value="tuesday">Every Tuesday</option>
				<option value="wednesday">Every Wednesday</option>
				<option value="thursday">Every Thursday</option>
				<option value="friday">Every Friday</option>
				<option value="saturday">Every Saturday</option>
			</select>
		</div>
	{/if}

	<!-- Now, only when the day of week points to this place... -->
	{#if dayOfWeek === 'date' || isSpecialDay(dayOfWeek)}
		<div class="flex flex-row items-center">
			<p class="text-black mr-4 w-60">Choose date:</p>
			<input
				class="border-2 rounded-lg w-full placeholder-black/45 border-primary-500/80"
				type="date"
				bind:value={dayOfWeek}
				placeholder="Choose date"
			/>
		</div>
	{/if}

	<!-- For the hosts or lecturers -->
	<InputChip
		class="border-2 rounded-lg w-full placeholder-black/45 border-primary-500/80"
		bind:value={hosts}
		name="chips"
		,
		placeholder={type === Constants.reminderTypeClass ? "The lecturers' names" : "The hosts' names"}
		allowUpperCase
	/>

	<!-- For the description of the event or class -->
	<textarea
		class="border-2 rounded-lg w-full placeholder-black/45 border-primary-500/80"
		bind:value={description}
		placeholder="Enter the description*"
	/>

	<button
		class="btn bg-primary-500 flex flex-row justify-start text-white w-full text-left mt-10"
		on:click={createNew}
	>
		{#if loading}
			<ProgressRadial width="w-5" />
		{:else}
			<p class="text-left flex">Create reminder</p>
		{/if}
	</button>
</form>
