import ProductCard from "@/components/ui/product-card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Products() {
  const products = [
    {
      stage: "Early Stage",
      number: "01",
      description: "For fry and young fingerlings",
      protein: "45%",
      size: "0.5mm",
      energy: "15 KJ/GM",
      bgColor: "from-blue-50 to-blue-100",
      iconColor: "bg-primary"
    },
    {
      stage: "Small Stage",
      number: "02",
      description: "For growing fingerlings",
      protein: "48%",
      size: "1.5mm",
      energy: "14 KJ/GM",
      bgColor: "from-green-50 to-green-100",
      iconColor: "bg-secondary"
    },
    {
      stage: "Stock Stage",
      number: "03",
      description: "For mature stock fish",
      protein: "52%",
      size: "3.0mm",
      energy: "13 KJ/GM",
      bgColor: "from-teal-50 to-teal-100",
      iconColor: "bg-accent"
    }
  ];

  const specifications = [
    { composition: "Crude Protein", early: "45%", small: "48%", stock: "52%" },
    { composition: "Fibre", early: "3% max", small: "3% max", stock: "3% max" },
    { composition: "Carbohydrate", early: "25%", small: "22%", stock: "20%" },
    { composition: "Energy", early: "15 KJ/GM", small: "14 KJ/GM", stock: "13 KJ/GM" },
    { composition: "Moisture", early: "8%", small: "8%", stock: "8%" },
    { composition: "Pellet Size", early: "0.5mm", small: "1.5mm", stock: "3.0mm" }
  ];

  return (
    <section id="products" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4 hover-rubber">Our Products</h2>
          <p className="text-lg text-neutral max-w-3xl mx-auto hover-fade">
            We produce three standard compositions of feed designed for different growth stages, ensuring optimal nutrition throughout the fish lifecycle.
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {products.map((product, index) => (
            <ProductCard key={index} {...product} />
          ))}
        </div>

        {/* Detailed Specifications Table */}
        <Card className="shadow-lg">
          <CardHeader className="bg-gray-50">
            <CardTitle className="text-2xl font-bold text-primary text-center">
              Detailed Product Specifications
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-primary hover:bg-primary">
                    <TableHead className="text-white font-semibold">Proximate Composition</TableHead>
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
      </div>
    </section>
  );
}
