export const clockTime: (seconds: number) => string = (seconds) => {
  const sec = Math.round(seconds % 60);
  const min = Math.floor(seconds / 60);
  return `${min < 10 ? '0' + min : min}:${sec < 10 ? '0' + sec : sec}`;
};
