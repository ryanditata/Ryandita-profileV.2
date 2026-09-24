import { defineQuery } from "next-sanity";

export const certificatesQuery = defineQuery(`
  *[_type == "certificate"] | order(year desc, _createdAt desc) {
    _id,
    title,
    "slug": slug.current,
    issuer,
    year,
    category,
    image,
    credentialUrl,
    description
  }
`);
