import React, { useEffect, useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

const TermDetailForm = ({ term, onSubmit, onCancel, isLoading = false }) => {
  const [formState, setFormState] = useState({
    term_name: '',
    academic_year: '',
    start_date: '',
    end_date: ''
  });

  const formatDateForInput = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  useEffect(() => {
    if (term && typeof term === 'object') {
      setFormState({
        term_name: term.term_name || '',
        academic_year: term.academic_year || '',
        start_date: formatDateForInput(term.start_date) || '',
        end_date: formatDateForInput(term.end_date) || ''
      });
    } else {
      setFormState({
        term_name: '',
        academic_year: '',
        start_date: '',
        end_date: ''
      });
    }
  }, [term]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: value || ''
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (typeof onSubmit !== 'function') {
      console.error('onSubmit is not a function');
      return;
    }

    const formattedData = {
      ...formState,
      start_date: formState.start_date ? new Date(formState.start_date).toLocaleDateString('en-GB') : '',
      end_date: formState.end_date ? new Date(formState.end_date).toLocaleDateString('en-GB') : ''
    };
  
    onSubmit(formattedData);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="term_name" className="text-sm font-medium">
              Term Name<span className="text-destructive">*</span>
            </Label>
            <Input
              id="term_name"
              name="term_name"
              value={formState.term_name}
              onChange={handleChange}
              placeholder="Enter term name"
              className="w-full"
              disabled={isLoading}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="academic_year" className="text-sm font-medium">
              Academic Year<span className="text-destructive">*</span>
            </Label>
            <Input
              id="academic_year"
              name="academic_year"
              value={formState.academic_year}
              onChange={handleChange}
              placeholder="e.g., 2023-2024"
              className="w-full"
              disabled={isLoading}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="start_date" className="text-sm font-medium">
              Start Date<span className="text-destructive">*</span>
            </Label>
            <div className="relative">
              <Input
                id="start_date"
                name="start_date"
                type="date"
                value={formState.start_date}
                onChange={handleChange}
                className="w-full"
                disabled={isLoading}
                required
              />    
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="end_date" className="text-sm font-medium">
              End Date<span className="text-destructive">*</span>
            </Label>
            <div className="relative">
              <Input
                id="end_date"
                name="end_date"
                type="date"
                value={formState.end_date}
                onChange={handleChange}
                className="w-full"
                disabled={isLoading}
                required
              />
            </div>
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

export default TermDetailForm;