import Coordenada from "../models/coordenadas.js"


const ingresoCoordenadaBd=async (body) => {

    let { iddispositivo, coordenada } = body;

    const existe = await Coordenada.findOne({ iddispositivo })

    let coordenadaModel

    if (existe)
        coordenadaModel = await Coordenada.findByIdAndUpdate(existe._id, { coordenada })
    else {
        coordenadaModel = new Coordenada({ iddispositivo, coordenada });
        await coordenadaModel.save();
    }
    
}

const coordenadasController = {
    coordenadaGet: async (req, res) => {

        const coordenadas = await Coordenada.find()
        res.json({
            coordenadas
        })
    },
    coordenadaPost: async (req, res) => {

        ingresoCoordenadaBd(req.body)
        const coordenadas = await Coordenada.find()
        res.json({
            coordenadas
        })
    },

    coordenadaSocketPost: async (body) => {
        ingresoCoordenadaBd(body)
        const coordenadas = await Coordenada.find()
        return coordenadas
    },

}

export default coordenadasController