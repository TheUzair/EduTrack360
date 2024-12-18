import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
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
import { Edit, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const StudentAwardTable = ({ 
  awards, 
  onEdit, 
  onDelete, 
  onDeleteConfirm, 
  setIsDeleting 
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const awardsPerPage = 10;

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
  const indexOfLastAward = currentPage * awardsPerPage;
  const indexOfFirstAward = indexOfLastAward - awardsPerPage;
  const currentAwards = awards?.slice(indexOfFirstAward, indexOfLastAward);
  const totalPages = Math.ceil((awards?.length || 0) / awardsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <Card className="w-full">
      <ScrollArea className={`min-h-[300px] ${
        currentAwards?.length < 10 
          ? 'max-h-[500px]' 
          : 'h-[calc(100vh-250px)]'
      }`}>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[60px]">Sr. No</TableHead>
                <TableHead className="w-[200px]">Award Name</TableHead>
                <TableHead className="hidden md:table-cell">Category</TableHead>
                <TableHead className="hidden sm:table-cell">Date Awarded</TableHead>
                <TableHead className="hidden lg:table-cell">Awarding Body</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentAwards?.map((award, index) => (
                <TableRow key={award._id}>
                  <TableCell className="font-medium">
                    {indexOfFirstAward + index + 1}
                  </TableCell>
                  <TableCell className="font-medium">
                    <div>
                      {award.award_name}
                      <div className="md:hidden text-sm text-muted-foreground">
                        {award.award_category}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {award.award_category}
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    {formatDate(award.date_awarded)}
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    {award.awarding_body}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => onEdit(award)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>Edit award</TooltipContent>
                        </Tooltip>
                      </TooltipProvider>

                      <AlertDialog>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <AlertDialogTrigger asChild>
                                <Button
                                  variant="destructive"
                                  size="icon"
                                  onClick={() => onDelete(award._id)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </AlertDialogTrigger>
                            </TooltipTrigger>
                            <TooltipContent>Delete award</TooltipContent>
                          </Tooltip>
                        </TooltipProvider>

                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Award</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete this award? This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel onClick={() => setIsDeleting(false)}>
                              Cancel
                            </AlertDialogCancel>
                            <AlertDialogAction
                              onClick={onDeleteConfirm}
                              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {(!awards || awards.length === 0) && (
                <TableRow>
                  <TableCell 
                    colSpan={6} 
                    className="text-center h-[300px] text-muted-foreground"
                  >
                    No awards found
                  </TableCell>
                </TableRow>
              )}
              {awards?.length > 0 && currentAwards?.length < 10 && (
                Array.from({ length: 10 - currentAwards.length }, (_, i) => (
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
      {awards?.length > 0 && (
        <div className="flex items-center justify-between px-4 py-4 border-t">
          <div className="text-sm text-muted-foreground">
            Showing {indexOfFirstAward + 1} to {Math.min(indexOfLastAward, awards.length)} of {awards.length} entries
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

export default StudentAwardTable;