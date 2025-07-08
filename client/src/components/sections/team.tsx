import TeamCard from "@/components/ui/team-card";
import muneer from "@/images/muneer.jpg"
import tanveer from "@/images/tanveer.jpg";
import zahoor from "@/images/zahoor.jpg";

export default function Team() {
  const teamMembers = [
    {
      name: "Muneer Ahmed",
      position: "Manufacturing Director",
      email: "macchist@gmail.com",
      image: muneer,
      bgColor: "from-blue-50 to-blue-100",
      color: "text-primary"
    },
    {
      name: "Tanveer Chishti",
      position: "Technical Specialist",
      email: "tanveer.dri@gmail.com",
      phone: "+91 9103766738",
      image: tanveer,
      bgColor: "from-green-50 to-green-100",
      color: "text-secondary"
    },
    {
      name: "Zahoor Wani",
      position: "Operations Manager",
      email: "wzahoor360@gmail.com",
      phone: "+91 7889828265",
      image: zahoor,
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
