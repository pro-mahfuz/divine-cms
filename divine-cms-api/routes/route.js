import { Router } from "express";

import { authenticate } from "../middleware/authenticate.js";
import { validate } from "../middleware/validate.js";
import authRoute from './auth.route.js';
import protectedRoute from './protected.route.js';
import { publicLeadSchema } from "../modules/lead/lead.validator.js";
import * as LeadController from "../modules/lead/lead.controller.js";

export default () => {
  const router = Router();

  // Register the authentication and admin routes
  router.use('/check', (req, res) => {
    res.json({ message: 'Test Server is Working ...' });
  });
  router.use("/auth", authRoute);
  router.post("/lead/public/create/:businessId", validate(publicLeadSchema), LeadController.createPublicLead);
  router.use("/protected", authenticate, protectedRoute);


  // You can add more routes here as needed

  return router;
}
