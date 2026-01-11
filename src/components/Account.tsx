import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { Badge } from './ui/badge';
import { User, Mail, Bell, Shield, Database, Mic, Download, Trash2, LogOut, Moon, Sun } from 'lucide-react';

interface AccountProps {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
}

export function Account({ darkMode, setDarkMode }: AccountProps) {
  return (
    <div className="space-y-6">
      {/* Profile Card */}
      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle>Profile</CardTitle>
          <CardDescription>Account information and personal settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-2xl shadow-lg">
              JD
            </div>
            <div className="flex-1 space-y-2">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" defaultValue="John Doe" className="rounded-xl" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue="john.doe@example.com" className="rounded-xl" />
                </div>
              </div>
              <Button variant="outline" size="sm" className="rounded-xl">Change Profile Picture</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Appearance Settings */}
      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {darkMode ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            Appearance
          </CardTitle>
          <CardDescription>
            Customize how Insight Capture looks
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="dark-mode" className="text-base">Dark Mode</Label>
              <p className="text-sm text-muted-foreground">
                Switch between light and dark theme
              </p>
            </div>
            <Switch
              id="dark-mode"
              checked={darkMode}
              onCheckedChange={setDarkMode}
            />
          </div>
        </CardContent>
      </Card>

      {/* Data Export */}
      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Download className="w-5 h-5" />
            Data Export
          </CardTitle>
          <CardDescription>
            Download all your data
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Request a copy of all your saved posts, voice memos, and AI analysis results. 
            Data will be provided in JSON format.
          </p>
          <Button variant="outline" className="rounded-xl">Request Data Export</Button>
        </CardContent>
      </Card>

      {/* Logout */}
      <Card className="border-0 shadow-md">
        <CardContent className="pt-6">
          <Button 
            variant="outline" 
            className="w-full flex items-center justify-center gap-2 rounded-xl hover:bg-red-50 hover:text-red-600 hover:border-red-200"
            onClick={() => {
              // Add logout logic here
              console.log('Logout clicked');
            }}
          >
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
