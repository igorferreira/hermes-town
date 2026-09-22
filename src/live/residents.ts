import residentsJson from './residents.json';

/**
 * Fixed townsfolk, materialized from the offline roster at boot. Each entry
 * is one Hermes profile that lives permanently in its assigned house; they
 * do not depend on live events to exist.
 */
export interface StaticResident {
  id: string;
  name: string;
  home: string;
  homeIndex: number;
}

export const STATIC_RESIDENTS: StaticResident[] = residentsJson.residents.map((r) => ({
  id: r.id,
  name: r.name,
  home: r.home,
  homeIndex: r.homeIndex,
}));
