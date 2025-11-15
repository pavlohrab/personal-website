import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

export const collections = {
	projects: defineCollection({
		loader: glob({ base: './src/content/projects', pattern: '**/*.md' }),
		schema: z.object({
			title: z.string(),
			status: z.enum(['ongoing', 'complete', 'released']),
			meta: z.string(),
			description: z.string(),
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
