import { useState } from 'react';
import { X, MessageCircle, Send } from 'lucide-react';
import { Book, OrderFormData } from '../../types';
import { useSiteSettings } from '../../hooks/useSanity';

interface WhatsAppModalProps {
  book: Book;
  isOpen: boolean;
  onClose: () => void;
}

export default function WhatsAppModal({ book, isOpen, onClose }: WhatsAppModalProps) {
  const { settings } = useSiteSettings();
  const [formData, setFormData] = useState<OrderFormData>({
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
    copies: 1,
  });
  const [errors, setErrors] = useState<Partial<Record<keyof OrderFormData, string>>>({});

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof OrderFormData, string>> = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    else if (!/^\d{10}$/.test(formData.phone.trim())) newErrors.phone = 'Enter a valid 10-digit phone number';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (formData.copies < 1) newErrors.copies = 'At least 1 copy required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const totalPrice = book.price * formData.copies;
    const authorNames = book.authors && book.authors.length > 0
      ? book.authors.map(a => a.name).join(', ')
      : 'N/A';

    const cleanNumber = (settings?.whatsappNumber || '9994292586').replace(/\D/g, '');

    const message = `New Book Order - ${settings?.publicationName || 'Claret Publications'}

Book: ${book.title}
Class: ${book.classType}
Author: ${authorNames}
Publisher: ${book.publisher}
Price: Rs. ${book.price} per copy
Quantity: ${formData.copies}
Total: Rs. ${totalPrice}

Customer Details:
Name: ${formData.firstName} ${formData.lastName}
Phone: ${formData.phone}
Address: ${formData.address}

Please confirm availability and delivery details. Thank you!`;

    const whatsappUrl = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;

    // Direct navigation — opens WhatsApp chat composer immediately
    window.open(whatsappUrl, '_blank');
    onClose();
  };

  const handleChange = (field: keyof OrderFormData, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 modal-overlay animate-fade-in" onClick={onClose}>
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#007AFF] flex items-center justify-center">
              <MessageCircle className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-[#1D1D1F]">Order via WhatsApp</h2>
              <p className="text-xs text-[#6E6E73]">Fill in your details to place an order</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
            id="modal-close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Book info */}
        <div className="px-6 py-3 bg-gray-50 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-12 h-16 rounded-lg bg-[#0A2540] flex items-center justify-center flex-shrink-0">
              <span className="text-white text-[10px] font-bold text-center leading-tight px-1">
                {book.title.split(' ').slice(0, 2).join(' ')}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-[#1D1D1F] truncate">{book.title}</p>
              <p className="text-xs text-[#6E6E73]">{book.classType} • {book.publisher} • {book.edition}</p>
              <p className="text-xs text-[#6E6E73] truncate">by {book.authors.map(a => a.name).join(', ')}</p>
              <p className="text-sm font-bold text-[#10B981] mt-0.5">₹{book.price}</p>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#1D1D1F] mb-1.5">First Name *</label>
              <input
                type="text"
                value={formData.firstName}
                onChange={(e) => handleChange('firstName', e.target.value)}
                className={`w-full px-3 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#007AFF]/30 focus:border-[#007AFF] transition-all ${errors.firstName ? 'border-red-300 bg-red-50' : 'border-gray-200'
                  }`}
                placeholder="John"
                id="order-firstName"
              />
              {errors.firstName && <p className="text-xs text-red-500 mt-1">{errors.firstName}</p>}
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#1D1D1F] mb-1.5">Last Name *</label>
              <input
                type="text"
                value={formData.lastName}
                onChange={(e) => handleChange('lastName', e.target.value)}
                className={`w-full px-3 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#007AFF]/30 focus:border-[#007AFF] transition-all ${errors.lastName ? 'border-red-300 bg-red-50' : 'border-gray-200'
                  }`}
                placeholder="Doe"
                id="order-lastName"
              />
              {errors.lastName && <p className="text-xs text-red-500 mt-1">{errors.lastName}</p>}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#1D1D1F] mb-1.5">Phone Number *</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              className={`w-full px-3 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#007AFF]/30 focus:border-[#007AFF] transition-all ${errors.phone ? 'border-red-300 bg-red-50' : 'border-gray-200'
                }`}
              placeholder="9876543210"
              id="order-phone"
            />
            {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#1D1D1F] mb-1.5">Delivery Address *</label>
            <textarea
              value={formData.address}
              onChange={(e) => handleChange('address', e.target.value)}
              rows={3}
              className={`w-full px-3 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#007AFF]/30 focus:border-[#007AFF] transition-all resize-none ${errors.address ? 'border-red-300 bg-red-50' : 'border-gray-200'
                }`}
              placeholder="Enter your full delivery address"
              id="order-address"
            />
            {errors.address && <p className="text-xs text-red-500 mt-1">{errors.address}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#1D1D1F] mb-1.5">Number of Copies *</label>
            <input
              type="number"
              min={1}
              max={100}
              value={formData.copies}
              onChange={(e) => handleChange('copies', parseInt(e.target.value) || 1)}
              className={`w-full px-3 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#007AFF]/30 focus:border-[#007AFF] transition-all ${errors.copies ? 'border-red-300 bg-red-50' : 'border-gray-200'
                }`}
              id="order-copies"
            />
            {errors.copies && <p className="text-xs text-red-500 mt-1">{errors.copies}</p>}
          </div>

          {/* Total */}
          <div className="flex items-center justify-between px-4 py-3 bg-gray-50 rounded-xl">
            <span className="text-sm text-[#6E6E73]">Total Amount</span>
            <span className="text-xl font-bold text-[#10B981]">₹{book.price * formData.copies}</span>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-[#007AFF] hover:bg-blue-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
            id="order-submit"
          >
            <Send className="w-4 h-4" />
            Complete Order on WhatsApp
          </button>

          <p className="text-xs text-[#6E6E73] text-center">
            You'll be taken directly to WhatsApp to send your order to {settings.publicationName}.
          </p>
        </form>
      </div>
    </div>
  );
}
