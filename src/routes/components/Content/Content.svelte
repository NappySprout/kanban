<script lang="ts">
	import { fly } from 'svelte/transition';
	import Row from './Row.svelte';
	import { boards, storeTab, type Segment, type Task } from '$stores';
	import { isMoving, source, destination } from '$movement';
	let segments: Segment[] = [];
	$: {
		const xs = $boards.filter((tab) => tab.name === $storeTab);
		if (xs.length > 0) segments = xs[0].segments;
		else segments = [];
	}
	let addToEnd = false;
	const move = (i: number) => {
		return () => {
			if (!$isMoving) $source = [i, $source[1]];
			$destination = [i, $source[1]];
		};
	};
	const end = () => {
		const tabIndex = $boards.reduce((cum, el, i) => (el.name == $storeTab ? i : cum), -1);
		const sseg = $source[0];
		const dseg = $destination[0];
		const sind = $source[1];
		const dind = $destination[1];
		if ($source[0] === $destination[0] && $source[1] === $destination[1]) return;
		if (sseg === dseg) {
			//
			const tasks: Task[] = $boards[tabIndex].segments[sseg].tasks;
			const temp = tasks[sind];
			tasks[sind] = tasks[dind];
			tasks[dind] = temp;
		} else {
			if ($boards[tabIndex].segments[dseg].tasks.length == 0 || addToEnd) {
				//addting to the end of the destination
				const item = $boards[tabIndex].segments[sseg].tasks.splice(sind, 1)[0];
				$boards[tabIndex].segments[dseg].tasks.push(item);
			} else {
				//shifting when there destination has items
				const taskss: Task[] = $boards[tabIndex].segments[sseg].tasks;
				const tasksd: Task[] = $boards[tabIndex].segments[dseg].tasks;
				tasksd.splice(dind, 0, taskss.splice(sind, 1)[0]);
			}
		}
		$isMoving = false;
		$source = $destination;
		$boards = $boards;
	};
</script>

<svelte:window on:mouseup={end} />
<div class="flex justify-evenly">
	<!--{$isMoving} {$source} {$destination} {addToEnd} -->
	{#if segments.length === 0}
		<div
			class="card p-8 m-8 shadow-xl"
			out:fly={{ x: -2000, duration: 100 }}
			in:fly={{ x: -5000, duration: 300 }}
		>
			<h3>please add a tab, and click on it to see workspace</h3>
		</div>
	{/if}
	{#each segments as segment, segmentIndex (segmentIndex)}
		<div on:mouseenter={move(segmentIndex)}>
			<Row title={segment.name} tasks={segment.tasks} {segmentIndex} bind:addToEnd />
		</div>
	{/each}
</div>
<!--
<button on:click={()=>console.log($boards)}>hello see</button>
{$isMoving} {$source} {$destination} {addToEnd} 
-->
