import { Business, Lead } from "../../models/model.js";

const getUserBusinessId = (req) => {
  const businessId = Number(req?.user?.businessId) || 0;

  if (!businessId) {
    throw { status: 400, message: "Authenticated user business was not found" };
  }

  return businessId;
};

const getPublicBusinessId = async (req) => {
  const businessId = Number(req?.params?.businessId) || 0;

  if (!businessId) {
    throw { status: 400, message: "Business ID is required" };
  }

  const business = await Business.findOne({
    where: {
      id: businessId,
      isActive: true,
    },
  });

  if (!business) {
    throw { status: 404, message: "Active business not found" };
  }

  return business.id;
};

export const getAllLeads = async (req) => {
  const businessId = getUserBusinessId(req);

  return Lead.findAll({
    where: { businessId },
    order: [
      ["date", "DESC"],
      ["id", "DESC"],
    ],
  });
};

export const getLeadById = async (req, id) => {
  const businessId = getUserBusinessId(req);

  const lead = await Lead.findOne({
    where: {
      id,
      businessId,
    },
  });

  if (!lead) {
    throw { status: 404, message: "Lead not found" };
  }

  return lead;
};

export const createLead = async (req) => {
  const businessId = getUserBusinessId(req);
  const payload = req.validated ?? req.body;

  return Lead.create({
    ...payload,
    businessId,
  });
};

export const createPublicLead = async (req) => {
  const businessId = await getPublicBusinessId(req);
  const payload = req.validated ?? req.body;

  return Lead.create({
    ...payload,
    businessId,
    date: payload.date || new Date().toISOString().slice(0, 10),
  });
};

export const updateLead = async (req, id) => {
  const businessId = getUserBusinessId(req);
  const payload = req.validated ?? req.body;

  const lead = await Lead.findOne({
    where: {
      id,
      businessId,
    },
  });

  if (!lead) {
    throw { status: 404, message: "Lead not found" };
  }

  await lead.update({
    ...payload,
    businessId,
  });

  return lead;
};

export const deleteLead = async (req, id) => {
  const businessId = getUserBusinessId(req);

  const lead = await Lead.findOne({
    where: {
      id,
      businessId,
    },
  });

  if (!lead) {
    throw { status: 404, message: "Lead not found" };
  }

  await lead.destroy();
  return lead;
};
