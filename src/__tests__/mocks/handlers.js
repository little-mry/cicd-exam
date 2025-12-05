import { http, HttpResponse } from "msw";

const API_URL =
  "https://731xy9c2ak.execute-api.eu-north-1.amazonaws.com/booking";

export const handlers = [
  http.post(API_URL, () => {
    return HttpResponse.json({
      bookingDetails: {
        when: "2025-12-20T20:00",
        lanes: 1,
        people: 2,
        shoes: ["36", "36"],
        price: 340,
        bookingId: "STR1234ABC",
      },
    });
  }),
];

export const createBookingResponse = (overrides = {}) => {
  return HttpResponse.json({
    bookingDetails: {
      when: "2025-12-20T20:00",
      lanes: 1,
      people: 2,
      shoes: ["36", "36"],
      price: 340,
      bookingId: "STR1234ABC",
      ...overrides ,
    },
  });
};
