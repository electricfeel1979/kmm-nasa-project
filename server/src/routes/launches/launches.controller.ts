import {Request, Response} from 'express';

import launchesModel from '../../models/launches/launches.model';

async function httpGetAllLaunches(req: Request, res: Response) {
  return res.status(200).json(await launchesModel.getAllLaunches());
}

async function httpAddNewLaunch(req: Request, res: Response) {
  const launch = req.body;

  const {mission, rocket, launchDate, target} = launch;

  console.log(launch);
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

  await launchesModel.scheduleNewLaunch(launch);
  return res.status(201).json(launch);
}

async function httpAbortLaunch(req: Request, res: Response) {
  const launchId = Number(req.params.id);

  const existsLaunch = await launchesModel.existsLaunchWithId(launchId);

  if (!existsLaunch) {
    return res.status(404).json({
      error: 'Launch not found',
    });
  }

  const aborted = await launchesModel.abortLaunchById(launchId);

  if (!aborted) {
    return res.status(400).json({
      error: 'Launch not aborted',
    });
  }

  return res.status(200).json({
    ok: true,
  });
}

export {httpGetAllLaunches, httpAddNewLaunch, httpAbortLaunch};
