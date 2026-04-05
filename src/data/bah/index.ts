import { bahLocations2024 } from './bah-rates-2024';
import { zipToMha } from './zip-to-mha';

export { bahLocations2024, zipToMha };
export type { BAHLocation } from './bah-rates-2024';

export function lookupBAHByZip(
  zip: string,
  rank: string,
  withDependents: boolean
): { rate: number; location: string } | null {
  const mha = zipToMha[zip];
  if (!mha) return null;

  const location = bahLocations2024.find((l) => l.mha === mha);
  if (!location) return null;

  const rates = withDependents ? location.withDependents : location.withoutDependents;
  const rate = rates[rank];
  if (rate === undefined) return null;

  return { rate, location: location.name };
}

export function searchLocations(query: string) {
  const q = query.toLowerCase();
  return bahLocations2024.filter(
    (l) =>
      l.name.toLowerCase().includes(q) ||
      l.state.toLowerCase().includes(q) ||
      l.mha.toLowerCase().includes(q)
  );
}
