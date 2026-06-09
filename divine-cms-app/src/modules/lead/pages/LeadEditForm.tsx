import { ChangeEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import PageBreadcrumb from "../../../components/common/PageBreadCrumb";
import PageMeta from "../../../components/common/PageMeta";
import ComponentCard from "../../../components/common/ComponentCard";
import Label from "../../../components/form/Label";
import Input from "../../../components/form/input/InputField";
import Button from "../../../components/ui/button/Button";

import { AppDispatch } from "../../../store/store";
import { Lead } from "../features/leadTypes";
import { fetchLeadById, updateLead } from "../features/leadThunks";
import { selectLeadById } from "../features/leadSelectors";

export default function LeadEditForm() {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const lead = useSelector(selectLeadById(Number(id)));

  const [formData, setFormData] = useState<Lead>({
    id: 0,
    date: "",
    websiteName: "",
    clientName: "",
    phoneNumber: "",
    serviceNeeded: "",
  });

  useEffect(() => {
    if (!lead && id) {
      dispatch(fetchLeadById(Number(id)));
      return;
    }

    if (lead) {
      setFormData({
        id: lead.id,
        date: lead.date,
        websiteName: lead.websiteName,
        clientName: lead.clientName,
        phoneNumber: lead.phoneNumber,
        serviceNeeded: lead.serviceNeeded,
      });
    }
  }, [dispatch, id, lead]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!id) {
      toast.error("Lead ID is missing.");
      return;
    }

    try {
      await dispatch(updateLead({ id: Number(id), leadData: formData })).unwrap();
      toast.success("Lead updated successfully!");
      navigate("/lead/list");
    } catch (err) {
      toast.error(typeof err === "string" ? err : "Failed to update lead.");
    }
  };

  return (
    <div>
      <PageMeta title="Lead Update" description="Form to update a lead" />
      <PageBreadcrumb pageTitle="Lead Update" />

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

      <ComponentCard title="Modify fields to update this lead">
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
              Update
            </Button>
          </div>
        </form>
      </ComponentCard>
    </div>
  );
}
