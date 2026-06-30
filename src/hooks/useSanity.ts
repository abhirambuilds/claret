import { useState, useEffect } from 'react';
import { client } from '../lib/sanity';
import { Book, SiteSettings } from '../types';
import { defaultSettings } from '../data/mockData';

export function useSiteSettings() {
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSettings() {
      try {
        const query = `*[_type == "siteSettings"][0]`;
        const result = await client.fetch(query);
        if (result) {
          setSettings({ ...defaultSettings, ...result });
        }
      } catch (error) {
        console.error('Error fetching site settings:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchSettings();
  }, []);

  return { settings, loading };
}

export function useFeaturedBooks() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBooks() {
      try {
        const query = `*[_type == "book" && featuredBook == true] | order(_createdAt desc) {
          _id,
          title,
          classType,
          price,
          shortDescription,
          availability,
          coverImage,
          authors[]->
        }`;
        const result = await client.fetch(query);
        setBooks(result.map((b: any) => ({ ...b, id: b._id })));
      } catch (error) {
        console.error('Error fetching featured books:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchBooks();
  }, []);

  return { books, loading };
}

export function useAllBooks() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBooks = async () => {
    setLoading(true);
    try {
      const query = `*[_type == "book"] | order(_createdAt desc) {
        _id,
        title,
        classType,
        price,
        shortDescription,
        availability,
        coverImage,
        authors[]->
      }`;
      const result = await client.fetch(query);
      setBooks(result.map((b: any) => ({ ...b, id: b._id })));
    } catch (error) {
      console.error('Error fetching all books:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return { books, loading, refresh: fetchBooks };
}

export function useBook(id: string | undefined) {
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }
    
    async function fetchBook() {
      try {
        // We use $id to match _id since we mapped _id to id
        const query = `*[_type == "book" && _id == $id][0] {
          _id,
          title,
          classType,
          price,
          shortDescription,
          fullDescription,
          publisher,
          edition,
          language,
          availability,
          coverImage,
          images,
          authors[]->,
          editor->
        }`;
        const result = await client.fetch(query, { id });
        if (result) {
          setBook({ ...result, id: result._id });
        }
      } catch (error) {
        console.error('Error fetching book:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchBook();
  }, [id]);

  return { book, loading };
}
