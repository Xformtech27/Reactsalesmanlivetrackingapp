import { useState } from "react";
import {
  Users,
  MapPin,
  TrendingUp,
  Activity,
  Clock,
  CheckCircle,
  Navigation,
  UserCheck,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export function Dashboard() {
  const [timeRange] = useState("Today");

  // Mock data
  const weeklyData = [
    { day: "Mon", visits: 12, distance: 45, active: 4 },
    { day: "Tue", visits: 15, distance: 52, active: 4 },
    { day: "Wed", visits: 18, distance: 48, active: 4 },
    { day: "Thu", visits: 14, distance: 55, active: 3 },
    { day: "Fri", visits: 20, distance: 60, active: 4 },
    { day: "Sat", visits: 10, distance: 35, active: 3 },
    { day: "Sun", visits: 8, distance: 28, active: 2 },
  ];

  const recentActivities = [
    {
      id: 1,
      salesman: "John Smith",
      action: "Checked in at ABC Electronics",
      time: "10 min ago",
      type: "visit",
    },
    {
      id: 2,
      salesman: "Sarah Johnson",
      action: "Completed visit at XYZ Retail",
      time: "25 min ago",
      type: "completed",
    },
    {
      id: 3,
      salesman: "Mike Williams",
      action: "Started duty",
      time: "1 hour ago",
      type: "duty",
    },
    {
      id: 4,
      salesman: "Emily Davis",
      action: "Checked in at Smart Shoppers",
      time: "2 hours ago",
      type: "visit",
    },
    {
      id: 5,
      salesman: "John Smith",
      action: "Completed visit at Global Mart",
      time: "3 hours ago",
      type: "completed",
    },
  ];

  const topPerformers = [
    { name: "John Smith", visits: 20, distance: 95, rating: 4.8 },
    { name: "Mike Williams", visits: 18, distance: 88, rating: 4.6 },
    { name: "Sarah Johnson", visits: 17, distance: 82, rating: 4.7 },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">
            Welcome back! Here's what's happening with your sales team today.
          </p>
        </div>
        <Badge variant="outline" className="px-4 py-2 text-sm">
          {timeRange}
        </Badge>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Active Salesmen
            </CardTitle>
            <Activity className="size-5 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">4</div>
            <p className="text-xs text-gray-500 mt-1">out of 6 total</p>
            <div className="mt-2 flex items-center text-xs text-green-600">
              <TrendingUp className="size-3 mr-1" />
              <span>+2 from yesterday</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Today's Visits
            </CardTitle>
            <UserCheck className="size-5 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">24</div>
            <p className="text-xs text-gray-500 mt-1">18 completed, 6 pending</p>
            <div className="mt-2 flex items-center text-xs text-green-600">
              <TrendingUp className="size-3 mr-1" />
              <span>+15% from yesterday</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Distance Covered
            </CardTitle>
            <MapPin className="size-5 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-600">285 km</div>
            <p className="text-xs text-gray-500 mt-1">Across all salesmen</p>
            <div className="mt-2 flex items-center text-xs text-green-600">
              <TrendingUp className="size-3 mr-1" />
              <span>+8% from yesterday</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Avg Visit Time
            </CardTitle>
            <Clock className="size-5 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-orange-600">42 min</div>
            <p className="text-xs text-gray-500 mt-1">Per customer visit</p>
            <div className="mt-2 flex items-center text-xs text-gray-600">
              <span>Same as yesterday</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Visits Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Weekly Visits Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="visits"
                  stroke="#3b82f6"
                  fill="#3b82f6"
                  fillOpacity={0.6}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Distance Covered */}
        <Card>
          <CardHeader>
            <CardTitle>Distance Covered (km)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="distance" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top Performers */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Top Performers This Week</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topPerformers.map((performer, index) => (
                <div
                  key={performer.name}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center size-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <div className="font-medium">{performer.name}</div>
                      <div className="text-sm text-gray-500">
                        {performer.visits} visits • {performer.distance} km
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-right">
                      <div className="font-bold text-orange-600">
                        {performer.rating} ⭐
                      </div>
                      <div className="text-xs text-gray-500">Rating</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex gap-3">
                  <div
                    className={`size-2 rounded-full mt-2 flex-shrink-0 ${
                      activity.type === "completed"
                        ? "bg-green-500"
                        : activity.type === "visit"
                        ? "bg-blue-500"
                        : "bg-orange-500"
                    }`}
                  />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{activity.salesman}</p>
                    <p className="text-xs text-gray-600">{activity.action}</p>
                    <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Stats Summary */}
      <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <CardContent className="pt-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-3xl font-bold">97%</div>
              <div className="text-sm text-blue-100 mt-1">Visit Success Rate</div>
            </div>
            <div>
              <div className="text-3xl font-bold">1,850</div>
              <div className="text-sm text-blue-100 mt-1">Total Visits (Month)</div>
            </div>
            <div>
              <div className="text-3xl font-bold">4.6 ⭐</div>
              <div className="text-sm text-blue-100 mt-1">Avg Team Rating</div>
            </div>
            <div>
              <div className="text-3xl font-bold">3,420 km</div>
              <div className="text-sm text-blue-100 mt-1">Total Distance (Month)</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
