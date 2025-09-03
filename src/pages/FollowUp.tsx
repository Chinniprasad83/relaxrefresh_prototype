import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Clock,
  MessageCircle,
  FileText,
  Plus,
  Calendar,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

const FollowUp = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [uploadingDocument, setUploadingDocument] = useState(false);

  // Mock data
  const stallData = {
    id: id || "1",
    name: "HP, Thindivanam",
    distance: "23 km",
    road: "GST road, NH45",
    space: "3000 sqft",
    city: "Villupuram",
  };

  const deadlines = [
    {
      id: "1",
      title: "Contract SLA",
      subtitle: "Service Agreement #1082",
      dueDate: "Due in 3 days",
      status: "urgent",
    },
  ];

  const queries = [
    {
      id: "1",
      status: "pending",
      question:
        "What are the rental terms for this location? Is there any security deposit required?",
      time: "2 hours ago",
    },
    {
      id: "2",
      status: "replied",
      question:
        "Can you provide more details about the foot traffic and expected revenue?",
      answer:
        "Average daily footfall is 500+ customers with estimated monthly revenue of ₹2.5L",
      time: "1 day ago",
    },
  ];

  const documents = [
    {
      id: "1",
      name: "Site photos.pdf",
      modified: "Oct 12, 2025",
    },
    {
      id: "2",
      name: "Agreement_draft.docx",
      modified: "Oct 8, 2025",
    },
    {
      id: "3",
      name: "Miscellaneous Details.pdf",
      modified: "Oct 5, 2025",
    },
  ];

  const handleDocumentUpload = () => {
    setUploadingDocument(true);
    // Simulate document upload
    setTimeout(() => {
      setUploadingDocument(false);
      // toast({
      //   title: "Document Uploaded",
      //   description: "Your document has been uploaded successfully",
      // });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background-secondary"
    style={{paddingBottom: '170px'}} /* Account for Dynamic Island */>
      {/* Header */}
      <motion.div
        className="sticky top-0 z-40 bg-gradient-primary text-white px-6 pt-2 pb-1 shadow-elevated"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center space-x-4 mb-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="text-white hover:bg-white/10"
          >
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <div className="flex-1">
            <h1 className="text-lg font-semibold">{stallData.name}</h1>
            <p className="text-white/80 text-sm">
              Distance: {stallData.distance}, Road: {stallData.road}, Space:{" "}
              {stallData.space}, City: {stallData.city}
            </p>
          </div>
        </div>
      </motion.div>

      <div className="p-6 space-y-6">
        {/* Upcoming Deadlines */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="shadow-card border-0 bg-card rounded-3xl">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-warning/10 rounded-xl flex items-center justify-center">
                  <Clock className="w-5 h-5 text-warning" />
                </div>
                <span>Upcoming Deadlines</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {deadlines.map((deadline) => (
                <div
                  key={deadline.id}
                  className="bg-muted/50 rounded-2xl p-4 flex items-center justify-between"
                >
                  <div className="flex-1">
                    <h4 className="font-semibold text-foreground">
                      {deadline.title}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {deadline.subtitle}
                    </p>
                  </div>
                  <Badge variant="destructive" className="ml-4">
                    <AlertCircle className="w-3 h-3 mr-1" />
                    {deadline.dueDate}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* Queries & Responses */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Card className="shadow-card border-0 bg-card rounded-3xl">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-primary" />
                </div>
                <span>Queries & Responses</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {queries.map((query) => (
                <div
                  key={query.id}
                  className="bg-muted/50 rounded-2xl p-4 space-y-3"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="font-semibold text-foreground">
                          {stallData.name}
                        </span>
                        <Badge
                          variant={query.status === "pending" ? "secondary" : "default"}
                          className={
                            query.status === "pending"
                              ? "bg-warning/20 text-warning"
                              : "bg-success/20 text-success"
                          }
                        >
                          {query.status === "pending" ? (
                            <Clock className="w-3 h-3 mr-1" />
                          ) : (
                            <CheckCircle className="w-3 h-3 mr-1" />
                          )}
                          {query.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-foreground mb-2">
                        {query.question}
                      </p>
                      {query.answer && (
                        <div className="bg-success/10 rounded-xl p-3 mt-3">
                          <p className="text-sm text-foreground">
                            {query.answer}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">{query.time}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Documents */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Card className="shadow-card border-0 bg-card rounded-3xl">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-destructive/10 rounded-xl flex items-center justify-center">
                    <FileText className="w-5 h-5 text-destructive" />
                  </div>
                  <span>Recent Documents</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-primary hover:text-primary-dark"
                >
                  View all
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {documents.map((doc) => (
                <div
                  key={doc.id}
                  className="bg-muted/50 rounded-2xl p-4 flex items-center justify-between hover:bg-muted/70 transition-smooth cursor-pointer"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                      <FileText className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{doc.name}</p>
                      <p className="text-sm text-muted-foreground">
                        Modified: {doc.modified}
                      </p>
                    </div>
                  </div>
                </div>
              ))}

              {/* Upload Button */}
              <Button
                onClick={handleDocumentUpload}
                disabled={uploadingDocument}
                className="w-full mt-4 bg-muted/50 hover:bg-muted text-foreground border-2 border-dashed border-border hover:border-primary transition-smooth"
                variant="ghost"
              >
                <Plus className="w-5 h-5 mr-2" />
                {uploadingDocument ? "Uploading..." : "Upload Document"}
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default FollowUp;