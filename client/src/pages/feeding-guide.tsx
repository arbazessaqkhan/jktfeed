import { useEffect, useState } from "react";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Calculator, Download, AlertTriangle, CheckCircle, Info } from "lucide-react";

export default function FeedingGuidePage() {
  const [calculator, setCalculator] = useState({
    fishCount: "",
    averageWeight: "",
    lifeStage: "fingerling",
    waterTemp: "",
    pondSize: "",
    stockingDensity: ""
  });

  useEffect(() => {
    document.title = "Professional Feeding Guide - JK Trout Feed | Optimal Nutrition Standards";
  }, []);

  const feedingData = [
    {
      stage: "Fry",
      size: "0.3–1.0",
      type: "Crumble",
      feedSize: "0.3–0.7",
      rate: "5%",
      frequency: "10",
      protein: "50%",
      fat: "15-20%"
    },
    {
      stage: "Fingerling",
      size: "1.0–25.0",
      type: "Pellet",
      feedSize: "0.7–2.0",
      rate: "3%",
      frequency: "4",
      protein: "48%",
      fat: "12-15%"
    },
    {
      stage: "Grower",
      size: "25–1500",
      type: "Pellet",
      feedSize: "2.0–4.5",
      rate: "2%",
      frequency: "2",
      protein: "45%",
      fat: "10-12%"
    },
    {
      stage: "Broodstock",
      size: ">1500",
      type: "Pellet",
      feedSize: "5",
      rate: "1.5%",
      frequency: "2",
      protein: "42%",
      fat: "12-15%"
    }
  ];

  const bestPractices = [
    {
      title: "Optimal Feeding Time",
      icon: <CheckCircle className="w-6 h-6" />,
      description: "Feed first thing in the morning when water temperature is coolest. This ensures better digestion and optimal feed conversion rates.",
      tips: ["Start feeding at dawn", "Monitor water temperature", "Avoid feeding during peak heat"],
      color: "text-primary"
    },
    {
      title: "Distribution Methods",
      icon: <Info className="w-6 h-6" />,
      description: "Use mechanical distributors for large operations or hand feeding for smaller ponds. Ensure even distribution across the entire pond area.",
      tips: ["Use feeding boats for large ponds", "Distribute evenly", "Monitor feeding response"],
      color: "text-secondary"
    },
    {
      title: "Water Quality Management",
      icon: <AlertTriangle className="w-6 h-6" />,
      description: "Maintain optimal water quality parameters including dissolved oxygen, pH, and temperature for maximum feed efficiency.",
      tips: ["Monitor dissolved oxygen daily", "Maintain pH 6.5-8.5", "Check ammonia levels"],
      color: "text-accent"
    }
  ];

  const environmentalFactors = [
    {
      factor: "Water Temperature",
      optimal: "12-18°C",
      impact: "Directly affects metabolism and feed conversion",
      adjustment: "Reduce feeding by 50% below 8°C or above 22°C"
    },
    {
      factor: "Dissolved Oxygen",
      optimal: ">6 mg/L",
      impact: "Essential for digestion and growth",
      adjustment: "Stop feeding if DO drops below 5 mg/L"
    },
    {
      factor: "pH Level",
      optimal: "6.5-8.5",
      impact: "Affects nutrient absorption",
      adjustment: "Monitor daily, adjust gradually if needed"
    },
    {
      factor: "Stocking Density",
      optimal: "15-25 kg/m³",
      impact: "Influences feeding behavior and growth",
      adjustment: "Reduce density if poor growth observed"
    }
  ];

  const calculateAdvancedFeeding = () => {
    const count = parseInt(calculator.fishCount);
    const weight = parseFloat(calculator.averageWeight);
    const temp = parseFloat(calculator.waterTemp);
    const pondSize = parseFloat(calculator.pondSize);
    
    if (!count || !weight) return null;

    const totalBiomass = count * weight;
    let baseFeedingRate = 0;

    switch (calculator.lifeStage) {
      case "fry": baseFeedingRate = 0.05; break;
      case "fingerling": baseFeedingRate = 0.03; break;
      case "grower": baseFeedingRate = 0.02; break;
      case "broodstock": baseFeedingRate = 0.015; break;
    }

    // Temperature adjustment
    let tempAdjustment = 1;
    if (temp) {
      if (temp < 8) tempAdjustment = 0.5;
      else if (temp < 12) tempAdjustment = 0.7;
      else if (temp > 22) tempAdjustment = 0.6;
      else if (temp > 18) tempAdjustment = 0.9;
    }

    const adjustedRate = baseFeedingRate * tempAdjustment;
    const dailyFeed = totalBiomass * adjustedRate;
    
    let stockingDensity = 0;
    if (pondSize) {
      stockingDensity = totalBiomass / (pondSize * 1000); // kg per m³
    }

    return {
      totalBiomass: totalBiomass.toFixed(1),
      dailyFeed: dailyFeed.toFixed(1),
      weeklyFeed: (dailyFeed * 7).toFixed(1),
      monthlyFeed: (dailyFeed * 30).toFixed(1),
      feedingRate: (adjustedRate * 100).toFixed(1),
      stockingDensity: stockingDensity.toFixed(1),
      tempAdjustment: tempAdjustment,
      recommendations: generateRecommendations(stockingDensity, temp, calculator.lifeStage)
    };
  };

  const generateRecommendations = (density: number, temp: number, stage: string) => {
    const recommendations = [];
    
    if (density > 25) {
      recommendations.push({ type: "warning", text: "High stocking density detected. Consider reducing stock or increasing pond size." });
    } else if (density < 10) {
      recommendations.push({ type: "info", text: "Low stocking density allows for optimal growth conditions." });
    }
    
    if (temp && temp < 12) {
      recommendations.push({ type: "warning", text: "Low water temperature. Reduce feeding frequency and monitor fish closely." });
    } else if (temp && temp > 20) {
      recommendations.push({ type: "warning", text: "High water temperature. Ensure adequate aeration and reduce feeding if necessary." });
    }
    
    if (stage === "fry") {
      recommendations.push({ type: "info", text: "Fry stage requires frequent feeding. Monitor growth daily and adjust portions accordingly." });
    }
    
    return recommendations;
  };

  const feedingResult = calculateAdvancedFeeding();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary to-secondary text-white py-20">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Professional Feeding Guide</h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Science-based feeding protocols for optimal trout growth and health
            </p>
            <Button className="bg-white text-primary hover:bg-gray-100">
              <Download className="w-4 h-4 mr-2" />
              Download Complete Guide
            </Button>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Advanced Feeding Calculator */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary mb-4">
              <Calculator className="inline w-8 h-8 mr-2" />
              Advanced Feeding Calculator
            </h2>
            <p className="text-lg text-neutral">
              Calculate precise feeding requirements with environmental factor adjustments
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Input Parameters</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="fishCount">Number of Fish</Label>
                    <Input
                      id="fishCount"
                      type="number"
                      value={calculator.fishCount}
                      onChange={(e) => setCalculator({...calculator, fishCount: e.target.value})}
                      placeholder="e.g., 5000"
                    />
                  </div>
                  <div>
                    <Label htmlFor="averageWeight">Average Weight (g)</Label>
                    <Input
                      id="averageWeight"
                      type="number"
                      value={calculator.averageWeight}
                      onChange={(e) => setCalculator({...calculator, averageWeight: e.target.value})}
                      placeholder="e.g., 150"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="waterTemp">Water Temperature (°C)</Label>
                    <Input
                      id="waterTemp"
                      type="number"
                      value={calculator.waterTemp}
                      onChange={(e) => setCalculator({...calculator, waterTemp: e.target.value})}
                      placeholder="e.g., 15"
                    />
                  </div>
                  <div>
                    <Label htmlFor="pondSize">Pond Volume (m³)</Label>
                    <Input
                      id="pondSize"
                      type="number"
                      value={calculator.pondSize}
                      onChange={(e) => setCalculator({...calculator, pondSize: e.target.value})}
                      placeholder="e.g., 100"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="lifeStage">Life Stage</Label>
                  <select 
                    id="lifeStage"
                    className="w-full p-2 border rounded-md"
                    value={calculator.lifeStage}
                    onChange={(e) => setCalculator({...calculator, lifeStage: e.target.value})}
                  >
                    <option value="fry">Fry (0.3-1g)</option>
                    <option value="fingerling">Fingerling (1-25g)</option>
                    <option value="grower">Grower (25-1500g)</option>
                    <option value="broodstock">Broodstock (&gt;1500g)</option>
                  </select>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Feeding Calculations</CardTitle>
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
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-teal-50 p-4 rounded-lg">
                        <div className="text-xl font-bold text-accent">{feedingResult.weeklyFeed} kg</div>
                        <div className="text-sm text-neutral">Weekly Feed</div>
                      </div>
                      <div className="bg-purple-50 p-4 rounded-lg">
                        <div className="text-xl font-bold text-purple-600">{feedingResult.monthlyFeed} kg</div>
                        <div className="text-sm text-neutral">Monthly Feed</div>
                      </div>
                    </div>
                    <div className="bg-yellow-50 p-4 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">Adjusted Feeding Rate</span>
                        <span className="text-lg font-bold">{feedingResult.feedingRate}%</span>
                      </div>
                      <Progress value={parseFloat(feedingResult.feedingRate) * 20} className="mb-2" />
                      <div className="text-xs text-neutral">
                        Temperature adjustment factor: {feedingResult.tempAdjustment}x
                      </div>
                    </div>
                    {feedingResult.stockingDensity !== "0.0" && (
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="text-lg font-bold">Stocking Density: {feedingResult.stockingDensity} kg/m³</div>
                        <div className="text-sm text-neutral">
                          {parseFloat(feedingResult.stockingDensity) > 25 ? "High" : 
                           parseFloat(feedingResult.stockingDensity) > 15 ? "Optimal" : "Low"} density
                        </div>
                      </div>
                    )}
                    {feedingResult.recommendations && feedingResult.recommendations.length > 0 && (
                      <div className="space-y-2">
                        <h4 className="font-semibold">Recommendations:</h4>
                        {feedingResult.recommendations.map((rec, idx) => (
                          <div key={idx} className={`p-3 rounded-lg text-sm ${
                            rec.type === 'warning' ? 'bg-yellow-50 text-yellow-800' : 'bg-blue-50 text-blue-800'
                          }`}>
                            {rec.text}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center text-neutral py-8">
                    <Calculator className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Enter fish parameters to calculate optimal feeding requirements</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Feeding Schedule Table */}
        <section className="mb-16">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-primary text-center">
                Complete Feeding Schedule & Requirements
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-primary hover:bg-primary">
                      <TableHead className="text-white font-semibold">Life Stage</TableHead>
                      <TableHead className="text-white font-semibold">Fish Size (g)</TableHead>
                      <TableHead className="text-white font-semibold">Feed Type</TableHead>
                      <TableHead className="text-white font-semibold">Feed Size (mm)</TableHead>
                      <TableHead className="text-white font-semibold">Daily Rate (%)</TableHead>
                      <TableHead className="text-white font-semibold">Frequency</TableHead>
                      <TableHead className="text-white font-semibold">Protein (%)</TableHead>
                      <TableHead className="text-white font-semibold">Fat (%)</TableHead>
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
                        <TableCell className="font-semibold text-primary">{row.frequency}/day</TableCell>
                        <TableCell className="font-semibold text-secondary">{row.protein}</TableCell>
                        <TableCell className="font-semibold text-accent">{row.fat}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Best Practices */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary mb-4">Professional Best Practices</h2>
            <p className="text-lg text-neutral">
              Expert guidelines for maximizing feed efficiency and fish health
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {bestPractices.map((practice, index) => (
              <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className={`${practice.color} mb-4 flex items-center`}>
                    {practice.icon}
                    <h3 className="text-xl font-bold ml-2">{practice.title}</h3>
                  </div>
                  <p className="text-neutral mb-4">{practice.description}</p>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm">Key Tips:</h4>
                    {practice.tips.map((tip, idx) => (
                      <div key={idx} className="flex items-center text-sm text-neutral">
                        <div className="w-2 h-2 bg-secondary rounded-full mr-2"></div>
                        {tip}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Environmental Factors */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary mb-4">Environmental Factor Management</h2>
            <p className="text-lg text-neutral">
              Critical parameters that affect feeding efficiency and fish health
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {environmentalFactors.map((factor, index) => (
              <Card key={index} className="shadow-lg">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-bold text-primary">{factor.factor}</h3>
                    <Badge variant="secondary">{factor.optimal}</Badge>
                  </div>
                  <p className="text-neutral text-sm mb-3">{factor.impact}</p>
                  <div className="bg-yellow-50 p-3 rounded-lg">
                    <h4 className="font-semibold text-sm mb-1">Management Strategy:</h4>
                    <p className="text-sm text-neutral">{factor.adjustment}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Troubleshooting Guide */}
        <section>
          <Card className="bg-gradient-to-r from-primary to-secondary text-white">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-6 text-center">Feeding Troubleshooting Guide</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Poor Feed Conversion</h4>
                  <ul className="text-blue-200 text-sm space-y-1">
                    <li>• Check water temperature</li>
                    <li>• Verify feed quality</li>
                    <li>• Reduce stocking density</li>
                    <li>• Monitor for disease</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Slow Growth Rates</h4>
                  <ul className="text-blue-200 text-sm space-y-1">
                    <li>• Increase feeding frequency</li>
                    <li>• Check protein content</li>
                    <li>• Monitor water quality</li>
                    <li>• Ensure adequate oxygen</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Feed Wastage</h4>
                  <ul className="text-blue-200 text-sm space-y-1">
                    <li>• Reduce portion sizes</li>
                    <li>• Improve distribution</li>
                    <li>• Check fish appetite</li>
                    <li>• Monitor water quality</li>
                  </ul>
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