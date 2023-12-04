import {Planet} from './planets.types';
import path from 'path';
import {parse} from 'csv-parse';
import fs from 'fs';

import planets from './planets.mongo';

const habitablePlanets: Planet[] = [];

function isHabitablePlanet(planet: Planet) {
  return (
    planet['koi_disposition'] === 'CONFIRMED' &&
    planet['koi_insol'] > 0.36 &&
    planet['koi_insol'] < 1.11 &&
    planet['koi_prad'] < 1.6
  );
}

function loadPlanetsData() {
  return new Promise((resolve, reject) => {
    fs.createReadStream(
      path.join(__dirname, '..', '..', '..', 'data', 'kepler_data.csv')
    )
      .pipe(
        parse({
          comment: '#',
          columns: true,
        })
      )
      .on('data', async (data: Planet) => {
        if (isHabitablePlanet(data)) {
          // TODO: Replace below create with insert + update = upsert
          // await planets.create({
          //   keplerName: data.kepler_name,
          // });
        }
      })
      .on('error', (err: string) => {
        console.log(err);
        reject(err);
      })
      .on('end', () => {
        // console.log(habitablePlanets);
        console.log(
          habitablePlanets.map(planet => {
            return planet['kepler_name'];
          })
        );
        console.log(`${habitablePlanets.length} habitable planets found!`);
        resolve(null);
      });
  });
}

async function getAllPlanets() {
  return await planets.find({});
}

export default {
  getAllPlanets,
  // planets: habitablePlanets,
  loadPlanetsData,
};
