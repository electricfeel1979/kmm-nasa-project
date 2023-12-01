import {Request, Response} from 'express';

import launchesModel from '../../models/launches/launches.model';

function httpGetAllLaunches(req: Request, res: Response) {
  return res.status(200).json(Array.from(launchesModel.getAllLaunches()));
}

function httpAddNewLaunch(req: Request, res: Response) {
  const launch = req.body;

  const {mission, rocket, launchDate, target} = launch;

  if (!mission || !rocket || !launchDate || !target) {
    return res.status(400).json({
      error: 'Missing required launch property',
    });
  }

  launch.launchDate = new Date(launch.launchDate);

  if (isNaN(launch.launchDate)) {
    return res.status(400).json({
      error: 'Invalid launch date',
    });
  }

  launchesModel.addNewLaunch(launch);
  return res.status(201).json(launch);
}

function httpAbortLaunch(req: Request, res: Response) {
  const launchId = Number(req.params.id);

  if (!launchesModel.existsLaunchWithId(launchId)) {
    return res.status(404).json({
      error: 'Launch not found',
    });
  }

  const aborted = launchesModel.abortLaunchById(launchId);
  return res.status(200).json(aborted);
}

export {httpGetAllLaunches, httpAddNewLaunch, httpAbortLaunch};
