import { getFilesofDirectory,determinateAbsolutePath, createAbsolutePath, validatePath, ifIsDirectory, ifIsFile,readaPathFile} from './api.js'
const mdlinks = (route) => {
validatePath(route)=== true ? console.log('Ruta existente') : console.log('Ruta no existente. Ingrese otra ruta.');
determinateAbsolutePath(route)=== true ? console.log('La ruta es absoluta') : console.log('La ruta es relativa... Convirtiendo');
console.log('la ruta relativa es : ' + createAbsolutePath(route));
if(ifIsDirectory(route)=== true){
    console.log(getFilesofDirectory(route));
}else{
    readaPathFile(route);
}
// if(ifIsFile(route)=== true){
//     readaPathFile(route)
// }
};

mdlinks('archivosdeprueba');

//create second branch





