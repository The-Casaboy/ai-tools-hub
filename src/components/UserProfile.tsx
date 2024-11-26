import { useState } from "react";
import { User } from "@/types";
import { toast } from "sonner";
import { Edit2, Save, X } from "lucide-react";

interface UserProfileProps {
  user: User;
  onUpdate: (user: User) => void;
}

export const UserProfile = ({ user, onUpdate }: UserProfileProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(user);

  const handleSave = () => {
    onUpdate(editedUser);
    setIsEditing(false);
    toast.success("Profile updated successfully!");
  };

  const handleCancel = () => {
    setEditedUser(user);
    setIsEditing(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8 animate-fade-in">
      <div className="relative h-48 bg-gradient-to-r from-primary to-primary-hover rounded-lg">
        <div className="absolute -bottom-16 left-8 flex items-end space-x-6">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-32 h-32 rounded-full border-4 border-background"
          />
          <div className="mb-4">
            <h1 className="text-2xl font-bold text-white">{user.name}</h1>
            <p className="text-white/80">{user.role}</p>
          </div>
        </div>
        
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
          >
            <Edit2 className="w-5 h-5 text-white" />
          </button>
        ) : (
          <div className="absolute top-4 right-4 flex space-x-2">
            <button
              onClick={handleSave}
              className="p-2 bg-green-500 hover:bg-green-600 rounded-full transition-colors"
            >
              <Save className="w-5 h-5 text-white" />
            </button>
            <button
              onClick={handleCancel}
              className="p-2 bg-red-500 hover:bg-red-600 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>
        )}
      </div>

      <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Name</label>
            {isEditing ? (
              <input
                type="text"
                value={editedUser.name}
                onChange={(e) =>
                  setEditedUser({ ...editedUser, name: e.target.value })
                }
                className="w-full p-2 rounded-lg border border-border bg-background"
              />
            ) : (
              <p>{user.name}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            {isEditing ? (
              <input
                type="email"
                value={editedUser.email}
                onChange={(e) =>
                  setEditedUser({ ...editedUser, email: e.target.value })
                }
                className="w-full p-2 rounded-lg border border-border bg-background"
              />
            ) : (
              <p>{user.email}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Department</label>
            {isEditing ? (
              <input
                type="text"
                value={editedUser.department}
                onChange={(e) =>
                  setEditedUser({ ...editedUser, department: e.target.value })
                }
                className="w-full p-2 rounded-lg border border-border bg-background"
              />
            ) : (
              <p>{user.department}</p>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Theme</label>
            {isEditing ? (
              <select
                value={editedUser.preferences.theme}
                onChange={(e) =>
                  setEditedUser({
                    ...editedUser,
                    preferences: {
                      ...editedUser.preferences,
                      theme: e.target.value as "light" | "dark",
                    },
                  })
                }
                className="w-full p-2 rounded-lg border border-border bg-background"
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
              </select>
            ) : (
              <p className="capitalize">{user.preferences.theme}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Language</label>
            {isEditing ? (
              <select
                value={editedUser.preferences.language}
                onChange={(e) =>
                  setEditedUser({
                    ...editedUser,
                    preferences: {
                      ...editedUser.preferences,
                      language: e.target.value as "en" | "es" | "fr",
                    },
                  })
                }
                className="w-full p-2 rounded-lg border border-border bg-background"
              >
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
              </select>
            ) : (
              <p className="capitalize">{user.preferences.language}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Notifications</label>
            {isEditing ? (
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={editedUser.preferences.notifications}
                  onChange={(e) =>
                    setEditedUser({
                      ...editedUser,
                      preferences: {
                        ...editedUser.preferences,
                        notifications: e.target.checked,
                      },
                    })
                  }
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            ) : (
              <p>{user.preferences.notifications ? "Enabled" : "Disabled"}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};