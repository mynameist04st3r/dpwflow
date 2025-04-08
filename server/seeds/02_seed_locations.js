/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  await knex('locations').del();

  const baseMap = {
    AL: ['Fort Rucker', 'Redstone Arsenal', 'Anniston Army Depot'],
    AK: ['Fort Wainwright', 'Fort Greely', 'Joint Base Elmendorf-Richardson'],
    AZ: ['Fort Huachuca', 'Yuma Proving Ground'],
    AR: ['Pine Bluff Arsenal', 'Camp Joseph T. Robinson', 'Fort Chaffee'],
    CA: ['Fort Irwin', 'Presidio of Monterey', 'Camp Roberts', 'Fort Hunter Liggett'],
    CO: ['Fort Carson', 'Pueblo Chemical Depot'],
    GA: ['Fort Benning', 'Fort Gordon', 'Fort Stewart', 'Hunter Army Airfield'],
    HI: ['Schofield Barracks', 'Fort Shafter', 'Tripler Army Medical Center'],
    KS: ['Fort Leavenworth', 'Fort Riley'],
    KY: ['Fort Knox', 'Fort Campbell'],
    LA: ['Fort Polk', 'Camp Beauregard'],
    MD: ['Aberdeen Proving Ground', 'Fort Meade', 'Fort Detrick'],
    MO: ['Fort Leonard Wood'],
    NJ: ['Fort Dix', 'Picatinny Arsenal'],
    NY: ['Fort Drum', 'United States Military Academy at West Point', 'Fort Hamilton'],
    NC: ['Fort Bragg', 'Camp Mackall'],
    OK: ['Fort Sill', 'McAlester Army Ammunition Plant'],
    SC: ['Fort Jackson'],
    TX: ['Fort Hood', 'Fort Bliss', 'Fort Sam Houston'],
    VA: ['Fort Belvoir', 'Fort Eustis', 'Fort Lee'],
    WA: ['Joint Base Lewis-McChord', 'Yakima Training Center'],
    WI: ['Fort McCoy']
  };

  const entries = [];
  let id = 1;

  for (const [state, bases] of Object.entries(baseMap)) {
    for (const base of bases) {
      entries.push({
        id: id++,
        state,
        military_base: base
      });
    }
  }

  await knex('locations').insert(entries);
  await knex.raw(`SELECT setval('locations_id_seq', (SELECT MAX(id) FROM locations))`);
};
