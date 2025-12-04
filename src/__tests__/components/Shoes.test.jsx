import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Shoes from "../../components/Shoes/Shoes";

describe("Shoes component", () => {
  describe("US2: As a user I want to be able to choose shoe size for each player", () => {
    it("should be able to choose shoe size for each player in the reservation (AC1, AC3, AC6)", async () => {});

    it("should be able to change shoe size for each player (AC2)", async () => {});

    it("should show error 'Alla skor måste vara ifyllda' when shoe size field is empty(AC4)", async () => {});

    it("should get an error 'Antalet skor måste stämma överens med antal spelare'  when more shoes than players (AC5)", async () => {});
   
    it("should get an error 'Antalet skor måste stämma överens med antal spelare'  when fewer shoes than players (AC5)", async () => {});

    it("should show an overview of choosen shoe sizes before user completes booking (AC6)", async () => {});
  });

  describe('US3: As a user I want to be able to remove a shoe size field if I accidently book more shoes than necessary', () => { 
    it('should be able to remove existing shoe size field(AC1)', () => {
        
    })

    it('should be able to remove existing shoe size field and updating the bookning (AC1 + AC2)', () => {
        
    })
    it('should not include removed shoe in shoe count and total booking price (AC3) (AC3)', () => {
        
    })
   })
});
