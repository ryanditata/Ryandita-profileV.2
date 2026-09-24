import {defineField, defineType} from 'sanity'

export const certificateType = defineType({
  name: 'certificate',
  title: 'Certificates',
  type: 'document',

  fields: [
    defineField({
      name: 'title',
      title: 'Certificate Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
      },
    }),
    defineField({
      name: 'issuer',
      title: 'Issuer / Organization',
      type: 'string',
      description: 'e.g. Google, Dicoding, AWS, Coursera, Codepolitan',
    }),
    defineField({
      name: 'year',
      title: 'Year / Date',
      type: 'string',
      description: 'e.g. 2026',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      description: 'e.g. Fullstack Development, AI / ML, Cloud Computing',
    }),
    defineField({
      name: 'image',
      title: 'Certificate Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'credentialUrl',
      title: 'Credential / Verification URL',
      type: 'url',
      description: 'Link to verify certificate online or Google Drive',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
  ],
})
