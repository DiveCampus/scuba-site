import React, { useState } from 'react';
import { Layout } from '../Layout';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Switch } from '../ui/switch';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Shield, 
  Mail,
  Clock,
  RefreshCw,
  UserCog
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface System {
  id: string;
  name: string;
  ipAddress: string;
  status: 'active' | 'inactive';
  criticality: 'Critical' | 'High' | 'Medium' | 'Low';
}

interface User {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'Operator' | 'Viewer';
  status: 'Active' | 'Inactive';
}

const mockSystems: System[] = [
  { id: '1', name: 'WEB-PROD-01', ipAddress: '192.168.1.10', status: 'active', criticality: 'Critical' },
  { id: '2', name: 'DB-SERVER-03', ipAddress: '192.168.1.20', status: 'active', criticality: 'Critical' },
  { id: '3', name: 'APP-NODE-07', ipAddress: '192.168.1.30', status: 'active', criticality: 'High' },
  { id: '4', name: 'API-GATEWAY-02', ipAddress: '192.168.1.40', status: 'active', criticality: 'Medium' },
  { id: '5', name: 'MAIL-SERVER-01', ipAddress: '192.168.1.50', status: 'inactive', criticality: 'Low' },
];

const mockUsers: User[] = [
  { id: '1', name: 'John Smith', email: 'john.smith@company.com', role: 'Admin', status: 'Active' },
  { id: '2', name: 'Sarah Johnson', email: 'sarah.j@company.com', role: 'Operator', status: 'Active' },
  { id: '3', name: 'Mike Chen', email: 'mike.chen@company.com', role: 'Viewer', status: 'Active' },
  { id: '4', name: 'Emily Davis', email: 'emily.d@company.com', role: 'Operator', status: 'Inactive' },
];

export function AdminPanel() {
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [autoUpdate, setAutoUpdate] = useState(false);
  const [scheduleWindows, setScheduleWindows] = useState(true);
  const [realTimeMonitoring, setRealTimeMonitoring] = useState(true);

  const handleSaveSettings = () => {
    toast.success('Settings saved successfully', {
      description: 'Your preferences have been updated',
    });
  };

  const getCriticalityColor = (criticality: string) => {
    switch (criticality) {
      case 'Critical':
        return 'bg-red-500/10 text-red-500 border-red-500/20';
      case 'High':
        return 'bg-orange-500/10 text-orange-500 border-orange-500/20';
      case 'Medium':
        return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
      case 'Low':
        return 'bg-green-500/10 text-green-500 border-green-500/20';
      default:
        return 'default';
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'Admin':
        return 'bg-purple-500/10 text-purple-500 border-purple-500/20';
      case 'Operator':
        return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      case 'Viewer':
        return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
      default:
        return 'default';
    }
  };

  return (
    <Layout activePage="admin">
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-foreground mb-2">Admin Panel & Settings</h1>
          <p className="text-muted-foreground">
            Manage system inventory, user permissions, and platform configuration
          </p>
        </div>

        <Tabs defaultValue="inventory" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:w-auto lg:inline-grid">
            <TabsTrigger value="inventory">System Inventory</TabsTrigger>
            <TabsTrigger value="users">User Management</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* System Inventory Tab */}
          <TabsContent value="inventory" className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-foreground">Managed Systems</h3>
                <p className="text-sm text-muted-foreground">
                  {mockSystems.length} systems in inventory
                </p>
              </div>
              <Button className="gap-2 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 rounded-xl">
                <Plus className="h-4 w-4" />
                Add System
              </Button>
            </div>

            <div className="relative overflow-hidden rounded-xl border border-border bg-card/60 backdrop-blur-sm">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b border-border bg-muted/30">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm text-muted-foreground">System Name</th>
                      <th className="px-4 py-3 text-left text-sm text-muted-foreground">IP Address</th>
                      <th className="px-4 py-3 text-left text-sm text-muted-foreground">Criticality</th>
                      <th className="px-4 py-3 text-left text-sm text-muted-foreground">Status</th>
                      <th className="px-4 py-3 text-right text-sm text-muted-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockSystems.map((system) => (
                      <tr
                        key={system.id}
                        className="border-b border-border/50 hover:bg-muted/20 transition-colors"
                      >
                        <td className="px-4 py-3 text-foreground">{system.name}</td>
                        <td className="px-4 py-3 text-muted-foreground">{system.ipAddress}</td>
                        <td className="px-4 py-3">
                          <Badge className={getCriticalityColor(system.criticality)}>
                            {system.criticality}
                          </Badge>
                        </td>
                        <td className="px-4 py-3">
                          <Badge variant={system.status === 'active' ? 'default' : 'secondary'}>
                            {system.status}
                          </Badge>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="icon">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>

          {/* User Management Tab */}
          <TabsContent value="users" className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-foreground">User Roles & Permissions</h3>
                <p className="text-sm text-muted-foreground">
                  {mockUsers.length} users with access
                </p>
              </div>
              <Button className="gap-2 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 rounded-xl">
                <Plus className="h-4 w-4" />
                Add User
              </Button>
            </div>

            <div className="relative overflow-hidden rounded-xl border border-border bg-card/60 backdrop-blur-sm">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b border-border bg-muted/30">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm text-muted-foreground">Name</th>
                      <th className="px-4 py-3 text-left text-sm text-muted-foreground">Email</th>
                      <th className="px-4 py-3 text-left text-sm text-muted-foreground">Role</th>
                      <th className="px-4 py-3 text-left text-sm text-muted-foreground">Status</th>
                      <th className="px-4 py-3 text-right text-sm text-muted-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockUsers.map((user) => (
                      <tr
                        key={user.id}
                        className="border-b border-border/50 hover:bg-muted/20 transition-colors"
                      >
                        <td className="px-4 py-3 text-foreground">{user.name}</td>
                        <td className="px-4 py-3 text-muted-foreground">{user.email}</td>
                        <td className="px-4 py-3">
                          <Badge className={getRoleColor(user.role)}>
                            {user.role}
                          </Badge>
                        </td>
                        <td className="px-4 py-3">
                          <Badge variant={user.status === 'Active' ? 'default' : 'secondary'}>
                            {user.status}
                          </Badge>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="icon">
                              <UserCog className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <div className="relative overflow-hidden rounded-xl border border-border bg-card/60 backdrop-blur-sm p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500/10">
                    <Shield className="h-5 w-5 text-purple-500" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Admins</p>
                    <p className="text-xl text-foreground">
                      {mockUsers.filter(u => u.role === 'Admin').length}
                    </p>
                  </div>
                </div>
              </div>
              <div className="relative overflow-hidden rounded-xl border border-border bg-card/60 backdrop-blur-sm p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10">
                    <UserCog className="h-5 w-5 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Operators</p>
                    <p className="text-xl text-foreground">
                      {mockUsers.filter(u => u.role === 'Operator').length}
                    </p>
                  </div>
                </div>
              </div>
              <div className="relative overflow-hidden rounded-xl border border-border bg-card/60 backdrop-blur-sm p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-500/10">
                    <Shield className="h-5 w-5 text-gray-400" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Viewers</p>
                    <p className="text-xl text-foreground">
                      {mockUsers.filter(u => u.role === 'Viewer').length}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              {/* Notification Settings */}
              <div className="relative overflow-hidden rounded-xl border border-border bg-card/60 backdrop-blur-sm p-6">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />
                
                <div className="relative space-y-4">
                  <div className="flex items-center gap-2 mb-4">
                    <Mail className="h-5 w-5 text-primary" />
                    <h3 className="text-foreground">Notification Settings</h3>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="email-alerts">Email Alerts</Label>
                        <p className="text-sm text-muted-foreground">
                          Send notifications for critical events
                        </p>
                      </div>
                      <Switch
                        id="email-alerts"
                        checked={emailAlerts}
                        onCheckedChange={setEmailAlerts}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="real-time">Real-time Monitoring</Label>
                        <p className="text-sm text-muted-foreground">
                          Continuous system health checks
                        </p>
                      </div>
                      <Switch
                        id="real-time"
                        checked={realTimeMonitoring}
                        onCheckedChange={setRealTimeMonitoring}
                      />
                    </div>

                    <div className="pt-4 border-t border-border">
                      <Label htmlFor="email-address">Notification Email</Label>
                      <Input
                        id="email-address"
                        type="email"
                        placeholder="admin@company.com"
                        className="mt-2"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Auto-Update Settings */}
              <div className="relative overflow-hidden rounded-xl border border-border bg-card/60 backdrop-blur-sm p-6">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />
                
                <div className="relative space-y-4">
                  <div className="flex items-center gap-2 mb-4">
                    <RefreshCw className="h-5 w-5 text-primary" />
                    <h3 className="text-foreground">Auto-Update Policies</h3>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="auto-update">Enable Auto-Update</Label>
                        <p className="text-sm text-muted-foreground">
                          Automatically apply security patches
                        </p>
                      </div>
                      <Switch
                        id="auto-update"
                        checked={autoUpdate}
                        onCheckedChange={setAutoUpdate}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="schedule-windows">Schedule Windows</Label>
                        <p className="text-sm text-muted-foreground">
                          Restrict updates to maintenance windows
                        </p>
                      </div>
                      <Switch
                        id="schedule-windows"
                        checked={scheduleWindows}
                        onCheckedChange={setScheduleWindows}
                      />
                    </div>

                    <div className="pt-4 border-t border-border space-y-2">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <Label>Maintenance Window</Label>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <Input type="time" defaultValue="02:00" />
                        <Input type="time" defaultValue="06:00" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <Button
                onClick={handleSaveSettings}
                className="gap-2 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 rounded-xl"
              >
                Save Settings
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
