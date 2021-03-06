//importar modulos
const sequelize = require('./conexion.presupuesto');

//exportar modulos
module.exports.nuevoProyecto = async (proyectoNuevo) => {
  try {
    let resultado = await sequelize.query(`SELECT * FROM presupuestos WHERE proyecto = '${proyectoNuevo[1]}'`)

    if (resultado[1] > 0){
      return false
    }
    else {
      await sequelize.query(`INSERT INTO presupuestos (fecha_creacion, proyecto, versión) VALUES (?,?,?)`, 
      {replacements: proyectoNuevo, type : sequelize.QueryTypes.INSERT})
      return true
    }
  } catch (error){
    console.log(error)
    throw new Error ('Ocurrió un error: /nuevoPresupuesto')

  }
}



module.exports.nuevoConcepto = async (concepto,tabla) => {
  try {

    let resultado = await sequelize.query(`SELECT * FROM ${tabla}  WHERE concepto = '${concepto.concepto}'`);

    if (resultado[1] > 0) { 
      return false
    }
    else {
      await sequelize.query(`INSERT INTO ${tabla} (concepto) VALUES ('${concepto.concepto}')`,
      { type: sequelize.QueryTypes.INSERT})
      return true
    }
  } catch (error){
    console.log(error)
    throw new Error ('Ocurrió un error: /nuevoConcepto')

  }
}

module.exports.mostrar = async (tabla) => {
  try {
    let resultado = await sequelize.query (`SELECT * FROM ${tabla}`)
    return resultado
  }catch (error){
    console.log(error)
    throw new Error ('Ocurrió un error: /conceptos')
  }
}

module.exports.eliminarConcepto = async (concepto,tabla) => {
  try {
    let resultado = await sequelize.query(`DELETE FROM ${tabla} WHERE concepto = '${concepto.concepto.padEnd(50)}'`)
  }
  catch {
    console.log(error) 
    throw new Error ('Ocurrió un error: eliminar Concepto')
  }
}
module.exports.consegirID = async (columna,valor,tabla) => {
  try {
    let resultado = await sequelize.query (`SELECT id FROM ${tabla} WHERE  ${columna} = '${valor.padEnd(50)}'`)
    let id = (resultado[0])[0].id
    return id
  }catch (error){
    console.log(error)
    throw new Error ('Ocurrió un error: /conceptos')
  }
}


module.exports.nuevoMonto = async (monto,tabla) => {
  try{
    await sequelize.query(`INSERT INTO ${tabla} (id_concepto, id_presupuesto, fecha, monto) VALUES (?,?,?,?)`, 
    {replacements: monto, type : sequelize.QueryTypes.INSERT})

    return true

  }catch (error) {
    console.log('error en nuevo Monto')
    throw new Error (error)
  }
}


module.exports.nuevoMontoRecurso = async (monto,tabla) => {
  try{
    await sequelize.query(`INSERT INTO ${tabla} (id_concepto, id_presupuesto, fecha, monto, porcentaje) VALUES (?,?,?,?,?)`, 
    {replacements: monto, type : sequelize.QueryTypes.INSERT})

    return true
    
  }catch (error) {
    console.log('error en nuevo Monto')
    throw new Error (error)
  }
}