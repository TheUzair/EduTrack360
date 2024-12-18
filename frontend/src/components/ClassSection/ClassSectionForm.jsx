import React, { useEffect, useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

const ClassSectionForm = ({ 
  section = null, 
  onSubmit, 
  onCancel, 
  isLoading = false 
}) => {
  
  const [formState, setFormState] = useState({
    class_name: section?.class_name || '',
    section: section?.section || '',
    teacher_id: section?.teacher_id || ''
  });

  useEffect(() => {
    if (section) {
      setFormState({
        class_name: section.class_name || '',
        section: section.section || '',
        teacher_id: section.teacher_id || ''
      });
    } else {
      // Reset form when creating new
      setFormState({
        class_name: '',
        section: '',
        teacher_id: ''
      });
    }
  }, [section?.class_name, section?.section, section?.teacher_id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

 const handleSubmit = async (e) => {
    e.preventDefault();
    await onSubmit(formState);
    
    // Reset form after submission
    setFormState({
      class_name: '',
      section: '',
      teacher_id: ''
    });
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="class_name" className="text-sm font-medium">
              Class Name<span className="text-destructive">*</span>
            </Label>
            <Input
              id="class_name"
              name="class_name"
              value={formState.class_name}
              onChange={handleChange}
              placeholder="Enter class name (e.g. Grade 10)"
              className="w-full"
              disabled={isLoading}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="section" className="text-sm font-medium">
              Section<span className="text-destructive">*</span>
            </Label>
            <Input
              id="section"
              name="section"
              value={formState.section}
              onChange={handleChange}
              placeholder="Enter section (e.g. B)"
              className="w-full"
              disabled={isLoading}
              required
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="teacher_id" className="text-sm font-medium">
              Teacher ID<span className="text-destructive">*</span>
            </Label>
            <Input
              id="teacher_id"
              name="teacher_id"
              value={formState.teacher_id}
              onChange={handleChange}
              placeholder="Enter teacher ID in 11 chars (a-f, 0-9)"
              className="w-full"
              disabled={isLoading}
              required
            />
            <p className="text-sm text-muted-foreground">
              Enter the unique identifier for the teacher assigned to this class section
            </p>
          </div>
        </div>

        <div className="flex flex-col-reverse sm:flex-row justify-end gap-4 pt-4">
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

export default ClassSectionForm;