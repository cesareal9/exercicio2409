import db from "../config/db.js";
import bcrypt from "bcrypt";

const animalSchema = new db.Schema({
  nome: {
    type: String,
    required: true,
  },
  raça: {
    type: String,
    required: true,
    unique: true,
  },

});


animalSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 10);
});

animalSchema.methods.senhaCorreta = async function (senha) {
  return await bcrypt.compare(senha, this.password);
};

const Animal = db.model("Animal", animalSchema);

export default Animal;