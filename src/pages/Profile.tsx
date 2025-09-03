import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  User,
  Edit,
  Bell,
  Moon,
  Lock,
  LogOut,
  ChevronRight,
  Upload,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { useTheme } from "@/hooks/use-theme";

const Profile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isDark, toggleTheme } = useTheme();
  const [pushNotifications, setPushNotifications] = useState(true);
  const [avatar, setAvatar] = useState("/api/placeholder/100/100");
  const [showAvatarUpload, setShowAvatarUpload] = useState(false);

  const profileData = {
    name: "John Doe",
    email: "john.doe@example.com",
    avatar: avatar,
  };

  const handleSignOut = () => {
    toast({
      title: "Signed Out",
      description: "You have been signed out successfully",
    });
    navigate("/login");
  };

  const handleAvatarUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setAvatar(result);
        toast({
          title: "Avatar Updated",
          description: "Your profile picture has been updated successfully",
        });
      };
      reader.readAsDataURL(file);
      setShowAvatarUpload(false);
    }
  };

  const handleRemoveAvatar = () => {
    setAvatar("/api/placeholder/100/100");
    setShowAvatarUpload(false);
    toast({
      title: "Avatar Removed",
      description: "Your profile picture has been reset to default",
    });
  };

  const settingsItems = [
    {
      id: "preferences",
      title: "Preferences",
      items: [
        {
          id: "push-notifications",
          label: "Push Notifications",
          icon: Bell,
          type: "toggle",
          value: pushNotifications,
          onChange: setPushNotifications,
        },
        {
          id: "dark-mode",
          label: "Dark Mode",
          icon: Moon,
          type: "toggle",
          value: isDark,
          onChange: toggleTheme,
        },
      ],
    },
    {
      id: "account",
      title: "Account",
      items: [
        {
          id: "edit-profile",
          label: "Edit Profile",
          icon: Edit,
          type: "action",
          action: () => toast({ title: "Edit Profile", description: "Feature coming soon!" }),
        },
        {
          id: "change-password",
          label: "Change Password",
          icon: Lock,
          type: "action",
          action: () => toast({ title: "Change Password", description: "Feature coming soon!" }),
        },
        {
          id: "sign-out",
          label: "Sign Out",
          icon: LogOut,
          type: "action",
          action: handleSignOut,
          variant: "destructive",
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background-secondary"
    style={{paddingBottom: '170px'}} >
      {/* Header */}
      <motion.div
        className="sticky top-0 z-40 bg-gradient-primary text-white p-6 shadow-elevated"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="text-white hover:bg-white/10"
          >
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <h1 className="text-lg font-semibold">Profile</h1>
        </div>
      </motion.div>

      <div className="p-6 space-y-6">
        {/* Profile Info */}
        <motion.div
          className="bg-card rounded-3xl p-6 shadow-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Avatar className="w-16 h-16 border-4 border-primary/20">
                <AvatarImage src={profileData.avatar} alt={profileData.name} />
                <AvatarFallback className="bg-primary/10 text-primary text-xl font-semibold">
                  <User className="w-8 h-8" />
                </AvatarFallback>
              </Avatar>
              
              {/* Avatar Upload Overlay */}
              {showAvatarUpload && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center"
                >
                  <div className="flex space-x-2">
                    <label htmlFor="avatar-upload">
                      <input
                        id="avatar-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleAvatarUpload}
                        className="hidden"
                      />
                      <Button size="sm" className="w-8 h-8 p-0 bg-white text-black hover:bg-gray-200">
                        <Upload className="w-4 h-4" />
                      </Button>
                    </label>
                    <Button
                      size="sm"
                      onClick={handleRemoveAvatar}
                      className="w-8 h-8 p-0 bg-red-500 text-white hover:bg-red-600"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </motion.div>
              )}
            </div>
            
            <div className="flex-1">
              <h2 className="text-xl font-bold text-foreground">
                {profileData.name}
              </h2>
              <p className="text-muted-foreground">{profileData.email}</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowAvatarUpload(!showAvatarUpload)}
              className="border-primary text-primary hover:bg-primary hover:text-white"
            >
              <Edit className="w-4 h-4" />
            </Button>
          </div>
        </motion.div>

        {/* Settings Sections */}
        {settingsItems.map((section, sectionIndex) => (
          <motion.div
            key={section.id}
            className="bg-card rounded-3xl shadow-card overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 + sectionIndex * 0.1 }}
          >
            <div className="p-6 pb-4">
              <h3 className="text-lg font-semibold text-foreground">
                {section.title}
              </h3>
            </div>
            <div className="px-6 pb-6 space-y-2">
              {section.items.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={item.type === "action" ? item.action : undefined}
                    className="w-full flex items-center justify-between p-4 rounded-2xl hover:bg-muted/50 transition-smooth text-left"
                  >
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                          item.variant === "destructive"
                            ? "bg-destructive/10"
                            : "bg-muted"
                        }`}
                      >
                        <Icon
                          className={`w-5 h-5 ${
                            item.variant === "destructive"
                              ? "text-destructive"
                              : "text-muted-foreground"
                          }`}
                        />
                      </div>
                      <span
                        className={`font-medium ${
                          item.variant === "destructive"
                            ? "text-destructive"
                            : "text-foreground"
                        }`}
                      >
                        {item.label}
                      </span>
                    </div>

                    {item.type === "toggle" && (
                      <Switch
                        checked={item.value as boolean}
                        onCheckedChange={item.onChange as (checked: boolean) => void}
                        onClick={(e) => e.stopPropagation()}
                      />
                    )}

                    {item.type === "action" && (
                      <ChevronRight className="w-5 h-5 text-muted-foreground" />
                    )}
                  </button>
                );
              })}
            </div>
          </motion.div>
        ))}

        {/* App Version */}
        <motion.div
          className="text-center py-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <p className="text-muted-foreground text-sm">
            Relax Refresh Partner v1.0.0
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;