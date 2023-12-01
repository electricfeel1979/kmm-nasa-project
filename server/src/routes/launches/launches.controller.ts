import {Request, Response} from 'express';

import launchesModel from '../../models/launches/launches.model';

function httpGetAllLaunches(req: Request, res: Response) {
  return res.status(200).json(Array.from(launchesModel.getAllLaunches()));
}

export {httpGetAllLaunches};
