let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../../app/main/app');
let should = chai.should();
chai.use(chaiHttp);

before(done => {
    app.on("dataBaseLoaded", done);
});


describe('Pokemons', function () {
    it('should list ALL Pokemons on /pokemons GET', function (done) {
        chai.request('http://localhost:3000/')
            .get('pokemons')
            .end(function (err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('array');
                done();
            });
    });
});
