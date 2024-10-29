// this was used for the first version:
export const availableTimesArray= [
  "17:00",
  "18:00",
  "19:00",
  "20:00",
  "21:00",
  "22:00"
]

// following function was used in the second prototype, before switching to the API function
// hypothetically following booking spots come from a database somewhere
// The restaurant only allows bookings X days in advance. for this example X is 7
// the app retrieves the booking slots for 7 days beginning today
// and put them in an array, beeing the first element today and so on
// for the sake of simplicity, let´s assume the customer is using the app before 17:00 h of today

export const fetchBookingslots = (daysToLookAt) =>{
  // here should come a funtion for fetching the data from the database
 console.log(daysToLookAt);
  let bookingSlots=[
    [
      { time: "17:00", booked: false, customerFirstName: "", customerLastName: "", guests: 0 },
      { time: "18:00", booked: true, customerFirstName: "Allison", customerLastName: "Montgomery", guests: 4 },
      { time: "19:00", booked: false, customerFirstName: "", customerLastName: "", guests: 0 },
      { time: "20:00", booked: false, customerFirstName: "", customerLastName: "", guests: 0 },
      { time: "21:00", booked: false, customerFirstName: "", customerLastName: "", guests: 0 },
      { time: "22:00", booked: true, customerFirstName: "Thomas", customerLastName: "Zaphirus", guests: 6 },
    ],
    [
      { time: "17:00", booked: true, customerFirstName: "Ann", customerLastName: "McGarret", guests: 8 },
      { time: "18:00", booked: true, customerFirstName: "Arthur", customerLastName: "Connan", guests: 2 },
      { time: "19:00", booked: false, customerFirstName: "", customerLastName: "", guests: 0 },
      { time: "20:00", booked: false, customerFirstName: "", customerLastName: "", guests: 0 },
      { time: "21:00", booked: false, customerFirstName: "", customerLastName: "", guests: 4 },
      { time: "22:00", booked: false, customerFirstName: "", customerLastName: "", guests: 0 },
    ],
    [
      { time: "17:00", booked: false, customerFirstName: "", customerLastName: "", guests: 0 },
      { time: "18:00", booked: false, customerFirstName: "", customerLastName: "", guests: 0 },
      { time: "19:00", booked: false, customerFirstName: "", customerLastName: "", guests: 0 },
      { time: "20:00", booked: false, customerFirstName: "", customerLastName: "", guests: 0 },
      { time: "21:00", booked: false, customerFirstName: "", customerLastName: "", guests: 0 },
      { time: "22:00", booked: false, customerFirstName: "", customerLastName: "", guests: 0 },
    ],
    [
      { time: "17:00", booked: true, customerFirstName: "Luis", customerLastName: "Amstrong", guests: 8 },
      { time: "18:00", booked: true, customerFirstName: "Frank", customerLastName: "Sinatra", guests: 2 },
      { time: "19:00", booked: true, customerFirstName: "Lady", customerLastName: "Gaga", guests: 4 },
      { time: "20:00", booked: false, customerFirstName: "", customerLastName: "", guests: 0 },
      { time: "21:00", booked: false, customerFirstName: "", customerLastName: "", guests: 0 },
      { time: "22:00", booked: true, customerFirstName: "Sarah", customerLastName: "Philips", guests: 0 },
    ],
    [
      { time: "17:00", booked: false, customerFirstName: "", customerLastName: "", guests: 0 },
      { time: "18:00", booked: false, customerFirstName: "", customerLastName: "", guests: 0 },
      { time: "19:00", booked: false, customerFirstName: "", customerLastName: "", guests: 0 },
      { time: "20:00", booked: true, customerFirstName: "Martha", customerLastName: "Slate", guests: 4 },
      { time: "21:00", booked: false, customerFirstName: "", customerLastName: "", guests: 0 },
      { time: "22:00", booked: false, customerFirstName: "", customerLastName: "", guests: 0 },
    ],
    [
      { time: "17:00", booked: true, customerFirstName: "Remington", customerLastName: "Steel", guests: 4 },
      { time: "18:00", booked: false, customerFirstName: "", customerLastName: "", guests: 0 },
      { time: "19:00", booked: false, customerFirstName: "", customerLastName: "", guests: 0 },
      { time: "20:00", booked: false, customerFirstName: "", customerLastName: "", guests: 0 },
      { time: "21:00", booked: false, customerFirstName: "", customerLastName: "", guests: 0 },
      { time: "22:00", booked: false, customerFirstName: "", customerLastName: "", guests: 0 },
    ],
    [
      { time: "17:00", booked: false, customerFirstName: "", customerLastName: "", guests: 0 },
      { time: "18:00", booked: true, customerFirstName: "David", customerLastName: "Copperfield", guests: 10 },
      { time: "19:00", booked: false, customerFirstName: "", customerLastName: "", guests: 0 },
      { time: "20:00", booked: false, customerFirstName: "", customerLastName: "", guests: 0 },
      { time: "21:00", booked: true, customerFirstName: "Mary", customerLastName: "Courie", guests: 5 },
      { time: "22:00", booked: false, customerFirstName: "", customerLastName: "", guests: 0 },
    ],
  ];
  return bookingSlots;
}


