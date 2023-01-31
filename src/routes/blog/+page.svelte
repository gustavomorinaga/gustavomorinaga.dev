<script lang="ts">
	import { Metadata } from '$lib/components';
	import type { PageServerData } from './$types';

	export let data: PageServerData;
</script>

<Metadata />

<ul>
	{#each data.posts.data as post}
		<li>
			<h3>{post.title}</h3>
			<p>{post.description}</p>
		</li>
	{/each}
</ul>
