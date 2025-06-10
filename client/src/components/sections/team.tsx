import TeamCard from "@/components/ui/team-card";

export default function Team() {
  const teamMembers = [
    {
      name: "Muneer Ahmed",
      position: "Manufacturing Director",
      email: "muneer@jktroutfeed.com",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
      bgColor: "from-blue-50 to-blue-100",
      color: "text-primary"
    },
    {
      name: "Tanveer Chishti",
      position: "Technical Specialist",
      email: "tanveer@jktroutfeed.com",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
      bgColor: "from-green-50 to-green-100",
      color: "text-secondary"
    },
    {
      name: "Zahoor Wani",
      position: "Operations Manager",
      email: "wani@jktroutfeed.com",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
      bgColor: "from-teal-50 to-teal-100",
      color: "text-accent"
    }
  ];

  return (
    <section id="team" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Our Expert Team</h2>
          <p className="text-lg text-neutral max-w-3xl mx-auto">
            Meet our dedicated professionals who ensure the highest quality standards in trout feed manufacturing.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <TeamCard key={index} {...member} />
          ))}
        </div>
      </div>
    </section>
  );
}
