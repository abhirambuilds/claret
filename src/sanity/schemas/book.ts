export default {
  name: 'book',
  title: 'Book',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'classType',
      title: 'Class Type',
      type: 'string',
      options: {
        list: [
          { title: 'Class 10', value: 'Class 10' },
          { title: 'Inter', value: 'Inter' },
        ],
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'authors',
      title: 'Authors',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'author' }] }],
    },
    {
      name: 'editor',
      title: 'Editor',
      type: 'reference',
      to: [{ type: 'author' }],
    },
    {
      name: 'publisher',
      title: 'Publisher',
      type: 'string',
    },
    {
      name: 'price',
      title: 'Price',
      type: 'number',
      validation: (Rule: any) => Rule.required().min(0),
    },
    {
      name: 'shortDescription',
      title: 'Short Description',
      type: 'text',
    },
    {
      name: 'fullDescription',
      title: 'Full Description',
      type: 'text',
    },
    {
      name: 'edition',
      title: 'Edition',
      type: 'string',
    },
    {
      name: 'language',
      title: 'Language',
      type: 'string',
    },
    {
      name: 'availability',
      title: 'Availability',
      type: 'boolean',
      initialValue: true,
    },
    {
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'featuredBook',
      title: 'Featured Book',
      type: 'boolean',
      initialValue: false,
    },
    {
      name: 'rating',
      title: 'Rating',
      type: 'number',
      validation: (Rule: any) => Rule.min(0).max(5),
    },
  ],
};
