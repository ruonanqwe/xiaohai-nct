"use client"

import * as React from "react"
import { CalendarIcon } from "lucide-react"
import { addDays, format } from "date-fns"
import { zhCN } from "date-fns/locale"
import { DateRange } from "react-day-picker"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons"

export function CalendarDateRangePicker({
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 7),
  })

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal bg-white hover:bg-gray-50 border-gray-200",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4 text-gray-500" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "yyyy年MM月dd日", { locale: zhCN })} -{" "}
                  {format(date.to, "yyyy年MM月dd日", { locale: zhCN })}
                </>
              ) : (
                format(date.from, "yyyy年MM月dd日", { locale: zhCN })
              )
            ) : (
              <span>选择日期范围</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent 
          className="w-[320px] p-0 bg-white shadow-xl rounded-lg" 
          align="center"
        >
          <div className="p-3">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-gray-900">
                {format(date?.from || new Date(), "yyyy年M月", { locale: zhCN })}
              </span>
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 p-0 hover:bg-gray-100 rounded-full"
                  onClick={() => {
                    const calendar = document.querySelector('[role="grid"]');
                    if (calendar) {
                      const prevButton = calendar.querySelector('[aria-label="Previous month"]') as HTMLButtonElement;
                      prevButton?.click();
                    }
                  }}
                >
                  <ChevronLeftIcon className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 p-0 hover:bg-gray-100 rounded-full"
                  onClick={() => {
                    const calendar = document.querySelector('[role="grid"]');
                    if (calendar) {
                      const nextButton = calendar.querySelector('[aria-label="Next month"]') as HTMLButtonElement;
                      nextButton?.click();
                    }
                  }}
                >
                  <ChevronRightIcon className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <Calendar
              initialFocus
              mode="range"
              defaultMonth={date?.from}
              selected={date}
              onSelect={setDate}
              numberOfMonths={1}
              locale={zhCN}
              className="border-0"
              formatters={{
                formatCaption: (date: Date) => format(date, "yyyy年M月", { locale: zhCN })
              }}
              classNames={{
                months: "flex justify-center",
                month: "w-full space-y-4",
                caption: "hidden",
                nav: "hidden",
                table: "w-full",
                head_row: "grid grid-cols-7 mb-1",
                head_cell: "text-gray-500 text-sm font-normal text-center",
                row: "grid grid-cols-7 mt-1",
                cell: cn(
                  "text-center text-sm p-0 relative",
                  "focus-within:relative focus-within:z-20",
                  "[&:has([aria-selected])]:bg-blue-50/50"
                ),
                day: cn(
                  "h-9 w-9 p-0 font-normal text-sm",
                  "hover:bg-gray-100 rounded-full",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
                  "aria-selected:opacity-100",
                  "transition-colors"
                ),
                day_selected: cn(
                  "bg-blue-500 text-white hover:bg-blue-600 rounded-full",
                  "shadow-sm"
                ),
                day_today: cn(
                  "bg-gray-100/50 text-gray-900",
                  "before:absolute before:left-1/2 before:-bottom-1 before:w-1 before:h-1",
                  "before:bg-blue-500 before:rounded-full before:-translate-x-1/2"
                ),
                day_outside: "text-gray-300 opacity-50 hover:bg-transparent",
                day_disabled: "text-gray-300 opacity-50 hover:bg-transparent",
                day_range_middle: "aria-selected:bg-blue-50/50",
                day_hidden: "invisible",
              }}
              showWeekNumber={false}
              weekStartsOn={0}
              modifiersClassNames={{
                today: "bg-gray-100/50",
                selected: "bg-blue-500 text-white",
                range_start: "rounded-full",
                range_end: "rounded-full",
              }}
            />
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}

