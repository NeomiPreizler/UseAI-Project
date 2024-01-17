const chai = require('chai');
const chaiHttp = require('chai-http');
const { app } = require('./server/server'); 
chai.use(chaiHttp);
const expect = chai.expect;


describe('Server Tests',async function() {
  it('should return a response for valid input', async function() {
    this.timeout(500000);
    const response = await chai
      .request(app)
      .get('/get')
      .query({
        category: 'letter',
        atmosphere: 'happy',
        event: 'birthday',
        age: '25'
      });

    expect(response).to.have.status(200);
  });


  it('should handle missing parameters gracefully', async function() {
    const response = await chai
      .request(app)
      .get('/get')
      .query({
      });

    expect(response).to.have.status(421);
  });


  it('should handle a not valid age gracefully', async function() {
    const response = await chai
      .request(app)
      .get('/get')
      .query({
        category: 'song',
        atmosphere: 'funny',
        event: 'birthday',
        age: 'gjh'
      });

    expect(response).to.have.status(421);
  });

 

  // Add more tests as needed

  after(() => {
    // Cleanup or additional tasks after all tests run
  });
});