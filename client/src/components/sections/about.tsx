import { Card, CardContent } from "@/components/ui/card";

export default function About() {
  return (
    <section id="about" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">About JK Trout Feed</h2>
            <p className="text-lg text-neutral mb-6">
              We at "JK Trout Feed" operate one of the most advanced Manufacturing Facilities to produce premium Trout Feed. Our facility is strategically located at Lassipora inside the SIDCO Estate, Jammu & Kashmir.
            </p>
            <p className="text-neutral mb-6">
              Our feed ranges are meticulously designed to meet the comprehensive nutritional requirements of farmed fish during each critical stage of their life cycle. We maintain an unwavering commitment to supply our customers with products formulated using superior quality raw materials.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <Card className="shadow-md">
                <CardContent className="p-4">
                  <div className="flex items-center mb-2">
                    <svg className="w-8 h-8 text-primary mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                  </div>
                  <h4 className="font-semibold">Premium Quality</h4>
                  <p className="text-sm text-neutral">High protein levels & balanced amino acids</p>
                </CardContent>
              </Card>
              <Card className="shadow-md">
                <CardContent className="p-4">
                  <div className="flex items-center mb-2">
                    <svg className="w-8 h-8 text-secondary mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h4 className="font-semibold">Scientific Approach</h4>
                  <p className="text-sm text-neutral">Tested formulations with proven results</p>
                </CardContent>
              </Card>
            </div>
          </div>
          <div className="space-y-4">
            <img 
              src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=800" 
              alt="Advanced fish feed manufacturing facility" 
              className="rounded-xl shadow-lg w-full h-auto"
            />
            <img 
              src="https://images.unsplash.com/photo-1544943910-4c1dc44aab44?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400" 
              alt="Professional trout farming facility with organized pools" 
              className="rounded-xl shadow-lg w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
