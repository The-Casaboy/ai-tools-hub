export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: string;
  department: string;
  joinDate: string;
  preferences: {
    theme: "light" | "dark";
    language: "en" | "es" | "fr";
    notifications: boolean;
  };
}

export interface UserProfileProps {
  user: User;
  onUpdate: (user: User) => void;
}