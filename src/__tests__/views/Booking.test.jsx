import { render, screen } from "@testing-library/react";
import Booking from "../../views/Booking";
import userEvent from "@testing-library/user-event";

describe("Booking", () => {
  describe("US1: As a user I want to be able to book a date and time, and state number of players so I can reserve one or more lanes", () => {
    it("should be able to choose date and time (AC1)", async () => {});

    it("should be able to choose total number of players (minimum one)(AC2)", async () => {});

    it("should be able to reserve one or more lanes depending on number of players(AC3)", async () => {});

    it("should get an error message if input for date is missing (AC4)", async () => {});

    it("should get an error message if input for time is missing (AC4)", async () => {});

    it("should get an error message if input for number of players is missing (AC4)", async () => {});

    it("should get an error message if ninput for umber of lanes is missing (AC4)", async () => {});

    it("should get an error message if not enough available lanes(A5)", async () => {});
  });

  describe("US5: As a user I want to be able to navigate between the booking view and the confirmation view ", () => {
    it("should navigate from booking view to confirmation view when the booking is done (AC1)", () => {});
  });


});
