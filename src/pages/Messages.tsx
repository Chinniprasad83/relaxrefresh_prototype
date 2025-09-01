import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";

export default function Messages() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-foreground">Messages</h1>
      <Card className="p-6 text-center">
        <MessageSquare className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
        <p className="text-muted-foreground mb-4">No new messages</p>
        <Button variant="outline">Refresh</Button>
      </Card>
    </div>
  );
}