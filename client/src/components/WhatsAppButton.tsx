import { MessageCircle } from 'lucide-react';

interface WhatsAppButtonProps {
  message?: string;
  phoneNumber?: string; // Optional: international format without + or spaces, e.g. "1234567890"
  className?: string;
  variant?: 'floating' | 'button' | 'outline' | 'banner';
  label?: string;
}

export const DEFAULT_WHATSAPP_MESSAGE = "Hi Media Wave Technologies, I'd like to book a live demo of Master Export Pro. Please share the available slots.";

export function getWhatsAppUrl(
  message: string = DEFAULT_WHATSAPP_MESSAGE,
  phoneNumber: string = '916369153235'
): string {
  const encoded = encodeURIComponent(message);
  const cleanNumber = phoneNumber.replace(/[^0-9]/g, '');
  if (cleanNumber) {
    return `https://wa.me/${cleanNumber}?text=${encoded}`;
  }
  return `https://api.whatsapp.com/send?text=${encoded}`;
}

export function WhatsAppButton({
  message = DEFAULT_WHATSAPP_MESSAGE,
  phoneNumber = '916369153235',
  className = '',
  variant = 'button',
  label = 'Book Demo on WhatsApp'
}: WhatsAppButtonProps) {
  const url = getWhatsAppUrl(message, phoneNumber);

  if (variant === 'floating') {
    return null;
  }

  if (variant === 'outline') {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 rounded-xl transition duration-200 shadow-sm cursor-pointer ${className}`}
      >
        <MessageCircle className="w-4 h-4 text-emerald-600" />
        {label}
      </a>
    );
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-[#25D366] hover:bg-[#20bd5a] rounded-xl transition duration-200 shadow-md hover:shadow-lg active:scale-95 cursor-pointer ${className}`}
    >
      <MessageCircle className="w-4 h-4" />
      {label}
    </a>
  );
}
