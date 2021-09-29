"use strict";
// import { request } from 'http';
// import app from '../index';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const app = require("app");
// const appHttp = require("chai-http");
// const expecta = app.expect
// const baseUrl = "https://store-ordering-api.herokuapp.com"
// app.use(appHttp);
// describe('Test for end point', () => {
//   it('It is the test to check endpoint', async () => {
//     const result = await request(app).get(baseUrl).send();
//     expect(result.status).toBe(200);
//   })
// })
// describe("First Test", function(){
//   it('server is live', function(done) {
//           app.request(baseUrl)
//           .get('/')
//           .end(function (err: string, res: { text: string; }) {
//               expect(res).to.have.status(200);
//               expect(res.text).to.equal("Hurray! Its live.");
//               done();
//           });
//       })
//   })
const baseUrl = "http://localhost:4000/images/?filename=ice.jpg&width=500&height=700";
const index_1 = __importDefault(require("../index")); // Link to your server file
const supertest_1 = __importDefault(require("supertest"));
const request = (0, supertest_1.default)(index_1.default);
describe('Testing end points', () => {
    it("gets the test endpoint", async (done) => {
        const response = await request.get(baseUrl);
        expect(response.status).toBe(200);
        done();
    });
});
