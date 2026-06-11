import * as yup from "yup";

export const leadSchema = yup.object({
  date: yup
    .string()
    .matches(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format")
    .required("Date is required"),
  websiteName: yup.string().required("Website name is required"),
  clientName: yup.string().required("Client name is required"),
  phoneNumber: yup.string().required("Phone number is required"),
  serviceNeeded: yup.string().required("Service needed is required"),
});

export const publicLeadSchema = yup.object({
  date: yup
    .string()
    .matches(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format")
    .optional(),
  websiteName: yup.string().required("Website name is required"),
  clientName: yup.string().optional(),
  phoneNumber: yup.string().required("Phone number is required"),
  serviceNeeded: yup.string().required("Service needed is required"),
});
