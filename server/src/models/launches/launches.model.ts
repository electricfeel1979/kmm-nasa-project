import {Launch} from './launches.types';

import launchesDatabase from './launches.mongo';
import planets from '../planets/planets.mongo';

const launches = new Map();

let latestFlightNumber = 100;

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

  await launchesDatabase.updateOne(
    {
      flightNumber: launch.flightNumber,
    },
    launch,
    {
      upsert: true,
    }
  );
}

function addNewLaunch(launch: Launch) {
  latestFlightNumber++;
  launches.set(
    latestFlightNumber,
    Object.assign(launch, {
      success: true,
      upcoming: true,
      customers: ['Zero to Mastery', 'NASA'],
      flightNumber: latestFlightNumber,
    })
  );
}

function abortLaunchById(launchId: number) {
  const aborted = launches.get(launchId);
  aborted.upcoming = false;
  aborted.succezs = false;
  return aborted;
}

export default {
  getAllLaunches,
  addNewLaunch,
  launches,
  existsLaunchWithId,
  abortLaunchById,
};
