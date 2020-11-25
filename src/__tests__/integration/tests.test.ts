import app from "../../configs/serverTest";
import supertest from 'supertest'

const request = supertest(app);
const headers = {
  authorization: "",
  userId: "",
};
let locationId: any;
let locationTypeId: any;

describe("Login e gerenciamento de usuarios", () => {
  it("Logar na aplicação", async (done) => {
    const body = {
      username: "teste",
      password: "Therev a7x",
    };
    request
      .post("/session")
      .send(body)
      .end(function (err, res) {
        if (err) throw done(err);
        expect(res.status).toEqual(200);
        expect(res.body.token).toHaveProperty("authToken");
        expect(res.body.token).toHaveProperty("sessionToken");
        expect(res.body.token).toHaveProperty("expires_at");
        headers["authorization"] = res.body.token.sessionToken;
        headers["userId"] = res.body.auth;
        done();
      });
  });
  it("Criar novo Usuario", async (done) => {
    const body = {
      name: "Lucas Furtado",
      username: "bubu",
      email: "lucas_shiguioka@hotmail.com.br",
      password: "Therev a7x",
    };
    request
      .post("/user")
      .send(body)
      .set("authorization", headers.authorization)
      .set("userid", headers.userId)
      .end((err, res) => {
        if (err) throw done(err);
        expect(res.status).toEqual(200);
        done();
      });
  });
  //it("Trocar senha do usuario logado", async (done) => {
  //  const body = {
  //    password: "Therev a7x",
  //    actualPassword: "Eusouumguaxinin",
  //  };
  //  request
  //    .put("/user/changePassword")
  //    .send(body)
  //    .set("authorization", headers.authorization)
  //    .set("userid", headers.userId)
  //    .end((err, res) => {
  //      if (err) throw done(err);
  //      expect(res.status).toEqual(200);
  //      done();
  //    });
  //});
  it("Editar um usuario", async (done) => {
    const body = {
      name: "Lucas Furtado",
      username: "bubu",
      email: "lucas_shiguioka@hotmail.com.br",
      password: "Therev a7x",
    };
    request
      .put("/user")
      .send(body)
      .set("authorization", headers.authorization)
      .set("userid", headers.userId)
      .end((err, res) => {
        if (err) throw done(err);
        expect(res.status).toEqual(200);
        expect(res.body).toHaveProperty("message");
        done();
      });
  });
  it("Esqueci minha Senha", async (done) => {
    const body = {
      email: "lucas_shiguioka@hotmail.com",
    };
    request
      .post("/recovery")
      .send(body)
      .end((err, res) => {
        if (err) throw done(err);
        expect(res.status).toEqual(200);
        expect(res.body).toHaveProperty("message");
        done();
      });
  });
});

describe("Teste do gereciamento de Locais", () => {
  
  it("Criar novo tipo de local", (done) => {
    const body = {
      description: "Automação",
    };
    request
      .post("/location/type")
      .send(body)
      .set("authorization", headers.authorization)
      .set("userid", headers.userId)
      .end((err, res) => {
        if (err) throw done(err);
        expect(res.status).toEqual(200);
        expect(res.body).toHaveProperty("message");
        done();
      });
  });
  it("Listar Tipo de Locais", (done) => {
    request
      .get("/location/type")
      .set("authorization", headers.authorization)
      .set("userid", headers.userId)
      .end((err, res) => {
        if (err) throw done(err);
        console.log(res.body)
        expect(res.status).toEqual(200);
        locationTypeId = res.body[0].id;
      });
  });

  it("Criar novo local", (done) => {
    const body = {
      tp_location: locationTypeId,
      comments: "Ola mundo",
      capacity: 100,
    };
    request
      .put("/location")
      .send(body)
      .set("authorization", headers.authorization)
      .set("userid", headers.userId)
      .end((err, res) => {
        if (err) throw done(err);
        expect(res.status).toEqual(200);
        expect(res.body).toHaveProperty("message");
      });
  });
  it("Listar locais", (done) => {
    request
      .get("/location")
      .set("authorization", headers.authorization)
      .set("userid", headers.userId)
      .end((err, res) => {
        if (err) throw done(err);
        expect(res.status).toEqual(200);
        expect(res.body[0]).toHaveProperty("id");
        expect(res.body[0]).toHaveProperty("comments");
        expect(res.body[0]).toHaveProperty("capacity");
        expect(res.body[0]).toHaveProperty("type");
        locationId = res.body.map((item : any)=>{
          console.log(item)
          if(item.description === 'Automação') return item.id
        });
        done();
      });
  });
  it("Detalhar Local", (done) => {
    request
      .get(`/location/${locationId}`)
      .set("authorization", headers.authorization)
      .set("userid", headers.userId)
      .end((err, res) => {
        if (err) throw done(err);
        expect(res.status).toEqual(200);
        expect(res.body).toHaveProperty("id");
        expect(res.body).toHaveProperty("comments");
        expect(res.body).toHaveProperty("capacity");
        expect(res.body).toHaveProperty("type");
        done();
      });
  });
  it("Editar Locais", (done) => {
    const body = {
      tp_location: locationTypeId,
      comments: "Ola mundo",
      capacity: 100,
    };
    request
      .put(`/location/${locationId}`)
      .send(body)
      .set("authorization", headers.authorization)
      .set("userid", headers.userId)
      .end((err, res) => {
        if (err) throw done(err);
        expect(res.status).toEqual(200);
        expect(res.body).toHaveProperty("message");
      });
  });
  it("Excluir Local", (done) => {
    request
      .delete(`/location/${locationId}`)
      .set("authorization", headers.authorization)
      .set("userid", headers.userId)
      .end((err, res) => {
        if (err) throw done(err);
        expect(res.status).toEqual(200);
        expect(res.body).toHaveProperty("message");
      });
  });
  it("Excluir tipo de local", (done) => {
    request
      .delete(`/location/type/${locationTypeId}`)
      .set("authorization", headers.authorization)
      .set("userid", headers.userId)
      .end((err, res) => {
        if (err) throw done(err);
        expect(res.status).toEqual(200);
        expect(res.body).toHaveProperty("message");
        done();
      });
  });
});