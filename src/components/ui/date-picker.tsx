import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DateRangePickerProps {
  onDateRangeChange: (startDate: Date | undefined, endDate: Date | undefined) => void;
  className?: string;
}

export const DateRangePicker: React.FC<DateRangePickerProps> = ({ onDateRangeChange, className }) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const handleStartDateChange = (date: Date | null) => {
    setStartDate(date);
    onDateRangeChange(date || undefined, endDate || undefined);
  };

  const handleEndDateChange = (date: Date | null) => {
    setEndDate(date);
    onDateRangeChange(startDate || undefined, date || undefined);
  };

  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <div className="relative">
        <DatePicker
          selected={startDate}
          onChange={handleStartDateChange}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          maxDate={endDate || new Date()}
          placeholderText="Start Date"
          className="w-32 pl-8 pr-2 py-1 border rounded-md text-sm"
        />
        <Calendar className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
      </div>
      <span className="text-gray-400">to</span>
      <div className="relative">
        <DatePicker
          selected={endDate}
          onChange={handleEndDateChange}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          maxDate={new Date()}
          placeholderText="End Date"
          className="w-32 pl-8 pr-2 py-1 border rounded-md text-sm"
        />
        <Calendar className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
      </div>
    </div>
  );
}; 