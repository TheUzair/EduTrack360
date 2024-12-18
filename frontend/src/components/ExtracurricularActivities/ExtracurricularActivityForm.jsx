import React, { useEffect, useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";

const ExtracurricularActivityForm = ({ activity = {}, onSubmit, onCancel, isLoading }) => {
  const [formState, setFormState] = useState({
    student_id: '',
    activity_name: '',
    activity_type: '',
    participation_date: '',
    level_of_participation: '',
    award_received: '',
    teacher_in_charge: '',
    comments: ''
  });

  const getObjectId = (field) => {
    if (!field) return '';
    return field.$oid || field;
  };

  useEffect(() => {
    if (activity) {
      setFormState({
        student_id: getObjectId(activity.student_id) || '',
        activity_name: activity.activity_name || '',
        activity_type: activity.activity_type || '',
        participation_date: activity.participation_date 
          ? new Date(activity.participation_date.$date || activity.participation_date)
              .toISOString().split('T')[0] 
          : '',
        level_of_participation: activity.level_of_participation || '',
        award_received: activity.award_received || '',
        teacher_in_charge: getObjectId(activity.teacher_in_charge) || '',
        comments: activity.comments || ''
      });
    }
  }, [activity]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: value || ''
    }));
  };

  const handleSelectChange = (name, value) => {
    setFormState((prev) => ({
      ...prev,
      [name]: value || ''
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    onSubmit(formState);
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="student_id">Student ID*</Label>
            <Input
              id="student_id"
              name="student_id"
              value={formState.student_id}
              onChange={handleChange}
              placeholder="Enter student ID in 11 chars (a-f, 0-9)"
              className="w-full"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="activity_name">Activity Name*</Label>
            <Input
              id="activity_name"
              name="activity_name"
              value={formState.activity_name}
              onChange={handleChange}
              placeholder="Enter activity name"
              className="w-full"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="activity_type">Activity Type*</Label>
            <Select
              value={formState.activity_type}
              onValueChange={(value) => handleSelectChange('activity_type', value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Activity Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Sports">Sports</SelectItem>
                <SelectItem value="Arts">Arts</SelectItem>
                <SelectItem value="Clubs">Clubs</SelectItem>
                <SelectItem value="Competitions">Competitions</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="participation_date">Participation Date*</Label>
            <Input
              id="participation_date"
              name="participation_date"
              type="date"
              value={formState.participation_date}
              onChange={handleChange}
              className="w-full"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="level_of_participation">Level of Participation*</Label>
            <Select
              value={formState.level_of_participation}
              onValueChange={(value) => handleSelectChange('level_of_participation', value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="District">District</SelectItem>
                <SelectItem value="State">State</SelectItem>
                <SelectItem value="National">National</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="award_received">Award Received</Label>
            <Input
              id="award_received"
              name="award_received"
              value={formState.award_received}
              onChange={handleChange}
              placeholder="Enter award details"
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="teacher_in_charge">Teacher in Charge*</Label>
            <Input
              id="teacher_in_charge"
              name="teacher_in_charge"
              value={formState.teacher_in_charge}
              onChange={handleChange}
              placeholder="Enter teacher's ID in 11 chars (a-f, 0-9)"
              className="w-full"
              required
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="comments">Comments</Label>
            <Textarea
              id="comments"
              name="comments"
              value={formState.comments}
              onChange={handleChange}
              placeholder="Add any additional comments"
              className="w-full min-h-[100px]"
            />
          </div>
        </div>

        <div className="flex flex-col-reverse sm:flex-row justify-end gap-4 mt-6">
          <Button 
            variant="outline" 
            onClick={onCancel} 
            type="button"
            className="w-full sm:w-auto"
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button 
            type="submit" 
            className="w-full sm:w-auto"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              'Submit'
            )}
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default ExtracurricularActivityForm;