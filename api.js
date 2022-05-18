import fs from 'fs';
import path from 'path';


//Función para determinar si la ruta es absoluta o no
export const determinateAbsolutePath = (pathRoot)=> path.isAbsolute(pathRoot);


//Función para convertir ruta en absoluta
export const createAbsolutePath = (pathRoot)=> path.resolve(pathRoot);


//Función para comprovar si la ruta existe o no
export const validatePath = (pathRoot) => fs.existsSync(pathRoot);
