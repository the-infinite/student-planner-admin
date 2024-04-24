<script lang="ts">
	import { goto } from '$app/navigation';
	import { getToastStore } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';
	import type { PageData } from '../../routes/$types';

	export let data: PageData;
	const toastStore = getToastStore();
	

	function getUnit(time: number): string {
		if (time < 10) {
			return '0' + time.toString();
		}

		return time.toString();
	}

	function getDate(date: Date): string {
		return getUnit(date.getDate()) + '.' + getUnit(date.getMonth() + 1) + '.' + date.getFullYear();
	}

	// Get this one
	onMount(async function () {
		// If this went well...
		if (Math.random() < 0.8) {

		}

		// If the problem is something else...
		else {

			// This is fine.
			toastStore.trigger({
				message: "Strange to see indeed.",
				background: 'variant-filled-error'
			});
		}
	});
</script>

<!-- First order of events, is to show the title of this section -->
<h2 class="text-black text-lg">List of Payments</h2>
<div class="flex flex-row items-center pt-5">
	<!-- For filtering by type -->
	<p class="text-black mr-4 text-sm">Type:</p>
	<select class="w-fit text-black rounded-md text-sm mr-20">
		<option value="all">All</option>
	</select>

	<!-- For filtering by month -->
	<p class="text-black mr-4 text-sm">Month:</p>
	<select class="w-fit text-black rounded-md text-sm mr-10">
		<option value="all">All</option>
		<option value="1">January</option>
		<option value="2">February</option>
		<option value="3">March</option>
		<option value="4">April</option>
		<option value="5">May</option>
		<option value="6">June</option>
		<option value="7">July</option>
		<option value="8">August</option>
		<option value="9">September</option>
		<option value="10">October</option>
		<option value="11">November</option>
		<option value="12">December</option>
	</select>
</div>

<div class="md:w-full w-screen">
	<table class="text-gray-500 w-full mt-6 text-sm overflow-x-scroll">
		<tr class="bg-gray-200 text-start">
			<th class="pl-4 pr-1 pt-3 pb-3 text-start">Date</th>
			<th class="pl-1 pr-1 pt-3 pb-3 text-start">Description</th>
			<th class="pl-1 pr-1 pt-3 pb-3 text-start">Status</th>
			<th class="pl-1 pr-1 pt-3 pb-3 text-start w-fit">Action</th>
		</tr>
		<tbody>
			{#each transactions as transaction}
				<tr>
					<td class="pl-4 pr-1 pt-3 pb-3 text-black text-xs text-start"
						>{getDate(new Date(transaction.updatedAt))}</td
					>
					<td class="pl-1 pr-1 pt-3 pb-3 text-black text-xs text-start"
						>{transaction.description}</td
					>

					<!-- For the payment status -->
					<td
						class="pl-1 pr-1 pt-3 pb-3 text-bold {transaction.status !== TransactionStatus.Confirmed
							? 'text-error-500'
							: transaction.amountPaid < transaction.metadata.dueAmount
								? 'text-warning-500'
								: 'text-success-700'} text-xs text-start"
					>
						<!-- If this transaction failed.-->
						{#if transaction.status !== TransactionStatus.Confirmed}
							ꞏ FAILED
						{:else if transaction.amountPaid < transaction.metadata.dueAmount}
							ꞏ PART PAID
						{:else}
							ꞏ PAID
						{/if}
					</td>

					<!-- For the button -->
					<td class="pl-1 pr-1 pt-3 pb-3 text-black text-xs text-start w-fit">
						<button
							class="text-black border rounded-md pl-4 pr-4 pt-2 pb-2"
							on:click={() => viewPayment(transaction)}
						>
							View
						</button>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
