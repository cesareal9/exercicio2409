import jwtService from "../services/jwt-service.js";

function check_token(req, res, next) {
  //busca o cabeçalho de autorização  da requisição HTTP (req.headers["authorization"]), aqui é esperado algo do "Bearer <token>".
  const auth_header = req.headers["authorization"];

  //aqui vc utiliza o split(" ") para separar a palavra "Bearer" do <token> e pegar o token que está na segunda posição ([1]).
  const token = auth_header && auth_header.split(" ")[1];

  if (!token) {
    return res.status(401).json("Acesso negado (usuário não identificado)");
  }

  try {
    req.user = jwtService.verifyAccessToken(token);
  } catch (error) {
    console.log(error)
    res.status(401).json("Token inválido");
  }

  next();
}

export default check_token; //Corrige export