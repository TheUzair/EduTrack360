import React, { useState, useMemo } from "react";
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
import { Edit, Trash2, ChevronLeft, ChevronRight, ChevronUp, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const BehavioralRecordTable = ({ records, onEdit, onDelete }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');
  const [filterStudentId, setFilterStudentId] = useState('');
  const [filterIncidentType, setFilterIncidentType] = useState('all');
  const recordsPerPage = 10;

  const getObjectId = (field) => {
    if (!field) return '';
    return field.$oid || field;
  };

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const filteredAndSortedRecords = useMemo(() => {
    let result = [...records];
  
    // Apply filters
    if (filterStudentId) {
      result = result.filter(record => 
        record.student_id.toLowerCase().includes(filterStudentId.toLowerCase())
      );
    }
    if (filterIncidentType && filterIncidentType !== 'all') {
      result = result.filter(record => 
        record.incident_type === filterIncidentType
      );
    }
  
    // Apply sorting
    if (sortColumn) {
      result.sort((a, b) => {
        if (a[sortColumn] < b[sortColumn]) return sortDirection === 'asc' ? -1 : 1;
        if (a[sortColumn] > b[sortColumn]) return sortDirection === 'asc' ? 1 : -1;
        return 0;
      });
    }
  
    return result;
  }, [records, sortColumn, sortDirection, filterStudentId, filterIncidentType]);

  // Calculate pagination
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredAndSortedRecords.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(filteredAndSortedRecords.length / recordsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const renderSortIcon = (column) => {
    if (sortColumn !== column) return null;
    return sortDirection === 'asc' ? <ChevronUp className="h-4 w-4 inline" /> : <ChevronDown className="h-4 w-4 inline" />;
  };

  return (
    <Card className="w-full">
      <div className="p-4 flex flex-col sm:flex-row gap-4">
        <Input
          placeholder="Filter by Student ID"
          value={filterStudentId}
          onChange={(e) => setFilterStudentId(e.target.value)}
          className="max-w-sm"
        />
        <Select
          value={filterIncidentType}
          onValueChange={setFilterIncidentType}
        >
          <SelectTrigger className="max-w-[200px]">
            <SelectValue placeholder="Filter by Incident Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="Positive">Positive</SelectItem>
            <SelectItem value="Negative">Negative</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <ScrollArea className={`min-h-[300px] ${currentRecords.length < 10
          ? 'max-h-[500px]'
          : 'h-[calc(100vh-350px)]'
        }`}>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[60px]" onClick={() => handleSort('student_id')}>
                  Sr. No {renderSortIcon('student_id')}
                </TableHead>
                <TableHead className="w-[100px]" onClick={() => handleSort('student_id')}>
                  Student ID {renderSortIcon('student_id')}
                </TableHead>
                <TableHead onClick={() => handleSort('incident_type')}>
                  Incident Type {renderSortIcon('incident_type')}
                </TableHead>
                <TableHead className="hidden md:table-cell max-w-[300px]" onClick={() => handleSort('description')}>
                  Description {renderSortIcon('description')}
                </TableHead>
                <TableHead className="hidden sm:table-cell" onClick={() => handleSort('action_taken')}>
                  Action Taken {renderSortIcon('action_taken')}
                </TableHead>
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
                    <span className={`px-2 py-1 rounded-full text-xs ${record.incident_type === 'Positive'
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
              {filteredAndSortedRecords.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="text-center h-[300px] text-muted-foreground"
                  >
                    No behavioral records found
                  </TableCell>
                </TableRow>
              )}
              {filteredAndSortedRecords.length > 0 && currentRecords.length < 10 && (
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
      {filteredAndSortedRecords.length > 0 && (
        <div className="flex items-center justify-between px-4 py-4 border-t">
          <div className="text-sm text-muted-foreground">
            Showing {indexOfFirstRecord + 1} to {Math.min(indexOfLastRecord, filteredAndSortedRecords.length)} of {filteredAndSortedRecords.length} entries
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