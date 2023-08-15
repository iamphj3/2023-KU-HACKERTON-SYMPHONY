import formatDate from './formatDate';

const getToday = () => {
  const currentDate = new Date();
  const formatedDate = formatDate(currentDate);

  const today = formatedDate.dotDate;
  const datetime = formatedDate.barDate;

  return {
    today,
    datetime,
  };
};

export default getToday;
