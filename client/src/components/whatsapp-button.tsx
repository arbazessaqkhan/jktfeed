import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function WhatsAppButton() {
  const whatsappNumber = "923369976123";
  
  const openWhatsApp = () => {
    const message = "Hello! I'm interested in JK Trout Feed products. Could you please provide more information?";
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <Button
      onClick={openWhatsApp}
      className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-lg z-50 transition-all duration-300 hover:scale-110"
      size="lg"
    >
      <MessageCircle className="w-6 h-6" />
      <span className="sr-only">Contact us on WhatsApp</span>
    </Button>
  );
}