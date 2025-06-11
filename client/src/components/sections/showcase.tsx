import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function Showcase() {
  const { data: showcaseImages, isLoading } = useQuery({
    queryKey: ['/api/showcase-images'],
    queryFn: () => fetch('/api/showcase-images').then(res => res.json())
  });

  // Filter only active images
  const activeImages = showcaseImages?.filter((image: any) => image.isActive) || [];

  if (isLoading || activeImages.length === 0) {
    return null; // Don't show the section if no images or loading
  }

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Gallery
          </h2>
          <p className="text-xl text-neutral max-w-3xl mx-auto">
            Showcasing our premium trout feed products and facilities
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {activeImages.map((image: any) => (
            <Card key={image.id} className="group overflow-hidden hover:shadow-xl transition-all duration-300">
              <CardContent className="p-0">
                <div className="relative aspect-video overflow-hidden">
                  <img 
                    src={image.imageUrl} 
                    alt={image.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-xl font-semibold mb-2">{image.title}</h3>
                    {image.description && (
                      <p className="text-sm text-gray-200 line-clamp-2">
                        {image.description}
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {activeImages.length > 6 && (
          <div className="text-center mt-12">
            <Badge variant="secondary" className="px-6 py-2 text-sm">
              Showing {Math.min(6, activeImages.length)} of {activeImages.length} images
            </Badge>
          </div>
        )}
      </div>
    </section>
  );
}