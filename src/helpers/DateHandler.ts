function hourFormat(rawDate: number) {
  const hour = new Date(rawDate); //Convert timestamp to date

  const strH = `${hour.getHours() < 10 ? '0' : ''}${hour.getHours()}`;
  const strM = `${hour.getHours() < 10 ? '0' : ''}${hour.getMinutes()}`;
  const str = strH + ':' + strM;
  return str;
}

export { hourFormat };
