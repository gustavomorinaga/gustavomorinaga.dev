export interface IProject {
	title: string;
	description: string;
	previewImage: string;
	repo: string;
	tags: string[];
	deploy?: string | null;
	wip?: boolean;
}
