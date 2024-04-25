<script lang="ts">
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import { getToastStore } from '@skeletonlabs/skeleton';
	import { Constants } from '$lib/constants';
	import type { ScheduleModel } from '$lib/types/schedule';

	export let data: PageData;
	const schedules = data.schedules;

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
	 * Helper function used to retrieve the date that would be show to the user at the end of the day.
	 */
	function getDate(date: string) {
		const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

		// If this is a cannonical date.
		if (days.indexOf(date.toLowerCase()) !== -1) {
			return date[0].toUpperCase() + date.substring(1) + ' every week';
		}

		// If this is an open event
		if (date === Constants.openSchedulesReference) {
			return 'Every day';
		}

		// This is fine.
		return 'On ' + date;
	}

	/**
	 * Helper function used to get the presentable version of an app timestamp.
	 */
	function getTimestamp(time: number): string {
		var hour = Math.floor(time / 100);
		const minute = time % 100;
		const pm = hour > 12;

		// Now, do the reduction
		if(hour > 12) {
			hour = hour - 12
		}

		// If this is midnight
		if (hour === 0) {
			hour = 12; // Rectify it.
		}

		// This is fine.
		return (
			hour.toString().padStart(2, '0') +
			':' +
			minute.toString().padStart(2, '0') +
			(pm ? ' PM' : ' AM')
		);
	}

	/**
	 * Helper function used to view the details of a schedule.
	 */
	function viewDetails(schedule: ScheduleModel) {
		window.location.assign("/reminder/"+schedule.uid);
	}

	/**
	 * Helper function used to create a new schedule.
	 */
	function createNew() {
		window.location.assign("/reminder/new");
	}
</script>

<!-- Finally, the payment list view -->
<div class="flex flex-col">
	<div class="flex flex-row items-center pt-5 justify-between">
		<!-- The title of this page -->
		<h1 class="text-3xl text-black">All Schedules</h1>
	
		<!-- For filtering by month -->
		<button class="rounded-lg bg-primary-700 text-sm" on:click={createNew}>
			<div class="flex flex-row gap-2 pl-4 pr-4 pt-2 pb-2 items-center">
				<i class="fas fa-plus"></i>
				<p class="">Schedule Reminder</p>
			</div>
		</button>
	</div>
	<div class="md:w-full w-screen">
		<table class="text-gray-500 w-full mt-6 text-sm overflow-x-scroll">
			<tr class="bg-gray-200 text-start">
				<th class="pl-1 pr-1 pt-3 pb-3 text-start w-fit">College</th>
				<th class="pl-1 pr-1 pt-3 pb-3 text-start w-fit">Department</th>
				<th class="pl-1 pr-1 pt-3 pb-3 text-start w-fit">Level</th>
				<th class="pl-1 pr-1 pt-3 pb-3 text-start w-fit">Day</th>
				<th class="pl-1 pr-1 pt-3 pb-3 text-start w-fit">Time</th>
				<th class="pl-1 pr-1 pt-3 pb-3 text-start w-fit">Type</th>
				<th class="pl-1 pr-1 pt-3 pb-3 text-start w-fit">Topic</th>
				<th class="pl-1 pr-1 pt-3 pb-3 text-start w-fit">Action</th>
			</tr>
			<tbody>
				{#each schedules as schedule}
					<tr>
						<!-- For the college -->
						<td class="pl-2 pr-1 pt-3 pb-3 text-black text-xs text-start">
							{schedule.college === Constants.openSchedulesReference ? 'All' : schedule.college}
						</td>

						<!-- For the department -->
						<td class="pl-2 pr-1 pt-3 pb-3 text-black text-xs text-start">
							{schedule.department === Constants.openSchedulesReference
								? 'All'
								: schedule.department}
						</td>

						<!-- For the level -->
						<td class="pl-1 pr-1 pt-3 pb-3 text-black text-xs text-start">
							{schedule.level === Constants.openSchedulesReference ? 'All' : schedule.level}
						</td>

						<!-- For the date. -->
						<td class="pl-1 pr-1 pt-3 pb-3 text-black text-xs text-start">
							{getDate(schedule.dayOfWeek)}
						</td>

						<!-- For the time-->
						<td class="pl-1 pr-1 pt-3 pb-3 text-black text-xs text-start">
							{getTimestamp(schedule.startsAt) + ' to ' + getTimestamp(schedule.endsAt)}
						</td>

						<!-- For the reminder type.-->
						<td class="pl-1 pr-1 pt-3 pb-3 text-black text-xs text-start">
							{schedule.type === Constants.reminderTypeClass ? 'Class' : 'Event'}
						</td>

						<!-- For the topic -->
						<td class="pl-1 pr-1 pt-3 pb-3 text-black text-xs text-start">
							{schedule.topic ?? 'N/A'}
						</td>

						<!-- For the button -->
						<td class="pl-1 pr-1 pt-3 pb-3 text-black text-xs text-start w-fit">
							<button
								class="text-black border rounded-md pl-4 pr-4 pt-2 pb-2"
								on:click={() => viewDetails(schedule)}
							>
								View
							</button>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>
