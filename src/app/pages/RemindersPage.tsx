import { useState } from 'react';
import { Bell, Clock, Package, Sparkles } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { toast } from 'sonner';

export function RemindersPage() {
  const [reminders, setReminders] = useState({
    dailyRoutine: true,
    newProducts: false,
    delivery: true,
  });

  const handleToggle = (key: keyof typeof reminders) => {
    setReminders((prev) => ({ ...prev, [key]: !prev[key] }));
    toast.success("Reminder settings updated");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fdfbf8] to-white py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#8b9a8d] to-[#a8c4a8] flex items-center justify-center mx-auto mb-4 shadow-lg shadow-[#8b9a8d]/20">
            <Bell className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-semibold mb-3 text-gray-900">Routine Reminders</h1>
          <p className="text-muted-foreground text-lg">Manage your skincare notifications and alerts</p>
        </div>

        <div className="space-y-6">
          {/* Daily Skincare Routine */}
          <Card className="border-border hover:border-primary/30 transition-all duration-300 shadow-sm hover:shadow-md overflow-hidden relative">
            <div className={`absolute top-0 left-0 w-1.5 h-full ${reminders.dailyRoutine ? 'bg-primary' : 'bg-transparent'}`}></div>
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">Daily Skin care Routine</h3>
                    <p className="text-sm text-muted-foreground mt-1">Notification sent for Daily Skin care Routine</p>
                  </div>
                </div>
                <Button 
                  variant={reminders.dailyRoutine ? "default" : "outline"} 
                  onClick={() => handleToggle('dailyRoutine')}
                  className={`w-full sm:w-auto ${reminders.dailyRoutine ? "bg-primary hover:bg-primary/90 shadow-md shadow-primary/20" : ""}`}
                >
                  {reminders.dailyRoutine ? "Enabled" : "Disabled"}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* New Products */}
          <Card className="border-border hover:border-primary/30 transition-all duration-300 shadow-sm hover:shadow-md overflow-hidden relative">
            <div className={`absolute top-0 left-0 w-1.5 h-full ${reminders.newProducts ? 'bg-accent-foreground' : 'bg-transparent'}`}></div>
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#ffd4d4]/30 flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-6 h-6 text-accent-foreground" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">New Product Recommendations</h3>
                    <p className="text-sm text-muted-foreground mt-1">Notification sent for New Products which match profile</p>
                  </div>
                </div>
                <Button 
                  variant={reminders.newProducts ? "default" : "outline"} 
                  onClick={() => handleToggle('newProducts')}
                  className={`w-full sm:w-auto ${reminders.newProducts ? "bg-accent-foreground hover:bg-accent-foreground/90 text-white shadow-md shadow-[#ffd4d4]/50" : ""}`}
                >
                  {reminders.newProducts ? "Enabled" : "Disabled"}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Delivery Notifications */}
          <Card className="border-border hover:border-primary/30 transition-all duration-300 shadow-sm hover:shadow-md overflow-hidden relative">
            <div className={`absolute top-0 left-0 w-1.5 h-full ${reminders.delivery ? 'bg-blue-500' : 'bg-transparent'}`}></div>
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
                    <Package className="w-6 h-6 text-blue-500" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">Order Delivery Updates</h3>
                    <p className="text-sm text-muted-foreground mt-1">Notification delivered</p>
                  </div>
                </div>
                <Button 
                  variant={reminders.delivery ? "default" : "outline"} 
                  onClick={() => handleToggle('delivery')}
                  className={`w-full sm:w-auto ${reminders.delivery ? "bg-blue-500 hover:bg-blue-600 text-white shadow-md shadow-blue-500/20" : ""}`}
                >
                  {reminders.delivery ? "Enabled" : "Disabled"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
