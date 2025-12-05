import { render, screen, waitFor } from "@testing-library/react";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import Booking from "../../views/Booking";
import Confirmation from "../../views/Confirmation";
import userEvent from "@testing-library/user-event";

describe("Bookning Flow Integration Tests", () => {
  const renderApp = () => {
    const user = userEvent.setup();

    const router = createMemoryRouter(
      [
        { path: "/", element: <Booking /> },
        { path: "/confirmation", element: <Confirmation /> },
      ],
      { initialEntries: ["/"] }
    );

    render(<RouterProvider router={router} />);

    return {
      user,
      submitButton: () => screen.getByRole("button", { name: /striiiiiike/i }),
    };
  };

  const fillBookingForm = async (user, players, lanes) => {
    await user.type(screen.queryByLabelText(/date/i), "2025-12-20");
    await user.type(screen.queryByLabelText(/time/i), "20:00");
    await user.type(screen.queryByLabelText(/bowlers/i), players.toString());
    await user.type(screen.queryByLabelText(/lanes/i), lanes.toString());

    const addShoeButton = screen.getByRole("button", { name: "+" });
    for (let i = 0; i < players; i++) {
      await user.click(addShoeButton);
    }

    const shoeInputs = screen.getAllByLabelText(/shoe size/i);
    for (const input of shoeInputs) {
      await user.type(input, "36");
    }
  };

  describe("US4: As a user I want to be able to send my reservation request and get a bookning number and total amount", () => {
    it("should receive a booking number after completing booking (AC2)", async () => {
        const { user, submitButton } = renderApp();
    
        await fillBookingForm(user, 2, 1);
        await user.click(submitButton())
    
        await waitFor(() => {
          expect(screen.getByText(/see you soon/i)).toBeInTheDocument()
        })
    
        expect(screen.getByDisplayValue(/STR1234ABC/i)).toBeInTheDocument();
    
    });

    it("should calculate and display total price (120kr/person + 100kr/lane) (AC3)", async () => {
      const { user, submitButton } = renderApp();

      await fillBookingForm(user, 2, 1);
      await user.click(submitButton())

      await waitFor(() => {
        expect(screen.getByText(/see you soon/i)).toBeInTheDocument()
      })

      expect(screen.getByText(/340 sek/i)).toBeInTheDocument();

    });

    it("should display total price and include players and lanes (AC4)", async () => {});
  });
});
