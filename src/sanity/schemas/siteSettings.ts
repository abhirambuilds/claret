export default {
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    {
      name: 'websiteTitle',
      title: 'Website Title',
      type: 'string',
    },
    {
      name: 'whatsappNumber',
      title: 'WhatsApp Number',
      type: 'string',
      description: 'The phone number used for WhatsApp ordering (include country code, e.g., 919652745858).',
    },
    {
      name: 'contactEmail',
      title: 'Contact Email',
      type: 'string',
    },
    {
      name: 'contactPhone',
      title: 'Contact Phone',
      type: 'string',
    },
  ],
};
