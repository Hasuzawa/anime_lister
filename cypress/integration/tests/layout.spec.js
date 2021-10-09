

describe("Check Layout is correct" , () => {
    it("Go to website", () => {
        cy.visit("")
    })

    it("Main listing area exists", () => {
        cy.get("#main")
    })

    it("Side menu exists", () => {
        cy.get("#side-bar")
    })

    it("Website logo exists", () => {
        cy.get("#website-logo")
    })

    it("Year filter exists", () => {
        cy.get("#yearFilterSelect")
    })

    it("Status filter exists", () => {
        cy.get("#statusFilterSelect")
    })

    it("Format filter exists", () => {
        cy.get("#formatFilterSelect")
    })

    it("Sort Criterium exists", () => {
        cy.get("#sortCriterionSelect")
    })

    it("Maker credit exists", () => {
        cy.get("#maker-credit-link")
    })

    it("API credit exists", () => {
        cy.get("#api-credit-link");
    })

    it("Anime fetching component exists", () => {
        cy.get("#feeds")
    })

    // Debugs, should not be visible in production build
    it("Debug menu does not exist", () => {
        cy.get("#debug-menu").should("not.exist")
    })

    it("Debug Selected state does not exist", () => {
        cy.get("#debug-selected-state").should("not.exist")
    })

})