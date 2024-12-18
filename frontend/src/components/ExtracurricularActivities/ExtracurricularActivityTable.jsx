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

const ExtracurricularActivityTable = ({ activities, onEdit, onDelete }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const activitiesPerPage = 10;

  const formatDate = (dateField) => {
    if (!dateField) return 'N/A';
    const date = dateField.$date ? new Date(dateField.$date) : new Date(dateField);
    return date.toLocaleDateString();
  };

  const getObjectId = (field) => {
    if (!field) return '';
    return field.$oid || field;
  };

  // Calculate pagination
  const indexOfLastActivity = currentPage * activitiesPerPage;
  const indexOfFirstActivity = indexOfLastActivity - activitiesPerPage;
  const currentActivities = activities?.slice(indexOfFirstActivity, indexOfLastActivity);
  const totalPages = Math.ceil((activities?.length || 0) / activitiesPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <Card className="w-full">
      <ScrollArea className={`min-h-[300px] ${
        currentActivities?.length < 10 
          ? 'max-h-[500px]' 
          : 'h-[calc(100vh-250px)]'
      }`}>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[60px]">Sr. No</TableHead>
                <TableHead className="whitespace-nowrap">Student ID</TableHead>
                <TableHead className="whitespace-nowrap">Activity Name</TableHead>
                <TableHead className="hidden md:table-cell">Type</TableHead>
                <TableHead className="hidden md:table-cell">Date</TableHead>
                <TableHead className="hidden lg:table-cell">Level</TableHead>
                <TableHead className="hidden lg:table-cell">Award</TableHead>
                <TableHead className="hidden xl:table-cell">Teacher ID</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentActivities?.map((activity, index) => (
                <TableRow key={getObjectId(activity._id) || `activity-${index}`}>
                  <TableCell className="font-medium">
                    {indexOfFirstActivity + index + 1}
                  </TableCell>
                  <TableCell className="font-medium">
                    {getObjectId(activity.student_id)}
                  </TableCell>
                  <TableCell>
                    <div>
                      {activity.activity_name}
                      <div className="md:hidden text-sm text-muted-foreground">
                        {activity.activity_type} - {formatDate(activity.participation_date)}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {activity.activity_type}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {formatDate(activity.participation_date)}
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    <span className="px-2 py-1 rounded-full text-xs bg-primary/10 text-primary">
                      {activity.level_of_participation}
                    </span>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    {activity.award_received || "N/A"}
                  </TableCell>
                  <TableCell className="hidden xl:table-cell">
                    {getObjectId(activity.teacher_in_charge)}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => onEdit(activity)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>Edit activity</TooltipContent>
                        </Tooltip>
                      </TooltipProvider>

                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="destructive"
                              size="icon"
                              onClick={() => onDelete(activity)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>Delete activity</TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {(!activities || activities.length === 0) && (
                <TableRow>
                  <TableCell 
                    colSpan={9} 
                    className="text-center h-[300px] text-muted-foreground"
                  >
                    No activities found
                  </TableCell>
                </TableRow>
              )}
              {activities?.length > 0 && currentActivities?.length < 10 && (
                Array.from({ length: 10 - currentActivities.length }, (_, i) => (
                  <TableRow key={`empty-${i}`}>
                    <TableCell colSpan={9}>&nbsp;</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </ScrollArea>

      {/* Pagination Controls */}
      {activities?.length > 0 && (
        <div className="flex items-center justify-between px-4 py-4 border-t">
          <div className="text-sm text-muted-foreground">
            Showing {indexOfFirstActivity + 1} to {Math.min(indexOfLastActivity, activities.length)} of {activities.length} entries
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

export default ExtracurricularActivityTable;