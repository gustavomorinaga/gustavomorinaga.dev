<script lang="ts">
	import type { PageServerData } from './$types';

	export let data: PageServerData;
</script>

<ul>
	{#each data.posts.data as post}
		<li>
			<h3>{post.title}</h3>
			<p>{post.description}</p>
		</li>
	{/each}
</ul>
