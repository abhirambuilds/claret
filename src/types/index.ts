export interface Author {
  _id?: string;
  name: string;
  qualification?: string;
  designation?: string;
  institution?: string;
  biography?: string;
  profileImage?: any;
}

export interface Editor {
  _id?: string;
  name: string;
  qualification?: string;
  institution?: string;
}

export interface Book {
  id: string;
  _id?: string;
  title: string;
  classType: 'Class 10' | 'Inter' | string;
  price: number;
  shortDescription?: string;
  fullDescription?: string;
  publisher?: string;
  edition?: string;
  language?: string;
  availability: boolean;
  coverImage?: any; // Sanity image object
  images?: any[]; // Additional book pictures
  editor?: Editor;
  authors: Author[];
  createdAt?: string;
  featuredBook?: boolean;
  rating?: number;
}

export interface SiteSettings {
  _id?: string;
  whatsappNumber: string;
  websiteTitle?: string;
  publicationName?: string; // Fallback
  contactEmail?: string;
  contactPhone?: string;
  address?: string; // Fallback
  logoText?: string; // Fallback
}

export interface OrderFormData {
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  copies: number;
}

export interface AdminCredentials {
  email: string;
  password: string;
}
