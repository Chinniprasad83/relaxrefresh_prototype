import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, FileText, PlusCircle, ArrowLeft } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

export default function FollowUp() {
  const navigate = useNavigate();
  const location = useLocation();
  const { stall } = location.state || {};

  const deadlines = [
    { id: 1, title: "Contract SLA", agreement: "Service Agreement #1082", due: "Due in 3 days" }
  ];

  const queries = [
    { id: 1, status: "Pending", question: "What are the rental terms for this location? Is there any security deposit required?", time: "2 hours ago" },
    { id: 2, status: "Replied", question: "Can you provide more details about the foot traffic and expected revenue?", answer: "Average daily footfall is 500+ customers with estimated monthly revenue of ₹2.5L", time: "1 day ago" }
  ];

  const documents = [
    { id: 1, name: "Site photos.pdf", date: "Oct 12, 2025" },
    { id: 2, name: "Agreement_draft.docx", date: "Oct 8, 2025" },
    { id: 3, name: "Miscellaneous Details.pdf", date: "Oct 5, 2025" }
  ];

  return (
    <div className="min-h-screen bg-background px-6 py-3 space-y-6">
      {/* Back Arrow + Stall Info */}
       <div className="flex items-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(-1)}
            className="p-0"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </div>
      <div className="flex items-center gap-4"
      style={{marginTop: '0px'}}>
        {stall && (
          <div className="flex items-center gap-4">
            <img src={stall.image} alt={stall.name} className="w-20 h-20 object-cover rounded-lg" />
            <div className="space-y-1">
              <p className="font-semibold text-lg">{stall.name}</p>
              <p className="text-sm text-muted-foreground">
                Distance: {stall.distance}, Road: {stall.road}, Space: {stall.space}, City: {stall.city}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Deadlines */}
      <div>
        <h2 className="text-xl font-bold mb-3">Upcoming Deadlines</h2>
        {deadlines.map(item => (
          <Card key={item.id} className="p-4 flex flex-col gap-2 border-l-4 border-violet-900">
            <p className="font-semibold">{item.title}</p>
            <p className="text-sm text-muted-foreground">{item.agreement}</p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="w-4 h-4" /> {item.due}
            </div>
          </Card>
        ))}
      </div>

      {/* Queries & Responses */}
      <div>
        <h2 className="text-xl font-bold mb-3">Queries & Responses</h2>
        {queries.map(q => (
          <Card key={q.id} className="p-4 space-y-2 mb-2">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold">{stall?.name}</h3>
              <span className={`text-xs px-2 py-1 rounded-full ${
                q.status === "Pending" ? "bg-orange-100 text-orange-600" : "bg-green-100 text-green-600"
              }`}>
                {q.status}
              </span>
            </div>
            <p className="text-sm text-muted-foreground">{q.question}</p>
            {q.answer && <p className="text-sm bg-green-50 p-2 rounded-md">{q.answer}</p>}
            <p className="text-xs text-muted-foreground">{q.time}</p>
          </Card>
        ))}
      </div>

      {/* Recent Documents */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-xl font-bold">Recent Documents</h2>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm">View all</Button>
            <Button variant="outline" size="icon">
              <PlusCircle className="w-4 h-4" />
            </Button>
          </div>
        </div>
        <div className="space-y-2">
          {documents.map(doc => (
            <Card key={doc.id} className="p-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-500" />
                <p className="text-sm font-medium">{doc.name}</p>
              </div>
              <span className="text-xs text-muted-foreground">Modified: {doc.date}</span>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
