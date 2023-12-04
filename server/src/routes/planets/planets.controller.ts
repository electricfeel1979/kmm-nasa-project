import {Request, Response} from 'express';

import planetsModel from '../../models/planets/planets.model';

async function httpGetAllPlanets(req: Request, res: Response) {
  return res.status(200).json(await planetsModel.getAllPlanets());
}

export {httpGetAllPlanets};
