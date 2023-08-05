export type WeatherCoords = {
  lon: number;
  lat: number;
};

export type WeatherGeneralInfo = {
  description: string;
  icon: string;
};

export type WeatherMain = {
  temp: number;
  pressure: number;
  humidity: number;
  feels_like: number;
};

export type WeatherWindInfo = {
  speed: number;
  deg: number;
};

export type WeatherRainInfo = {
  [key: string]: number;
};

export type WeatherCloudsInfo = {
  all: number;
};

export type WeatherFullInfo = {
  weather: WeatherGeneralInfo[];
  main: WeatherMain;
  wind: WeatherWindInfo;
  name: string;
  id: number;
  order?: number;
};

export type WeatherParams = {
  title: string;
  value: string | number;
};
