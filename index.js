import { determinateAbsolutePath, createAbsolutePath, validatePath} from './api.js'
const mdlinks = (route) => {
validatePath(route)=== true ? console.log('Ruta existente') : console.log('Ruta no existente. Ingrese otra ruta.');
determinateAbsolutePath(route)=== true ? console.log('La ruta es absoluta') : console.log('La ruta es relativa... Convirtiendo');
console.log('la ruta relativa es : ' + createAbsolutePath(route));
};

mdlinks('archivosdeprueba');





