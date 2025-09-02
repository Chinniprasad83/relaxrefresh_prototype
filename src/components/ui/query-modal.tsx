import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { X } from "lucide-react";

interface QueryModalProps {
  open: boolean;
  onClose: () => void;
  stallName: string;
}

export function QueryModal({ open, onClose, stallName }: QueryModalProps) {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (query.trim()) {
      // Here you would typically send the query to your backend
      console.log("Query submitted:", query, "for stall:", stallName);
      setQuery("");
      onClose();
      // Navigate to interest page after posting query
      navigate("/interest");
      // You could show a toast notification here
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="w-[90%] max-w-md mx-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle>Do you have any questions?</DialogTitle>
          </div>
        </DialogHeader>
        
        <div className="space-y-4">
          <Textarea
            placeholder="Type your queries here"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="min-h-[100px] resize-none"
          />
          
          <Button 
            onClick={handleSubmit} 
            className="w-full"
            disabled={!query.trim()}
          >
            Post Query
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}