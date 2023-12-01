import {Request, Response} from 'express';

import planetsModel from '../../models/planets/planets.model';

function httpGetAllPlanets(req: Request, res: Response) {
  return res.status(200).json(planetsModel.getAllPlanets());
}

export {httpGetAllPlanets};
