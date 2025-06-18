import { useEffect, useState } from "react";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import ProductCard from "@/components/ui/product-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calculator, Download, FileText } from "lucide-react";

export default function ProductsPage() {
  const [feedingCalculator, setFeedingCalculator] = useState({
    fishCount: "",
    averageWeight: "",
    lifeStage: "fingerling",
    waterTemp: ""
  });

  useEffect(() => {
    document.title = "Premium Trout Feed Products - JK Trout Feed | Early, Small & Stock Stage";
  }, []);

  const products = [
    {
      stage: "Early Stage",
      number: "01",
      description: "Optimal nutrition for fry and young fingerlings (0.3-25g)",
      protein: "45%",
      size: "0.5mm",
      energy: "15 KJ/GM",
      bgColor: "from-blue-50 to-blue-100",
      iconColor: "bg-primary",
      features: ["High digestibility", "Enhanced immunity", "Rapid growth support", "Stress resistance"]
    },
    {
      stage: "Small Stage", 
      number: "02",
      description: "Balanced nutrition for growing fingerlings (25-200g)",
      protein: "48%",
      size: "1.5mm",
      energy: "14 KJ/GM",
      bgColor: "from-green-50 to-green-100",
      iconColor: "bg-secondary",
      features: ["Optimal growth rate", "Improved FCR", "Disease prevention", "Muscle development"]
    },
    {
      stage: "Stock Stage",
      number: "03", 
      description: "Premium nutrition for mature stock fish (200g+)",
      protein: "52%",
      size: "3.0mm",
      energy: "13 KJ/GM",
      bgColor: "from-teal-50 to-teal-100",
      iconColor: "bg-accent",
      features: ["Market-ready quality", "Enhanced coloration", "Reproductive health", "Premium texture"]
    }
  ];

  const specifications = [
    { composition: "Crude Protein", early: "45%", small: "48%", stock: "52%" },
    { composition: "Crude Fat", early: "15-18%", small: "12-15%", stock: "10-12%" },
    { composition: "Crude Fiber", early: "3% max", small: "3% max", stock: "3% max" },
    { composition: "Ash Content", early: "10% max", small: "11% max", stock: "12% max" },
    { composition: "Moisture", early: "8% max", small: "8% max", stock: "8% max" },
    { composition: "Phosphorus", early: "1.2%", small: "1.0%", stock: "0.9%" },
    { composition: "Calcium", early: "2.0%", small: "1.8%", stock: "1.5%" },
    { composition: "Energy", early: "15 KJ/GM", small: "14 KJ/GM", stock: "13 KJ/GM" },
    { composition: "Pellet Size", early: "0.5mm", small: "1.5mm", stock: "3.0mm" }
  ];

  const calculateFeeding = () => {
    const count = parseInt(feedingCalculator.fishCount);
    const weight = parseFloat(feedingCalculator.averageWeight);
    
    if (!count || !weight) return null;

    const totalBiomass = count * weight;
    let feedingRate = 0;

    switch (feedingCalculator.lifeStage) {
      case "fry": feedingRate = 0.05; break;
      case "fingerling": feedingRate = 0.03; break;
      case "grower": feedingRate = 0.02; break;
      case "broodstock": feedingRate = 0.015; break;
    }

    const dailyFeed = totalBiomass * feedingRate;
    return {
      totalBiomass: totalBiomass.toFixed(1),
      dailyFeed: dailyFeed.toFixed(1),
      monthlyFeed: (dailyFeed * 30).toFixed(1)
    };
  };

  const feedingResult = calculateFeeding();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 page-enter">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary to-secondary text-white py-20 fade-in">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 scale-in text-glow">Premium Trout Feed Products</h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Scientifically formulated nutrition for every stage of trout development
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-white text-primary hover:bg-gray-100">
                <Download className="w-4 h-4 mr-2" />
                Download Brochure
              </Button>
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
                <FileText className="w-4 h-4 mr-2" />
                Technical Specs
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Product Overview */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Our Product Range</h2>
            <p className="text-lg text-neutral max-w-3xl mx-auto">
              Three specialized feed formulations designed to optimize growth, health, and feed conversion 
              at every stage of trout development.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {products.map((product, index) => (
              <div key={index}>
                <ProductCard {...product} />
                <Card className="mt-4">
                  <CardHeader>
                    <CardTitle className="text-lg">Key Features</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {product.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-sm">
                          <div className="w-2 h-2 bg-secondary rounded-full mr-2"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </section>

        {/* Detailed Specifications */}
        <section className="mb-16">
          <Card className="shadow-lg">
            <CardHeader className="bg-gray-50">
              <CardTitle className="text-2xl font-bold text-primary text-center">
                Complete Nutritional Analysis
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-primary hover:bg-primary">
                      <TableHead className="text-white font-semibold">Nutritional Component</TableHead>
                      <TableHead className="text-white font-semibold text-center">Early Stage</TableHead>
                      <TableHead className="text-white font-semibold text-center">Small Stage</TableHead>
                      <TableHead className="text-white font-semibold text-center">Stock Stage</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {specifications.map((spec, index) => (
                      <TableRow key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-25"}>
                        <TableCell className="font-medium text-gray-900">{spec.composition}</TableCell>
                        <TableCell className="text-center text-primary font-semibold">{spec.early}</TableCell>
                        <TableCell className="text-center text-secondary font-semibold">{spec.small}</TableCell>
                        <TableCell className="text-center text-accent font-semibold">{spec.stock}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Feeding Calculator */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary mb-4">
              <Calculator className="inline w-8 h-8 mr-2" />
              Feeding Calculator
            </h2>
            <p className="text-lg text-neutral">
              Calculate optimal daily feed requirements for your trout stock
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Calculate Feed Requirements</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="fishCount">Number of Fish</Label>
                    <Input
                      id="fishCount"
                      type="number"
                      value={feedingCalculator.fishCount}
                      onChange={(e) => setFeedingCalculator({...feedingCalculator, fishCount: e.target.value})}
                      placeholder="e.g., 1000"
                    />
                  </div>
                  <div>
                    <Label htmlFor="averageWeight">Average Weight (g)</Label>
                    <Input
                      id="averageWeight"
                      type="number"
                      value={feedingCalculator.averageWeight}
                      onChange={(e) => setFeedingCalculator({...feedingCalculator, averageWeight: e.target.value})}
                      placeholder="e.g., 50"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="lifeStage">Life Stage</Label>
                  <select 
                    id="lifeStage"
                    className="w-full p-2 border rounded-md"
                    value={feedingCalculator.lifeStage}
                    onChange={(e) => setFeedingCalculator({...feedingCalculator, lifeStage: e.target.value})}
                  >
                    <option value="fry">Fry (0.3-1g)</option>
                    <option value="fingerling">Fingerling (1-25g)</option>
                    <option value="grower">Grower (25-1500g)</option>
                    <option value="broodstock">Broodstock (&gt;1500g)</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="waterTemp">Water Temperature (°C)</Label>
                  <Input
                    id="waterTemp"
                    type="number"
                    value={feedingCalculator.waterTemp}
                    onChange={(e) => setFeedingCalculator({...feedingCalculator, waterTemp: e.target.value})}
                    placeholder="e.g., 15"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Feeding Recommendations</CardTitle>
              </CardHeader>
              <CardContent>
                {feedingResult ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <div className="text-2xl font-bold text-primary">{feedingResult.totalBiomass} kg</div>
                        <div className="text-sm text-neutral">Total Biomass</div>
                      </div>
                      <div className="bg-green-50 p-4 rounded-lg">
                        <div className="text-2xl font-bold text-secondary">{feedingResult.dailyFeed} kg</div>
                        <div className="text-sm text-neutral">Daily Feed</div>
                      </div>
                    </div>
                    <div className="bg-teal-50 p-4 rounded-lg">
                      <div className="text-2xl font-bold text-accent">{feedingResult.monthlyFeed} kg</div>
                      <div className="text-sm text-neutral">Monthly Feed Requirement</div>
                    </div>
                    <div className="mt-4 p-4 bg-yellow-50 rounded-lg">
                      <h4 className="font-semibold mb-2">Recommended Product:</h4>
                      <p className="text-sm">
                        {feedingCalculator.lifeStage === "fry" && "Early Stage Feed (0.5mm)"}
                        {feedingCalculator.lifeStage === "fingerling" && "Small Stage Feed (1.5mm)"}
                        {(feedingCalculator.lifeStage === "grower" || feedingCalculator.lifeStage === "broodstock") && "Stock Stage Feed (3.0mm)"}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center text-neutral py-8">
                    <Calculator className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Enter fish count and average weight to calculate feeding requirements</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Quality Assurance */}
        <section>
          <Card className="bg-gradient-to-r from-primary to-secondary text-white">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">Quality Assurance Promise</h3>
              <p className="text-lg mb-6">
                Every batch undergoes rigorous testing for nutritional content, digestibility, and safety standards
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <div className="text-3xl font-bold">99.9%</div>
                  <div className="text-blue-200">Quality Consistency</div>
                </div>
                <div>
                  <div className="text-3xl font-bold">1.2:1</div>
                  <div className="text-blue-200">Average FCR</div>
                </div>
                <div>
                  <div className="text-3xl font-bold">&lt;2%</div>
                  <div className="text-blue-200">Mortality Rate</div>
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