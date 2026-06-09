import { ChangeEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import PageBreadcrumb from "../../../components/common/PageBreadCrumb";
import PageMeta from "../../../components/common/PageMeta";
import ComponentCard from "../../../components/common/ComponentCard";
import Label from "../../../components/form/Label";
import Input from "../../../components/form/input/InputField";
import Button from "../../../components/ui/button/Button";

import { AppDispatch } from "../../../store/store";
import { Lead } from "../features/leadTypes";
import { createLead } from "../features/leadThunks";

const getTodayDate = () => new Date().toISOString().slice(0, 10);

export default function LeadCreateForm() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<Lead>({
    date: getTodayDate(),
    websiteName: "",
    clientName: "",
    phoneNumber: "",
    serviceNeeded: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await dispatch(createLead(formData)).unwrap();
      toast.success("Lead created successfully!");
      navigate("/lead/list");
    } catch (err) {
      toast.error(typeof err === "string" ? err : "Failed to create lead.");
    }
  };

  return (
    <div>
      <PageMeta title="Lead Create" description="Form to create a new lead" />
      <PageBreadcrumb pageTitle="Lead Create" />

      <div className="mb-4 flex justify-start">
        <div>
          <button
            onClick={() => navigate(-1)}
            className="mr-4 rounded-full bg-red-400 px-2 py-1 text-white hover:bg-red-700"
          >
            Back
          </button>

          <button
            onClick={() => navigate("/lead/list")}
            className="mr-4 rounded-full bg-fuchsia-400 px-2 py-1 text-white hover:bg-fuchsia-700"
          >
            Lead List
          </button>
        </div>
      </div>

      <ComponentCard title="Fill up all fields to create a new lead">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <Label>Date</Label>
              <Input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label>Website Name</Label>
              <Input
                type="text"
                name="websiteName"
                placeholder="Enter website name"
                value={formData.websiteName}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label>Client Name</Label>
              <Input
                type="text"
                name="clientName"
                placeholder="Enter client name"
                value={formData.clientName}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label>Phone Number</Label>
              <Input
                type="text"
                name="phoneNumber"
                placeholder="Enter phone number"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
              />
            </div>

            <div className="md:col-span-2">
              <Label>Service Needed</Label>
              <Input
                type="text"
                name="serviceNeeded"
                placeholder="Enter service needed"
                value={formData.serviceNeeded}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="flex justify-end">
            <Button type="submit" variant="success">
              Submit
            </Button>
          </div>
        </form>
      </ComponentCard>
    </div>
  );
}
