export default {
  name: 'author',
  title: 'Author',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'designation',
      title: 'Designation',
      type: 'string',
    },
    {
      name: 'qualification',
      title: 'Qualification',
      type: 'string',
    },
    {
      name: 'institution',
      title: 'Institution',
      type: 'string',
    },
    {
      name: 'biography',
      title: 'Biography',
      type: 'text',
    },
    {
      name: 'profileImage',
      title: 'Profile Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
  ],
};
