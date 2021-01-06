require('should');
const expect = require("chai").expect;
const assert = require("chai").assert;

const zapier = require('zapier-platform-core');

const App = require('../index');
// const trigger = require('../creates/configuration')
const helper = require('../creates/helper')
const appTester = zapier.createAppTester(App);

describe('creates', () => {
    describe('API', () => {
        it('Filter API response', (done) => {
            const bundle = {
                inputData: {
                    "customer_handle": "customer006",
                    "subscription_handle": "sub000219",
                    "returns": [{
                        "customer_fields": ["handle", "email"],
                        "subscription_fields": ["handle", "customer"]
                    }]
                }
            };

            const expectedCustReturn = {
                "email": "carl@leone.com",
                "address": "Grove Street 12",
                "address2": "Ganton",
                "city": "Los Santos",
                "country": "US",
                "phone": "555-gotcars",
                "company": "Leones Cars",
                "vat": "US123456789",
                "handle": "customer006"
            }

            const expectedSubReturn = {
                "handle": "sub000219",
                "customer": "customer006",
                "plan": "plan0033",
                "state": "active",
                "test": true
            }
            const resCust = helper.filter_object(bundle.inputData.returns[0].customer_fields, expectedCustReturn)
            const resSub = helper.filter_object(bundle.inputData.returns[0].subscription_fields, expectedSubReturn)

            expect(resCust).to.have.property('handle')
            expect(resCust).to.have.property('email')            
            expect(resCust).to.not.have.property('address')

            expect(resSub).to.have.property('handle')
            expect(resSub).to.have.property('customer')
            expect(resSub).to.not.have.property('plan')

            done();
        });
    });

});
