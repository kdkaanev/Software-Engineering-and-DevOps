const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('./server');
const { describe } = require('mocha');
const expect = chai.expect;

chai.use(chaiHttp)

describe('Books API', () => {
    let bookId;

    it('should POST a book', (done) => {
        const book = {
            id: "1",
            title: "test Book",
            author:"Test Author",

        };
        chai.request(server)
            .post('/books')
            .send(book)
            .end((err,res) => {
                expect(res).to.have.status(201);
                expect(res.body).to.be.a('object');
                expect(res.body).to.have.property('id');
                expect(res.body).to.have.property('title');
                expect(res.body).to.have.property('author');
                bookId = res.body.id;
                done();
            })
    })
    it('should GET all books', () => {
        chai.request(server)
            .get('/books')
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.a('array');
                done();

            })
    })
    it('should GET a book by id', () => {
        chai.request(server)
            .get(`/books/${bookId}`)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.a('object');
                expect(res.body).to.have.property('id');
                expect(res.body).to.have.property('title');
                expect(res.body).to.have.property('author');
                done();
            })

    })
    it('should PUT a book by id', () => {
        const updateBook = {
            title: 'updated title',
            author: 'updated author'
        }
        chai.request(server)
            .put(`/books/${bookId}`)
            .send(updateBook)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.a('object');
                expect(res.body).to.have.property('id');
                expect(res.body).to.have.property('title');
                expect(res.body).to.have.property('author');
                done();
            })
    })
    it('should DELETE a book by id', () => {
        chai.request(server)
            .delete(`/books/${bookId}`)
            .end((err, res) => {
                expect(res).to.have.status(204);
                done();
            })
    })
    it('should return 404 when traing GET ,PUT, DELETE on a book that does not exist', () => {
        chai.request(server)
            .get('/books/999')
            .end((err, res) => {
                expect(res).to.have.status(404);
                done();
            })
        chai.request(server)
            .put('/books/999')
            .send({})
            .end((err, res) => {

                expect(res).to.have.status(404);
                done();

            })
        chai.request(server)
            .delete('/books/999')
            .end((err, res) => {

                expect(res).to.have.status(404);
                done();
            })
    })

})