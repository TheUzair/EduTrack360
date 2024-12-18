import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

const StudentAwardForm = ({ award = {}, onSubmit, onCancel, isLoading }) => {
  const [formState, setFormState] = useState({
    student_id: "",
    award_name: "",
    award_description: "",
    date_awarded: "",
    awarding_body: "",
    award_category: "",
  });

  useEffect(() => {
    if (award) {
      setFormState({
        student_id: award.student_id || "",
        award_name: award.award_name || "",
        award_description: award.award_description || "",
        date_awarded: award.date_awarded
          ? new Date(award.date_awarded).toISOString().split("T")[0]
          : "",
        awarding_body: award.awarding_body || "",
        award_category: award.award_category || "",
      });
    }
  }, [award]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (value) => {
    setFormState((prev) => ({
      ...prev,
      award_category: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formState,
      created_by: "admin",
      updated_by: "admin",
    });
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="p-6 space-y-6">
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
            <Label htmlFor="award_name">Award Name*</Label>
            <Input
              id="award_name"
              name="award_name"
              value={formState.award_name}
              onChange={handleChange}
              placeholder="Enter award name"
              className="w-full"
              required
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="award_description">Award Description</Label>
            <Textarea
              id="award_description"
              name="award_description"
              value={formState.award_description}
              onChange={handleChange}
              placeholder="Enter award description"
              className="min-h-[100px] w-full"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="date_awarded">Date Awarded*</Label>
            <Input
              id="date_awarded"
              name="date_awarded"
              type="date"
              value={formState.date_awarded}
              onChange={handleChange}
              className="w-full"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="awarding_body">Awarding Body*</Label>
            <Input
              id="awarding_body"
              name="awarding_body"
              value={formState.awarding_body}
              onChange={handleChange}
              placeholder="Enter awarding body name"
              className="w-full"
              required
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="award_category">Award Category*</Label>
            <Select
              value={formState.award_category}
              onValueChange={handleSelectChange}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Award Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Academic">Academic</SelectItem>
                <SelectItem value="Extracurricular">Extracurricular</SelectItem>
                <SelectItem value="Leadership">Leadership</SelectItem>
                <SelectItem value="Community Service">Community Service</SelectItem>
              </SelectContent>
            </Select>
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

export default StudentAwardForm;