import Agendamento from "../models/agendamento_model.js";
import jwtService from "../services/jwt-service.js";

export const store = async (req, res) => {
  try {
    const content = await Agendamento.create(req.body);
    res.status(201).json(content);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const index = async (req, res) => {
  try {
    const content = await Agendamento.find(req.query).exec();
    res.json(content);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const show = async (req, res) => {
  try {
    const content = await Agendamento.findById(req.params.id).exec();
    res.json(content);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const update = async (req, res) => {
  try {
    const content = await Agendamento.findByIdAndUpdate(
      req.params.id,
      req.body
    ).exec();
    res.json(content);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const destroy = async (req, res) => {
  try {
    const content = await Agendamento.findByIdAndDelete(req.params.id).exec();
    res.json(content);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const signup = async (req, res) => {
  try {
    const agendamento = await Agendamento.create({
      email: req.body.email,
      password: req.body.password,
    });

    const token = jwtService.generateAccessToken({
      tipo: agendamento.tipo,
      email: agendamento.email,
      _id: agendamento._id,
    });

    res.status(201).json({
      token,
    });

  } catch (error) {
    console.log(error)
    res.status(400).send(error);
  }
};

export const login = async (req, res) => {
  try {
    const agendamento = await Agendamento.findOne({
      email: req.body.email,
    }).exec();

    if (agendamento && (await agendamento.senhaCorreta(req.body.password))) {
      const token = jwtService.generateAccessToken({
        tipo: agendamento.tipo,
        email: agendamento.email,
        _id: agendamento._id,
      });

    
      res.json({
        token,
      });
    } else {

      res.status(404).json("Email ou senha inválidos");
    }

  } catch (error) {
    console.log(error)
    res.status(400).send(error);
  }
};