<script lang="ts">
	import { Metadata } from '$lib/components';

	export let data;

	const { post } = data;
</script>

<Metadata title={post.title} description={post.description} />

<article>
	<header>
		<h1>{post.title}</h1>
		<p>{post.subtitle}</p>

		<span>
			<address>
				<a href="/about" rel="author">Gustavo Morinaga</a>
			</address>
			<time>{post.publishedAt}</time>
		</span>
	</header>

	{@html post.content}
</article>
