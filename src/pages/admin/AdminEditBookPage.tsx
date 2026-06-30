import { useState } from 'react';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import BookForm from '../../components/admin/BookForm';
import { Book } from '../../types';
import { useBook } from '../../hooks/useSanity';
import { client } from '../../lib/sanity';

export default function AdminEditBookPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { book, loading } = useBook(id);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (loading) {
    return (
      <div className="animate-fade-in-up">
        <div className="bg-white rounded-2xl border border-gray-200/60 shadow-sm shadow-gray-200/10 p-8 text-center text-[#6E6E73] animate-pulse font-medium">
          Loading book details...
        </div>
      </div>
    );
  }

  if (!book) {
    return <Navigate to="/admin/books" replace />;
  }

  const handleSubmit = async (data: Omit<Book, 'id' | 'createdAt'>) => {
    if (!id || isSubmitting) return;
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
        editorPromise = client.create({ _type: 'author', ...data.editor });
      }

      // 3. Prepare Authors creation promises
      const authorPromises: Promise<any>[] = (data.authors || []).map(author => {
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

      // 6. Map results
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

      const patchData: any = {
        title: data.title,
        classType: data.classType,
        price: data.price,
        shortDescription: data.shortDescription,
        fullDescription: data.fullDescription,
        publisher: data.publisher,
        edition: data.edition,
        language: data.language,
        availability: data.availability,
        images: uploadedImagesRefs.length > 0 ? uploadedImagesRefs : null,
      };

      if (coverAsset) {
        patchData.coverImage = { _type: 'image', asset: { _type: 'reference', _ref: coverAsset._id } };
      }
      if (editorRef) {
        patchData.editor = editorRef;
      }
      if (authRefs.length > 0) {
        patchData.authors = authRefs;
      }

      await client.patch(id).set(patchData).commit();

      navigate('/admin/books');
    } catch (error) {
      console.error('Error updating book:', error);
      alert('Failed to update book.');
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
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0A2540] font-display tracking-tight">Edit Book</h1>
        <p className="text-[#6E6E73] text-sm font-medium mt-1">Update the book details</p>
      </div>

      <BookForm
        initialData={book}
        onSubmit={handleSubmit}
        onCancel={() => navigate('/admin/books')}
        isEditing
        isSubmitting={isSubmitting}
      />
    </div>
  );
}
