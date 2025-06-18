import { MessageCircle } from "lucide-react";

export default function WhatsAppButton() {
  const phoneNumber = "+919419500600"; // WhatsApp number
  const message = encodeURIComponent("Hello! I'm interested in JK Trout Feed products. Could you please provide more information?");
  
  const handleWhatsAppClick = () => {
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  return (
    <button
      onClick={handleWhatsAppClick}
      className="fixed bottom-20 right-6 z-40 bg-green-500 hover:bg-green-600 text-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 hover-heartbeat click-ripple float-gentle pl-[13px] pr-[13px]"
      aria-label="Contact us on WhatsApp"
    >
      <MessageCircle className="w-6 h-6 hover-wiggle" />
      <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-bounce hover-shake">
        !
      </div>
    </button>
  );
}