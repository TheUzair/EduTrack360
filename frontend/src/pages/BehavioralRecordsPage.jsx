import React, { useState, useEffect } from 'react';
import api from '../services/api';
import endpoints from '../services/endpoints';
import BehavioralRecordForm from '../components/BehavioralRecords/BehavioralRecordForm';
import BehavioralRecordTable from '../components/BehavioralRecords/BehavioralRecordTable';
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Plus, AlertCircle } from 'lucide-react';
import { Card } from "@/components/ui/card";

const BehavioralRecordsPage = () => {
  const { toast } = useToast();
  const [records, setRecords] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteRecordId, setDeleteRecordId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const fetchRecords = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await api.get(endpoints.BEHAVIORAL_RECORDS);
      setRecords(response.data);
    } catch (error) {
      setError("Failed to fetch behavioral records.");
      toast({
        title: "Error",
        description: "Failed to fetch records",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const validateRecord = (record) => {
    if (!record.student_id || !record.incident_type || !record.description) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return false;
    }

    if (!['Positive', 'Negative'].includes(record.incident_type)) {
      toast({
        title: "Validation Error",
        description: "Incident type must be either 'Positive' or 'Negative'",
        variant: "destructive",
      });
      return false;
    }

    return true;
  };

  const handleCreate = async (record) => {
    setIsSubmitting(true);
    try {
      if (!validateRecord(record)) {
        setIsSubmitting(false);
        return;
      }

      const formattedRecord = {
        student_id: record.student_id,
        incident_date: new Date().toISOString(),
        incident_type: record.incident_type,
        description: record.description.trim(),
        action_taken: record.action_taken?.trim() || '',
        staff_id: record.staff_id,
        resolution_date: record.resolution_date || null,
        follow_up_required: record.follow_up_required || false,
        created_by: "admin",
        updated_by: "admin",
      };
 
      const response = await api.post(endpoints.BEHAVIORAL_RECORDS, formattedRecord);
      setRecords((prev) => [...prev, response.data]);
      setIsFormOpen(false);
      toast({
        title: "Success",
        description: "Record created successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to create record",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdate = async (record) => {
    setIsLoading(true);
    try {
      if (!validateRecord(record)) {
        setIsLoading(false);
        return;
      }

      const formattedRecord = {
        student_id: record.student_id,
        incident_date: record.incident_date,
        incident_type: record.incident_type,
        description: record.description.trim(),
        action_taken: record.action_taken?.trim() || '',
        staff_id: record.staff_id,
        resolution_date: record.resolution_date || null,
        follow_up_required: record.follow_up_required || false,
        updated_by: "admin", // Should come from auth context
        updated_date: new Date().toISOString()
      };

      const response = await api.put(
        `${endpoints.BEHAVIORAL_RECORDS}/${editingRecord._id}`,
        formattedRecord
      );

      if (response.data) {
        setRecords((prev) =>
          prev.map((r) =>
            r._id === editingRecord._id ? response.data : r
          )
        );
        setEditingRecord(null);
        setIsFormOpen(false);
        toast({
          title: "Success",
          description: "Record updated successfully",
        });
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to update record';
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = (record) => {
    // Extract the ID from the record
    const recordId = record._id.$oid || record._id;
    setDeleteRecordId(recordId);
    setIsDeleting(true);
  };


  // Confirm delete action
  const handleDeleteConfirm = async () => {
    try {
      if (!deleteRecordId) {
        return;
      }

      await api.delete(`${endpoints.BEHAVIORAL_RECORDS}/${deleteRecordId}`);

      // Update the records state after successful deletion
      setRecords((prevRecords) =>
        prevRecords.filter((record) =>
          (record._id.$oid || record._id) !== deleteRecordId
        )
      );

      // Reset states
      setIsDeleting(false);
      setDeleteRecordId(null);

      toast({
        title: "Success",
        description: "Record deleted successfully",
      });
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to delete record';
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 space-y-6">
      <Card className="p-6">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold tracking-tight">Behavioral Records</h1>
            <p className="text-sm text-muted-foreground">
              Manage and track student behavioral incidents and actions
            </p>
          </div>
          <Button
            onClick={() => {
              setEditingRecord(null);
              setIsFormOpen(true);
            }}
            className="w-full sm:w-auto"
            disabled={isSubmitting}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add New Record
          </Button>
        </div>

        {error ? (
          <div className="bg-destructive/15 text-destructive px-4 py-3 rounded-md flex items-center gap-2">
            <AlertCircle className="h-4 w-4" />
            {error}
          </div>
        ) : (
          <BehavioralRecordTable
            records={records}
            onEdit={(record) => {
              setEditingRecord(record);
              setIsFormOpen(true);
            }}
            onDelete={handleDelete}
            onDeleteConfirm={handleDeleteConfirm}
            setIsDeleting={setIsDeleting}
          />
        )}
      </Card>

      {/* Form Dialog */}
      <AlertDialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <AlertDialogContent className="sm:max-w-[600px]">
          <AlertDialogHeader>
            <AlertDialogTitle>
              {editingRecord ? "Edit Behavioral Record" : "New Behavioral Record"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {editingRecord
                ? "Update the behavioral record details below."
                : "Add a new behavioral record using the form below."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="max-h-[70vh] overflow-y-auto py-4">
            <BehavioralRecordForm
              record={editingRecord || {}}
              onSubmit={editingRecord ? handleUpdate : handleCreate}
              onCancel={() => {
                setIsFormOpen(false);
                setEditingRecord(null);
              }}
              isLoading={isSubmitting}
            />
          </div>
        </AlertDialogContent>
      </AlertDialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleting} onOpenChange={setIsDeleting}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Record</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this behavioral record?
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => {
                setIsDeleting(false);
                setDeleteRecordId(null);
              }}
              disabled={isSubmitting}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                "Delete"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default BehavioralRecordsPage;