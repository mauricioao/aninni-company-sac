import { defineCollection, z } from 'astro:content';

const services = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    image: z.string().optional(),
    draft: z.boolean().optional(),
    ventajas: z.array(z.object({
      icon: z.string(),
      title: z.string(),
      description: z.string(),
    })).optional(),
    soluciones_title: z.string().optional(),
    soluciones_text: z.string().optional(),
    soluciones_features: z.array(z.object({
      title: z.string(),
      description: z.string(),
    })).optional(),
    soluciones_images: z.array(z.string()).optional(),
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
