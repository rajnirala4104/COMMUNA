export const getTimeFromMongoData = (mongoDateData) => {
   const date = mongoDateData.split("T")[0];
   const time = mongoDateData.split("T")[1].split(".")[0];
   const hours = time.split(":")[0];
   const minutes = time.split(":")[1];
   const amOrPm = hours >= 12 ? "pm" : "am";
   const hoursIn12HourFormat = hours % 12 === 0 ? 12 : hours % 12;
   const finalTime = `${date}-${hoursIn12HourFormat}:${minutes} ${amOrPm}`;

   return finalTime;
};
