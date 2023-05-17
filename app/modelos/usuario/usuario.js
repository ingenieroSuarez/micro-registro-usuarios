const bcryptjs=require('bcryptjs')

class Usuario{
    constructor(id, nombre, password, correo){
        this.id=id;
        this.nombre= nombre;
        this.password= bcryptjs.hashSync(password, 9);
        this.correo= correo;
    }
    getId(){
        return this.id
    };
    getnombre(){
        return this.nombre
    };
    getpassword(){
        return this.password
    };
    getcorreo(){
        return this.correo
    };
}
module.exports={Usuario}