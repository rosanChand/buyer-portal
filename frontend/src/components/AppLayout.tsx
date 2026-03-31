import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function AppLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-surface text-on-surface">
      {/* Top Navbar */}
      <header className="fixed top-0 w-full z-50 bg-white/70 backdrop-blur-xl shadow-sm shadow-primary/5 h-16 flex items-center justify-between px-6 lg:px-8">
        <div className="text-xl font-extrabold text-primary font-headline tracking-tight">
          The Editorial Estate
        </div>

        <nav className="hidden md:flex items-center gap-6 font-headline font-bold text-sm tracking-tight">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive
                ? "text-primary border-b-2 border-primary pb-0.5"
                : "text-on-surface-variant hover:text-primary transition-colors"
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/explore"
            className={({ isActive }) =>
              isActive
                ? "text-primary border-b-2 border-primary pb-0.5"
                : "text-on-surface-variant hover:text-primary transition-colors"
            }
          >
            Explore
          </NavLink>
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden sm:block text-xs text-on-surface-variant mr-2">
            {user?.name}
          </div>
          <button
            onClick={handleLogout}
            className="p-2 hover:bg-surface-container-high rounded-full transition-all active:scale-95 cursor-pointer"
            title="Logout"
          >
            <span className="material-symbols-outlined text-primary">
              logout
            </span>
          </button>
        </div>
      </header>

      <div className="flex pt-16 min-h-screen">
        {/* Sidebar */}
        <aside className="hidden lg:flex flex-col p-5 gap-2 bg-surface-container-low h-[calc(100vh-4rem)] w-60 fixed left-0 border-r border-surface-variant/30">
          <div className="mb-6 mt-2">
            <p className="font-headline text-xs font-semibold text-primary uppercase tracking-widest opacity-60">
              The Digital Curator
            </p>
            <p className="text-lg font-extrabold text-on-surface mt-0.5 font-headline">
              Welcome Home
            </p>
          </div>

          <nav className="space-y-1 flex-1">
            <NavLink
              to="/explore"
              className={({ isActive }) =>
                `flex items-center gap-3 p-3 rounded-lg font-headline text-sm font-semibold transition-all duration-200 hover:translate-x-0.5 ${
                  isActive
                    ? "bg-surface-container-lowest text-primary shadow-sm"
                    : "text-on-surface-variant hover:bg-surface-container"
                }`
              }
            >
              <span className="material-symbols-outlined text-xl">search</span>
              Explore Properties
            </NavLink>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `flex items-center gap-3 p-3 rounded-lg font-headline text-sm font-semibold transition-all duration-200 hover:translate-x-0.5 ${
                  isActive
                    ? "bg-surface-container-lowest text-primary shadow-sm"
                    : "text-on-surface-variant hover:bg-surface-container"
                }`
              }
            >
              <span
                className="material-symbols-outlined text-xl"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                favorite
              </span>
              My Favorites
            </NavLink>
          </nav>

          {/* User Profile in sidebar */}
          <div className="pt-4 border-t border-surface-variant/30">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-primary-container flex items-center justify-center text-on-primary text-sm font-bold">
                {user?.name?.charAt(0)?.toUpperCase() || "?"}
              </div>
              <div>
                <p className="text-sm font-bold text-on-surface">
                  {user?.name}
                </p>
                <p className="text-xs text-on-surface-variant capitalize">
                  {user?.role || "Buyer"}
                </p>
              </div>
            </div>
          </div>
        </aside>

        {/* Mobile bottom nav */}
        <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-white/90 backdrop-blur-xl border-t border-surface-variant/30 flex">
          <NavLink
            to="/explore"
            className={({ isActive }) =>
              `flex-1 flex flex-col items-center gap-0.5 py-3 text-xs font-semibold ${
                isActive ? "text-primary" : "text-on-surface-variant"
              }`
            }
          >
            <span className="material-symbols-outlined text-xl">search</span>
            Explore
          </NavLink>
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `flex-1 flex flex-col items-center gap-0.5 py-3 text-xs font-semibold ${
                isActive ? "text-primary" : "text-on-surface-variant"
              }`
            }
          >
            <span
              className="material-symbols-outlined text-xl"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              favorite
            </span>
            Favorites
          </NavLink>
          <button
            onClick={handleLogout}
            className="flex-1 flex flex-col items-center gap-0.5 py-3 text-xs font-semibold text-on-surface-variant cursor-pointer"
          >
            <span className="material-symbols-outlined text-xl">logout</span>
            Logout
          </button>
        </div>

        {/* Main content */}
        <main className="flex-1 lg:ml-60 pb-20 lg:pb-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
