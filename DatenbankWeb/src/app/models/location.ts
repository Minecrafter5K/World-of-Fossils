import { object, string } from "valibot";

export interface Location {
  lat: string;
  lng: string;
}

export const locationSchema = object({
  lng: string(),
  lat: string(),
});
