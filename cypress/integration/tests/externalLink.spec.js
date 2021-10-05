
const HasuzawaLink = "https://github.com/Hasuzawa";
const AniListAPI = "https://github.com/AniList/ApiV2-GraphQL-Docs";

describe("Go to External Websites", () => {

    it("Go to maker GitHub", () => {
        cy.visit("")

        //cy.get("#maker-credit-link").click()
        //cy.url().should("include", "https://github.com/Hasuzawa");    // cannot go to 2 sites with different domain one test
        cy.get("#maker-credit-link").should("have.attr", "href", HasuzawaLink)
    })

    it("Go to api repository", () => {
        cy.get("#api-credit-link").should("have.attr", "href", AniListAPI)
    })
})