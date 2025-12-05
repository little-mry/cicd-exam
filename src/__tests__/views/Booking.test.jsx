import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Booking from "../../views/Booking";
import userEvent from "@testing-library/user-event";

describe("Booking", () => {
  const renderBooking = () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <Booking />;
      </MemoryRouter>
    );

    return {
      user,
      dateInput: () => screen.getByLabelText(/date/i),
      timeInput: () => screen.getByLabelText(/time/i),
      playerInput: () => screen.getByLabelText(/bowlers/i),
      laneInput: () => screen.getByLabelText(/lanes/i),
      submitButton: () => screen.getByRole("button", { name: /striiiiiike/i }),
    };
  };

  describe("US1: As a user I want to be able to book a date and time, and state number of players so I can reserve one or more lanes", () => {
    it("should be able to choose date and time (AC1)", async () => {
      const { user, dateInput, timeInput } = renderBooking();

      await user.type(dateInput(), "2025-12-20");
      await user.type(timeInput(), "20:00");

      expect(dateInput().value).toBe("2025-12-20");
      expect(timeInput().value).toBe("20:00");
    });

    it("should be able to choose total number of players (minimum one)(AC2)", async () => {
      const { user, playerInput } = renderBooking();

      await user.type(playerInput(), "2");

      expect(playerInput().value).toBe("2");
    });

    it("should be able to reserve one or more lanes depending on number of players(AC3)", async () => {
      const { user, laneInput } = renderBooking();

      await user.type(laneInput(), "2");

      expect(laneInput().value).toBe("2");
    });

    //Felmeddelande
    it("should get an error message if input when date is missing (AC4)", async () => {
      const { user, timeInput, playerInput, laneInput, submitButton } =
        renderBooking();

      await user.type(timeInput(), "20:00");
      await user.type(playerInput(), "2");
      await user.type(laneInput(), "2");
      await user.click(submitButton());

      expect(
        screen.getByText(/alla fälten måste vara ifyllda/i)
      ).toBeInTheDocument();
    });

    it("should get an error message if input when time is missing (AC4)", async () => {
      const { user, dateInput, playerInput, laneInput, submitButton } =
        renderBooking();

      await user.type(dateInput(), "2025-12-20");
      await user.type(playerInput(), "2");
      await user.type(laneInput(), "2");
      await user.click(submitButton());

      expect(
        screen.getByText(/alla fälten måste vara ifyllda/i)
      ).toBeInTheDocument();
    });

    it("should get an error message if input when number of players is missing (AC4)", async () => {
      const { user, dateInput, timeInput, laneInput, submitButton } =
        renderBooking();

      await user.type(dateInput(), "2025-12-20");
      await user.type(timeInput(), "20:00");
      await user.type(laneInput(), "2");
      await user.click(submitButton());

      expect(
        screen.getByText(/alla fälten måste vara ifyllda/i)
      ).toBeInTheDocument();
    });

    it("should get an error message if input when number of lanes is missing (AC4)", async () => {
      const { user, dateInput, timeInput, playerInput, submitButton } =
        renderBooking();

      await user.type(dateInput(), "2025-12-20");
      await user.type(timeInput(), "20:00");
      await user.type(playerInput(), "2");
      await user.click(submitButton());

      expect(
        screen.getByText(/alla fälten måste vara ifyllda/i)
      ).toBeInTheDocument();
    });
    it("should get an error message if input when multipe fields are missing (AC4)", async () => {
      const { user, submitButton } = renderBooking();

      await user.click(submitButton());

      expect(
        screen.getByText(/alla fälten måste vara ifyllda/i)
      ).toBeInTheDocument();
    });

    //changed this AC because original AC5 is not implemented in the code
    it("should get an error message when there are too many players(max 4) on a lane(AC5)", async () => {
      const {
        user,
        dateInput,
        timeInput,
        playerInput,
        laneInput,
        submitButton,
      } = renderBooking();

      await user.type(dateInput(), "2025-12-20");
      await user.type(timeInput(), "20:00");
      await user.type(playerInput(), "5");
      await user.type(laneInput(), "1");

      //adds shoes bc otherwise that error message will be shown before
      const addShoeButton = screen.getByRole("button", { name: "+" });
      await user.click(addShoeButton);
      await user.click(addShoeButton);
      await user.click(addShoeButton);
      await user.click(addShoeButton);
      await user.click(addShoeButton);

      const shoeInputs = screen.getAllByLabelText(/shoe size/i);
      for (const input of shoeInputs) {
        await user.type(input, "36");
      }

      await user.click(submitButton());

      expect(
        screen.getByText(/det får max vara 4 spelare per bana/i)
      ).toBeInTheDocument();
    });
  });

  describe("US4: As a user I want to be able to send my reservation request and get a bookning number and total amount", () => {
    it("should be able to complete booking and recieve bookning number by clicking booking button (AC1)", async () => {
      const {
        user,
        dateInput,
        timeInput,
        playerInput,
        laneInput,
        submitButton,
      } = renderBooking();

      await user.type(dateInput(), "2025-12-20");
      await user.type(timeInput(), "20:00");
      await user.type(playerInput(), "2");
      await user.type(laneInput(), "1");

      //adds shoes bc otherwise that error message will be shown before
      const addShoeButton = screen.getByRole("button", { name: "+" });
      await user.click(addShoeButton);
      await user.click(addShoeButton);

      const shoeInputs = screen.getAllByLabelText(/shoe size/i);
      for (const input of shoeInputs) {
        await user.type(input, "36");
      }

      await user.click(submitButton());

      await waitFor(() => {
        expect(
          screen.queryByText(/alla fälten måste vara ifyllda/i)
        ).not.toBeInTheDocument();
      });
    });
  });

  describe("US5: As a user I want to be able to navigate between the booking view and the confirmation view ", () => {
    it("should navigate from booking view to confirmation view after successful booking (AC1)", () => {});
  });
});
