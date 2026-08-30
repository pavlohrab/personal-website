import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * One tag vocabulary, shared by projects, tools and publications, so a tag
 * can become a cross-collection filter later. Three namespaces:
 *
 *   method:    how the work was done   (method:BGC mining)
 *   organism:  what it was done on     (organism:Acidobacteriota)
 *   data:      what it was done to     (data:metagenomes)
 *
 * Only the value is rendered — see tagValue() in src/tags.ts. Languages
 * and frameworks are NOT tags; they live in the `stack` field.
 *
 * `thoughts` keeps its own un-namespaced vocabulary: it is personal writing
 * with a live filter UI, not research metadata.
 */
export const collections = {
	projects: defineCollection({
		loader: glob({ base: './src/content/projects', pattern: '**/*.md' }),
		schema: z.object({
			title: z.string(),
			status: z.enum(['ongoing', 'complete', 'released']),
			meta: z.string(),
			description: z.string(),
			// Provenance — the four facts a reader of a project card actually
			// wants: what organism, what data, what was run, what came out.
			// All optional so a project can omit any of them.
			focus: z.string().optional(),
			source: z.string().optional(),
			stack: z.string().optional(),
			output: z.string().optional(),
			tags: z.array(z.string()),
			links: z.array(
				z.object({
					label: z.string(),
					href: z.string(),
				})
			).optional(),
			featured: z.boolean().default(false),
			compact: z.boolean().default(false),
			category: z.enum(['research', 'software', 'archive']).default('research'),
			order: z.number().default(999),
			publishedDate: z.coerce.date().optional(),
		}),
	}),
	tools: defineCollection({
		loader: glob({ base: './src/content/tools', pattern: '**/*.md' }),
		schema: z.object({
			title: z.string(),
			// One line: the problem the tool solves.
			description: z.string(),
			role: z.enum(['author', 'contributor']).default('author'),
			stack: z.array(z.string()),
			// Only list what the repo actually has — these render as badges.
			signals: z.array(
				z.enum(['tests', 'CI', 'packaged', 'container', 'released', 'DOI', 'docs', 'live demo'])
			).default([]),
			image: z.string().optional(),
			imageAlt: z.string().optional(),
			links: z.array(
				z.object({
					label: z.string(),
					href: z.string(),
				})
			),
			// Namespaced tags — see the vocabulary note above.
			tags: z.array(z.string()).default([]),
			// The shared, namespaced vocabulary (method: / organism: / data:),
			// same as projects and publications. Distinct from `stack`, which
			// is what the tool is built with rather than what it is about.
			tags: z.array(z.string()).default([]),
			// Slug of a project in the `projects` collection this tool came out of.
			project: z.string().optional(),
			year: z.string(),
			order: z.number().default(999),
			draft: z.boolean().default(false),
		}),
	}),
	thoughts: defineCollection({
		loader: glob({ base: './src/content/thoughts', pattern: '**/*.md' }),
		schema: z.object({
			title: z.string(),
			date: z.string(), // e.g., "October 2024"
			excerpt: z.string(),
			publishedDate: z.coerce.date().optional(),
			tags: z.array(z.string()).optional(),
			draft: z.boolean().default(false),
		}),
	}),
	adventures: defineCollection({
		loader: glob({ base: './src/content/adventures', pattern: '**/*.md' }),
		schema: z.object({
			title: z.string(),
			location: z.string(),
			description: z.string(),
			category: z.enum(['field-work', 'hiking', 'travel', 'personal']).default('travel'),
			date: z.string().optional(), // e.g., "Summer 2023"
			publishedDate: z.coerce.date().optional(),
			images: z.array(z.string()).optional(),
			draft: z.boolean().default(false),
		}),
	}),
	news: defineCollection({
		loader: glob({ base: './src/content/news', pattern: '**/*.md' }),
		schema: z.object({
			title: z.string(),
			date: z.string(), // Human-readable date (e.g., "October 2024")
			description: z.string(),
			publishedDate: z.coerce.date(), // For sorting
			draft: z.boolean().default(false),
		}),
	}),
	publications: defineCollection({
		loader: glob({ base: './src/content/publications', pattern: '**/*.md' }),
		schema: z.object({
			title: z.string(),
			authors: z.string(), // Formatted author string
			venue: z.string(), // Journal/conference name
			year: z.number(),
			publishedDate: z.coerce.date(), // For sorting
			type: z.enum(['journal', 'conference', 'preprint']).default('journal'), // Publication type
			url: z.string().optional(), // Link to paper
			doi: z.string().optional(),
			links: z.array(
				z.object({
					label: z.string(),
					href: z.string(),
				})
			).optional(),
			// Namespaced tags — see the vocabulary note above.
			tags: z.array(z.string()).default([]),
			// The shared, namespaced vocabulary (method: / organism: / data:).
			tags: z.array(z.string()).default([]),
			featured: z.boolean().default(false), // Show on homepage
			draft: z.boolean().default(false),
		}),
	}),
	outreach: defineCollection({
		loader: glob({ base: './src/content/outreach', pattern: '**/*.md' }),
		schema: z.object({
			title: z.string(),
			type: z.enum(['invited', 'conference', 'workshop', 'poster', 'hackathon', 'course', 'volunteering', 'PhD trip']),
			venue: z.string(),
			location: z.string(), // e.g., "City, Country"
			date: z.string(), // Human-readable date (e.g., "October 2024")
			year: z.number(), // For grouping by year
			publishedDate: z.coerce.date(), // For sorting within year
			description: z.string(),
			authors: z.string().optional(), // Co-authors/collaborators (formatted string, highlight yourself in bold)
			links: z.array(
				z.object({
					label: z.string(),
					href: z.string(),
				})
			).optional(),
			draft: z.boolean().default(false),
		}),
	}),
};
