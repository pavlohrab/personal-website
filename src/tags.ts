/**
 * Tags are authored namespaced — `method:`, `organism:`, `data:` — across
 * projects, tools and publications, so one vocabulary can become a
 * cross-collection filter later. Only the value is ever rendered.
 *
 * The namespace is kept out of the stored value so a tag stays plain text
 * (it has to survive the plaintext AI-context bundle and Pagefind's index);
 * the italics for an organism are applied at render time instead.
 */
export const tagValue = (tag: string) => tag.slice(tag.indexOf(':') + 1);

/** Namespace half of a tag — '' for an un-namespaced one. */
export const tagNamespace = (tag: string) => {
	const i = tag.indexOf(':');
	return i === -1 ? '' : tag.slice(0, i);
};

/** Organism names are italic wherever they appear, tags included. */
export const isTaxon = (tag: string) => tagNamespace(tag) === 'organism';
