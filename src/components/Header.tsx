import { useState } from "react";
import { User } from "@/types";
import { Bell, Settings, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  user: User;
}

export const Header = ({ user }: HeaderProps) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate("/profile");
    setShowDropdown(false);
  };

  return (
    <header className="fixed top-0 right-0 left-64 h-16 bg-background border-b border-border flex items-center justify-between px-6 z-10">
      <h1 className="text-xl font-semibold">AI Tools Hub</h1>
      
      <div className="flex items-center space-x-4">
        <button className="p-2 hover:bg-accent rounded-full">
          <Bell className="w-5 h-5" />
        </button>
        
        <div className="relative">
          <button 
            className="flex items-center space-x-2 hover:bg-accent p-2 rounded-full"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <img 
              src={user.avatar} 
              alt={user.name} 
              className="w-8 h-8 rounded-full object-cover"
            />
          </button>
          
          {showDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-background border border-border rounded-lg shadow-lg py-1 animate-fade-in">
              <button
                onClick={handleProfileClick}
                className="w-full px-4 py-2 text-left hover:bg-accent flex items-center space-x-2"
              >
                <img 
                  src={user.avatar} 
                  alt={user.name} 
                  className="w-6 h-6 rounded-full"
                />
                <div className="flex-1">
                  <p className="font-medium">{user.name}</p>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                </div>
              </button>
              
              <hr className="my-1 border-border" />
              
              <button className="w-full px-4 py-2 text-left hover:bg-accent flex items-center space-x-2">
                <Settings className="w-4 h-4" />
                <span>Settings</span>
              </button>
              
              <button className="w-full px-4 py-2 text-left hover:bg-accent flex items-center space-x-2 text-red-500">
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};