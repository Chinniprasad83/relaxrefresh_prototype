import { Card } from "@/components/ui/card";

export default function Dashboard() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-foreground">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="p-6">
          <h3 className="font-semibold text-lg mb-2">Total Stalls</h3>
          <p className="text-3xl font-bold text-primary">12</p>
        </Card>
        <Card className="p-6">
          <h3 className="font-semibold text-lg mb-2">Monthly Revenue</h3>
          <p className="text-3xl font-bold text-secondary">$24,580</p>
        </Card>
        <Card className="p-6">
          <h3 className="font-semibold text-lg mb-2">Active Orders</h3>
          <p className="text-3xl font-bold text-primary">89</p>
        </Card>
      </div>
    </div>
  );
}