import { useEffect } from "react";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

export default function AboutPage() {
  useEffect(() => {
    document.title = "About Us - JK Trout Feed | Advanced Manufacturing Facility in Kashmir";
  }, []);

  const milestones = [
    { year: "2018", event: "Company Established", description: "Founded with a vision to revolutionize aquaculture feeding in Kashmir" },
    { year: "2020", event: "Facility Expansion", description: "Upgraded to state-of-the-art manufacturing equipment" },
    { year: "2022", event: "Quality Certification", description: "Achieved international quality standards and certifications" },
    { year: "2024", event: "Market Leadership", description: "Became the leading trout feed supplier in the region" }
  ];

  const capabilities = [
    { name: "Production Capacity", value: 95, unit: "tons/month" },
    { name: "Quality Control", value: 99, unit: "% accuracy" },
    { name: "Feed Conversion Ratio", value: 88, unit: "% efficiency" },
    { name: "Customer Satisfaction", value: 97, unit: "% rating" }
  ];

  const certifications = [
    "ISO 22000:2018 Food Safety Management",
    "HACCP Certified Manufacturing",
    "BIS (Bureau of Indian Standards)",
    "Aquaculture Feed Quality Assurance",
    "Environmental Management ISO 14001",
    "Kashmir State Pollution Control Board"
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 page-enter">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary to-secondary text-white py-20 fade-in">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 scale-in">About JK Trout Feed</h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Pioneering aquaculture nutrition with advanced manufacturing excellence in the heart of Kashmir
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-3xl font-bold text-primary mb-6">Our Story</h2>
            <p className="text-lg text-neutral mb-6">
              JK Trout Feed was established with a singular mission: to provide the highest quality aquaculture feed solutions 
              that support sustainable fish farming practices in the pristine waters of Jammu & Kashmir.
            </p>
            <p className="text-neutral mb-6">
              Our state-of-the-art manufacturing facility, located in the SIDCO Estate at Lassipora, represents the 
              culmination of years of research and development in aquaculture nutrition. We combine traditional 
              knowledge with modern technology to create feed formulations that consistently deliver superior results.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-primary">50+</div>
                  <div className="text-sm text-neutral">Happy Customers</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-secondary">1000+</div>
                  <div className="text-sm text-neutral">Tons Produced</div>
                </CardContent>
              </Card>
            </div>
          </div>
          <div>
            <img 
              src="https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
              alt="Modern fish feed manufacturing facility"
              className="rounded-xl shadow-lg w-full h-auto"
            />
          </div>
        </div>

        {/* Company Timeline */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-primary mb-8 text-center">Our Journey</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {milestones.map((milestone, index) => (
              <Card key={index} className="relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary"></div>
                <CardHeader>
                  <Badge variant="secondary" className="w-fit">{milestone.year}</Badge>
                  <CardTitle className="text-lg">{milestone.event}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-neutral">{milestone.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Capabilities */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-primary mb-8 text-center">Our Capabilities</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {capabilities.map((capability, index) => (
              <Card key={index} className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold text-lg">{capability.name}</h3>
                  <span className="text-2xl font-bold text-primary">{capability.value}%</span>
                </div>
                <Progress value={capability.value} className="mb-2" />
                <p className="text-sm text-neutral">{capability.unit}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100">
              <CardHeader>
                <CardTitle className="text-2xl text-primary">Our Mission</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-neutral">
                  To advance sustainable aquaculture through innovative, high-quality feed solutions that maximize 
                  fish health, growth performance, and environmental responsibility while supporting the economic 
                  prosperity of fish farmers in Kashmir and beyond.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-green-50 to-green-100">
              <CardHeader>
                <CardTitle className="text-2xl text-secondary">Our Vision</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-neutral">
                  To be the leading aquaculture nutrition company in South Asia, recognized for our commitment to 
                  quality, innovation, and sustainable practices that contribute to a healthier planet and prosperous 
                  fishing communities.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Certifications */}
        <section>
          <h2 className="text-3xl font-bold text-primary mb-8 text-center">Quality Certifications</h2>
          <Card>
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {certifications.map((cert, index) => (
                  <div key={index} className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                    <div className="w-3 h-3 bg-secondary rounded-full"></div>
                    <span className="text-sm font-medium">{cert}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>
      </div>

      <Footer />
    </div>
  );
}