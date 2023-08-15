const getToday = () => {
  const currentDate = new Date();
  const year = currentDate.getFullYear().toString();
  const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
  const day = currentDate.getDate().toString().padStart(2, '0');
  const today = `${year}.${month}.${day}`;
  const datetime = `${year}-${month}-${day}`;

  return {
    today,
    datetime,
  };
};

export default getToday;
