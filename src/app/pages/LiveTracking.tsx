import { useState, useEffect } from "react";
import { MapPin, Activity, Navigation, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";

interface SalesmanLocation {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  status: "active" | "inactive";
  lastUpdate: string;
  address: string;
  speed: number;
}

export function LiveTracking() {
  const [salesmen, setSalesmen] = useState<SalesmanLocation[]>([
    {
      id: 1,
      name: "John Smith",
      latitude: 18.5204,
      longitude: 73.8567,
      status: "active",
      lastUpdate: "2 min ago",
      address: "Pune, Maharashtra",
      speed: 35,
    },
    {
      id: 2,
      name: "Sarah Johnson",
      latitude: 19.076,
      longitude: 72.8777,
      status: "active",
      lastUpdate: "1 min ago",
      address: "Mumbai, Maharashtra",
      speed: 0,
    },
    {
      id: 3,
      name: "Mike Williams",
      latitude: 28.7041,
      longitude: 77.1025,
      status: "active",
      lastUpdate: "5 min ago",
      address: "Delhi NCR",
      speed: 45,
    },
    {
      id: 4,
      name: "Emily Davis",
      latitude: 12.9716,
      longitude: 77.5946,
      status: "inactive",
      lastUpdate: "30 min ago",
      address: "Bangalore, Karnataka",
      speed: 0,
    },
  ]);

  const [selectedSalesman, setSelectedSalesman] = useState<SalesmanLocation | null>(salesmen[0]);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setSalesmen((prev) =>
        prev.map((s) => ({
          ...s,
          latitude: s.latitude + (Math.random() - 0.5) * 0.001,
          longitude: s.longitude + (Math.random() - 0.5) * 0.001,
          speed: s.status === "active" ? Math.floor(Math.random() * 60) : 0,
        }))
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const activeSalesmen = salesmen.filter((s) => s.status === "active").length;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Live Tracking</h1>
        <p className="text-gray-600 mt-1">Real-time location monitoring of field salesmen</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Salesmen</CardTitle>
            <Activity className="size-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{salesmen.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Active Now</CardTitle>
            <MapPin className="size-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{activeSalesmen}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Inactive</CardTitle>
            <Navigation className="size-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-600">
              {salesmen.length - activeSalesmen}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Avg Speed</CardTitle>
            <Clock className="size-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(salesmen.reduce((acc, s) => acc + s.speed, 0) / salesmen.length)} km/h
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map Area */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Live Map View</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-100 rounded-lg h-[500px] flex items-center justify-center relative overflow-hidden">
              {/* Simulated Map */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-green-50">
                {/* Grid lines to simulate map */}
                <div className="absolute inset-0 opacity-20">
                  {[...Array(10)].map((_, i) => (
                    <div key={i}>
                      <div
                        className="absolute w-full h-px bg-gray-400"
                        style={{ top: `${i * 10}%` }}
                      />
                      <div
                        className="absolute h-full w-px bg-gray-400"
                        style={{ left: `${i * 10}%` }}
                      />
                    </div>
                  ))}
                </div>

                {/* Salesman markers */}
                {salesmen.map((salesman, index) => (
                  <div
                    key={salesman.id}
                    className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 transition-all"
                    style={{
                      left: `${20 + index * 20}%`,
                      top: `${30 + (index % 2) * 30}%`,
                    }}
                    onClick={() => setSelectedSalesman(salesman)}
                  >
                    <div className="relative">
                      {/* Pulse effect for active salesmen */}
                      {salesman.status === "active" && (
                        <div className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-75" />
                      )}
                      
                      {/* Marker */}
                      <div
                        className={`size-12 rounded-full flex items-center justify-center shadow-lg ${
                          salesman.status === "active"
                            ? "bg-green-500 ring-4 ring-green-200"
                            : "bg-gray-400 ring-4 ring-gray-200"
                        }`}
                      >
                        <MapPin className="size-6 text-white" />
                      </div>

                      {/* Info popup */}
                      {selectedSalesman?.id === salesman.id && (
                        <div className="absolute top-14 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-xl p-3 min-w-[200px] z-10">
                          <div className="text-sm font-bold">{salesman.name}</div>
                          <div className="text-xs text-gray-600 mt-1">{salesman.address}</div>
                          <div className="text-xs text-gray-500 mt-1">
                            Speed: {salesman.speed} km/h
                          </div>
                          <div className="text-xs text-gray-500">Updated: {salesman.lastUpdate}</div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="absolute top-4 left-4 bg-white rounded-lg shadow-md p-3 text-sm">
                <div className="flex items-center gap-2 mb-2">
                  <div className="size-3 rounded-full bg-green-500" />
                  <span>Active</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="size-3 rounded-full bg-gray-400" />
                  <span>Inactive</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Salesman List */}
        <Card>
          <CardHeader>
            <CardTitle>Salesman List</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {salesmen.map((salesman) => (
                <div
                  key={salesman.id}
                  className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
                    selectedSalesman?.id === salesman.id
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => setSelectedSalesman(salesman)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="font-medium text-sm">{salesman.name}</div>
                      <div className="text-xs text-gray-600 mt-1">{salesman.address}</div>
                      <div className="text-xs text-gray-500 mt-1">
                        Last update: {salesman.lastUpdate}
                      </div>
                    </div>
                    <Badge
                      variant={salesman.status === "active" ? "default" : "secondary"}
                      className={
                        salesman.status === "active"
                          ? "bg-green-500 hover:bg-green-600"
                          : ""
                      }
                    >
                      {salesman.status}
                    </Badge>
                  </div>

                  {salesman.status === "active" && (
                    <div className="mt-2 flex items-center gap-2 text-xs text-gray-600">
                      <Navigation className="size-3" />
                      <span>{salesman.speed} km/h</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
