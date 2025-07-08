import { Mail } from "lucide-react";

interface TeamCardProps {
  name: string;
  position: string;
  email: string;
  phone?: string; 
  image: string;
  bgColor: string;
  color: string;
}

export default function TeamCard({
  name,
  position,
  email,
  phone,
  image,
  bgColor,
  color
}: TeamCardProps) {
  return (
    <div className={`bg-gradient-to-br ${bgColor} p-8 rounded-xl shadow-lg text-center group hover:shadow-xl transition-shadow hover-lift hover-tilt click-ripple smooth-transition`}>
      <img 
        src={image} 
        alt={`Professional headshot of ${name}`}
        className="w-36 h-36 rounded-full mx-auto mb-6 object-center shadow-lg hover-zoom hover-saturate float-gentle"
      />
      <h3 className="text-2xl font-bold mb-2 hover-rubber text-[#064e87]">{name}</h3>
      <p className="text-neutral mb-4 hover-fade">{position}</p>
      {/* Social Media Icons in a row */}
      <div className="flex justify-center space-x-4 mb-4 text-[#07508f]">
        <a 
          href="#" 
          className={`${color} hover:opacity-70 transition-opacity hover-wiggle hover-glow`}
          title="Facebook"
        >
          <svg className="w-6 h-6 hover-shake" fill="currentColor" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
        </a>
        <a 
          href={`mailto:${email}`} 
          className={`${color} hover:opacity-70 transition-opacity hover-wiggle hover-glow`}
          title="Email"
        >
          <Mail className="w-6 h-6 hover-shake" />
        </a>
        <a 
          href="#" 
          className={`${color} hover:opacity-70 transition-opacity hover-wiggle hover-glow`}
          title="LinkedIn"
        >
          <svg className="w-6 h-6 hover-shake" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
        </a>
      </div>
      {/* WhatsApp Button */}
      <div className="mt-4">
        <a 
          href="https://wa.me/923369976123" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center w-full px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white rounded-md transition-all duration-300 transform hover:scale-105 hover-glow text-sm"
        >
          <svg className="w-4 h-4 mr-1.5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.56-.01-.188 0-.495.074-.754.372-.26.297-.99.968-.99 2.36 0 1.393.991 2.742 1.129 2.93.139.187 1.955 2.986 4.737 4.187.662.286 1.178.456 1.58.579.664.211 1.269.181 1.748.11.533-.08 1.758-.72 2.005-1.413.248-.693.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.893 3.488"/>
          </svg>
          WhatsApp
        </a>
      </div>
      <p className="text-sm text-neutral mt-3">{email}</p>
      {phone && <p className="text-sm text-neutral mt-1">{phone}</p>}
    </div>
  );
}
