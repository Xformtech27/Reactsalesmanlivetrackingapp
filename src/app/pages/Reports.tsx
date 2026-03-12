import { useState } from "react";
import { FileText, Download, Calendar, TrendingUp, MapPin, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export function Reports() {
  const [dateRange, setDateRange] = useState("Today");

  // Sample data for charts
  const dailyActivityData = [
    { name: "Mon", visits: 12, distance: 45 },
    { name: "Tue", visits: 15, distance: 52 },
    { name: "Wed", visits: 18, distance: 48 },
    { name: "Thu", visits: 14, distance: 55 },
    { name: "Fri", visits: 20, distance: 60 },
    { name: "Sat", visits: 10, distance: 35 },
    { name: "Sun", visits: 8, distance: 28 },
  ];

  const salesmanPerformanceData = [
    { name: "John Smith", visits: 45, distance: 230 },
    { name: "Sarah Johnson", visits: 38, distance: 195 },
    { name: "Mike Williams", visits: 42, distance: 210 },
    { name: "Emily Davis", visits: 35, distance: 180 },
  ];

  const visitStatusData = [
    { name: "Completed", value: 156, color: "#10b981" },
    { name: "In Progress", value: 12, color: "#f59e0b" },
    { name: "Cancelled", value: 8, color: "#ef4444" },
  ];

  const distanceData = [
    { name: "Week 1", distance: 280 },
    { name: "Week 2", distance: 320 },
    { name: "Week 3", distance: 295 },
    { name: "Week 4", distance: 340 },
  ];

  const reports = [
    {
      id: 1,
      title: "Daily Activity Report",
      description: "Complete daily activity log with visit details",
      date: "March 12, 2026",
      type: "Daily",
    },
    {
      id: 2,
      title: "Location History Report",
      description: "GPS tracking data and route information",
      date: "March 12, 2026",
      type: "Daily",
    },
    {
      id: 3,
      title: "Distance Travelled Report",
      description: "Total distance covered by each salesman",
      date: "March 12, 2026",
      type: "Daily",
    },
    {
      id: 4,
      title: "Visit Summary Report",
      description: "Customer visit statistics and completion rates",
      date: "March 12, 2026",
      type: "Daily",
    },
    {
      id: 5,
      title: "Weekly Performance Report",
      description: "Week-wise performance analysis",
      date: "March 6-12, 2026",
      type: "Weekly",
    },
    {
      id: 6,
      title: "Monthly Analytics Report",
      description: "Monthly trends and insights",
      date: "February 2026",
      type: "Monthly",
    },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Reports</h1>
          <p className="text-gray-600 mt-1">Analytics and insights from field activities</p>
        </div>
        <div className="flex gap-2">
          <select
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
          >
            <option>Today</option>
            <option>This Week</option>
            <option>This Month</option>
            <option>Last Month</option>
          </select>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Visits</CardTitle>
            <Users className="size-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">176</div>
            <p className="text-xs text-green-600 mt-1">+12% from last week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Distance Covered</CardTitle>
            <MapPin className="size-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,235 km</div>
            <p className="text-xs text-green-600 mt-1">+8% from last week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Avg Visit Time</CardTitle>
            <Calendar className="size-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">38 min</div>
            <p className="text-xs text-gray-600 mt-1">Per customer visit</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Success Rate</CardTitle>
            <TrendingUp className="size-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">88.6%</div>
            <p className="text-xs text-green-600 mt-1">+3.2% improvement</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <Tabs defaultValue="activity" className="space-y-4">
        <TabsList>
          <TabsTrigger value="activity">Daily Activity</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="visits">Visit Status</TabsTrigger>
          <TabsTrigger value="distance">Distance Trends</TabsTrigger>
        </TabsList>

        <TabsContent value="activity" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Daily Activity Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={dailyActivityData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="visits" fill="#3b82f6" name="Visits" />
                  <Bar dataKey="distance" fill="#10b981" name="Distance (km)" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Salesman Performance Comparison</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={salesmanPerformanceData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" width={120} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="visits" fill="#8b5cf6" name="Visits" />
                  <Bar dataKey="distance" fill="#f59e0b" name="Distance (km)" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="visits" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Visit Status Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={visitStatusData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={(entry) => `${entry.name}: ${entry.value}`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {visitStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Visit Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {visitStatusData.map((item) => (
                    <div key={item.name} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className="size-4 rounded"
                          style={{ backgroundColor: item.color }}
                        />
                        <span className="font-medium">{item.name}</span>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-lg">{item.value}</div>
                        <div className="text-xs text-gray-500">
                          {((item.value / visitStatusData.reduce((a, b) => a + b.value, 0)) * 100).toFixed(1)}%
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="distance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Distance Travelled Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <LineChart data={distanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="distance"
                    stroke="#3b82f6"
                    strokeWidth={3}
                    name="Distance (km)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Available Reports */}
      <Card>
        <CardHeader>
          <CardTitle>Available Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {reports.map((report) => (
              <div
                key={report.id}
                className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <FileText className="size-8 text-blue-600" />
                  <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded">
                    {report.type}
                  </span>
                </div>
                <h3 className="font-bold text-sm mb-1">{report.title}</h3>
                <p className="text-xs text-gray-600 mb-3">{report.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">{report.date}</span>
                  <Button size="sm" variant="outline" className="gap-1">
                    <Download className="size-3" />
                    Export
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
