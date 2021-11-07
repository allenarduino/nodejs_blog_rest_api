let server = require("../server");
let chai = require("chai");
let chaiHttp = require("chai-http");
const fs = require("fs");

// Assertion
chai.should();
chai.use(chaiHttp);

describe("User Registration", () => {
  it("Should register a user", done => {
    chai
      .request(server)
      .post("/register/")
      .send({
        name: "Allen Jones",
        email: "aljay3334@gmail.com",
        password: "kdkkfkjjjslfnkvnknk",
        user_img: "uploads/avatar.jpg",
        coverphoto: "uploads/coverphoto.jpg",
        const: "My bio"
      })
      .end((err, response) => {
        response.should.have.status(200);
        response.body.should.be.a("object");
        response.body.should.have.property("error") ||
          response.body.should.have.property("message");
        done();
      });
  });
});

describe("User Login", () => {
  it("Should log a user in", done => {
    chai
      .request(server)
      .post("/login/")
      .send({
        email: "aljay3334@gmail.com",
        password: "kdkkfkjjjslfnkvnknk"
      })
      .end((err, response) => {
        response.should.have.status(200);
        response.body.should.be.a("object") ||
          response.body.should.be.a("text");
        done();
      });
  });
});

describe("User Profile", () => {
  it("Should fetch user profile", done => {
    const user_id = 4;
    chai
      .request(server)
      .get("/user_profile/" + user_id)
      .set("x-access-token", "your JWT_TOKEN here")
      .end((err, response) => {
        response.should.have.status(200);
        response.body.should.be.a("object");
        response.body.should.have.property("user_profile");
        done();
      });
  });
});

describe("Update Name", () => {
  it("Should update name of user", done => {
    chai
      .request(server)
      .post("/update_name/")
      .send({
        full_name: "Jay Allen"
      })
      .set("x-access-token", "your JWT_TOKEN here")
      .end((err, response) => {
        response.should.have.status(200);
        response.body.should.be.a("object");
        response.body.should.have.property("message");
        done();
      });
  });
});

describe("Update Bio", () => {
  it("Should update name of user", done => {
    chai
      .request(server)
      .post("/update_bio/")
      .send({
        bio: `Hello everyone, 
          I'm Allen Jones a full stack developer. I love computer programming`
      })
      .set("x-access-token", "your JWT_TOKEN here")
      .end((err, response) => {
        response.should.have.status(200);
        response.body.should.be.a("object");
        response.body.should.have.property("message");
        done();
      });
  });
});

describe("Update user Image or Avatar", () => {
  it("Should update Avatar of user", done => {
    chai
      .request(server)
      .post("/update_user_img/")
      .set("x-access-token", "your JWT_TOKEN here")
      .attach("user_img", fs.readFileSync("uploads/avatar.jpg"), "preview.png")
      .end((err, response) => {
        response.should.have.status(200);
        response.body.should.be.a("object");
        response.body.should.have.property("message");
        done();
      });
  });
});

describe("Update Coverphoto", () => {
  it("Should update Coverphoto of user", done => {
    chai
      .request(server)
      .post("/update_coverphoto/")
      .set("x-access-token", "your JWT_TOKEN here")
      .attach(
        "coverphoto",
        fs.readFileSync("uploads/coverphoto.jpg"),
        "preview.png"
      )
      .end((err, response) => {
        response.should.have.status(200);
        response.body.should.be.a("object");
        response.body.should.have.property("message");
        done();
      });
  });
});

describe("Fetch Users", () => {
  it("Should fetch users except current user", done => {
    chai
      .request(server)
      .get("/users/")
      .set("x-access-token", "your JWT_TOKEN here")
      .end((err, response) => {
        response.should.have.status(200);
        response.body.should.be.a("array");
        done();
      });
  });
});
