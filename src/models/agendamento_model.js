import db from "../config/db.js";
import bcrypt from "bcrypt";

const agendamentoSchema = new db.Schema({
  data: {
    type: String,
    required: true,
  },
  hora: {
    type: Date,
    required: true,
    unique: true,
  },
  idAnimal: {
    type: String,
    required: true,
    
  },

});


agendamentoSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 10);
});

agendamentoSchema.methods.senhaCorreta = async function (senha) {
  return await bcrypt.compare(senha, this.password);
};

const User = db.model("Agendamento", agendamentoSchema);

export default Agendamento;