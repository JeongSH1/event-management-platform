export const convertSecondToFormattedTime = (waitSeconds: number): string => {
  const hours = Math.floor(waitSeconds / 3600);
  const minutes = Math.floor((waitSeconds % 3600) / 60);
  const seconds = waitSeconds % 60;

  return `${hours ? `${hours}시간 ` : ''}${minutes ? `${minutes}분 ` : ''}${seconds}초`;
}