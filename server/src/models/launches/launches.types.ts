export type LaunchFilter = {
  flightNumber?: number;
  launchDate?: Date | string;
  mission?: string;
  rocket?: string;
  target?: string;
  customers?: string[];
  upcoming?: boolean;
  success?: boolean;
};

export type Launch = {
  flightNumber: number;
  mission: string;
  rocket: string;
  launchDate: Date | string;
  target?: string;
  customers: string[];
  upcoming: boolean;
  success: boolean;
};

export type LaunchData = {
  docs: LaunchAPIData[];
  totalDocs: number;
  offset: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number | null;
  nextPage: number | null;
};

type LaunchAPIData = {
  fairings: Fairings;
  links: Links;
  static_fire_date_utc: string | null;
  static_fire_date_unix: number | null;
  net: boolean;
  window: number;
  rocket: Rocket;
  success: boolean;
  failures: Failure[];
  details: string | null;
  crew: string[];
  ships: string[];
  capsules: string[];
  payloads: Payload[];
  launchpad: string;
  flight_number: number;
  name: string;
  date_utc: string;
  date_unix: number;
  date_local: string;
  date_precision: string;
  upcoming: boolean;
  cores: Core[];
  auto_update: boolean;
  tbd: boolean;
  launch_library_id: string | null;
  id: string;
};

type Fairings = {
  reused: boolean | null;
  recovery_attempt: boolean | null;
  recovered: boolean | null;
  ships: string[];
};

type Links = {
  patch: Patch;
  reddit: Reddit;
  flickr: Flickr;
  presskit: string | null;
  webcast: string | null;
  youtube_id: string | null;
  article: string | null;
  wikipedia: string | null;
};

type Patch = {
  small: string | null;
  large: string | null;
};

type Reddit = {
  campaign: string | null;
  launch: string | null;
  media: string | null;
  recovery: string | null;
};

type Flickr = {
  small: string[];
  original: string[];
};

type Rocket = {
  name: string;
  id: string;
};

type Failure = {
  time: number | null;
  altitude: number | null;
  reason: string;
};

type Payload = {
  customers: string[];
  id: string;
};

type Core = {
  core: string;
  flight: number;
  gridfins: boolean;
  legs: boolean;
  reused: boolean;
  landing_attempt: boolean;
  landing_success: boolean | null;
  landing_type: string | null;
  landpad: string | null;
};
