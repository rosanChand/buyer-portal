import { Property } from "../types";

interface PropertyCardProps {
  property: Property;
  isFavourite: boolean;
  onToggleFavourite: (propertyId: string) => void;
}

export default function PropertyCard({
  property,
  isFavourite,
  onToggleFavourite,
}: PropertyCardProps) {
  const formatPrice = (price: number) => {
    if (price >= 10000000) return `NPR ${(price / 10000000).toFixed(1)} Cr`;
    if (price >= 100000) return `NPR ${(price / 100000).toFixed(1)} L`;
    return `NPR ${price.toLocaleString()}`;
  };

  return (
    <div className="group relative bg-surface-container-lowest rounded-xl overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(25,28,29,0.06)]">
      <div className="relative h-64 overflow-hidden">
        {property.imageUrl ? (
          <img
            src={property.imageUrl}
            alt={property.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full bg-surface-container-high flex items-center justify-center">
            <span className="material-symbols-outlined text-5xl text-on-surface-variant/30">
              home
            </span>
          </div>
        )}
        <button
          onClick={() => onToggleFavourite(property.id)}
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/70 backdrop-blur-md flex items-center justify-center transition-all hover:bg-white active:scale-90 cursor-pointer"
        >
          <span
            className={`material-symbols-outlined text-xl ${isFavourite ? "text-secondary" : "text-on-surface-variant/50 hover:text-secondary"}`}
            style={isFavourite ? { fontVariationSettings: "'FILL' 1" } : {}}
          >
            favorite
          </span>
        </button>
        <div className="absolute bottom-4 left-4 px-3 py-1.5 bg-white/70 backdrop-blur-md rounded-lg text-primary font-headline font-bold text-sm">
          {formatPrice(property.price)}
        </div>
      </div>

      <div className="p-5">
        <h3 className="font-headline text-lg font-bold text-on-surface tracking-tight mb-1 truncate">
          {property.title}
        </h3>
        <p className="text-on-surface-variant text-sm flex items-center gap-1 mb-4">
          <span className="material-symbols-outlined text-base">
            location_on
          </span>
          {property.location}
        </p>

        <div className="flex gap-4 pt-3 border-t border-surface-variant/30">
          {property.bedrooms && (
            <div className="flex items-center gap-1.5 text-on-surface-variant text-xs">
              <span className="material-symbols-outlined text-base text-primary-container">
                bed
              </span>
              <span>{property.bedrooms} Beds</span>
            </div>
          )}
          {property.bathrooms && (
            <div className="flex items-center gap-1.5 text-on-surface-variant text-xs">
              <span className="material-symbols-outlined text-base text-primary-container">
                bathtub
              </span>
              <span>{property.bathrooms} Baths</span>
            </div>
          )}
          {property.areaSqft && (
            <div className="flex items-center gap-1.5 text-on-surface-variant text-xs">
              <span className="material-symbols-outlined text-base text-primary-container">
                square_foot
              </span>
              <span>{property.areaSqft.toLocaleString()} sqft</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
