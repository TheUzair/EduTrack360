import React, { useState, useEffect } from 'react';
import api from '../services/api';
import endpoints from '../services/endpoints';
import ExtracurricularActivityForm from '../components/ExtracurricularActivities/ExtracurricularActivityForm';
import ExtracurricularActivityTable from '../components/ExtracurricularActivities/ExtracurricularActivityTable';
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
import { useToast } from "@/hooks/use-toast"
import { PlusCircle, Loader2 } from "lucide-react";
import { Card } from "@/components/ui/card";


const ExtracurricularActivitiesPage = () => {
  const { toast } = useToast();
  const [activities, setActivities] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingActivity, setEditingActivity] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteActivityId, setDeleteActivityId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchActivities = async () => {
    try {
      setIsLoading(true);
      const response = await api.get(endpoints.EXTRACURRICULAR_ACTIVITIES);
      setActivities(response.data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch activities",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const validateActivity = (activity) => {
    if (!activity.student_id) {
      toast({
        title: "Validation Error",
        description: "Student ID is required",
        variant: "destructive",
      });
      return false;
    }
  
    if (!activity.teacher_in_charge) {
      toast({
        title: "Validation Error",
        description: "Teacher in charge ID is required",
        variant: "destructive",
      });
      return false;
    }
  
    if (!activity.activity_name ||
        !activity.activity_type ||
        !activity.participation_date ||
        !activity.level_of_participation) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return false;
    }
  
    return true;
  };

  const handleCreate = async (activity) => {
    try {
      if (!validateActivity(activity)) {
        return;
      }
  
      const formattedActivity = {
        student_id: activity.student_id, // Required ObjectId
        activity_name: activity.activity_name,
        activity_type: activity.activity_type,
        participation_date: new Date(activity.participation_date).toISOString(),
        level_of_participation: activity.level_of_participation,
        award_received: activity.award_received || '',
        teacher_in_charge: activity.teacher_in_charge, // Required ObjectId
        comments: activity.comments || '',
        created_by: 'admin',
        updated_by: 'admin',
        created_date: new Date().toISOString(),
        updated_date: new Date().toISOString()
      };
  
      const response = await api.post(endpoints.EXTRACURRICULAR_ACTIVITIES, formattedActivity);
  
      if (response.data) {
        setActivities((prev) => [...prev, response.data]);
        setIsFormOpen(false);
        toast({
          title: "Success",
          description: "Activity created successfully",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error.response?.data?.message || 'Failed to create activity',
        variant: "destructive",
      });
    }
  };
  const handleUpdate = async (activity) => {
    try {
      if (!validateActivity(activity)) {
        return;
      }
  
      const activityId = editingActivity._id.$oid || editingActivity._id;
      const formattedActivity = {
        student_id: activity.student_id,
        activity_name: activity.activity_name,
        activity_type: activity.activity_type,
        participation_date: new Date(activity.participation_date).toISOString(),
        level_of_participation: activity.level_of_participation,
        award_received: activity.award_received || '',
        teacher_in_charge: activity.teacher_in_charge,
        comments: activity.comments || '',
        updated_by: 'admin',
        updated_date: new Date().toISOString()
      };
  
      const response = await api.put(
        `${endpoints.EXTRACURRICULAR_ACTIVITIES}/${activityId}`,
        formattedActivity
      );
  
      if (response.data) {
        setActivities((prev) =>
          prev.map((a) =>
            (a._id.$oid || a._id) === activityId ? response.data : a
          )
        );
        setEditingActivity(null);
        setIsFormOpen(false);
        toast({
          title: "Success",
          description: "Activity updated successfully",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error.response?.data?.message || 'Failed to update activity',
        variant: "destructive",
      });
    }
  };
  const handleDelete = async (activity) => {
    const activityId = activity._id.$oid || activity._id;
    setDeleteActivityId(activityId);
    setIsDeleting(true);
  };
  
  const handleDeleteConfirm = async () => {
    try {
      if (!deleteActivityId) return;
  
      await api.delete(`${endpoints.EXTRACURRICULAR_ACTIVITIES}/${deleteActivityId}`);
      
      setActivities((prev) => 
        prev.filter((activity) => 
          (activity._id.$oid || activity._id) !== deleteActivityId
        )
      );
      
      setIsDeleting(false);
      setDeleteActivityId(null);
      toast({
        title: "Success",
        description: "Activity deleted successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error.response?.data?.message || 'Failed to delete activity',
        variant: "destructive",
      });
    }
  };
  useEffect(() => {
    fetchActivities();
  }, []);

  return (
     <div className="container mx-auto p-4 space-y-6">
      <Card className="p-6">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold tracking-tight">
              Extracurricular Activities
            </h1>
            <p className="text-sm text-muted-foreground">
              Manage student extracurricular activities and achievements
            </p>
          </div>
          <Button
            onClick={() => {
              setEditingActivity(null);
              setIsFormOpen(true);
            }}
            className="w-full sm:w-auto"
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            Add New Activity
          </Button>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : (
          <div className="rounded-md border">
            <ExtracurricularActivityTable
              activities={activities}
              onEdit={(activity) => {
                setEditingActivity(activity);
                setIsFormOpen(true);
              }}
              onDelete={handleDelete}
            />
          </div>
        )}
      </Card>

      {/* Form Dialog */}
      <AlertDialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <AlertDialogContent className="sm:max-w-[600px]">
          <AlertDialogHeader>
            <AlertDialogTitle>
              {editingActivity ? "Edit Activity" : "Add New Activity"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {editingActivity
                ? "Update the activity details below."
                : "Fill in the activity details below."
              }
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="max-h-[70vh] overflow-y-auto py-4">
            <ExtracurricularActivityForm
              activity={editingActivity || {}}
              onSubmit={editingActivity ? handleUpdate : handleCreate}
              onCancel={() => {
                setIsFormOpen(false);
                setEditingActivity(null);
              }}
            />
          </div>
        </AlertDialogContent>
      </AlertDialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleting} onOpenChange={setIsDeleting}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Activity</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this activity? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => {
                setIsDeleting(false);
                setDeleteActivityId(null);
              }}
            >
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

export default ExtracurricularActivitiesPage;