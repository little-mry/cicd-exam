import { render, screen } from "@testing-library/react";
import Booking from "../../views/Booking";
import userEvent from "@testing-library/user-event";

describe("Booking", () => {
  describe("US1: As a user I want to be able to book a date and time, and state number of players so I can reserve one or more lanes", () => {
    it("should be able to choose date and time (AC1)", async () => {});

    it("should be able to choose total number of players (minimum one)(AC2)", async () => {});

    it("should be able to reserve one or more lanes depending on number of players(AC3)", async () => {});

    it("should get an error message if input when date is missing (AC4)", async () => {});

    it("should get an error message if input when time is missing (AC4)", async () => {});

    it("should get an error message if input when number of players is missing (AC4)", async () => {});

    it("should get an error message if input when number of lanes is missing (AC4)", async () => {});
    it("should get an error message if input when multipe fields are missing (AC4)", async () => {});

    it("should get an error message if when not enough available lanes(A5)", async () => {});
  });

  describe("US4: As a user I want to be able to send my reservation request and get a bookning number and total amount", () => {
    it("should be able to complete booking by clicking booking button (AC1)", async () => {});

    it("should receive a booking number after completing booking (AC2)", async () => {});

    it("should calculate and display total price (120kr/person + 100kr/lane) (AC3)", async () => {});

    it("should display total price and include players and lanes (AC4)", async () => {});
  });

  describe("US5: As a user I want to be able to navigate between the booking view and the confirmation view ", () => {
    it("should navigate from booking view to confirmation view after successful booking (AC1)", () => {});
  });
});
