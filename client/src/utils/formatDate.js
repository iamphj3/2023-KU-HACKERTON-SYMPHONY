const formatDate = (dateToFormat) => {
  const date = new Date(dateToFormat);
  const year = date.getFullYear().toString();
  const slicedYear = date.getFullYear().toString().slice(-2);
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const dotDate = `${year}.${month}.${day}`;
  const barBate = `${year}-${month}-${day}`;
  const postDate = `${slicedYear}.${month}.${day}`;

  return {
    dotDate,
    barBate,
    postDate,
  };
};

export default formatDate;
