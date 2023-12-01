import express from 'express';

import {
  httpAbortLaunch,
  httpAddNewLaunch,
  httpGetAllLaunches,
} from './launches.controller';

const launchesRouter = express.Router();

launchesRouter.get('/', httpGetAllLaunches);
launchesRouter.post('/', httpAddNewLaunch);
launchesRouter.delete('/:id', httpAbortLaunch);

export default launchesRouter;
