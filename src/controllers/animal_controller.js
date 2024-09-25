import Animal from "../models/animal_model.js";
import jwtService from "../services/jwt-service.js";

export const store = async (req, res) => {
  try {
    const content = await Animal.create(req.body);
    res.status(201).json(content);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const index = async (req, res) => {
  try {
    const content = await Animal.find(req.query).exec();
    res.json(content);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const show = async (req, res) => {
  try {
    const content = await Animal.findById(req.params.id).exec();
    res.json(content);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const update = async (req, res) => {
  try {
    const content = await Animal.findByIdAndUpdate(
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
    const content = await Animal.findByIdAndDelete(req.params.id).exec();
    res.json(content);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const signup = async (req, res) => {
  try {
    const animal = await Animal.create({
      email: req.body.email,
      password: req.body.password,
    });

    const token = jwtService.generateAccessToken({
      tipo: animal.tipo,
      email: animal.email,
      _id: animal._id,
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
    const animal = await Animal.findOne({
      email: req.body.email,
    }).exec();

    if (animal && (await animal.senhaCorreta(req.body.password))) {
      const token = jwtService.generateAccessToken({
        tipo: animal.tipo,
        email: animal.email,
        _id: animal._id,
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