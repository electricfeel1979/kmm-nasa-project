import {Request, Response} from 'express';

import launchesModel from '../../models/launches/launches.model';

function getAllLaunches(req: Request, res: Response) {
  console.log('getAllLaunches');
  console.log(launchesModel.launches.values());
  return res.status(200).json(Array.from(launchesModel.launches.values()));
}

export default {
  getAllLaunches,
};
