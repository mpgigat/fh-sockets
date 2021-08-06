import mongoose from "mongoose";
const CoordenadaSchema = new mongoose.Schema({      
    iddispositivo:     { type:String,maxlength:100},    
    coordenada:       { type:String,maxlength:50},
	createdAt:  { type: Date, default: Date.now }
});


CoordenadaSchema.methods.toJSON=function(){
    const {__v, ...coordenada}=this.toObject(); //nos funciona flecha
    return coordenada;
} 

export default mongoose.model("Coordenada",CoordenadaSchema);