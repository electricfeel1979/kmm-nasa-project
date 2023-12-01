import {Request, Response} from 'express';

import launchesModel from '../../models/launches/launches.model';

function httpGetAllLaunches(req: Request, res: Response) {
  return res.status(200).json(Array.from(launchesModel.getAllLaunches()));
}

function httpAddNewLaunch(req: Request, res: Response) {
  const launch = req.body;

  launch.launchDate = new Date(launch.launchDate);

  launchesModel.addNewLaunch(launch);
  return res.status(201).json(launch);
}

export {httpGetAllLaunches, httpAddNewLaunch};
