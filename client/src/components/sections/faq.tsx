import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronDown } from "lucide-react";
import jkBankLogo from "@assets/1657774001103_1750248099539.png";

export default function FAQ() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      question: "What antioxidants are used in pelleted feed?",
      answer: "Commonly used antioxidants included in our feeds are BHA (Butylated hydroxyanisole) at 200 ppm, BHT (Butylated hydroxytoluene) at 200 ppm, or Ethoxyquin (1,2 dihydro-6-ethoxy-2,2,4-trimethyl quinoline) at 150 ppm. These antioxidants help preserve the nutritional quality and prevent rancidity."
    },
    {
      question: "What yields are possible with fertilizers vs supplemental feeds?",
      answer: "While fertilizers can support natural food production in ponds, supplemental feeds provide significantly higher yields and more predictable results. Our premium feeds ensure optimal growth rates, better feed conversion efficiency, and higher overall production yields compared to fertilizer-only approaches."
    },
    {
      question: "What do amino acids do for fish?",
      answer: "Amino acids are the building blocks of proteins essential for fish growth, muscle development, and immune function. Our feeds contain balanced amino acid profiles that support optimal protein synthesis, enhance growth rates, improve feed conversion efficiency, and strengthen disease resistance in trout."
    },
    {
      question: "How to calculate optimum level of feed for fish?",
      answer: "The optimum feeding level depends on fish size, water temperature, and growth stage. Use our feeding guide table above as a reference. Generally, calculate daily feed as a percentage of total fish biomass: multiply total fish weight by the recommended percentage for their life stage. Monitor growth rates and adjust accordingly."
    },
    {
      question: "How can I prevent fish disease?",
      answer: "Prevention starts with proper nutrition using high-quality feeds like ours, maintaining optimal water quality, appropriate stocking densities, and regular health monitoring. Our feeds include immune-boosting nutrients and are formulated to reduce stress factors that can lead to disease susceptibility."
    }
  ];

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <>
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-neutral">Expert answers to common questions about trout feeding and aquaculture practices.</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <Card key={index} className="shadow-lg overflow-hidden">
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-8 py-6 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                >
                  <span className="text-lg font-semibold text-primary">{faq.question}</span>
                  <ChevronDown 
                    className={`transform transition-transform ${openFaq === index ? 'rotate-180' : ''}`}
                  />
                </button>
                {openFaq === index && (
                  <CardContent className="px-8 pb-6">
                    <p className="text-neutral">{faq.answer}</p>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Banking Partners Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Our Banking Partners</h2>
            <p className="text-lg text-neutral">Trusted financial partnerships supporting our business operations.</p>
          </div>

          <div className="bg-gray-50 rounded-xl p-8 border border-gray-200">
            <div className="flex flex-col md:flex-row items-center justify-center space-y-6 md:space-y-0 md:space-x-8">
              {/* Bank Logo */}
              <div className="flex-shrink-0">
                <img 
                  src={jkBankLogo} 
                  alt="J&K Bank" 
                  className="h-16 w-auto"
                />
              </div>
              
              {/* Bank Details */}
              <div className="text-center md:text-left">
                <h3 className="text-xl font-bold text-primary mb-2">J&K Bank</h3>
                <div className="text-neutral space-y-1">
                  <p>Poloview, Srinagar</p>
                  <p>Kashmir, 190001</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
