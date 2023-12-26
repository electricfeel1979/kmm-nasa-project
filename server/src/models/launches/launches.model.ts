import {Launch} from './launches.types';

import launchesDatabase from './launches.mongo';
import planets from '../planets/planets.mongo';

const DEFAULT_FLIGHT_NUMBER = 100;

const launches = new Map();

const launch: Launch = {
  flightNumber: 100,
  mission: 'Kepler Exploration X',
  rocket: 'Explorer IS1',
  launchDate: new Date('December 27, 2030'),
  target: 'Kepler-442 b',
  customers: ['ZTM', 'NASA'],
  upcoming: true,
  success: true,
};

saveLaunch(launch);

function existsLaunchWithId(launchId: number) {
  return launches.has(launchId);
}

async function getLatestFlightNumber() {
  const latestLaunch = await launchesDatabase.findOne().sort('-flightNumber');

  if (!latestLaunch) {
    return DEFAULT_FLIGHT_NUMBER;
  }

  return latestLaunch.flightNumber;
}

async function getAllLaunches() {
  console.log('getAllLaunches');
  console.log(launches.values());
  return await launchesDatabase.find({}, {_id: 0, __v: 0});
}

async function saveLaunch(launch: Launch) {
  const planet = await planets.findOne({
    keplerName: launch.target,
  });

  if (!planet) {
    throw new Error('No matching planet found');
  }

  await launchesDatabase.findOneAndUpdate(
    {
      flightNumber: launch.flightNumber,
    },
    launch,
    {
      upsert: true,
    }
  );
}

async function scheduleNewLaunch(launch: Launch) {
  const newFlightNumber = (await getLatestFlightNumber()) + 1;

  const newLaunch = Object.assign(launch, {
    success: true,
    upcoming: true,
    customers: ['Zero to Mastery', 'NASA'],
    flightNumber: newFlightNumber,
  });

  await saveLaunch(newLaunch);
}

function abortLaunchById(launchId: number) {
  const aborted = launches.get(launchId);
  aborted.upcoming = false;
  aborted.succezs = false;
  return aborted;
}

export default {
  getAllLaunches,
  scheduleNewLaunch,
  launches,
  existsLaunchWithId,
  abortLaunchById,
};
