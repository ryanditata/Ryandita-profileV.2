import {defineField, defineType} from 'sanity'

export const experienceType = defineType({
  name: 'experience',
  title: 'Experience',
  type: 'document',

  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),

    defineField({
      name: 'company',
      title: 'Company / Organization',
      type: 'string',
    }),

    defineField({
      name: 'employmentType',
      title: 'Employment Type',
      type: 'string',
      options: {
        list: [
          {title: 'Full-time', value: 'Full-time'},
          {title: 'Part-time', value: 'Part-time'},
          {title: 'Self-employed', value: 'Self-employed'},
          {title: 'Freelance', value: 'Freelance'},
          {title: 'Contract', value: 'Contract'},
          {title: 'Internship', value: 'Internship'},
          {title: 'Apprenticeship', value: 'Apprenticeship'},
          {title: 'Seasonal', value: 'Seasonal'},
        ],
      },
    }),

    defineField({
      name: 'duration',
      title: 'Duration',
      type: 'string',
    }),

    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),

    defineField({
      name: 'years',
      title: 'Years',
      type: 'string',
    }),

    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
    }),
  ],

  preview: {
    select: {
      title: 'title',
      subtitle: 'years',
    },
  },
})
