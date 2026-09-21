import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    entry: z.number().int().positive().optional(),
    tags: z.array(z.string()).default([]),
    typewriter: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };