import React, { useEffect, useState } from 'react';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

const BehavioralRecordForm = ({ record = {}, onSubmit, onCancel, isLoading = false }) => {
  const [formState, setFormState] = useState({
    student_id: '',
    incident_date: '',
    incident_type: '',
    description: '',
    action_taken: '',
    staff_id: '',
    follow_up_required: false,
    created_by: 'admin',
    updated_by: 'admin'
  });

  const getObjectId = (field) => {
    if (!field) return '';
    return field.$oid || field;
  };

  const formatDate = (dateField) => {
    if (!dateField) return '';
    const date = dateField.$date ? new Date(dateField.$date) : new Date(dateField);
    return date.toISOString().split('T')[0];
  };

  useEffect(() => {
    if (record) {
      setFormState({
        student_id: getObjectId(record.student_id),
        incident_date: formatDate(record.incident_date),
        incident_type: record.incident_type || '',
        description: record.description || '',
        action_taken: record.action_taken || '',
        staff_id: getObjectId(record.staff_id),
        follow_up_required: record.follow_up_required || false,
        created_by: record.created_by || 'admin',
        updated_by: 'admin'
      });
    }
  }, [record]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === 'checkbox' ? checked : value;
    setFormState(prev => ({
      ...prev,
      [name]: fieldValue
    }));
  };

  const handleSelectChange = (name, value) => {
    setFormState(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formattedData = {
      ...formState,
      incident_date: new Date(formState.incident_date).toISOString(),
      updated_date: new Date().toISOString()
    };

    if (!record._id) {
      formattedData.created_date = new Date().toISOString();
    }

    onSubmit(formattedData);
  };

  return (
    <Card className="p-6">
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="student_id" className="text-sm font-medium">
            Student ID
          </Label>
          <Input
            id="student_id"
            name="student_id"
            value={formState.student_id}
            onChange={handleChange}
            placeholder="Enter student ID in 11 chars (a-f, 0-9)"
            className="w-full"
            disabled={isLoading}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="incident_date" className="text-sm font-medium">
            Incident Date
          </Label>
          <Input
            id="incident_date"
            name="incident_date"
            type="date"
            value={formState.incident_date}
            onChange={handleChange}
            className="w-full"
            disabled={isLoading}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="incident_type" className="text-sm font-medium">
            Incident Type
          </Label>
          <Select
            value={formState.incident_type}
            onValueChange={(value) => handleSelectChange('incident_type', value)}
            disabled={isLoading}
            required
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select incident type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Positive">Positive</SelectItem>
              <SelectItem value="Negative">Negative</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="staff_id" className="text-sm font-medium">
            Staff ID
          </Label>
          <Input
            id="staff_id"
            name="staff_id"
            value={formState.staff_id}
            onChange={handleChange}
            placeholder="Enter staff ID in 11 chars (a-f, 0-9)"
            className="w-full"
            disabled={isLoading}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description" className="text-sm font-medium">
          Description
        </Label>
        <Textarea
          id="description"
          name="description"
          value={formState.description}
          onChange={handleChange}
          placeholder="Enter detailed description of the incident"
          className="min-h-[100px] w-full"
          disabled={isLoading}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="action_taken" className="text-sm font-medium">
          Action Taken
        </Label>
        <Textarea
          id="action_taken"
          name="action_taken"
          value={formState.action_taken}
          onChange={handleChange}
          placeholder="Describe actions taken in response to the incident"
          className="min-h-[100px] w-full"
          disabled={isLoading}
          required
        />
      </div>

      <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4">
        <Button
          variant="secondary"
          onClick={onCancel}
          type="button"
          className="w-full sm:w-auto"
          disabled={isLoading}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          className="w-full sm:w-auto bg-blue-500 hover:bg-blue-600"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Submitting...
            </>
          ) : (
            "Submit"
          )}
        </Button>
      </div>
    </form>
  </Card>
  );
};

export default BehavioralRecordForm;