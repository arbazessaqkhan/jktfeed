import { useEffect, useState } from "react";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { MapPin, Mail, Phone, Clock, Send, MessageSquare } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });

  useEffect(() => {
    // Advanced SEO for Contact Page
    document.title = "Contact JK Trout Feed - Expert Aquaculture Consultation & Support | Kashmir";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Contact JK Trout Feed for expert aquaculture consultation in Kashmir. Get professional advice on trout feeding, nutrition planning, and premium feed solutions. SIDCO Estate, Lassipora facility.');
    }
    
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', 'Contact JK Trout Feed - Expert Aquaculture Consultation & Support');
    }
    
    // Contact Page Structured Data
    const contactStructuredData = {
      "@context": "https://schema.org",
      "@type": "ContactPage",
      "name": "Contact JK Trout Feed",
      "description": "Contact information and consultation services for aquaculture feed solutions",
      "url": "https://jktroutfeed.com/contact",
      "mainEntity": {
        "@type": "ContactPoint",
        "contactType": "customer service",
        "telephone": "+91-123-456-7890",
        "email": "info@jktroutfeed.com",
        "availableLanguage": ["English", "Hindi", "Urdu"],
        "areaServed": "Kashmir, India"
      },
      "breadcrumb": {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://jktroutfeed.com/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Contact",
            "item": "https://jktroutfeed.com/contact"
          }
        ]
      }
    };
    
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(contactStructuredData);
    document.head.appendChild(script);
    
    return () => {
      const scripts = document.querySelectorAll('script[type="application/ld+json"]');
      scripts.forEach(script => {
        if (script.textContent?.includes('"@type":"ContactPage"')) {
          script.remove();
        }
      });
    };
  }, []);

  const { toast } = useToast();

  const contactMutation = useMutation({
    mutationFn: (data: typeof formData) => apiRequest("POST", "/api/contact", data),
    onSuccess: () => {
      toast({
        title: "Message Sent Successfully!",
        description: "Thank you for contacting us. Our team will respond within 24 hours.",
      });
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: ""
      });
    },
    onError: () => {
      toast({
        title: "Error Sending Message",
        description: "Please try again or contact us directly via email.",
        variant: "destructive",
      });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    contactMutation.mutate(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = [
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Manufacturing Facility",
      details: [
        "16C Industrial Area",
        "Lassipora, Pulwama",
        "Kashmir 192301, India"
      ],
      color: "text-primary"
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email Addresses",
      details: [
        "sales@jktroutfeed.com",
        "jktfeed@gmail.com",
      ],
      color: "text-secondary"
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Phone Numbers",
      details: [
        "Technical: +91 9103766738",
        "Sales: +91 7889828265",
      ],
      color: "text-accent"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Business Hours",
      details: [
        "Monday - Saturday: 9:00 AM - 6:00 PM",
        "Sunday: Closed",
        "Emergency Support: 24/7"
      ],
      color: "text-primary"
    }
  ];

  const enquiryTypes = [
    {
      title: "Product Inquiries",
      description: "Information about our feed products, specifications, and pricing",
      icon: "🐟",
      contact: "sales@jktroutfeed.com"
    },
    {
      title: "Technical Support",
      description: "Feeding guidance, nutritional consultations, and problem-solving",
      icon: "🔬",
      contact: "technical@jktroutfeed.com"
    },
    {
      title: "Quality Concerns",
      description: "Product quality issues, complaints, and quality assurance",
      icon: "⭐",
      contact: "quality@jktroutfeed.com"
    },
    {
      title: "Partnership Opportunities",
      description: "Distribution partnerships, dealer inquiries, and business collaborations",
      icon: "🤝",
      contact: "partnerships@jktroutfeed.com"
    }
  ];

  const faqs = [
    {
      question: "What is your minimum order quantity?",
      answer: "Our minimum order is 1 ton per product type. We offer flexible packaging options."
    },
    {
      question: "Do you provide delivery services?",
      answer: "Yes, we provide delivery across Kashmir and neighboring regions. Delivery charges apply based on distance."
    },
    {
      question: "Can you customize feed formulations?",
      answer: "We offer custom formulations for large orders (minimum 5 tons). Contact our technical team for details."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept bank transfers, cheques, and cash payments. Credit terms available for verified customers."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary to-secondary text-white py-20">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Contact Our Experts</h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Get technical consultation, product information, or partnership opportunities
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={() => window.open('tel:+919103766738')}
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg font-semibold"
              >
                <Phone className="w-5 h-5 mr-2" />
                Call Now
              </Button>
              <Button 
                onClick={() => window.open('mailto:sales@jktroutfeed.com')}
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg font-semibold"
              >
                <Mail className="w-5 h-5 mr-2" />
                Email Us
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Contact Form and Information */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Contact Form */}
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-primary flex items-center">
                <MessageSquare className="w-6 h-6 mr-2" />
                Send us a Message
              </CardTitle>
              <p className="text-neutral">
                Fill out the form below and our team will respond within 24 hours
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name" className="text-sm font-semibold text-gray-700">
                      Full Name *
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-sm font-semibold text-gray-700">
                      Email Address *
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email address"
                      className="mt-2"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="phone" className="text-sm font-semibold text-gray-700">
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter your phone number"
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="subject" className="text-sm font-semibold text-gray-700">
                    Subject *
                  </Label>
                  <Input
                    id="subject"
                    name="subject"
                    type="text"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Brief description of your inquiry"
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="message" className="text-sm font-semibold text-gray-700">
                    Detailed Message *
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    rows={6}
                    required
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Provide details about your requirements, questions, or concerns"
                    className="mt-2"
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-primary text-white hover:bg-secondary"
                  disabled={contactMutation.isPending}
                >
                  <Send className="w-4 h-4 mr-2" />
                  {contactMutation.isPending ? "Sending Message..." : "Send Message"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-6">
            {contactInfo.map((info, index) => (
              <Card key={index} className="shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className={`${info.color} p-3 bg-gray-100 rounded-lg`}>
                      {info.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{info.title}</h3>
                      {info.details.map((detail, idx) => (
                        <p key={idx} className="text-neutral text-sm mb-1">{detail}</p>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Inquiry Types */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary mb-4">Types of Inquiries</h2>
            <p className="text-lg text-neutral">
              Choose the right department for faster response times
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {enquiryTypes.map((type, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="text-4xl mb-4">{type.icon}</div>
                  <h3 className="text-lg font-bold text-primary mb-3">{type.title}</h3>
                  <p className="text-neutral text-sm mb-4">{type.description}</p>
                  <a 
                    href={`mailto:${type.contact}`}
                    className="text-secondary hover:text-primary text-sm font-medium"
                  >
                    {type.contact}
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Frequently Asked Questions */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary mb-4">Quick Answers</h2>
            <p className="text-lg text-neutral">
              Find immediate answers to common questions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {faqs.map((faq, index) => (
              <Card key={index} className="shadow-lg">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-primary mb-3">{faq.question}</h3>
                  <p className="text-neutral">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Location Map */}
        <section>
          <Card className="overflow-hidden">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-primary text-center">
                Visit Our Manufacturing Facility
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div 
                className="h-96 bg-gray-300 relative"
                style={{
                  backgroundImage: "linear-gradient(to top, rgba(0,0,0,0.3), rgba(0,0,0,0)), url('https://images.unsplash.com/photo-1605640840605-14ac1855827b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=400')",
                  backgroundSize: "cover",
                  backgroundPosition: "center"
                }}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <Card className="bg-white bg-opacity-95 shadow-lg">
                    <CardContent className="p-6 text-center">
                      <MapPin className="w-8 h-8 text-primary mx-auto mb-3" />
                      <h3 className="text-lg font-bold text-primary mb-2">JK Trout Feed Manufacturing</h3>
                      <p className="text-neutral text-sm">
                        16C Industrial Area, Lassipora<br />
                        Pulwama, Kashmir 192301<br />
                        Jammu & Kashmir, India
                      </p>
                      <Button className="mt-4 bg-primary text-white">
                        Get Directions
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>

      <Footer />
    </div>
  );
}