import { useState } from "react";
import { MapPin, Calendar, Clock, CheckCircle, XCircle, Search } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Input } from "../components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";

interface Visit {
  id: number;
  salesmanName: string;
  customerName: string;
  customerAddress: string;
  checkInTime: string;
  checkOutTime: string | null;
  status: "completed" | "in-progress" | "pending";
  remarks: string;
  latitude: number;
  longitude: number;
  duration: number; // in minutes
}

export function CustomerVisit() {
  const [searchTerm, setSearchTerm] = useState("");
  const [visits] = useState<Visit[]>([
    {
      id: 1,
      salesmanName: "John Smith",
      customerName: "ABC Electronics",
      customerAddress: "Shop 12, MG Road, Pune",
      checkInTime: "09:30 AM",
      checkOutTime: "10:15 AM",
      status: "completed",
      remarks: "Order placed for 50 units",
      latitude: 18.5204,
      longitude: 73.8567,
      duration: 45,
    },
    {
      id: 2,
      salesmanName: "Sarah Johnson",
      customerName: "XYZ Retail Store",
      customerAddress: "Building 5, Andheri West, Mumbai",
      checkInTime: "10:00 AM",
      checkOutTime: null,
      status: "in-progress",
      remarks: "Product demo in progress",
      latitude: 19.076,
      longitude: 72.8777,
      duration: 30,
    },
    {
      id: 3,
      salesmanName: "Mike Williams",
      customerName: "Tech Solutions Ltd",
      customerAddress: "Plot 45, Sector 18, Delhi",
      checkInTime: "11:00 AM",
      checkOutTime: "11:45 AM",
      status: "completed",
      remarks: "Payment collected, invoice issued",
      latitude: 28.7041,
      longitude: 77.1025,
      duration: 45,
    },
    {
      id: 4,
      salesmanName: "John Smith",
      customerName: "Global Mart",
      customerAddress: "Corner Plaza, FC Road, Pune",
      checkInTime: "12:30 PM",
      checkOutTime: "01:00 PM",
      status: "completed",
      remarks: "New product catalog shared",
      latitude: 18.5314,
      longitude: 73.8446,
      duration: 30,
    },
    {
      id: 5,
      salesmanName: "Emily Davis",
      customerName: "Smart Shoppers",
      customerAddress: "Mall Road, Bangalore",
      checkInTime: "02:00 PM",
      checkOutTime: null,
      status: "in-progress",
      remarks: "Discussing bulk order",
      latitude: 12.9716,
      longitude: 77.5946,
      duration: 20,
    },
    {
      id: 6,
      salesmanName: "Mike Williams",
      customerName: "Prime Electronics",
      customerAddress: "Connaught Place, Delhi",
      checkInTime: "03:15 PM",
      checkOutTime: "03:45 PM",
      status: "completed",
      remarks: "Follow-up scheduled for next week",
      latitude: 28.6315,
      longitude: 77.2167,
      duration: 30,
    },
  ]);

  const filteredVisits = visits.filter(
    (visit) =>
      visit.salesmanName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      visit.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      visit.customerAddress.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalVisits = visits.length;
  const completedVisits = visits.filter((v) => v.status === "completed").length;
  const inProgressVisits = visits.filter((v) => v.status === "in-progress").length;
  const avgDuration = Math.round(visits.reduce((acc, v) => acc + v.duration, 0) / visits.length);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Customer Visits</h1>
        <p className="text-gray-600 mt-1">Track and monitor customer visit activities</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Visits</CardTitle>
            <Calendar className="size-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalVisits}</div>
            <p className="text-xs text-gray-500 mt-1">Today</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Completed</CardTitle>
            <CheckCircle className="size-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{completedVisits}</div>
            <p className="text-xs text-gray-500 mt-1">Successfully completed</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">In Progress</CardTitle>
            <Clock className="size-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{inProgressVisits}</div>
            <p className="text-xs text-gray-500 mt-1">Currently ongoing</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Avg Duration</CardTitle>
            <Clock className="size-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgDuration} min</div>
            <p className="text-xs text-gray-500 mt-1">Per visit</p>
          </CardContent>
        </Card>
      </div>

      {/* Visits Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Visit Log</CardTitle>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 size-4 text-gray-400" />
              <Input
                placeholder="Search visits..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Salesman</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Check-in</TableHead>
                  <TableHead>Check-out</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Remarks</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredVisits.map((visit) => (
                  <TableRow key={visit.id}>
                    <TableCell className="font-medium">{visit.salesmanName}</TableCell>
                    <TableCell>{visit.customerName}</TableCell>
                    <TableCell>
                      <div className="flex items-start gap-1">
                        <MapPin className="size-4 text-gray-400 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{visit.customerAddress}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Clock className="size-3 text-gray-400" />
                        <span className="text-sm">{visit.checkInTime}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {visit.checkOutTime ? (
                        <div className="flex items-center gap-1">
                          <Clock className="size-3 text-gray-400" />
                          <span className="text-sm">{visit.checkOutTime}</span>
                        </div>
                      ) : (
                        <span className="text-xs text-gray-400">-</span>
                      )}
                    </TableCell>
                    <TableCell>{visit.duration} min</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          visit.status === "completed"
                            ? "default"
                            : visit.status === "in-progress"
                            ? "secondary"
                            : "outline"
                        }
                        className={
                          visit.status === "completed"
                            ? "bg-green-500 hover:bg-green-600"
                            : visit.status === "in-progress"
                            ? "bg-orange-500 hover:bg-orange-600"
                            : ""
                        }
                      >
                        {visit.status === "completed" && <CheckCircle className="size-3 mr-1" />}
                        {visit.status === "in-progress" && <Clock className="size-3 mr-1" />}
                        {visit.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="max-w-[200px]">
                      <span className="text-sm text-gray-600">{visit.remarks}</span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
