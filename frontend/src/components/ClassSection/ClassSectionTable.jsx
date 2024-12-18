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
import { Edit, Trash2, Loader2, ChevronLeft, ChevronRight } from "lucide-react";

const ClassSectionTable = ({
  classSections,
  onEdit,
  onDelete,
  loading,
  error
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const sectionsPerPage = 10;

  // Calculate pagination
  const indexOfLastSection = currentPage * sectionsPerPage;
  const indexOfFirstSection = indexOfLastSection - sectionsPerPage;
  const currentSections = classSections?.slice(indexOfFirstSection, indexOfLastSection);
  const totalPages = Math.ceil((classSections?.length || 0) / sectionsPerPage);

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
        currentSections?.length < 10 
          ? 'max-h-[500px]' 
          : 'h-[calc(100vh-250px)]'
      }`}>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[60px]">Sr. No</TableHead>
                <TableHead className="w-[200px]">Class Name</TableHead>
                <TableHead>Section</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentSections?.map((section, index) => (
                <TableRow key={section._id || `section-${index}`}>
                  <TableCell className="font-medium">
                    {indexOfFirstSection + index + 1}
                  </TableCell>
                  <TableCell className="font-medium">
                    {section.class_name}
                  </TableCell>
                  <TableCell>
                    <span className="px-2 py-1 rounded-full text-xs bg-primary/10 text-primary">
                      {section.section}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => onEdit(section)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>Edit section</TooltipContent>
                        </Tooltip>
                      </TooltipProvider>

                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="destructive"
                              size="icon"
                              onClick={() => onDelete(section)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>Delete section</TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {(!classSections || classSections.length === 0) && (
                <TableRow>
                  <TableCell 
                    colSpan={4} 
                    className="text-center h-[300px] text-muted-foreground"
                  >
                    No class sections found
                  </TableCell>
                </TableRow>
              )}
              {classSections?.length > 0 && currentSections?.length < 10 && (
                Array.from({ length: 10 - currentSections.length }, (_, i) => (
                  <TableRow key={`empty-${i}`}>
                    <TableCell colSpan={4}>&nbsp;</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </ScrollArea>

      {/* Pagination Controls */}
      {classSections?.length > 0 && (
        <div className="flex items-center justify-between px-4 py-4 border-t">
          <div className="text-sm text-muted-foreground">
            Showing {indexOfFirstSection + 1} to {Math.min(indexOfLastSection, classSections.length)} of {classSections.length} entries
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

export default ClassSectionTable;