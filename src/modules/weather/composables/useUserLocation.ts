export const useUserLocation = () => {
  const getUserLocation = (): Promise<GeolocationPosition> => {
    return new Promise((res, rej) => {
      navigator.geolocation.getCurrentPosition(res, rej);
    });
  };

  return { getUserLocation };
};
