describe("Inditex Editor", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.clearLocalStorage();
  });

  it("should have valid elements", () => {
    cy.getBySel("zoom-controls").should("exist");
    cy.getBySel("row-template")
      .should("exist")
      .within(() => {
        cy.getBySel("grid-row").should("have.length", 3);
      });
    cy.contains("+ Añadir fila").should("exist");
    cy.contains("Guardar parilla").should("exist");
  });

  it("should have a valid row data", () => {
    cy.getBySel("grid-row")
      .first()
      .within(() => {
        cy.contains("template-1").should("exist");
        cy.contains("Añade productos").should("exist");
        cy.contains("Position").should("exist");
        cy.getBySel("product").should("have.length", 1);
      });
  });

  it("should have a valid product data", () => {
    cy.getBySel("grid-row")
      .first()
      .within(() => {
        cy.getBySel("product")
          .first()
          .within(() => {
            cy.contains("Camisa oversize de cuadros").should("exist");
            cy.contains("25,95 €").should("exist");
            cy.get("img").should("exist");
          });
      });
  });

  it("should drag product to another grid", () => {
    cy.getBySel("product")
      .eq(2)
      .drag(cy.getBySel("grid-row").first(), { wait: 800 });

    // cy.getBySel("grid-row")
    //   .eq(1)
    //   .within(() => {
    //     cy.getBySel("product")
    //       .first()
    //       .trigger("dragstart")
    //       .trigger("dragleave");
    //   });
    // cy.wait(800); // it's used to see drop effect
    // cy.getBySel("grid-row")
    //   .first()
    //   .trigger("dragenter")
    //   .trigger("dragover")
    //   // .trigger("drop")
    //   .trigger("dragend")
    //   .trigger("dropend")
  });

  it("should drag ordering products", () => {
    cy.getBySel("product")
      .eq(4)
      .drag(cy.getBySel("grid-row").last(), { wait: 800 });
  });

  it("should cannot save grid", () => {
    cy.scrollTo("bottom");
    cy.getBySel("add-row").click();
    cy.contains("Guardar parilla").should("be.disabled");
  });
});
