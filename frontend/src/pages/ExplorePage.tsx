import { useState, useEffect } from "react";
import { propertiesAPI, favouritesAPI } from "../services/api";
import { Property } from "../types";
import PropertyCard from "../components/PropertyCard";
import { toast } from "sonner";

export default function ExplorePage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [favouriteIds, setFavouriteIds] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [propsRes, favsRes] = await Promise.all([
        propertiesAPI.getAll(),
        favouritesAPI.getAll(),
      ]);
      setProperties(propsRes.data.properties);
      const favIds = new Set<string>(
        favsRes.data.favourites.map(
          (f: { property: Property }) => f.property.id,
        ),
      );
      setFavouriteIds(favIds);
    } catch {
      toast.error("Failed to load properties.");
    } finally {
      setLoading(false);
    }
  };

  const handleToggleFavourite = async (propertyId: string) => {
    const isFav = favouriteIds.has(propertyId);
    try {
      if (isFav) {
        await favouritesAPI.remove(propertyId);
        setFavouriteIds((prev) => {
          const next = new Set(prev);
          next.delete(propertyId);
          return next;
        });
        toast.success("Removed from favourites.");
      } else {
        await favouritesAPI.add(propertyId);
        setFavouriteIds((prev) => new Set(prev).add(propertyId));
        toast.success("Added to favourites!");
      }
    } catch {
      toast.error("Failed to update favourite.");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="px-6 md:px-10 py-8 md:py-12">
      <div className="max-w-7xl mx-auto mb-12">
        <div className="space-y-2">
          <span className="text-secondary font-semibold tracking-widest uppercase text-xs">
            Curated Selections
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-on-surface tracking-tight max-w-2xl leading-[1.1] font-headline">
            Discover Your <span className="text-primary italic">Next Home</span>
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        {properties.length === 0 ? (
          <div className="text-center py-20">
            <span className="material-symbols-outlined text-5xl text-on-surface-variant/30 mb-4">
              home
            </span>
            <p className="text-on-surface-variant">No properties available.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {properties.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                isFavourite={favouriteIds.has(property.id)}
                onToggleFavourite={handleToggleFavourite}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
