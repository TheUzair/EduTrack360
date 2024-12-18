import React, { useState, useEffect } from "react";
import api from "../services/api";
import endpoints from "../services/endpoints";
import TermDetailForm from "@/components/TermDetails/TermDetailForm";
import TermDetailTable from "@/components/TermDetails/TermDetailTable";
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
import { Card } from "@/components/ui/card";
import { Plus, Loader2, AlertCircle } from "lucide-react";

const TermDetailsPage = () => {
  const { toast } = useToast();
  const [termDetails, setTermDetails] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTerm, setEditingTerm] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteTermId, setDeleteTermId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchTermDetails = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await api.get(endpoints.TERM_DETAILS);
      setTermDetails(response.data);
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Failed to fetch term details";
      setError(errorMessage);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const validateTerm = (term) => {
    if (!term.term_name || !term.start_date || !term.end_date) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return false;
    }

    // Add date validation
    const startDate = new Date(formatDateToISO(term.start_date));
    const endDate = new Date(formatDateToISO(term.end_date));
    if (endDate <= startDate) {
      toast({
        title: "Validation Error",
        description: "End date must be after start date",
        variant: "destructive",
      });
      return false;
    }

    return true;
  };

  const formatDateToISO = (dateString) => {
    const [day, month, year] = dateString.split("/");
    return new Date(`${year}-${month}-${day}`).toISOString();
  };

  const handleCreate = async (term) => {
    if (!validateTerm(term)) return;
    setIsSubmitting(true);

    try {
      const formattedTerm = {
        ...term,
        start_date: formatDateToISO(term.start_date),
        end_date: formatDateToISO(term.end_date),
      };

      const response = await api.post(endpoints.TERM_DETAILS, formattedTerm);
      setTermDetails((prev) => [...prev, response.data]);
      setIsFormOpen(false);
      toast({
        title: "Success",
        description: "Term created successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to create term",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdate = async (term) => {
    if (!validateTerm(term)) return;
    setIsSubmitting(true);

    const termId = editingTerm._id;
    try {
      const formattedTerm = {
        ...term,
        start_date: formatDateToISO(term.start_date),
        end_date: formatDateToISO(term.end_date),
      };

      const response = await api.put(`${endpoints.TERM_DETAILS}/${termId}`, formattedTerm);
      setTermDetails((prev) =>
        prev.map((t) => (t._id === termId ? response.data : t))
      );
      setIsFormOpen(false);
      setEditingTerm(null);
      toast({
        title: "Success",
        description: "Term updated successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to update term",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = (term) => {
    setDeleteTermId(term._id);
    setIsDeleting(true);
  };

  const handleDeleteConfirm = async () => {
    setIsSubmitting(true);
    try {
      await api.delete(`${endpoints.TERM_DETAILS}/${deleteTermId}`);
      setTermDetails((prev) => prev.filter((t) => t._id !== deleteTermId));
      setDeleteTermId(null);
      setIsDeleting(false);
      toast({
        title: "Success",
        description: "Term deleted successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to delete term",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    fetchTermDetails();
  }, []);

  return (
    <div className="container mx-auto p-4 space-y-6">
      <Card className="p-6">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold tracking-tight">Term Details</h1>
            <p className="text-sm text-muted-foreground">
              Manage academic terms and their schedules
            </p>
          </div>
          <Button
            onClick={() => {
              setEditingTerm(null);
              setIsFormOpen(true);
            }}
            className="w-full sm:w-auto"
            disabled={isSubmitting}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add New Term
          </Button>
        </div>

        {error ? (
          <div className="bg-destructive/15 text-destructive px-4 py-3 rounded-md flex items-center gap-2">
            <AlertCircle className="h-4 w-4" />
            {error}
          </div>
        ) : (
          <TermDetailTable
            termDetails={termDetails}
            onEdit={(term) => {
              setEditingTerm(term);
              setIsFormOpen(true);
            }}
            onDelete={handleDelete}
            loading={isLoading}
          />
        )}
      </Card>

      <AlertDialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <AlertDialogContent className="sm:max-w-[600px]">
          <AlertDialogHeader>
            <AlertDialogTitle>
              {editingTerm ? "Edit Term" : "Add New Term"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {editingTerm
                ? "Update the term details below."
                : "Fill in the term details below."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="max-h-[70vh] overflow-y-auto py-4">
            <TermDetailForm
              term={editingTerm || {}}
              onSubmit={editingTerm ? handleUpdate : handleCreate}
              onCancel={() => {
                setIsFormOpen(false);
                setEditingTerm(null);
              }}
              isLoading={isSubmitting}
            />
          </div>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={isDeleting} onOpenChange={setIsDeleting}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Term</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this term? 
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="gap-2">
            <AlertDialogCancel
              onClick={() => {
                setIsDeleting(false);
                setDeleteTermId(null);
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

export default TermDetailsPage;