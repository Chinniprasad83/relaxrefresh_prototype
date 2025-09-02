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
    <div className="flex justify-between bg-muted p-1 rounded-lg w-full max-w-md">
      {/* Map Button */}
      <Button
        variant={selectedMode === "map" ? "default" : "ghost"}
        size="sm"
        onClick={() => onSelect("map")}
        className="flex items-center justify-center gap-2 flex-1"
      >
        <Map className="w-4 h-4" />
        <span>Map</span>
        {typeof mapCount === "number" && (
          <span className="bg-muted-foreground/20 text-xs px-1.5 py-0.5 rounded">
            {mapCount}
          </span>
        )}
      </Button>

      {/* List Button */}
      <Button
        variant={selectedMode === "list" ? "default" : "ghost"}
        size="sm"
        onClick={() => onSelect("list")}
        className="flex items-center justify-center gap-2 flex-1"
      >
        <List className="w-4 h-4" />
        <span>List</span>
        {typeof listCount === "number" && (
          <span className="bg-muted-foreground/20 text-xs px-1.5 py-0.5 rounded">
            {listCount}
          </span>
        )}
      </Button>
    </div>
  );
};
