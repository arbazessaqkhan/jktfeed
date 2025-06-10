import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function FeedingGuide() {
  const feedingData = [
    {
      stage: "Fry",
      size: "0.3–1.0",
      type: "Crumble",
      feedSize: "0.3–0.7",
      rate: "5%",
      frequency: "10"
    },
    {
      stage: "Fingerling",
      size: "1.0–25.0",
      type: "Pellet",
      feedSize: "0.7–2.0",
      rate: "3%",
      frequency: "4"
    },
    {
      stage: "Grower",
      size: "25–1500",
      type: "Pellet",
      feedSize: "2.0–4.5",
      rate: "2%",
      frequency: "2"
    },
    {
      stage: "Broodstock",
      size: ">1500",
      type: "Pellet",
      feedSize: "5",
      rate: "1.5%",
      frequency: "2"
    }
  ];

  const bestPractices = [
    {
      title: "Feeding Time",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      description: "Feed first thing in the morning when the water temperature is coolest for optimal digestion and feed conversion.",
      color: "text-primary"
    },
    {
      title: "Distribution Method",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3" />
        </svg>
      ),
      description: "Feeding may be done by hand or with a mechanical distribution system. Distribute feed throughout the pond as homogeneously as possible.",
      color: "text-secondary"
    },
    {
      title: "Nutritional Requirements",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      description: "Fry and fingerling trout require higher protein and energy content: Small fish: ~50% protein, 15-20% fat. Larger fish: 38-45% protein, 10-18% fat.",
      color: "text-accent"
    }
  ];

  return (
    <section id="feeding-guide" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Professional Feeding Guide</h2>
          <p className="text-lg text-neutral max-w-3xl mx-auto">
            Scientific feeding recommendations based on fish size, growth stage, and optimal nutritional requirements.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Feeding Guide Table */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-primary">Feeding Schedule & Rates</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-primary hover:bg-primary">
                      <TableHead className="text-white text-sm font-semibold">Life Stage</TableHead>
                      <TableHead className="text-white text-sm font-semibold">Fish Size (g)</TableHead>
                      <TableHead className="text-white text-sm font-semibold">Feed Type</TableHead>
                      <TableHead className="text-white text-sm font-semibold">Feed Size (mm)</TableHead>
                      <TableHead className="text-white text-sm font-semibold">Feeding Rate (%)</TableHead>
                      <TableHead className="text-white text-sm font-semibold">Frequency/Day</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {feedingData.map((row, index) => (
                      <TableRow key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-25"}>
                        <TableCell className="font-medium">{row.stage}</TableCell>
                        <TableCell>{row.size}</TableCell>
                        <TableCell>{row.type}</TableCell>
                        <TableCell>{row.feedSize}</TableCell>
                        <TableCell className="font-semibold text-primary">{row.rate}</TableCell>
                        <TableCell className="font-semibold text-primary">{row.frequency}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {/* Feeding Best Practices */}
          <div className="space-y-6">
            {bestPractices.map((practice, index) => (
              <Card key={index} className="shadow-lg">
                <CardContent className="p-6">
                  <h4 className={`text-xl font-bold ${practice.color} mb-4 flex items-center`}>
                    <span className="mr-2">{practice.icon}</span>
                    {practice.title}
                  </h4>
                  <p className="text-neutral">{practice.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
