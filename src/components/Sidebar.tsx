import { Home, User, Image, Video, GitBranch } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export const Sidebar = () => {
  const location = useLocation();
  
  const links = [
    { icon: Home, label: "Dashboard", path: "/" },
    { icon: User, label: "Profile", path: "/profile" },
    { icon: Image, label: "Image Generation", path: "/image" },
    { icon: Video, label: "Video Creation", path: "/video" },
    { icon: GitBranch, label: "Diagrams", path: "/diagrams" },
  ];

  return (
    <aside className="fixed top-0 left-0 h-screen w-64 bg-background border-r border-border">
      <div className="flex items-center h-16 px-6 border-b border-border">
        <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-primary-hover bg-clip-text text-transparent">
          AI Tools Hub
        </h1>
      </div>
      
      <nav className="p-4 space-y-2">
        {links.map(({ icon: Icon, label, path }) => (
          <Link
            key={path}
            to={path}
            className={`flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors ${
              location.pathname === path
                ? "bg-primary text-white"
                : "hover:bg-accent"
            }`}
          >
            <Icon className="w-5 h-5" />
            <span>{label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
};