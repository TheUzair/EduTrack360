import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Edit, Trash2, ChevronLeft, ChevronRight } from "lucide-react";

const BehavioralRecordTable = ({ records, onEdit, onDelete }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;
  
  const getObjectId = (field) => {
    if (!field) return '';
    return field.$oid || field;
  };

  // Calculate pagination
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = records.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(records.length / recordsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <Card className="w-full">
      <ScrollArea className={`min-h-[300px] ${
        currentRecords.length < 10 
          ? 'max-h-[500px]' 
          : 'h-[calc(100vh-250px)]'
      }`}>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[60px]">Sr. No</TableHead>
                <TableHead className="w-[100px]">Student ID</TableHead>
                <TableHead>Incident Type</TableHead>
                <TableHead className="hidden md:table-cell max-w-[300px]">Description</TableHead>
                <TableHead className="hidden sm:table-cell">Action Taken</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentRecords.map((record, index) => (
                <TableRow key={getObjectId(record._id) || `record-${index}`}>
                  <TableCell className="font-medium">
                    {indexOfFirstRecord + index + 1}
                  </TableCell>
                  <TableCell className="font-medium">
                    {record.student_id}
                  </TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      record.incident_type === 'Positive' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {record.incident_type}
                    </span>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <div className="max-w-[300px] truncate">
                            {record.description}
                          </div>
                        </TooltipTrigger>
                        <TooltipContent side="top" className="max-w-[300px]">
                          <p className="whitespace-normal">{record.description}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    {record.action_taken || "N/A"}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => onEdit(record)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>Edit record</TooltipContent>
                        </Tooltip>
                      </TooltipProvider>

                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="destructive"
                              size="icon"
                              onClick={() => onDelete(record)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>Delete record</TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {records.length === 0 && (
                <TableRow>
                  <TableCell 
                    colSpan={6} 
                    className="text-center h-[300px] text-muted-foreground"
                  >
                    No behavioral records found
                  </TableCell>
                </TableRow>
              )}
                  {records.length > 0 && currentRecords.length < 10 && (
                Array.from({ length: 10 - currentRecords.length }, (_, i) => (
                  <TableRow key={`empty-${i}`}>
                    <TableCell colSpan={6}>&nbsp;</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </ScrollArea>

      {/* Pagination Controls */}
      {records.length > 0 && (
        <div className="flex items-center justify-between px-4 py-4 border-t">
          <div className="text-sm text-muted-foreground">
            Showing {indexOfFirstRecord + 1} to {Math.min(indexOfLastRecord, records.length)} of {records.length} entries
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                size="sm"
                onClick={() => handlePageChange(page)}
              >
                {page}
              </Button>
            ))}
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
};

export default BehavioralRecordTable;