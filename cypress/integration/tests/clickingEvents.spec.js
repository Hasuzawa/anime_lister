

describe("Click elements", () => {
    it("Go to website", () => {
        cy.visit("")
    })

    it("Before clicking menu collapse", () => {
        cy.get("#side-bar").should("have.css", "width", "320px")
        cy.get("#control-panel").should("have.css", "width", "272px")

    })

    it("After clicking menu collapse", () => {
        cy.get("#fold-menu-btn").click()
        cy.get("#side-bar").should("have.css", "width", "48px")
        cy.get("#control-panel").should("have.css", "width", "0px")
    })

    it("Restore to original menu state", () => {
        cy.get("#unfold-menu-btn").click()
        cy.get("#side-bar").should("have.css", "width", "320px")
        cy.get("#control-panel").should("have.css", "width", "272px")
    })


    // it("Before clicking scroll to bottom", () => {
    //     cy.get("#scroll-to-bottom-btn").click()
    //     cy.wait(3000)
    //     cy.get("#feeds").window().then(x => expect(x.scrollTop).gte(1000))
    // })

    // it("After clicking scroll to top", () => {
    //     cy.get("#scroll-to-top-btn").click()
    //     cy.wait(3000)

    // })

    it("Year filter menu can be opened and closed", () => {
        cy.get("#yearFilterSelect-options").should("not.exist")
        cy.get("#yearFilterSelect").click()
        cy.get("#yearFilterSelect-options")
        cy.get("#yearFilterSelect").click()
        cy.get("#yearFilterSelect-options").should("not.exist")
    })

    it("Status filter menu can be opened and closed", () => {
        cy.get("#statusFilterSelect-options").should("not.exist")
        cy.get("#statusFilterSelect").click()
        cy.get("#statusFilterSelect-options")
        cy.get("#statusFilterSelect").click()
        cy.get("#statusFilterSelect-options").should("not.exist")
    })

    it("Format filter menu can be opened and closed", () => {
        cy.get("#formatFilterSelect-options").should("not.exist")
        cy.get("#formatFilterSelect").click()
        cy.get("#formatFilterSelect-options")
        cy.get("#formatFilterSelect").click()
        cy.get("#formatFilterSelect-options").should("not.exist")
    })

    it("Sort Criterion menu can be opened and closed", () => {
        cy.get("#sortCriterionSelect-options").should("not.exist")
        cy.get("#sortCriterionSelect").click()
        cy.get("#sortCriterionSelect-options")
        cy.get("#sortCriterionSelect").click()
        cy.get("#sortCriterionSelect-options").should("not.exist")
    })
})