/// <reference types="Cypress" />
import {mobileReplenishment} from "../support/pages/mobileReplenishment";
import {transfers} from "../support/pages/transfers";
import {basePage} from "../support/pages/basePage";


it("Replenishment of Ukrainian mobile phone number", () => {
    basePage.open("https://next.privat24.ua/mobile");
    mobileReplenishment.typePhoneNumber("686979712");
    basePage.typeAmount("1");
    basePage.typeDebitCardData("4552331448138217", "0524", "111");
    cy.wait(3000);
    basePage.submitPayment();
    mobileReplenishment.checkDebitCard("4552 **** **** 8217");
    mobileReplenishment.checkDebitAmount("1");
    mobileReplenishment.checkDebitAmountAndComission("2");
    mobileReplenishment.checkReceiverAmount("1");
    mobileReplenishment.checkPaymentCurrency("UAH");
    cy.contains("Confirm").click();
});

it.skip("Money transfer between foreign cards", () => {
    basePage.open("https://next.privat24.ua/money-transfer/card?lang=en");
    basePage.typeDebitCardData("4552331448138217", "0524", "111");
    transfers.typeDebitNameAndSurname("Shayne", "McConnell");
    transfers.typeReceiverCard("5309233034765085");
    transfers.typeReceiverNameAndSurname("Juliana", "Janssen");
    basePage.typeAmount("300");
    transfers.typeComment("Cypress test");
    cy.wait(2000);
    basePage.submitPayment();
    transfers.checkDebitAndReceiverCards("* 8217", "* 5085");
    transfers.checkDebitAmountAndTotalAmount("300 UAH", "389.33");
    transfers.checkDebitComission("89.33 UAH");
    transfers.checkTotalCurrency("UAH");
    transfers.checkComment("Cypress test");
});

//Example GET request
it.skip("Example sending the GET request", () => {
    cy.request("https://next.privat24.ua").then((response) => {
        console.log(response);
    });
});

//Example POST request
it.skip("Example sending the POST request", () => {
    const requestBody = {
        action: "info",
        phone: "+380686979712",
        amount: 50,
        currency: "UAH",
        cardCvv: "111",
        card: "4552331448138217",
        cardExp: "0524",
        xref: "084ddda8622bd85ce838db5fbd96746d",
        _: 1609142855434,
    };

    const headersData = {
        cookie:
            "_ga=GA1.2.957777321.1609142789; _gid=GA1.2.1882919372.1609142789; pubkey=772e1f4d0e0dc05be052c17b7f389871; fp=1; lfp=12/28/2020, 10:06:39 AM; pa=1609142799763.37130.7045217459772619next.privat24.ua0.5614400379940121+1",
    };

    cy.request({
        method: "POST",
        url: "https://next.privat24.ua/api/p24/pub/mobipay",
        body: requestBody,
        headers: headersData,
    }).then((response) => {
        console.log(response.body);
        expect(response).to.have.property("status").to.equal(200);
        expect(response.requestHeaders)
            .to.have.property("cookie")
            .not.be.oneOf(["", null]);
        expect(response.body).to.have.property("status").to.equal("success");
        expect(response.body.data).to.have.property("amount").to.equal("50.0");
        expect(response.body.data).to.have.property("status").to.equal("ok");
    });
});

it.skip("Example sending the POST request -> its", () => {
    const requestBody = {
        action: "info",
        phone: "+380686979712",
        amount: 50,
        currency: "UAH",
        cardCvv: "111",
        card: "4552331448138217",
        cardExp: "0524",
        xref: "084ddda8622bd85ce838db5fbd96746d",
        _: 1609142855434,
    };

    const headersData = {
        cookie:
            "_ga=GA1.2.957777321.1609142789; _gid=GA1.2.1882919372.1609142789; pubkey=772e1f4d0e0dc05be052c17b7f389871; fp=1; lfp=12/28/2020, 10:06:39 AM; pa=1609142799763.37130.7045217459772619next.privat24.ua0.5614400379940121+1",
    };

    cy.request({
        method: "POST",
        url: "https://next.privat24.ua/api/p24/pub/mobipay",
        body: requestBody,
        headers: headersData,
    }).its("body")
        .should("contain", {
            status: "success",
        })
        .its("data")
        .should("contain", {
            status: "ok",
        });
});


//Example POST request
it.skip("Next one example the POST request", () => {
    const requestBody = {
        name: "morpheus",
        job: "leader"
    }

    cy.request({
        method: "POST",
        url: "https://reqres.in/api/users",
        body: requestBody
    }).then((response) => {
        console.log(response.body);
    });

});

it("Next one example jsonplaceholder", () => {
    fetch('https://jsonplaceholder.typicode.com/posts/1')
        .then((response) => response.json())
        .then((json) => console.log(json));
});

it("Next one example jsonplaceholder 2", () => {
    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify({
            title: 'foo',
            body: 'bar',
            userId: 1,
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then((response) => response.json())
        .then((json) => console.log(json));
});


//Mock and Stub



