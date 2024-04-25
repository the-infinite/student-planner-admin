<script lang="ts">
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import { getToastStore } from '@skeletonlabs/skeleton';
	import type { ScheduleModel } from '$lib/types/schedule';
	import { Constants } from '$lib/constants';
	import { parsePlatformTime } from '$lib';

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

	function getTitle(schedule: ScheduleModel): string {
		var descriptionBuilder = '';

		if (schedule.type === Constants.reminderTypeClass) {
			// If this has a topic
			if (schedule.topic) {
				descriptionBuilder = descriptionBuilder.concat(
					'A ',
					schedule.topic.toUpperCase(),
					' class'
				);
			} else {
				descriptionBuilder = 'A class';
			}

			// This is fair enough.
			if (schedule.subject) {
				descriptionBuilder = descriptionBuilder.concat(' on ', schedule.subject.toLowerCase());
			}

			// For the students concerned
			descriptionBuilder = descriptionBuilder.concat(' for ');

			// If this is not unique to a certain academic level
			if (schedule.level !== Constants.openSchedulesReference) {
				descriptionBuilder = descriptionBuilder.concat(schedule.level.toString(), '-level');
			} else {
				descriptionBuilder = descriptionBuilder.concat('all');
			}

			// If this is fine too.
			if (schedule.department != Constants.openSchedulesReference) {
				descriptionBuilder = descriptionBuilder.concat(' ', schedule.department);
			} else if (schedule.college != Constants.openSchedulesReference) {
				descriptionBuilder = descriptionBuilder.concat(' ', schedule.college);
			}

			// The end of the notice.
			descriptionBuilder = descriptionBuilder.concat(' students');
		} else {
			// If this has a topic
			if (schedule.topic != null) {
				descriptionBuilder = descriptionBuilder.concat('A ', schedule.topic.toLowerCase());
			} else {
				descriptionBuilder = 'An event';
			}

			// This is fair enough.
			if (schedule.subject != null) {
				descriptionBuilder = descriptionBuilder.concat(' about ', schedule.subject.toLowerCase());
			}

			// For the students concerned
			descriptionBuilder = descriptionBuilder.concat(' for ');

			// If this is not unique to a certain academic level
			if (schedule.level !== Constants.openSchedulesReference) {
				descriptionBuilder = descriptionBuilder.concat(schedule.level.toString(), '-level');
			} else {
				descriptionBuilder = descriptionBuilder.concat('all');
			}

			// If this is fine too.
			if (schedule.department != Constants.openSchedulesReference) {
				descriptionBuilder = descriptionBuilder.concat(' ', schedule.department);
			} else if (schedule.college != Constants.openSchedulesReference) {
				descriptionBuilder = descriptionBuilder.concat(' ', schedule.college);
			}

			// The end of the notice.
			descriptionBuilder = descriptionBuilder.concat(' students');
		}

		return descriptionBuilder;
	}
</script>

<div class="flex flex-col gap-5">
	<!-- For the title-->
	<h1 class="text-3xl text-black">{getTitle(data.schedule)}</h1>

	<!-- For the description. -->
	<p class="text-black text-lg">{data.schedule.description}</p>

	<div class="flex flex-col gap-2">
		<!-- For the day of the week -->
		<div class="flex flex-row gap-2 text-black items-center">
			<i class="fas fa-calendar-day text-black"></i>
			<p>
				{#if data.schedule.dayOfWeek === Constants.openSchedulesReference}
					Everyday
				{:else if data.schedule.dayOfWeek.includes('/')}
					On {data.schedule.dayOfWeek}
				{:else}
					Every {data.schedule.dayOfWeek}
				{/if}
			</p>
		</div>

		<!-- For the time of the day -->
		<div class="flex flex-row gap-2 text-black items-center">
			<i class="fas fa-clock text-black"></i>
			<p>
				{parsePlatformTime(data.schedule.startsAt)} to {parsePlatformTime(data.schedule.endsAt)}
			</p>
		</div>

		<!-- For the college this comes from -->
		<div class="flex flex-row gap-2 text-black items-center">
			<i class="fas fa-school text-black"></i>
			<p>
				{data.college.name}
			</p>
		</div>

		<!-- For the department -->
		<div class="flex flex-row gap-2 text-black items-center">
			<i class="fas fa-graduation-cap text-black"></i>
			<p>
				{data.department.name}
			</p>
		</div>

		<!-- For the speakers -->
		{#if data.schedule.hosts.length > 0}
			<div class="flex flex-row gap-2 text-black items-center">
				<i class="fas fa-user-tie text-black"></i>
				<p>
					{data.schedule.hosts.reduce((previous, next) => previous + ", " + next)}
				</p>
			</div>
		{/if}
	</div>
</div>
