export const getImgUrl = (pic: string): string => {
  const images = require.context(
    '@/modules/weather/assets/icons',
    false,
    /\.png$/
  );
  return images('./' + pic + '.png');
};
