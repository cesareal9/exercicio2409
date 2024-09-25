import jwt from "jsonwebtoken";

// Gera um token de acesso para o usuário
// jwt.sign: Gera um token JWT
//user é o payload contém as informações que serão codificadas no token, como, por exemplo, id, nome, etc
// JWT_TOKEN_SECRET variável de ambiente usada para assinar o token.
//expiresIn: "1d"  define que o token vai expirar em 1 dia.
const generateAccessToken = (user) =>
  jwt.sign(user, process.env.JWT_TOKEN_SECRET, { expiresIn: "1d" });

// Verifica se o token é valido se for retorna o usuário do token
const verifyAccessToken = (token) =>
  jwt.verify(token, process.env.JWT_TOKEN_SECRET);

export default {
  generateAccessToken,
  verifyAccessToken,
};