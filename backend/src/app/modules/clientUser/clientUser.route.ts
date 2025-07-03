import express from 'express';
import { ClientUserController } from './clientUser.controller';




const router = express.Router();

// CREATE
router.post(
  '/create-client-user',
  // auth(USER_ROLE.USER),  
  ClientUserController.createClientUser
);

// GET ALL
router.get(
  '/',
  // auth(USER_ROLE.USER),
  ClientUserController.getAllClientUser
);

// GET SINGLE
router.get(
  '/:clientId',
  // auth(USER_ROLE.USER),
  ClientUserController.getSingleClientUser
);

// UPDATE
router.patch(
  '/:clientId',
  // auth(USER_ROLE.USER),
  ClientUserController.updateClientUser
);

// DELETE
router.delete(
  '/:clientId',
  // auth(USER_ROLE.USER),
  ClientUserController.deleteClientUser
);

export const ClientUserRoutes = router;
