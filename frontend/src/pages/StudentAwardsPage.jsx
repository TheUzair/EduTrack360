import React, { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import api from "../services/api";
import endpoints from "../services/endpoints";
import StudentAwardForm from "@/components/StudentAwards/StudentAwardForm";
import StudentAwardTable from "@/components/StudentAwards/StudentAwardTable";
import { useToast } from "@/hooks/use-toast";
import { Plus, Loader2 } from "lucide-react";

const StudentAwardsPage = () => {
  const { toast } = useToast();

  // State Management
  const [awards, setAwards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("create");
  const [currentAward, setCurrentAward] = useState(null);

  // Delete State
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteAwardId, setDeleteAwardId] = useState(null);

  // Fetch Awards
  useEffect(() => {
    const fetchAwards = async () => {
      setLoading(true);
      try {
        const response = await api.get(endpoints.STUDENT_AWARDS);
        setAwards(response.data);
      } catch (err) {
        setError("Failed to fetch student awards.");
        toast({
          title: "Error",
          description: "Failed to load awards.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchAwards();
  }, []);

  // Handle Modal Open/Close
  const openModal = (type, award = null) => {
    setModalType(type);
    setCurrentAward(award);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentAward(null);
  };

  // CREATE
  const handleCreateSubmit = async (newAward) => {
    setIsSubmitting(true);
    try {
      const response = await api.post(endpoints.STUDENT_AWARDS, newAward);
      setAwards((prev) => [...prev, response.data]);
      closeModal();
      toast({
        title: "Success",
        description: "Award created successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to create award.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // UPDATE
  const handleEditSubmit = async (updatedAward) => {
    setIsSubmitting(true);
    try {
      const response = await api.put(
        `${endpoints.STUDENT_AWARDS}/${currentAward._id}`,
        updatedAward
      );
      setAwards((prev) =>
        prev.map((award) =>
          award._id === response.data._id ? response.data : award
        )
      );
      closeModal();
      toast({
        title: "Success",
        description: "Award updated successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to update award.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // DELETE
  const handleDeleteClick = (awardId) => {
    setDeleteAwardId(awardId);
    setIsDeleting(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await api.delete(`${endpoints.STUDENT_AWARDS}/${deleteAwardId}`);
      setAwards((prev) => prev.filter((award) => award._id !== deleteAwardId));
      setIsDeleting(false);
      toast({
        title: "Success",
        description: "Award deleted successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to delete award.",
        variant: "destructive",
      });
    }
  };

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
            <h1 className="text-2xl font-bold tracking-tight">Student Awards</h1>
            <p className="text-sm text-muted-foreground">
              Manage and track student achievements and awards
            </p>
          </div>
          <Button onClick={() => openModal("create")} className="w-full sm:w-auto">
            <Plus className="h-4 w-4 mr-2" />
            Add New Award
          </Button>
        </div>

        {error ? (
          <div className="bg-destructive/15 text-destructive px-4 py-3 rounded-md">
            {error}
          </div>
        ) : (
          <StudentAwardTable
            awards={awards}
            onEdit={(award) => openModal("edit", award)}
            onDelete={handleDeleteClick}
            onDeleteConfirm={handleDeleteConfirm}
            setIsDeleting={setIsDeleting}
          />
        )}
      </Card>

      {/* Create/Edit Modal */}
      <AlertDialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <AlertDialogContent className="sm:max-w-[600px]">
          <AlertDialogHeader>
            <AlertDialogTitle>
              {modalType === "create" ? "Create New Award" : "Edit Award"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {modalType === "create"
                ? "Add a new student award using the form below."
                : "Update the student award details using the form below."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <StudentAwardForm
            award={modalType === "edit" ? currentAward : null}
            onSubmit={modalType === "create" ? handleCreateSubmit : handleEditSubmit}
            onCancel={closeModal}
            isLoading={isSubmitting}
          />
        </AlertDialogContent>
      </AlertDialog>

      {/* Delete Confirmation Modal */}
      <AlertDialog open={isDeleting} onOpenChange={setIsDeleting}>
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
              onClick={handleDeleteConfirm}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default StudentAwardsPage;