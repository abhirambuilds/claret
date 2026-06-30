import { Book, SiteSettings } from '../types';

export const defaultSettings: SiteSettings = {
  whatsappNumber: '919994292586',
  publicationName: 'Claret Publications',
  contactEmail: 'info@claretpublications.com',
  address: '',
  logoText: 'Claret Publications',
};

export const mockBooks: Book[] = [
  {
    id: 'physics-is-easy-class-11',
    title: 'Physics is Easy — Class XI (Volume I and II)',
    classType: 'Class XI',
    price: 450,
    shortDescription: 'A complete study guide covering Volume I and Volume II for Class XI Physics. Handcrafted by eminent school and college authors to ensure clear understanding and high exam scores.',
    fullDescription: `This comprehensive Physics study guide is meticulously designed for Class XI students. In a single, consolidated volume, it offers complete coverage of all topics, eliminating the need to carry separate textbooks for Volume I and Volume II.

Key Highlights of this Book:
• Legible and clearly written explanations of complex physical theories and principles.
• Vivid descriptions of phenomena with necessary, high-quality diagrams and conceptual illustrations.
• Easy to understand language, tailored specifically to build student confidence and clarity.
• Well written by eminent school and college authors with decades of teaching experience.
• All-in-One Volume — covers both Volume I and Volume II, saving space and cost.
• Key points, formula summaries, and quick revision notes at the end of each chapter.

This book is the ultimate study companion for students aiming to master physics concepts and score outstanding marks in examinations.`,
    publisher: 'Claret Publications',
    edition: '2025-26 Edition',
    language: 'English',
    availability: true,
    coverImage: '',
    editor: {
      name: 'Dr. D. Prem Anand',
      qualification: 'M.Sc., M.Phil., Ph.D.',
      institution: 'Associate Professor of Physics, St. Xavier\'s College (Autonomous), Palayamkottai - 627002',
    },
    authors: [
      {
        name: 'M. Sekar',
        qualification: 'M.Sc., B.Ed.',
        designation: 'PG Assistant in Physics',
        institution: 'T.E.L.C Kabis Hr Sec School, Pandur, Tiruvallur District - 631 203',
      },
      {
        name: 'C. Jayaseelan',
        qualification: 'M.Sc., B.Ed.',
        designation: 'PG Assistant in Physics',
        institution: 'GHSS Thatchurwest Arani, Tiruvannamalai District - 632 326',
      },
      {
        name: 'C. Hendri',
        qualification: 'M.Sc., B.Ed., M.Phil.',
        designation: 'PG Assistant in Physics',
        institution: 'Govt HSS Kunnagampundi, Thiruvannamalai District - 606 603',
      },
      {
        name: 'Dr. S. Selvakumar',
        qualification: 'M.Sc., M.Phil., Ph.D.',
        designation: 'Associate Professor of Physics',
        institution: 'Government Arts College (Autonomous), Nandanam, Chennai - 600 035',
      },
      {
        name: 'Dr. M. Victor Antony Raj',
        qualification: 'M.Sc., M.Phil., Ph.D.',
        designation: 'Assistant Professor of Physics',
        institution: 'Loyola College (Autonomous), Chennai - 600 034',
      },
      {
        name: 'Dr. R.S. Daries Bella',
        qualification: 'M.Sc., M.Phil., Ph.D.',
        designation: 'Eminent Physicist & Academician',
        institution: 'Physics Department',
      },
      {
        name: 'Dr. M. Ambrose Rajkumar',
        qualification: 'M.Sc., B.Ed., Ph.D.',
        designation: 'Assistant Professor of Physics',
        institution: 'Kristu Jayanti Deemed to be University, Kothanur, Bengaluru - 560 077',
      },
    ],
    createdAt: '2026-06-18',
  },
];
