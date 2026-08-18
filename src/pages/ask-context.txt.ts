import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

/**
 * Whole-site context bundle for the "Ask" (Gemini) mode.
 *
 * Emitted as a single plaintext file at build time. The Cloudflare Worker fetches
 * and caches this, then hands it to Gemini as trusted CONTEXT so answers stay
 * grounded in real site content (no RAG needed — it all fits in the 1M window).
 *
 * Everything here is already public content. Drafts are filtered out, matching the
 * pattern used across src/pages/*.
 */

const notDraft = (e: { data: { draft?: boolean } }) => !e.data.draft;

const clean = (s: string | undefined) => (s ?? '').replace(/\s+/g, ' ').trim();

export const GET: APIRoute = async () => {
	const [publications, projects, tools, outreach, news, thoughts, adventures] = await Promise.all([
		getCollection('publications', notDraft),
		getCollection('projects'),
		getCollection('tools', notDraft),
		getCollection('outreach', notDraft),
		getCollection('news', notDraft),
		getCollection('thoughts', notDraft),
		getCollection('adventures', notDraft),
	]);

	const lines: string[] = [];
	lines.push('# Context about Pavlo Hrab (computational biologist, PhD).');
	lines.push('Source of truth: this personal website. Use only these facts.');
	lines.push('');

	lines.push('## Publications');
	for (const p of publications.sort((a, b) => b.data.year - a.data.year)) {
		lines.push(
			`- "${clean(p.data.title)}" — ${clean(p.data.authors)}. ${clean(p.data.venue)}, ${p.data.year} (${p.data.type}).` +
				(p.data.doi ? ` DOI: ${p.data.doi}.` : '') +
				(p.data.url ? ` ${p.data.url}` : '')
		);
	}
	lines.push('');

	lines.push('## Projects');
	for (const p of projects) {
		lines.push(
			`- ${clean(p.data.title)} [${p.data.status}, ${p.data.category}]: ${clean(p.data.description)}` +
				(p.data.tags?.length ? ` (tags: ${p.data.tags.join(', ')})` : '')
		);
		const body = clean(p.body);
		if (body) lines.push(`  ${body.slice(0, 600)}`);
	}
	lines.push('');

	lines.push('## Tools / software');
	for (const t of tools) {
		lines.push(
			`- ${clean(t.data.title)} [${t.data.role}, ${t.data.year}]: ${clean(t.data.description)}` +
				(t.data.stack?.length ? ` (stack: ${t.data.stack.join(', ')})` : '')
		);
	}
	lines.push('');

	lines.push('## Talks & teaching (outreach)');
	for (const o of outreach) {
		lines.push(
			`- ${clean(o.data.title)} [${o.data.type}] — ${clean(o.data.venue)}, ${clean(o.data.location)}, ${o.data.date}: ${clean(o.data.description)}`
		);
	}
	lines.push('');

	lines.push('## News & updates');
	for (const n of news.sort((a, b) => +b.data.publishedDate - +a.data.publishedDate)) {
		lines.push(`- ${n.data.date}: ${clean(n.data.title)} — ${clean(n.data.description)}`);
	}
	lines.push('');

	lines.push('## Thoughts / writing');
	for (const t of thoughts) {
		lines.push(`- ${clean(t.data.title)} (${t.data.date}): ${clean(t.data.excerpt)}`);
	}
	lines.push('');

	lines.push('## Beyond research (adventures)');
	for (const a of adventures) {
		lines.push(`- ${clean(a.data.title)} — ${clean(a.data.location)} [${a.data.category}]: ${clean(a.data.description)}`);
	}
	lines.push('');

	return new Response(lines.join('\n'), {
		headers: {
			'Content-Type': 'text/plain; charset=utf-8',
			'Cache-Control': 'public, max-age=3600',
		},
	});
};
