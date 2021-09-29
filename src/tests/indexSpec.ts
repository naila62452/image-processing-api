import app from '../index'; // Link to your server file
import supertest from "supertest";
const request = supertest(app);

const baseUrl = "http://localhost:4000/images/?filename=ice.jpg&width=500&height=700";
describe('Testing end points', ()=> {
  it("gets the test endpoint", async done => {
    const response = await request.get(baseUrl);
  
    expect(response.status).toBe(200);
    done();
  });
})
