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

export {httpGetAllLaunches, httpAddNewLaunch};
