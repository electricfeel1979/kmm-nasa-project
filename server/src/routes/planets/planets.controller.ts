import {Request, Response} from 'express';

import planets from '../../model/planets.model';

function getAllPlanets(req: Request, res: Response) {
  return res.status(200).json(planets);
}

export {getAllPlanets};
