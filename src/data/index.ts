import type { CountryData } from "./types";

import AT from "./countries/AT.json";
import BE from "./countries/BE.json";
import BG from "./countries/BG.json";
import HR from "./countries/HR.json";
import CY from "./countries/CY.json";
import CZ from "./countries/CZ.json";
import DK from "./countries/DK.json";
import EE from "./countries/EE.json";
import FI from "./countries/FI.json";
import FR from "./countries/FR.json";
import DE from "./countries/DE.json";
import GR from "./countries/GR.json";
import HU from "./countries/HU.json";
import IE from "./countries/IE.json";
import IT from "./countries/IT.json";
import LV from "./countries/LV.json";
import LT from "./countries/LT.json";
import LU from "./countries/LU.json";
import MT from "./countries/MT.json";
import NL from "./countries/NL.json";
import PL from "./countries/PL.json";
import PT from "./countries/PT.json";
import RO from "./countries/RO.json";
import SK from "./countries/SK.json";
import SI from "./countries/SI.json";
import ES from "./countries/ES.json";
import SE from "./countries/SE.json";

import timelineJson from "./timeline.json";

export const countries = [
  AT, BE, BG, HR, CY, CZ, DK, EE, FI, FR, DE, GR, HU, IE, IT, LV, LT, LU,
  MT, NL, PL, PT, RO, SK, SI, ES, SE,
].map((c) => c as unknown as CountryData)
  .sort((a, b) => a.code.localeCompare(b.code));

export const countryByCode = (code: string): CountryData | undefined =>
  countries.find((c) => c.code.toUpperCase() === code.toUpperCase());

export interface TimelineEntry {
  date: string;
  label: string;
  detail: string;
}

export const timeline = timelineJson as TimelineEntry[];

export * from "./types";
