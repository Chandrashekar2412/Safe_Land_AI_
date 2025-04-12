import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";

const AdminProfile = () => {
  const [profile, setProfile] = useState({
    name: "Admin User",
    email: "admin@example.com",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleSave = () => {
    // Implement save functionality
    console.log("Saving profile:", profile);
    toast({
      title: "Profile updated",
      description: "Your profile has been updated successfully.",
    });
  };

  const handlePasswordChange = () => {
    if (profile.newPassword !== profile.confirmPassword) {
      toast({
        title: "Error",
        description: "New passwords do not match",
        variant: "destructive",
      });
      return;
    }
    // Implement password change functionality
    console.log("Changing password");
    toast({
      title: "Password changed",
      description: "Your password has been updated successfully.",
    });
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Admin Profile</h1>
        <Button onClick={handleSave}>Save Changes</Button>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Name</Label>
              <Input
                value={profile.name}
                onChange={(e) =>
                  setProfile({ ...profile, name: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label>Email</Label>
              <Input
                type="email"
                value={profile.email}
                onChange={(e) =>
                  setProfile({ ...profile, email: e.target.value })
                }
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Change Password</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Current Password</Label>
              <Input
                type="password"
                value={profile.currentPassword}
                onChange={(e) =>
                  setProfile({ ...profile, currentPassword: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label>New Password</Label>
              <Input
                type="password"
                value={profile.newPassword}
                onChange={(e) =>
                  setProfile({ ...profile, newPassword: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label>Confirm New Password</Label>
              <Input
                type="password"
                value={profile.confirmPassword}
                onChange={(e) =>
                  setProfile({ ...profile, confirmPassword: e.target.value })
                }
              />
            </div>

            <Button onClick={handlePasswordChange}>Change Password</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminProfile; 