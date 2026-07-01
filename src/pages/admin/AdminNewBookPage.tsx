import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import BookForm from '../../components/admin/BookForm';
import { Book } from '../../types';
import { client } from '../../lib/sanity';

export default function AdminNewBookPage() {
  const navigate = useNavigate();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data: Omit<Book, 'id' | 'createdAt'>) => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      // 1. Prepare Cover Image upload promise
      let coverUploadPromise: Promise<any> = Promise.resolve(null);
      if (data.coverImage && typeof data.coverImage === 'string' && data.coverImage.startsWith('data:image')) {
        coverUploadPromise = fetch(data.coverImage)
          .then(res => res.blob())
          .then(blob => client.assets.upload('image', blob));
      }

      // 2. Prepare Editor creation promise
      let editorPromise: Promise<any> = Promise.resolve(null);
      if (data.editor && data.editor.name) {
        if ((data.editor as any)._id) {
          editorPromise = client.createOrReplace({ _type: 'author', ...data.editor, _id: (data.editor as any)._id as string });
        } else {
          editorPromise = client.create({ _type: 'author', ...data.editor });
        }
      }

      // 3. Prepare Authors creation promises
      const authorPromises: Promise<any>[] = (data.authors || []).map(author => {
        if ((author as any)._id) {
          return client.createOrReplace({ _type: 'author', ...author, _id: (author as any)._id as string });
        }
        return client.create({ _type: 'author', ...author });
      });

      // 4. Prepare Additional Images upload promises
      const imageUploadPromises: Promise<any>[] = (data.images || []).map(img => {
        if (typeof img === 'string' && img.startsWith('data:image')) {
          return fetch(img)
            .then(res => res.blob())
            .then(blob => client.assets.upload('image', blob));
        }
        return Promise.resolve(img);
      });

      // 5. Execute all operations concurrently
      const [coverAsset, createdEditor, createdAuthors, uploadedImages] = await Promise.all([
        coverUploadPromise,
        editorPromise,
        Promise.all(authorPromises),
        Promise.all(imageUploadPromises)
      ]);

      // 6. Map results to references
      const editorRef = createdEditor ? { _type: 'reference', _ref: createdEditor._id } : undefined;
      const authRefs = createdAuthors.map((auth: any) => ({ _type: 'reference', _ref: auth._id, _key: auth._id }));
      const uploadedImagesRefs = uploadedImages.map((asset: any) => {
        if (asset && asset._id) {
          return {
            _type: 'image',
            asset: { _type: 'reference', _ref: asset._id },
            _key: asset._id
          };
        }
        return asset;
      }).filter(Boolean);

      // 7. Create Book
      await client.create({
        _type: 'book',
        title: data.title,
        classType: data.classType,
        price: data.price,
        shortDescription: data.shortDescription,
        fullDescription: data.fullDescription,
        publisher: data.publisher,
        edition: data.edition,
        language: data.language,
        availability: data.availability,
        coverImage: coverAsset ? { _type: 'image', asset: { _type: 'reference', _ref: coverAsset._id } } : undefined,
        images: uploadedImagesRefs.length > 0 ? uploadedImagesRefs : undefined,
        editor: editorRef,
        authors: authRefs.length > 0 ? authRefs : undefined,
      });

      navigate('/admin/books');
    } catch (error) {
      console.error('Error creating book in Sanity:', error);
      alert('Failed to create book. Please check console for details.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="animate-fade-in-up">
      <button
        onClick={() => navigate('/admin/books')}
        className="flex items-center gap-1.5 text-sm text-[#6E6E73] hover:text-[#007AFF] font-bold mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
        <span>Back to Books</span>
      </button>

      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0A2540] font-display tracking-tight">Add New Book</h1>
        <p className="text-[#6E6E73] text-sm font-medium mt-1">Fill in the book details below</p>
      </div>

      <BookForm onSubmit={handleSubmit} onCancel={() => navigate('/admin/books')} isSubmitting={isSubmitting} />
    </div>
  );
}
