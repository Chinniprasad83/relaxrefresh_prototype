import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Header from "@/components/ui/Header";

export default function Profile() {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex items-center gap-4 m-4">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => navigate(-1)}
          className="p-2"
        >
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <h1 className="text-2xl font-bold text-foreground">Profile</h1>
      </div>
      
      <Card className="m-4 p-6 shadow-elegant border-0">
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-4">Preferences</h3>
            
            <div className="flex items-center justify-between py-2">
              <label htmlFor="notifications" className="text-sm font-medium">
                Push Notifications
              </label>
              <Switch 
                id="notifications"
                checked={notifications}
                onCheckedChange={setNotifications}
              />
            </div>
            
            <div className="flex items-center justify-between py-2">
              <label htmlFor="dark-mode" className="text-sm font-medium">
                Dark Mode
              </label>
              <Switch 
                id="dark-mode"
                checked={darkMode}
                onCheckedChange={setDarkMode}
              />
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="text-lg font-semibold mb-4">Account</h3>
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                Edit Profile
              </Button>
              <Button variant="outline" className="w-full justify-start">
                Change Password
              </Button>
              <Button variant="destructive" className="w-full justify-start"  onClick={() => navigate("/")}>
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}