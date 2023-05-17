const express = require('express')
const router = express.Router();
const {usuarioController }= require('../../controllers/usuarios/usuario.controller')
const { Usuario }= require('../../modelos/usuario/usuario')

router.post('/registrar', async (req, res)=>{
    const {id, nombre, password, correo }=  req.body;
    const nuevoUsuario= new Usuario(id, nombre, password, correo )
    const respuesta= new usuarioController()
    try {
        res.send(await respuesta.registrarUsuario(nuevoUsuario))
    } catch (error) {
        res.status(401).send({message: "usuario ya existe"});
    }
})

router.post('/autenticar', async (req, res)=>{
    const { id, password }=  req.body;
    const respuesta= new usuarioController()
    try {
        res.send(await respuesta.autenticarUsuario(id, password))
    } catch (error) {
        res.status(401).send({message:"valores invalidos"});
    }
})

module.exports= router