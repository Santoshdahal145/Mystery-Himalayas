"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface PageSizeSelectorProps {
  limit: number;
  onLimitChange: (limit: number) => void;
  options?: number[];
}

export function PageSizeSelector({
  limit,
  onLimitChange,
  options = [5, 10, 20, 50],
}: PageSizeSelectorProps) {
  return (
    <Select
      value={String(limit)}
      onValueChange={(value) => onLimitChange(Number(value))}
    >
      <SelectTrigger className="w-[120px]">
        <SelectValue placeholder="Rows" />
      </SelectTrigger>
      <SelectContent>
        {options.map((opt) => (
          <SelectItem key={opt} value={String(opt)}>
            {opt} / page
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
