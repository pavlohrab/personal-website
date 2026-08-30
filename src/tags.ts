/**
 * Tags are authored namespaced — `method:`, `organism:`, `data:` — across
 * projects, tools and publications, so one vocabulary can become a
 * cross-collection filter later. Only the value is ever rendered.
 */
export const tagValue = (tag: string) => tag.slice(tag.indexOf(':') + 1);
