import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import { Header } from "./components/Header";
import { Sidebar } from "./components/Sidebar";
import { UserProfile } from "./components/UserProfile";
import { ChatAssistant } from "./components/ChatAssistant";
import { User } from "./types";

const mockUser: User = {
  id: "1",
  name: "John Doe",
  email: "john.doe@company.com",
  avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  role: "Software Engineer",
  department: "Engineering",
  joinDate: "2023-01-15",
  preferences: {
    theme: "dark",
    language: "en",
    notifications: true,
  },
};

const App = () => {
  const [user, setUser] = useState<User>(mockUser);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-background text-foreground">
        <Sidebar />
        <Header user={user} />
        <main className="pl-64 pt-16">
          <div className="container py-8">
            <Routes>
              <Route path="/" element={<div>Dashboard</div>} />
              <Route path="/chat" element={<ChatAssistant />} />
              <Route path="/image" element={<div>Image Generation</div>} />
              <Route path="/video" element={<div>Video Creation</div>} />
              <Route path="/diagrams" element={<div>Diagrams</div>} />
            </Routes>
          </div>
        </main>
        <Toaster />
      </div>
    </BrowserRouter>
  );
};

export default App;