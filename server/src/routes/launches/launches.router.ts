import express from 'express';

import launchesController from './launches.controller';

const launchesRouter = express.Router();

launchesRouter.get('/launches', launchesController.getAllLaunches);

export default launchesRouter;
