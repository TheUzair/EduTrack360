import React, { useState, useEffect } from "react";
import api from "../services/api";
import endpoints from "../services/endpoints";
import ClassSectionForm from "@/components/ClassSection/ClassSectionForm";
import ClassSectionTable from "@/components/ClassSection/ClassSectionTable";
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
import { Loader2, Plus, AlertCircle } from "lucide-react";

const ClassSectionPage = () => {
  const { toast } = useToast();
  const [classSections, setClassSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingSection, setEditingSection] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteSectionId, setDeleteSectionId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchClassSections = async () => {
    setError(null);
    setLoading(true);
    try {
      const response = await api.get(endpoints.CLASS_SECTION);
      setClassSections(response.data);
    } catch (error) {
      setError("Failed to fetch class sections");
      toast({
        title: "Error",
        description: "Failed to fetch class sections",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const validateSection = (section) => {
    if (!section.class_name?.trim()) {
      toast({
        title: "Validation Error",
        description: "Class name is required",
        variant: "destructive",
      });
      return false;
    }
    return true;
  };

  const handleCreate = async (section) => {
    if (!validateSection(section)) return;
    setIsSubmitting(true);

    try {
      // Format the data before sending
      const formattedSection = {
        class_name: section.class_name.trim(),
        section: section.section.trim(),
        teacher_id: section.teacher_id?.trim() || '',
        created_by: 'admin',
        updated_by: 'admin',
        created_date: new Date().toISOString(),
        updated_date: new Date().toISOString()
      };

      const response = await api.post(endpoints.CLASS_SECTION, formattedSection);
      if (response.data) {
        // Update state with new data
        setClassSections(prevSections => [...prevSections, response.data]);
        setIsFormOpen(false);
        setEditingSection(null);
        toast({
          title: "Success",
          description: "Class section created successfully",
        });
        await fetchClassSections();
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to create class section",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdate = async (section) => {
    if (!validateSection(section)) return;
    setIsSubmitting(true);
    try {
      const sectionId = editingSection._id.$oid || editingSection._id;
      // Format the data before sending
      const formattedSection = {
        class_name: section.class_name.trim(),
        section: section.section.trim(),
        teacher_id: section.teacher_id?.trim() || '',
        updated_by: 'admin',
        updated_date: new Date().toISOString()
      };

      const response = await api.put(
        `${endpoints.CLASS_SECTION}/${sectionId}`,
        formattedSection
      );
      if (response.data) {
        setClassSections((prev) =>
          prev.map((s) => (s._id === sectionId ? response.data : s))
        );
        setIsFormOpen(false);
        setEditingSection(null);
        toast({
          title: "Success",
          description: "Class section updated successfully",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to update class section",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = (section) => {
    setDeleteSectionId(section._id);
    setIsDeleting(true);
  };

  const handleDeleteConfirm = async () => {
    setIsSubmitting(true);
    try {
      await api.delete(`${endpoints.CLASS_SECTION}/${deleteSectionId}`);
      setClassSections((prev) => prev.filter((s) => s._id !== deleteSectionId));
      setDeleteSectionId(null);
      setIsDeleting(false);
      toast({
        title: "Success",
        description: "Class section deleted successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to delete class section",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    fetchClassSections();
  }, []);

  if (loading) {
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
            <h1 className="text-2xl font-bold tracking-tight">Class Sections</h1>
            <p className="text-sm text-muted-foreground">
              Manage and organize class sections
            </p>
          </div>
          <Button
            onClick={() => {
              setEditingSection(null);
              setIsFormOpen(true);
            }}
            className="w-full sm:w-auto"
            disabled={isSubmitting}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add New Section
          </Button>
        </div>

        {error ? (
          <div className="bg-destructive/15 text-destructive px-4 py-3 rounded-md flex items-center gap-2">
            <AlertCircle className="h-4 w-4" />
            {error}
          </div>
        ) : (
          <ClassSectionTable
            classSections={classSections}
            onEdit={(section) => {
              setEditingSection(section);
              setIsFormOpen(true);
            }}
            onDelete={handleDelete}
          />
        )}
      </Card>

      {/* Form Dialog */}
      <AlertDialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <AlertDialogContent className="sm:max-w-[600px]">
          <AlertDialogHeader>
            <AlertDialogTitle>
              {editingSection ? "Edit Class Section" : "Add New Class Section"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {editingSection
                ? "Update the class section details below."
                : "Fill in the class section details below."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="max-h-[70vh] overflow-y-auto py-4">
            <ClassSectionForm
              section={editingSection || {}}
              onSubmit={editingSection ? handleUpdate : handleCreate}
              onCancel={() => {
                setIsFormOpen(false);
                setEditingSection(null);
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
            <AlertDialogTitle>Delete Class Section</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this class section?
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => {
                setIsDeleting(false);
                setDeleteSectionId(null);
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

export default ClassSectionPage;