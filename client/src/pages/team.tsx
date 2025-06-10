import { useEffect } from "react";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import TeamCard from "@/components/ui/team-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mail, Phone, MapPin, Award } from "lucide-react";

export default function TeamPage() {
  useEffect(() => {
    document.title = "Expert Team - JK Trout Feed | Manufacturing & Technical Specialists";
  }, []);

  const teamMembers = [
    {
      name: "Muneer Ahmed",
      position: "Manufacturing Director",
      email: "muneer@jktroutfeed.com",
      phone: "+91 9419 XXX XXX",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
      bgColor: "from-blue-50 to-blue-100",
      color: "text-primary",
      experience: "15+ years",
      specialization: "Manufacturing Operations & Quality Control",
      education: "M.Tech in Food Technology, NIT Srinagar",
      achievements: ["ISO 22000 Implementation Lead", "Kashmir Industrial Excellence Award 2023", "Published researcher in aquaculture nutrition"]
    },
    {
      name: "Tanveer Chishti",
      position: "Technical Specialist",
      email: "tanveer@jktroutfeed.com", 
      phone: "+91 9419 XXX XXX",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
      bgColor: "from-green-50 to-green-100",
      color: "text-secondary",
      experience: "12+ years",
      specialization: "Feed Formulation & Nutritional Research",
      education: "Ph.D in Aquaculture Nutrition, CIFE Mumbai",
      achievements: ["Feed Conversion Optimization Expert", "International Aquaculture Conference Speaker", "30+ research publications"]
    },
    {
      name: "Zahoor Wani",
      position: "Operations Manager",
      email: "wani@jktroutfeed.com",
      phone: "+91 9419 XXX XXX", 
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
      bgColor: "from-teal-50 to-teal-100",
      color: "text-accent",
      experience: "10+ years",
      specialization: "Supply Chain & Customer Relations",
      education: "MBA in Operations Management, Kashmir University",
      achievements: ["99.8% On-time Delivery Record", "Customer Satisfaction Excellence Award", "Lean Manufacturing Certified"]
    }
  ];

  const departments = [
    {
      name: "Research & Development",
      head: "Dr. Tanveer Chishti",
      members: 4,
      focus: "Feed formulation, nutritional research, product testing",
      icon: "🔬"
    },
    {
      name: "Manufacturing & Quality",
      head: "Muneer Ahmed",
      members: 8,
      focus: "Production operations, quality control, safety compliance",
      icon: "⚙️"
    },
    {
      name: "Operations & Logistics",
      head: "Zahoor Wani", 
      members: 5,
      focus: "Supply chain, customer service, distribution",
      icon: "📦"
    },
    {
      name: "Technical Support",
      head: "Field Team",
      members: 3,
      focus: "Customer consultation, feeding guidance, troubleshooting",
      icon: "🎯"
    }
  ];

  const companyValues = [
    {
      title: "Innovation",
      description: "Continuously advancing aquaculture nutrition through research and technology",
      icon: "💡"
    },
    {
      title: "Quality Excellence",
      description: "Uncompromising commitment to product quality and safety standards",
      icon: "⭐"
    },
    {
      title: "Sustainability",
      description: "Promoting environmentally responsible aquaculture practices",
      icon: "🌱"
    },
    {
      title: "Customer Success",
      description: "Dedicated to supporting our customers' growth and profitability",
      icon: "🤝"
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
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Expert Team</h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Meet the dedicated professionals driving innovation in aquaculture nutrition
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Leadership Team */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary mb-4">Leadership Team</h2>
            <p className="text-lg text-neutral max-w-3xl mx-auto">
              Our leadership combines deep technical expertise with practical industry experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {teamMembers.map((member, index) => (
              <TeamCard key={index} {...member} />
            ))}
          </div>

          {/* Detailed Team Profiles */}
          <div className="space-y-6">
            {teamMembers.map((member, index) => (
              <Card key={index} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="grid grid-cols-1 lg:grid-cols-4 gap-0">
                    <div className={`bg-gradient-to-br ${member.bgColor} p-6 flex flex-col items-center justify-center`}>
                      <img 
                        src={member.image}
                        alt={member.name}
                        className="w-24 h-24 rounded-full object-cover mb-4"
                      />
                      <h3 className={`text-xl font-bold ${member.color}`}>{member.name}</h3>
                      <p className="text-neutral text-center">{member.position}</p>
                    </div>
                    <div className="lg:col-span-3 p-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold mb-2 flex items-center">
                            <Award className="w-4 h-4 mr-2 text-primary" />
                            Experience & Education
                          </h4>
                          <p className="text-sm text-neutral mb-2">
                            <strong>Experience:</strong> {member.experience}
                          </p>
                          <p className="text-sm text-neutral mb-2">
                            <strong>Education:</strong> {member.education}
                          </p>
                          <p className="text-sm text-neutral">
                            <strong>Specialization:</strong> {member.specialization}
                          </p>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">Key Achievements</h4>
                          <ul className="space-y-1">
                            {member.achievements.map((achievement, idx) => (
                              <li key={idx} className="text-sm text-neutral flex items-start">
                                <div className="w-2 h-2 bg-secondary rounded-full mr-2 mt-2 flex-shrink-0"></div>
                                {achievement}
                              </li>
                            ))}
                          </ul>
                          <div className="mt-4 flex space-x-4">
                            <a href={`mailto:${member.email}`} className="text-primary hover:text-secondary">
                              <Mail className="w-5 h-5" />
                            </a>
                            <a href={`tel:${member.phone}`} className="text-primary hover:text-secondary">
                              <Phone className="w-5 h-5" />
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Departments */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary mb-4">Our Departments</h2>
            <p className="text-lg text-neutral">
              Specialized teams working together to deliver excellence
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {departments.map((dept, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center">
                      <span className="text-2xl mr-3">{dept.icon}</span>
                      {dept.name}
                    </CardTitle>
                    <Badge variant="secondary">{dept.members} members</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-neutral mb-3">{dept.focus}</p>
                  <p className="text-sm text-primary font-medium">
                    Department Head: {dept.head}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Company Values */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary mb-4">Our Values</h2>
            <p className="text-lg text-neutral">
              The principles that guide our work and relationships
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {companyValues.map((value, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="text-4xl mb-4">{value.icon}</div>
                  <h3 className="text-xl font-bold text-primary mb-3">{value.title}</h3>
                  <p className="text-neutral text-sm">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Contact Information */}
        <section>
          <Card className="bg-gradient-to-r from-primary to-secondary text-white">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-4">Connect With Our Team</h3>
                <p className="text-blue-200">
                  Ready to discuss your aquaculture needs? Our experts are here to help.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <Mail className="w-8 h-8 mx-auto mb-3" />
                  <h4 className="font-semibold mb-2">General Inquiries</h4>
                  <p className="text-blue-200">sales@jktroutfeed.com</p>
                </div>
                <div className="text-center">
                  <Phone className="w-8 h-8 mx-auto mb-3" />
                  <h4 className="font-semibold mb-2">Technical Support</h4>
                  <p className="text-blue-200">+91 9419 XXX XXX</p>
                </div>
                <div className="text-center">
                  <MapPin className="w-8 h-8 mx-auto mb-3" />
                  <h4 className="font-semibold mb-2">Visit Our Facility</h4>
                  <p className="text-blue-200">Lassipora, Pulwama, Kashmir</p>
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