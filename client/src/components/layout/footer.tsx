import { Link } from "wouter";
import { Mail, Phone, MessageCircle, Facebook, Instagram, Twitter } from "lucide-react";
import { FaPinterest } from "react-icons/fa";
import logoImage from "@assets/rect5_1750246217514.png";

export default function Footer() {

  return (
    <footer className="bg-primary text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold mb-4">JK Trout Feed</h3>
            <p className="text-blue-200 mb-4">GREEN GLOBE AGAIN</p>
            <p className="text-blue-100 mb-6">
              Advanced manufacturing facility producing premium trout feed with superior nutritional profiles and proven results in aquaculture.
            </p>
            <div className="flex space-x-4">
              <a href="mailto:info@jktroutfeed.com" className="text-blue-200 hover:text-white transition-colors hover-glow click-ripple btn-bounce" title="Email Us">
                <Mail className="w-6 h-6" />
              </a>
              <a href="tel:+91-123-456-7890" className="text-blue-200 hover:text-white transition-colors hover-glow click-ripple btn-bounce" title="Call Us">
                <Phone className="w-6 h-6" />
              </a>
              <a href="https://wa.me/923369976123" target="_blank" rel="noopener noreferrer" className="text-blue-200 hover:text-white transition-colors hover-glow click-ripple btn-bounce" title="WhatsApp">
                <MessageCircle className="w-6 h-6" />
              </a>
              <a href="#" className="text-blue-200 hover:text-white transition-colors hover-glow click-ripple btn-bounce" title="Facebook">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="#" className="text-blue-200 hover:text-white transition-colors hover-glow click-ripple btn-bounce" title="Instagram">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="#" className="text-blue-200 hover:text-white transition-colors hover-glow click-ripple btn-bounce" title="Twitter">
                <Twitter className="w-6 h-6" />
              </a>
              <a href="#" className="text-blue-200 hover:text-white transition-colors hover-glow click-ripple btn-bounce" title="Pinterest">
                <FaPinterest className="w-6 h-6" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-blue-100">
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/products" className="hover:text-white transition-colors">Products</Link></li>
              <li><Link href="/feeding-guide" className="hover:text-white transition-colors">Feeding Guide</Link></li>
              <li><Link href="/team" className="hover:text-white transition-colors">Team</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-blue-100">
              <li><a href="/feeding-guide#calculator" className="hover:text-white transition-colors">Feeding Calculator</a></li>
              <li><Link href="/products" className="hover:text-white transition-colors">Technical Specifications</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">Quality Assurance</Link></li>
              <li><a href="#" className="hover:text-white transition-colors">Product Catalog</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-blue-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
          <p className="text-blue-200 text-sm">&copy; 2024 JK Trout Feed. All rights reserved.</p>
          <div className="flex items-center text-blue-200 text-sm">
            <span className="mr-2">Designed by</span>
            <a href="https://www.quantafons.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
              <img src={logoImage} alt="QuantaFONS" className="h-4 w-auto inline-block" />
            </a>
          </div>
          <p className="text-blue-200 text-sm">Manufacturing Excellence in Jammu & Kashmir</p>
        </div>
      </div>
    </footer>
  );
}
