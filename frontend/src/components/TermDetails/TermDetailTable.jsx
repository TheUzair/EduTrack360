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
import { Edit, Trash2, Loader2, Calendar, ChevronLeft, ChevronRight } from "lucide-react";

const TermDetailTable = ({
  termDetails,
  onEdit,
  onDelete,
  loading,
  error
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const termsPerPage = 10;

  const formatDate = (dateField) => {
    if (!dateField) return 'N/A';
    const date = dateField.$date ? new Date(dateField.$date) : new Date(dateField);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  // Calculate pagination
  const indexOfLastTerm = currentPage * termsPerPage;
  const indexOfFirstTerm = indexOfLastTerm - termsPerPage;
  const currentTerms = termDetails?.slice(indexOfFirstTerm, indexOfLastTerm);
  const totalPages = Math.ceil((termDetails?.length || 0) / termsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-48">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-destructive/15 text-destructive px-4 py-3 rounded-md">
        {error}
      </div>
    );
  }

  return (
    <Card className="w-full">
      <ScrollArea className={`min-h-[300px] ${
        currentTerms?.length < 10 
          ? 'max-h-[500px]' 
          : 'h-[calc(100vh-250px)]'
      }`}>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[60px]">Sr. No</TableHead>
                <TableHead>Term Name</TableHead>
                <TableHead className="hidden sm:table-cell">Academic Year</TableHead>
                <TableHead className="hidden md:table-cell">Start Date</TableHead>
                <TableHead className="hidden md:table-cell">End Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentTerms?.map((term, index) => (
                <TableRow key={term.term_id || `term-${index}`}>
                  <TableCell className="font-medium">
                    {indexOfFirstTerm + index + 1}
                  </TableCell>
                  <TableCell className="font-medium">
                    <div>
                      {term.term_name}
                      <div className="sm:hidden text-sm text-muted-foreground">
                        {term.academic_year}
                      </div>
                      <div className="md:hidden text-sm text-muted-foreground">
                        <Calendar className="inline-block h-3 w-3 mr-1" />
                        {formatDate(term.start_date)} - {formatDate(term.end_date)}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    {term.academic_year}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      {formatDate(term.start_date)}
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      {formatDate(term.end_date)}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => onEdit(term)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>Edit term</TooltipContent>
                        </Tooltip>
                      </TooltipProvider>

                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="destructive"
                              size="icon"
                              onClick={() => onDelete(term)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>Delete term</TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {(!termDetails || termDetails.length === 0) && (
                <TableRow>
                  <TableCell 
                    colSpan={6} 
                    className="text-center h-[300px] text-muted-foreground"
                  >
                    No terms found
                  </TableCell>
                </TableRow>
              )}
              {termDetails?.length > 0 && currentTerms?.length < 10 && (
                Array.from({ length: 10 - currentTerms.length }, (_, i) => (
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
      {termDetails?.length > 0 && (
        <div className="flex items-center justify-between px-4 py-4 border-t">
          <div className="text-sm text-muted-foreground">
            Showing {indexOfFirstTerm + 1} to {Math.min(indexOfLastTerm, termDetails.length)} of {termDetails.length} entries
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

export default TermDetailTable;