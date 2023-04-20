import { compile } from 'mdsvex';

export const compileMarkdown = async (content: string) => {
	const compiled = await compile(content);
	if (!compiled?.code) return '';

	return cleanMDX(compiled.code);
};

/** Temporary cleaner MDX implementation, because mdsvex `compile` still buggy */
export const cleanMDX = (content: string) => {
	return content
		.replace(/>{@html `<code class="language-/g, '><code class="language-')
		.replace(/<\/code>`}<\/pre>/g, '</code></pre>');
};
