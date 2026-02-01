import { defineCollection, z } from 'astro:content';

const services = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    image: z.string().optional(),
    draft: z.boolean().optional(),
  }),
});

const products = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    image: z.string().optional(),
    draft: z.boolean().optional(),
    items: z.array(z.object({
      name: z.string(),
      description: z.string(),
      image: z.string().optional(),
      tag: z.string().optional(),
      stock: z.boolean().optional().default(true),
    })).optional(),
  }),
});

export const collections = {
  services,
  products,
};
