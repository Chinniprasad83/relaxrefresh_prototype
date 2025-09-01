import { Card } from "@/components/ui/card";

export default function Analytics() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-foreground">Analytics</h1>
      <Card className="p-6">
        <p className="text-muted-foreground">Analytics dashboard coming soon...</p>
        <div className="mt-4 space-y-2">
          <div className="h-4 bg-secondary/20 rounded animate-pulse"></div>
          <div className="h-4 bg-secondary/20 rounded animate-pulse w-3/4"></div>
          <div className="h-4 bg-secondary/20 rounded animate-pulse w-1/2"></div>
        </div>
      </Card>
    </div>
  );
}