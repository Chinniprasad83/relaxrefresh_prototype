import React from "react";
import { Button } from "@/components/ui/button";
import { Map, List } from "lucide-react";

interface ModeSelectorProps {
  mapCount?: number;
  listCount?: number;
  selectedMode: "map" | "list";
  onSelect: (mode: "map" | "list") => void;
}

export const ModeSelector: React.FC<ModeSelectorProps> = ({
  mapCount,
  listCount,
  selectedMode,
  onSelect,
}) => {
  return (
    <div className="flex gap-2 bg-muted p-1 rounded-lg">
      <Button
        variant={selectedMode === "map" ? "default" : "ghost"}
        size="sm"
        onClick={() => onSelect("map")}
        className="flex items-center gap-2"
      >
        <Map className="w-4 h-4" />
        <span>Map</span>
        {typeof mapCount === 'number' && (
          <span className="bg-muted-foreground/20 text-xs px-1.5 py-0.5 rounded">
            {mapCount}
          </span>
        )}
      </Button>
      
      <Button
        variant={selectedMode === "list" ? "default" : "ghost"}
        size="sm"
        onClick={() => onSelect("list")}
        className="flex items-center gap-2"
      >
        <List className="w-4 h-4" />
        <span>List</span>
        {typeof listCount === 'number' && (
          <span className="bg-muted-foreground/20 text-xs px-1.5 py-0.5 rounded">
            {listCount}
          </span>
        )}
      </Button>
    </div>
  );
};