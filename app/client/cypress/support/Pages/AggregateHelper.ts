import 'cypress-wait-until';
const uuid = require("uuid");
import { CommonLocators } from "../Objects/CommonLocators";

const locator = new CommonLocators();
export class AggregateHelper {

    public AddDsl(dsl: string) {
        let currentURL;
        let pageid: string;
        let layoutId;
        cy.url().then((url) => {
            currentURL = url;
            const myRegexp = /pages(.*)/;
            const match = myRegexp.exec(currentURL);
            pageid = match![1].split("/")[1];
            cy.log(pageid + "page id");
            //Fetch the layout id
            cy.request("GET", "api/v1/pages/" + pageid).then((response) => {
                const respBody = JSON.stringify(response.body);
                layoutId = JSON.parse(respBody).data.layouts[0].id;
                // Dumping the DSL to the created page
                cy.request(
                    "PUT",
                    "api/v1/layouts/" + layoutId + "/pages/" + pageid,
                    dsl,
                ).then((response) => {
                    //cy.log("Pages resposne is : " + response.body);
                    expect(response.status).equal(200);
                    cy.reload();
                });
            });
        });
        this.Sleep(2000)//settling time for dsl
    }

    public NavigateToCreateNewTabPage() {
        cy.get(locator._addEntityAPI).last()
            .should("be.visible")
            .click({ force: true });
        cy.get(locator._integrationCreateNew)
            .should("be.visible")
            .click({ force: true });
        cy.get(locator._loading).should("not.exist");
    }

    public StartServerAndRoutes() {
        cy.intercept("POST", "/api/v1/actions").as("createNewApi");
        cy.intercept("PUT", "/api/v1/actions/*").as("saveAction");
        //cy.intercept("POST", "/api/v1/users/invite", (req) => { req.headers["origin"] = "Cypress";}).as("mockPostInvite");
    }

    public RenameWithInPane(renameVal: string) {
        cy.get(locator._queryName).click({ force: true });
        cy.get(locator._queryNameTxt)
            .clear()
            .type(renameVal, { force: true })
            .should("have.value", renameVal)
            .blur();
    }

    public WaitAutoSave() {
        // wait for save query to trigger & n/w call to finish occuring
        cy.get(locator._saveStatusSuccess, { timeout: 40000 }).should("exist");
    }

    public SelectEntityByName(entityNameinLeftSidebar: string) {
        cy.xpath(locator._entityNameInExplorer(entityNameinLeftSidebar))
            .last()
            .click({ multiple: true })
        this.Sleep()
    }

    public NavigateToExplorer() {
        cy.get(locator._openNavigationTab('explorer')).click()
    }

    public ValidateEntityPresenceInExplorer(entityNameinLeftSidebar: string) {
        cy.xpath(locator._entityNameInExplorer(entityNameinLeftSidebar))
            .should("have.length", 1);
    }

    public ValidateCodeEditorContent(selector: string, contentToValidate: any) {
        cy.get(selector).within(() => {
            cy.get(locator._codeMirrorCode).should("have.text", contentToValidate);
        });
    }

    //refering PublishtheApp from command.js
    public DeployApp() {
        cy.intercept("POST", "/api/v1/applications/publish/*").as("publishApp");
        // Wait before publish
        this.Sleep(2000)
        this.WaitAutoSave()
        // Stubbing window.open to open in the same tab
        cy.window().then((window) => {
            cy.stub(window, "open").callsFake((url) => {
                window.location.href = Cypress.config().baseUrl + url.substring(1);
            });
        });
        cy.get(locator._publishButton).click();
        cy.wait("@publishApp");
        cy.url().should("include", "/pages");
        cy.log("Pagename: " + localStorage.getItem("PageName"));
    }

    public expandCollapseEntity(entityName: string) {
        cy.xpath(locator._expandCollapseArrow(entityName))
            .click({ multiple: true }).wait(500);
    }

    public ActionContextMenuByEntityName(entityNameinLeftSidebar: string, action = "Delete", subAction = "") {
        this.Sleep()
        cy.xpath(locator._contextMenu(entityNameinLeftSidebar)).first().click({ force: true });
        cy.xpath(locator._contextMenuItem(action)).click({ force: true }).wait(500);
        if (subAction)
            cy.xpath(locator._contextMenuItem(subAction)).click({ force: true }).wait(500);

        if (action == "Delete")
            cy.xpath("//div[text()='" + entityNameinLeftSidebar + "']").should(
                "not.exist");
    }

    public AddNewPage() {
        cy.get(locator._newPage)
            .first()
            .click();
        cy.wait("@createPage").should(
            "have.nested.property",
            "response.body.responseMeta.status",
            201,
        );
    }

    public ClickButton(btnVisibleText: string) {
        cy.xpath(locator._spanButton(btnVisibleText))
            .scrollIntoView()
            .click({ force: true });
    }

    public Paste(selector: any, pastePayload: string) {
        cy.wrap(selector).then(($destination) => {
            const pasteEvent = Object.assign(
                new Event("paste", { bubbles: true, cancelable: true }),
                {
                    clipboardData: {
                        getData: () => pastePayload,
                    },
                },
            );
            $destination[0].dispatchEvent(pasteEvent);
        });
    }

    public WaitUntilEleDisappear(selector: string, msgToCheckforDisappearance: string, timeout = 500) {
        cy.waitUntil(() => cy.get(selector).contains(msgToCheckforDisappearance).should("have.length", 0),
            {
                errorMsg: msgToCheckforDisappearance + " did not disappear",
                timeout: 5000,
                interval: 1000
            }).then(() => this.Sleep(timeout))
    }

    public ValidateNetworkCallRespPost(aliasName: string, expectedRes = true) {
        cy.wait(aliasName).should(
            "have.nested.property",
            "response.body.data.isExecutionSuccess",
            expectedRes,
        )
    }

    public ValidateNetworkCallRespPut(aliasName: string, expectedStatus = 200) {
        cy.wait(aliasName).should(
            "have.nested.property",
            "response.body.responseMeta.status",
            expectedStatus,
        )
    }

    public SelectPropertiesDropDown(endp: string, ddOption: string,) {
        cy.xpath(locator._selectDropdown(endp))
            .first()
            .scrollIntoView()
            .click()
        cy.get(locator._dropDownValue(ddOption)).click()
    }

    public EnterActionValue(actionName: string, value: string, paste = true) {
        cy.xpath(locator._actionTextArea(actionName))
            .first()
            .focus()
            .type("{uparrow}", { force: true })
            .type("{ctrl}{shift}{downarrow}", { force: true });
        cy.focused().then(($cm: any) => {
            if ($cm.contents != "") {
                cy.log("The field is not empty");
                cy.xpath(locator._actionTextArea(actionName))
                    .first()
                    .click({ force: true })
                    .focused()
                    .clear({
                        force: true,
                    });
            }
            this.Sleep()
            cy.xpath(locator._actionTextArea(actionName))
                .first()
                .then((el: any) => {
                    const input = cy.get(el);
                    if (paste) {
                        //input.invoke("val", value);
                        this.Paste(el, value)
                    } else {
                        input.type(value, {
                            parseSpecialCharSequences: false,
                        });
                    }
                });
            this.WaitAutoSave()
        })
    }

    public ClickElement(selector: string) {
        cy.xpath(selector)
            .first()
            .click({ force: true });
        this.Sleep()
    }

    public DragDropWidgetNVerify(widgetType: string, x: number, y: number) {
        cy.get(locator._openNavigationTab('widgets')).click({ force: true })
        this.Sleep()
        cy.get(locator._widgetPageIcon(widgetType)).first()
            .trigger("dragstart", { force: true })
            .trigger("mousemove", x, y, { force: true });
        cy.get(locator._dropHere)
            .trigger("mousemove", x, y, { eventConstructor: "MouseEvent" })
            .trigger("mousemove", x, y, { eventConstructor: "MouseEvent" })
            .trigger("mouseup", x, y, { eventConstructor: "MouseEvent" });
        this.WaitAutoSave()//settling time for widget on canvas!
        cy.get(locator._widgetInCanvas(widgetType)).should('exist')
    }

    public ToggleOrDisable(propertyName: string, check = true) {
        if (check) {
            cy.get(locator._propertyToggle(propertyName))
                .check({ force: true })
                .should("be.checked");
        }
        else {
            cy.get(locator._propertyToggle(propertyName))
                .uncheck({ force: true })
                .should("not.checked");
        }
        this.WaitAutoSave()
    }

    public NavigateBacktoEditor() {
        cy.get(locator._backToEditor).click({ force: true });
        this.Sleep(2000)
    }

    public GenerateUUID() {
        let id = uuid.v4();
        id = id.split("-")[0];
        cy.wrap(id).as("guid")
    }

    public GetObjectName() {
        cy.get(locator._queryName).invoke("text").then((text) => cy.wrap(text).as("queryName"));
    }

    public Sleep(timeout = 1000) {
        cy.wait(timeout)
    }
}

