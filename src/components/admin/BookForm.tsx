import { useState } from 'react';
import { Plus, Trash2, Upload, Image as ImageIcon, X } from 'lucide-react';
import { Book, Author, Editor } from '../../types';
import { urlFor } from '../../lib/imageUrl';

interface BookFormProps {
  initialData?: Book;
  onSubmit: (data: Omit<Book, 'id' | 'createdAt'>) => void;
  onCancel: () => void;
  isEditing?: boolean;
  isSubmitting?: boolean;
}

export default function BookForm({ initialData, onSubmit, onCancel, isEditing = false, isSubmitting = false }: BookFormProps) {
  const [title, setTitle] = useState(initialData?.title || '');
  const [classType, setClassType] = useState<string>(initialData?.classType || 'Intermediate');
  const [price, setPrice] = useState(initialData?.price?.toString() || '');
  const [shortDescription, setShortDescription] = useState(initialData?.shortDescription || '');
  const [fullDescription, setFullDescription] = useState(initialData?.fullDescription || '');
  const [publisher, setPublisher] = useState(initialData?.publisher || 'Claret Publications');
  const [edition, setEdition] = useState(initialData?.edition || '2025-26 Edition');
  const [language, setLanguage] = useState(initialData?.language || 'English');
  const [coverImage, setCoverImage] = useState(initialData?.coverImage || '');
  const [coverPreview, setCoverPreview] = useState(initialData?.coverImage || '');
  const [additionalImages, setAdditionalImages] = useState<any[]>(initialData?.images || []);

  const [editor, setEditor] = useState<Editor>(
    initialData?.editor || { name: '', qualification: '', institution: '' }
  );

  const [authors, setAuthors] = useState<Author[]>(
    initialData?.authors?.length
      ? initialData.authors
      : [{ name: '', qualification: '', designation: '', institution: '' }]
  );

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setCoverImage(result);
        setCoverPreview(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAdditionalImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const remainingSlots = 4 - additionalImages.length;
    const filesToProcess = files.slice(0, remainingSlots);

    filesToProcess.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAdditionalImages(prev => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeAdditionalImage = (index: number) => {
    setAdditionalImages(prev => prev.filter((_, i) => i !== index));
  };

  const getPreviewUrl = (img: any) => {
    if (!img) return '';
    if (typeof img === 'string') return img;
    try {
      return urlFor(img).width(300).url();
    } catch (e) {
      return '';
    }
  };

  const addAuthor = () => {
    setAuthors(prev => [...prev, { name: '', qualification: '', designation: '', institution: '' }]);
  };

  const removeAuthor = (index: number) => {
    if (authors.length <= 1) return;
    setAuthors(prev => prev.filter((_, i) => i !== index));
  };

  const updateAuthor = (index: number, field: keyof Author, value: string) => {
    setAuthors(prev => prev.map((a, i) => i === index ? { ...a, [field]: value } : a));
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!title.trim()) newErrors.title = 'Title is required';
    if (!price.trim() || isNaN(Number(price)) || Number(price) <= 0) newErrors.price = 'Valid price is required';
    if (!shortDescription.trim()) newErrors.shortDescription = 'Short description is required';
    if (!fullDescription.trim()) newErrors.fullDescription = 'Full description is required';
    if (!publisher.trim()) newErrors.publisher = 'Publisher is required';
    if (!editor.name.trim()) newErrors.editorName = 'Editor name is required';
    if (!authors[0]?.name.trim()) newErrors.authorName = 'At least one author name is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    onSubmit({
      title: title.trim(),
      classType: classType.trim(),
      price: Number(price),
      shortDescription: shortDescription.trim(),
      fullDescription: fullDescription.trim(),
      publisher: publisher.trim(),
      edition: edition.trim(),
      language: language.trim(),
      availability: true, // Always true on creation/edit
      coverImage,
      images: additionalImages,
      editor,
      authors: authors.filter(a => a.name.trim()),
    });
  };

  const inputClass = (field: string) =>
    `w-full px-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-[#007AFF] transition-all duration-200 ${
      errors[field] ? 'border-red-300 bg-red-50 text-red-900' : 'border-gray-200 bg-white text-[#1D1D1F]'
    }`;

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Basic info */}
      <div className="bg-white rounded-2xl border border-gray-200/60 shadow-sm shadow-gray-200/10 p-6">
        <h3 className="text-base sm:text-lg font-extrabold text-[#0A2540] font-display tracking-tight mb-5">
          Basic Information
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-[11px] font-bold text-[#1D1D1F] uppercase tracking-wider mb-1.5">
              Book Title *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={inputClass('title')}
              placeholder="e.g., Physics is Easy — Class XI"
              id="book-title"
            />
            {errors.title && <p className="text-xs text-red-500 mt-1">{errors.title}</p>}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-bold text-[#1D1D1F] uppercase tracking-wider mb-1.5">
                Class Type *
              </label>
              <input
                type="text"
                value={classType}
                onChange={(e) => setClassType(e.target.value)}
                className={inputClass('')}
                placeholder="Intermediate"
                id="book-classType"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-[#1D1D1F] uppercase tracking-wider mb-1.5">
                Price (₹) *
              </label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className={inputClass('price')}
                placeholder="450"
                min="1"
                id="book-price"
              />
              {errors.price && <p className="text-xs text-red-500 mt-1">{errors.price}</p>}
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-[#1D1D1F] uppercase tracking-wider mb-1.5">
              Short Description *
            </label>
            <textarea
              value={shortDescription}
              onChange={(e) => setShortDescription(e.target.value)}
              rows={2}
              className={`${inputClass('shortDescription')} resize-none`}
              placeholder="Brief description shown on book cards"
              id="book-shortDescription"
            />
            {errors.shortDescription && <p className="text-xs text-red-500 mt-1">{errors.shortDescription}</p>}
          </div>

          <div>
            <label className="block text-[11px] font-bold text-[#1D1D1F] uppercase tracking-wider mb-1.5">
              Full Description *
            </label>
            <textarea
              value={fullDescription}
              onChange={(e) => setFullDescription(e.target.value)}
              rows={6}
              className={`${inputClass('fullDescription')} resize-none`}
              placeholder="Detailed description shown on book detail page"
              id="book-fullDescription"
            />
            {errors.fullDescription && <p className="text-xs text-red-500 mt-1">{errors.fullDescription}</p>}
          </div>
        </div>
      </div>

      {/* Publication details */}
      <div className="bg-white rounded-2xl border border-gray-200/60 shadow-sm shadow-gray-200/10 p-6">
        <h3 className="text-base sm:text-lg font-extrabold text-[#0A2540] font-display tracking-tight mb-5">
          Publication Details
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-[11px] font-bold text-[#1D1D1F] uppercase tracking-wider mb-1.5">
              Publisher *
            </label>
            <input
              type="text"
              value={publisher}
              onChange={(e) => setPublisher(e.target.value)}
              className={inputClass('publisher')}
              id="book-publisher"
            />
            {errors.publisher && <p className="text-xs text-red-500 mt-1">{errors.publisher}</p>}
          </div>
          <div>
            <label className="block text-[11px] font-bold text-[#1D1D1F] uppercase tracking-wider mb-1.5">
              Edition
            </label>
            <input
              type="text"
              value={edition}
              onChange={(e) => setEdition(e.target.value)}
              className={inputClass('')}
              id="book-edition"
            />
          </div>
          <div>
            <label className="block text-[11px] font-bold text-[#1D1D1F] uppercase tracking-wider mb-1.5">
              Language
            </label>
            <input
              type="text"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className={inputClass('')}
              id="book-language"
            />
          </div>
        </div>
      </div>

      {/* Cover image & Additional Pictures */}
      <div className="bg-white rounded-2xl border border-gray-200/60 shadow-sm shadow-gray-200/10 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Cover Image */}
          <div>
            <h3 className="text-base sm:text-lg font-extrabold text-[#0A2540] font-display tracking-tight mb-5">
              Cover Image
            </h3>
            <div className="flex items-start gap-6">
              <div className="w-32 h-44 rounded-xl border-2 border-dashed border-gray-200 flex items-center justify-center bg-gray-50 overflow-hidden flex-shrink-0">
                {coverPreview ? (
                  <img src={getPreviewUrl(coverPreview)} alt="Cover preview" className="w-full h-full object-contain rounded-lg bg-white" />
                ) : (
                  <ImageIcon className="w-8 h-8 text-gray-300" />
                )}
              </div>
              <div className="flex-1">
                <label
                  htmlFor="cover-upload"
                  className="inline-flex items-center gap-2 px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-bold text-gray-700 hover:bg-gray-50 cursor-pointer transition-colors"
                >
                  <Upload className="w-4 h-4 text-gray-500" />
                  Upload Cover Image
                </label>
                <input
                  id="cover-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
                <p className="text-xs text-gray-500 mt-2">PNG, JPG, or WebP. Max 5MB. Recommended: 3:4 aspect ratio.</p>
                {coverPreview && (
                  <button
                    type="button"
                    onClick={() => { setCoverImage(''); setCoverPreview(''); }}
                    className="text-xs text-red-500 hover:text-red-700 mt-2 font-bold"
                  >
                    Remove image
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Additional Book Pictures */}
          <div>
            <h3 className="text-base sm:text-lg font-extrabold text-[#0A2540] font-display tracking-tight mb-5 flex items-center justify-between">
              <span>Book Pictures (Max 4)</span>
              <span className="text-xs font-bold text-[#6E6E73]">{additionalImages.length}/4</span>
            </h3>
            <div className="grid grid-cols-4 gap-2 mb-4">
              {additionalImages.map((img, idx) => (
                <div key={idx} className="relative aspect-square rounded-xl border border-gray-200 bg-gray-50 overflow-hidden group">
                  <img src={getPreviewUrl(img)} className="w-full h-full object-contain bg-white" alt={`Preview ${idx + 1}`} />
                  <button
                    type="button"
                    onClick={() => removeAdditionalImage(idx)}
                    className="absolute top-1 right-1 p-1 bg-red-600 hover:bg-red-700 text-white rounded-full transition-colors shadow-sm"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
              {additionalImages.length < 4 && (
                <label className="aspect-square rounded-xl border-2 border-dashed border-gray-200 hover:border-blue-400 flex flex-col items-center justify-center bg-gray-50/50 hover:bg-blue-50/10 cursor-pointer transition-all duration-200">
                  <Plus className="w-5 h-5 text-gray-400 mb-1" />
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Add Pic</span>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleAdditionalImagesChange}
                    className="hidden"
                  />
                </label>
              )}
            </div>
            <p className="text-xs text-gray-500">Add inner page photos, contents index, or tables to showcase the guidebook contents.</p>
          </div>
        </div>
      </div>

      {/* Editor */}
      <div className="bg-white rounded-2xl border border-gray-200/60 shadow-sm shadow-gray-200/10 p-6">
        <h3 className="text-base sm:text-lg font-extrabold text-[#0A2540] font-display tracking-tight mb-5">
          Editor Details
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-[11px] font-bold text-[#1D1D1F] uppercase tracking-wider mb-1.5">
              Editor Name *
            </label>
            <input
              type="text"
              value={editor.name}
              onChange={(e) => setEditor({ ...editor, name: e.target.value })}
              className={inputClass('editorName')}
              placeholder="Dr. Ramesh Kumar"
              id="book-editorName"
            />
            {errors.editorName && <p className="text-xs text-red-500 mt-1">{errors.editorName}</p>}
          </div>
          <div>
            <label className="block text-[11px] font-bold text-[#1D1D1F] uppercase tracking-wider mb-1.5">
              Qualification
            </label>
            <input
              type="text"
              value={editor.qualification}
              onChange={(e) => setEditor({ ...editor, qualification: e.target.value })}
              className={inputClass('')}
              placeholder="Ph.D. in Mathematics"
              id="book-editorQualification"
            />
          </div>
          <div>
            <label className="block text-[11px] font-bold text-[#1D1D1F] uppercase tracking-wider mb-1.5">
              Institution
            </label>
            <input
              type="text"
              value={editor.institution}
              onChange={(e) => setEditor({ ...editor, institution: e.target.value })}
              className={inputClass('')}
              placeholder="National Institute of Education"
              id="book-editorInstitution"
            />
          </div>
        </div>
      </div>

      {/* Authors */}
      <div className="bg-white rounded-2xl border border-gray-200/60 shadow-sm shadow-gray-200/10 p-6">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-base sm:text-lg font-extrabold text-[#0A2540] font-display tracking-tight">
            Authors
          </h3>
          <button
            type="button"
            onClick={addAuthor}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#007AFF]/10 text-[#007AFF] text-xs font-bold rounded-lg hover:bg-[#007AFF] hover:text-white transition-all duration-200"
            id="add-author-btn"
          >
            <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Add Author</span>
          </button>
        </div>

        <div className="space-y-6">
          {authors.map((author, index) => (
            <div key={index} className="relative p-4 bg-[#F5F5F7]/80 border border-gray-200/40 rounded-xl">
              {authors.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeAuthor(index)}
                  className="absolute top-3 right-3 p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
              <p className="text-xs font-bold text-gray-500 mb-3 uppercase tracking-wider">
                Author {index + 1}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-[#1D1D1F] mb-1">Name *</label>
                  <input
                    type="text"
                    value={author.name}
                    onChange={(e) => updateAuthor(index, 'name', e.target.value)}
                    className={inputClass(index === 0 ? 'authorName' : '')}
                    placeholder="Prof. Sunita Sharma"
                  />
                  {index === 0 && errors.authorName && <p className="text-xs text-red-500 mt-1">{errors.authorName}</p>}
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-[#1D1D1F] mb-1">Qualification</label>
                  <input
                    type="text"
                    value={author.qualification}
                    onChange={(e) => updateAuthor(index, 'qualification', e.target.value)}
                    className={inputClass('')}
                    placeholder="M.Sc. Mathematics, B.Ed."
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-[#1D1D1F] mb-1">Designation</label>
                  <input
                    type="text"
                    value={author.designation}
                    onChange={(e) => updateAuthor(index, 'designation', e.target.value)}
                    className={inputClass('')}
                    placeholder="Senior Faculty"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-[#1D1D1F] mb-1">Institution</label>
                  <input
                    type="text"
                    value={author.institution}
                    onChange={(e) => updateAuthor(index, 'institution', e.target.value)}
                    className={inputClass('')}
                    placeholder="Delhi Public School"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200/60">
        <button
          type="button"
          onClick={onCancel}
          disabled={isSubmitting}
          className={`px-6 py-3 border border-gray-200/80 text-[#6E6E73] hover:text-[#1D1D1F] text-sm font-bold rounded-xl hover:bg-gray-50 transition-colors ${
            isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          id="book-form-cancel"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className={`px-6 py-3 bg-[#007AFF] hover:bg-blue-600 text-white text-sm font-bold rounded-xl shadow-lg shadow-blue-500/10 hover:shadow-xl transition-all duration-200 ${
            isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
          }`}
          id="book-form-submit"
        >
          {isSubmitting ? (isEditing ? 'Updating...' : 'Adding...') : (isEditing ? 'Update Book' : 'Add Book')}
        </button>
      </div>
    </form>
  );
}
