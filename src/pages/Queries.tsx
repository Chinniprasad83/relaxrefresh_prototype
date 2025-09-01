import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Clock, CheckCircle } from "lucide-react";

export default function Queries() {
  const [queries] = useState([
    {
      id: 1,
      stallName: "HP, Thindivanam",
      query: "What are the rental terms for this location? Is there any security deposit required?",
      status: "pending",
      date: "2 hours ago"
    },
    {
      id: 2,
      stallName: "Indian Oil Station",
      query: "Can you provide more details about the foot traffic and expected revenue?",
      status: "replied",
      date: "1 day ago",
      reply: "Average daily footfall is 500+ customers with estimated monthly revenue of ₹2.5L"
    },
    {
      id: 3,
      stallName: "Sample Station 3",
      query: "Are there any restrictions on the type of business that can be operated?",
      status: "pending",
      date: "3 days ago"
    }
  ]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'replied':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-orange-500" />;
      default:
        return <MessageSquare className="w-4 h-4 text-blue-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'replied':
        return 'bg-green-100 text-green-700';
      case 'pending':
        return 'bg-orange-100 text-orange-700';
      default:
        return 'bg-blue-100 text-blue-700';
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold">Your Queries</h1>
          <p className="text-muted-foreground">
            {queries.length} queries submitted
          </p>
        </div>

        <div className="space-y-4">
          {queries.map((query) => (
            <Card key={query.id} className="p-4 shadow-elegant border-0">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">{query.stallName}</h3>
                  <Badge className={getStatusColor(query.status)}>
                    <div className="flex items-center gap-1">
                      {getStatusIcon(query.status)}
                      <span className="capitalize">{query.status}</span>
                    </div>
                  </Badge>
                </div>
                
                <div className="bg-muted p-3 rounded-lg">
                  <p className="text-sm">{query.query}</p>
                </div>

                {query.reply && (
                  <div className="bg-green-50 p-3 rounded-lg border-l-4 border-green-500">
                    <p className="text-sm text-green-800">{query.reply}</p>
                  </div>
                )}

                <div className="flex justify-between items-center text-xs text-muted-foreground">
                  <span>{query.date}</span>
                  {query.status === 'pending' && (
                    <Button variant="ghost" size="sm">
                      Follow up
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          ))}

          {queries.length === 0 && (
            <div className="text-center py-8">
              <MessageSquare className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground">No queries yet</p>
              <Button className="mt-4" onClick={() => window.history.back()}>
                Browse Stalls
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}