const {  buscarUsuario,
        crearUsuario
    }= require('../../almacenamiento/mysql')

const bcryptjs=require('bcryptjs')
const jwt = require('jsonwebtoken');

class usuarioController{
    async registrarUsuario(nuevoUsuario){
        const existeUsuario= await buscarUsuario(nuevoUsuario.id);
        if(existeUsuario.length>0) throw new Error("ya existe el usuario");
        await crearUsuario(nuevoUsuario)
    }
    async autenticarUsuario(id, password){
        try {
            const usuario= await buscarUsuario(id);
            const compararPassword=bcryptjs.compareSync(password, usuario[0].password)
            if (compararPassword) {
                const token = jwt.sign(usuario[0], process.env.SECRET_JWT);
                return token;
            }else{
                throw new Error("Valores invalidos");
            }
        } catch (error) {
            console.log(error);
            throw new Error("error al realizar consulta");
        }
    }
}
module.exports={
    usuarioController
}