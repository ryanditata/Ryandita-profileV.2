import { groq } from "next-sanity";

export const experiencesQuery = groq`
*[_type=="experience"]
| order(order asc)
{
 title,
 company,
 employmentType,
 duration,
 description,
 years
}
`;
