<script lang="ts">
	import { Metadata } from '$lib/components';

	export let data;
</script>

<Metadata />

{#if data.posts}
	<ul>
		{#each data.posts.data as post}
			<li>
				<h3>{post.title}</h3>
				<p>{post.description}</p>
			</li>
		{/each}
	</ul>
{/if}
