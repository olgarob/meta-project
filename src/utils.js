export const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

// this function is necessary because I used the min and max attributes of the type date input but the user can override them manually

export const convertToDate = (stringDate) => {
  let dateArray = stringDate.split("-");
  let year = dateArray[0];
  let month = parseInt(dateArray[1], 10) - 1;
  let day = dateArray[2];
  let entryDate = new Date(year, month, day);
  entryDate.setHours(0, 0, 0, 0);
  return entryDate;
 }

export const validateResDate = (resDate, startDate, endDate) => {

  let selectedDate=convertToDate(resDate);
  let minDate= convertToDate(startDate);
  let maxDate= convertToDate(endDate);

  if(selectedDate<minDate || selectedDate>maxDate) return false;
  else return true;

}
// arguments are in date format - only the date part, not hours, are taken into account
export const substractDates = (date1,date2) => {
  date1.setHours(0, 0, 0, 0);
  date2.setHours(0, 0, 0, 0);
  const oneDay = 24 * 60 * 60 * 1000; // milliseconds in one day
  const diffInMilliseconds = date1.getTime() - date2.getTime();
  return Math.round(diffInMilliseconds / oneDay); // Convert milliseconds to days
}

export const pad = (str) => String(str).padStart(2, "0");