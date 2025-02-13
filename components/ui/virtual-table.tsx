"use client"

import { useVirtualizer } from "@tanstack/react-virtual"
import { useRef, useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./table"
import type { VirtualItem } from "@tanstack/react-virtual"

interface VirtualTableProps<T> {
  data: T[]
  columns: {
    header: string
    accessorKey: keyof T
    cell?: (item: T) => React.ReactNode
  }[]
  rowHeight?: number
  className?: string
  onRowClick?: (item: T) => void
}

export function VirtualTable<T extends { id: string | number }>({ 
  data, 
  columns, 
  rowHeight = 60,
  className,
  onRowClick 
}: VirtualTableProps<T>) {
  const parentRef = useRef<HTMLDivElement>(null)
  const [parentHeight, setParentHeight] = useState(0)

  useEffect(() => {
    if (parentRef.current) {
      setParentHeight(parentRef.current.offsetHeight)
    }
  }, [])

  const rowVirtualizer = useVirtualizer({
    count: data.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => rowHeight,
    overscan: 5
  })

  return (
    <div ref={parentRef} className={`h-[600px] overflow-auto ${className}`}>
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableHead key={String(column.accessorKey)}>{column.header}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          <div
            style={{
              height: `${rowVirtualizer.getTotalSize()}px`,
              width: "100%",
              position: "relative",
            }}
          >
            {rowVirtualizer.getVirtualItems().map((virtualRow: VirtualItem) => {
              const item = data[virtualRow.index]
              return (
                <TableRow
                  key={item.id}
                  data-index={virtualRow.index}
                  className={onRowClick ? "cursor-pointer hover:bg-accent" : ""}
                  onClick={() => onRowClick?.(item)}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: `${virtualRow.size}px`,
                    transform: `translateY(${virtualRow.start}px)`,
                  }}
                >
                  {columns.map((column) => (
                    <TableCell key={String(column.accessorKey)}>
                      {column.cell 
                        ? column.cell(item)
                        : String(item[column.accessorKey])}
                    </TableCell>
                  ))}
                </TableRow>
              )
            })}
          </div>
        </TableBody>
      </Table>
    </div>
  )
} 