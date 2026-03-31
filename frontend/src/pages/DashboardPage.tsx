import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { favouritesAPI } from "../services/api";
import { Favourite } from "../types";
import PropertyCard from "../components/PropertyCard";
import { toast } from "sonner";

export default function DashboardPage() {
  const { user } = useAuth();
  const [favourites, setFavourites] = useState<Favourite[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFavourites();
  }, []);

  const fetchFavourites = async () => {
    try {
      const { data } = await favouritesAPI.getAll();
      setFavourites(data.favourites);
    } catch {
      toast.error("Failed to load favourites.");
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFavourite = async (propertyId: string) => {
    try {
      await favouritesAPI.remove(propertyId);
      setFavourites((prev) => prev.filter((f) => f.property.id !== propertyId));
      toast.success("Removed from favourites.");
    } catch {
      toast.error("Failed to remove favourite.");
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
    <div className="p-6 md:p-10 max-w-7xl">
      <header className="mb-10">
        <div className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-bold uppercase tracking-widest mb-3">
          Buyer Portal
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-on-surface tracking-tight mb-2 font-headline">
          Welcome back, {user?.name?.split(" ")[0]}!
        </h1>
        <p className="text-on-surface-variant text-base max-w-2xl">
          Manage your curated property selection and keep track of the
          architectural masterpieces you've shortlisted.
        </p>
      </header>

      <section>
        <div className="flex items-baseline justify-between mb-6">
          <h2 className="text-xl font-bold text-on-surface font-headline">
            My Favorites
          </h2>
          <span className="text-on-surface-variant text-sm font-medium">
            {favourites.length}{" "}
            {favourites.length === 1 ? "Property" : "Properties"} Saved
          </span>
        </div>

        {favourites.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-20 h-20 bg-surface-container-low rounded-full flex items-center justify-center mb-5">
              <span className="material-symbols-outlined text-on-surface-variant text-4xl">
                heart_broken
              </span>
            </div>
            <h3 className="text-xl font-bold text-on-surface mb-2 font-headline">
              No favorites yet
            </h3>
            <p className="text-on-surface-variant mb-6 max-w-sm text-sm">
              Start your journey by exploring our curated selection of high-end
              properties.
            </p>
            <Link
              to="/explore"
              className="px-6 py-3 hero-gradient text-on-primary font-bold rounded-lg hover:opacity-90 transition-all text-sm"
            >
              Explore Properties
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {favourites.map((fav) => (
              <PropertyCard
                key={fav.id}
                property={fav.property}
                isFavourite={true}
                onToggleFavourite={handleRemoveFavourite}
              />
            ))}

            <div className="group bg-primary-container rounded-xl p-7 flex flex-col justify-center items-center text-center gap-5 transition-all duration-300 hover:-translate-y-1">
              <div className="w-14 h-14 bg-white/10 rounded-full flex items-center justify-center">
                <span className="material-symbols-outlined text-white text-3xl">
                  add_home
                </span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-1 font-headline">
                  Continue Your Search
                </h3>
                <p className="text-on-primary-container text-sm">
                  Discover more architectural gems tailored to your preferences.
                </p>
              </div>
              <Link
                to="/explore"
                className="w-full py-3 bg-white text-primary font-bold rounded-lg hover:bg-surface-bright transition-colors active:scale-95 text-center text-sm"
              >
                Browse More
              </Link>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
