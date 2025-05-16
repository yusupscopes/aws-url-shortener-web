"use client";

import { useState } from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface ExpirationPickerProps {
  value: number | null;
  onChange: (days: number | null) => void;
}

export default function ExpirationPicker({ value, onChange }: ExpirationPickerProps) {
  const [option, setOption] = useState<"never" | "custom" | "preset">(
    value === null ? "never" : "preset"
  );
  const [date, setDate] = useState<Date | undefined>(
    value ? new Date(Date.now() + value * 24 * 60 * 60 * 1000) : undefined
  );

  const handleOptionChange = (newOption: "never" | "custom" | "preset") => {
    setOption(newOption);
    
    if (newOption === "never") {
      onChange(null);
    } else if (newOption === "preset") {
      onChange(7); // Default to 7 days
    }
  };

  const handlePresetChange = (days: number) => {
    onChange(days);
  };

  const handleDateChange = (newDate: Date | undefined) => {
    setDate(newDate);
    
    if (newDate) {
      // Calculate days difference
      const diffTime = newDate.getTime() - Date.now();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      onChange(diffDays > 0 ? diffDays : 1); // Minimum 1 day
    }
  };

  return (
    <div className="space-y-3">
      <div>
        <Label>Link expiration</Label>
        <RadioGroup
          defaultValue="never"
          value={option}
          onValueChange={(val) => handleOptionChange(val as any)}
          className="mt-2 flex flex-col space-y-1"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="never" id="never" />
            <Label htmlFor="never" className="font-normal">Never expire</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="preset" id="preset" />
            <Label htmlFor="preset" className="font-normal">Expire after</Label>
            {option === "preset" && (
              <div className="flex gap-2 ml-2">
                {[1, 7, 30, 90].map((days) => (
                  <Button
                    key={days}
                    type="button"
                    size="sm"
                    variant={value === days ? "default" : "outline"}
                    className="h-7 px-2"
                    onClick={() => handlePresetChange(days)}
                  >
                    {days} {days === 1 ? "day" : "days"}
                  </Button>
                ))}
              </div>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="custom" id="custom" />
            <Label htmlFor="custom" className="font-normal">Custom date</Label>
            {option === "custom" && (
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className={cn(
                      "ml-2 w-[160px] justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={handleDateChange}
                    initialFocus
                    disabled={(date) => date < new Date()}
                  />
                </PopoverContent>
              </Popover>
            )}
          </div>
        </RadioGroup>
      </div>
    </div>
  );
}