import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Confirmation from "../../views/Confirmation";
import userEvent from "@testing-library/user-event";
import { afterEach } from "vitest";

describe("Confirmation view", () => {
  const mockConfirmation = {
    when: "2025-12-20T20:00",
    people: 2,
    lanes: 1,
    bookingId: "STR1234ABC",
    price: 340,
  };

  const renderConfirmation = () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <Confirmation />
      </MemoryRouter>
    );

    return { user };
  };

  afterEach(() => {
    sessionStorage.clear();
  });

  describe("US4: As a user I want to be able to send my reservation request and get a bookning number and total amount", () => {
    it("should receive a booking number after completing booking (AC2)", async () => {
      sessionStorage.setItem("confirmation", JSON.stringify(mockConfirmation));
      renderConfirmation();

      expect(screen.getByDisplayValue("STR1234ABC")).toBeInTheDocument();
    });

    it("should calculate and display total price (120kr/person + 100kr/lane) (AC3)", async () => {
        sessionStorage.setItem("confirmation", JSON.stringify(mockConfirmation));
      renderConfirmation();

      expect(screen.getByText(/340 sek/i)).toBeInTheDocument();
    
    });

    it("should display total price and include players and lanes (AC4)", async () => {});
  });

  describe("US5: As a user I want to be able to navigate between the booking view and the confirmation view ", () => {
    it("should show message 'Inga bokningar' if user navigate to confiamtion view, and session storage is empty (AC2)", async () => {});
    it("should bookning if user navigate to confirmation view, and a booking exist in session storage (AC3)", async () => {});
  });
});
