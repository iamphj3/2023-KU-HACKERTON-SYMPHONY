const formatDate = (dateToFormat) => {
  const year = dateToFormat.getFullYear().toString();
  const month = (dateToFormat.getMonth() + 1).toString().padStart(2, '0');
  const day = dateToFormat.getDate().toString().padStart(2, '0');
  const dotDate = `${year}.${month}.${day}`;
  const barBate = `${year}-${month}-${day}`;

  return {
    dotDate,
    barBate,
  };
};

export default formatDate;
