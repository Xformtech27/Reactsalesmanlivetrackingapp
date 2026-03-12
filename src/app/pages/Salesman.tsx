import { useState } from "react";
import { Users, UserPlus, Search, Phone, Mail, MapPin, Edit, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import { Label } from "../components/ui/label";

interface SalesmanData {
  id: number;
  name: string;
  email: string;
  phone: string;
  region: string;
  status: "active" | "inactive";
  joiningDate: string;
  totalVisits: number;
  avgRating: number;
  distanceCovered: number;
}

export function Salesman() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [salesmen, setSalesmen] = useState<SalesmanData[]>([
    {
      id: 1,
      name: "John Smith",
      email: "john.smith@salestrack.com",
      phone: "+91 9876543210",
      region: "Pune, Maharashtra",
      status: "active",
      joiningDate: "Jan 15, 2025",
      totalVisits: 245,
      avgRating: 4.5,
      distanceCovered: 1250,
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah.j@salestrack.com",
      phone: "+91 9876543211",
      region: "Mumbai, Maharashtra",
      status: "active",
      joiningDate: "Feb 10, 2025",
      totalVisits: 198,
      avgRating: 4.7,
      distanceCovered: 980,
    },
    {
      id: 3,
      name: "Mike Williams",
      email: "mike.w@salestrack.com",
      phone: "+91 9876543212",
      region: "Delhi NCR",
      status: "active",
      joiningDate: "Dec 5, 2024",
      totalVisits: 312,
      avgRating: 4.3,
      distanceCovered: 1580,
    },
    {
      id: 4,
      name: "Emily Davis",
      email: "emily.d@salestrack.com",
      phone: "+91 9876543213",
      region: "Bangalore, Karnataka",
      status: "inactive",
      joiningDate: "Nov 20, 2024",
      totalVisits: 276,
      avgRating: 4.6,
      distanceCovered: 1420,
    },
    {
      id: 5,
      name: "Robert Brown",
      email: "robert.b@salestrack.com",
      phone: "+91 9876543214",
      region: "Chennai, Tamil Nadu",
      status: "active",
      joiningDate: "Jan 8, 2025",
      totalVisits: 189,
      avgRating: 4.4,
      distanceCovered: 920,
    },
    {
      id: 6,
      name: "Lisa Anderson",
      email: "lisa.a@salestrack.com",
      phone: "+91 9876543215",
      region: "Hyderabad, Telangana",
      status: "active",
      joiningDate: "Mar 1, 2025",
      totalVisits: 145,
      avgRating: 4.8,
      distanceCovered: 750,
    },
  ]);

  const [newSalesman, setNewSalesman] = useState({
    name: "",
    email: "",
    phone: "",
    region: "",
  });

  const filteredSalesmen = salesmen.filter(
    (salesman) =>
      salesman.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      salesman.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      salesman.region.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const activeSalesmen = salesmen.filter((s) => s.status === "active").length;
  const totalVisits = salesmen.reduce((acc, s) => acc + s.totalVisits, 0);
  const avgRating =
    salesmen.reduce((acc, s) => acc + s.avgRating, 0) / salesmen.length;
  const totalDistance = salesmen.reduce((acc, s) => acc + s.distanceCovered, 0);

  const handleAddSalesman = () => {
    const newId = Math.max(...salesmen.map((s) => s.id)) + 1;
    setSalesmen([
      ...salesmen,
      {
        id: newId,
        name: newSalesman.name,
        email: newSalesman.email,
        phone: newSalesman.phone,
        region: newSalesman.region,
        status: "active",
        joiningDate: new Date().toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
        totalVisits: 0,
        avgRating: 0,
        distanceCovered: 0,
      },
    ]);
    setNewSalesman({ name: "", email: "", phone: "", region: "" });
    setIsAddDialogOpen(false);
  };

  const handleDelete = (id: number) => {
    setSalesmen(salesmen.filter((s) => s.id !== id));
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Salesman Management</h1>
          <p className="text-gray-600 mt-1">Manage your field sales team</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <UserPlus className="size-4" />
              Add Salesman
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Salesman</DialogTitle>
              <DialogDescription>
                Enter the details of the new salesman to add to your team.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  placeholder="Enter full name"
                  value={newSalesman.name}
                  onChange={(e) =>
                    setNewSalesman({ ...newSalesman, name: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="email@example.com"
                  value={newSalesman.email}
                  onChange={(e) =>
                    setNewSalesman({ ...newSalesman, email: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  placeholder="+91 9876543210"
                  value={newSalesman.phone}
                  onChange={(e) =>
                    setNewSalesman({ ...newSalesman, phone: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="region">Assigned Region</Label>
                <Input
                  id="region"
                  placeholder="City, State"
                  value={newSalesman.region}
                  onChange={(e) =>
                    setNewSalesman({ ...newSalesman, region: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddSalesman}>Add Salesman</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Salesmen</CardTitle>
            <Users className="size-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{salesmen.length}</div>
            <p className="text-xs text-gray-500 mt-1">In your team</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Active Now</CardTitle>
            <Users className="size-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{activeSalesmen}</div>
            <p className="text-xs text-gray-500 mt-1">Currently active</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Visits</CardTitle>
            <MapPin className="size-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalVisits}</div>
            <p className="text-xs text-gray-500 mt-1">All time</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Avg Rating</CardTitle>
            <Users className="size-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgRating.toFixed(1)} ⭐</div>
            <p className="text-xs text-gray-500 mt-1">Team average</p>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 size-5 text-gray-400" />
            <Input
              placeholder="Search by name, email, or region..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Salesmen Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSalesmen.map((salesman) => (
          <Card key={salesman.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="size-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
                    {salesman.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <CardTitle className="text-lg">{salesman.name}</CardTitle>
                    <p className="text-xs text-gray-500 mt-1">Joined {salesman.joiningDate}</p>
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
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Mail className="size-4 text-gray-400" />
                <span className="truncate">{salesman.email}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Phone className="size-4 text-gray-400" />
                <span>{salesman.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MapPin className="size-4 text-gray-400" />
                <span>{salesman.region}</span>
              </div>

              <div className="pt-3 border-t grid grid-cols-3 gap-2 text-center">
                <div>
                  <div className="text-lg font-bold text-blue-600">{salesman.totalVisits}</div>
                  <div className="text-xs text-gray-500">Visits</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-green-600">
                    {salesman.distanceCovered}
                  </div>
                  <div className="text-xs text-gray-500">km</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-orange-600">
                    {salesman.avgRating.toFixed(1)}⭐
                  </div>
                  <div className="text-xs text-gray-500">Rating</div>
                </div>
              </div>

              <div className="flex gap-2 pt-3">
                <Button variant="outline" size="sm" className="flex-1 gap-1">
                  <Edit className="size-3" />
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 gap-1 text-red-600 hover:text-red-700 hover:bg-red-50"
                  onClick={() => handleDelete(salesman.id)}
                >
                  <Trash2 className="size-3" />
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
