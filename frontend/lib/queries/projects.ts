import { defineQuery } from "next-sanity";

export const projectsQuery = defineQuery(`
  *[_type == "project"] | order(_createdAt desc) {
    _id,
    title,
    "slug": slug.current,
    description,
    thumbnail,
    techStack,
    github,
    demo,
    featured,
    category,
    year
  }
`);

export const projectBySlugQuery = defineQuery(`
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    description,
    thumbnail,
    techStack,
    github,
    demo,
    gallery,
    featured,
    category,
    year
  }
`);
