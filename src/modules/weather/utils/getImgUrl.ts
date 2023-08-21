export const getImgUrl = (pic: string): string => {
  const images = require.context('@/assets/weather/images', false, /\.png$/);
  return images('./' + pic + '.png');
};
