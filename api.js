/* eslint-disable no-unused-expressions */
import fs from 'fs'
import path from 'path'
import fetch from 'node-fetch'

const arrayLinks = []
let arrayFiles = []

// Función para determinar si la ruta es absoluta o no
export const determinateAbsolutePath = (pathRoot) => path.isAbsolute(pathRoot) ? pathRoot : createAbsolutePath(pathRoot)

// Función para convertir ruta en absoluta
export const createAbsolutePath = (pathRoot) => path.resolve(pathRoot)

// Función para comprovar si la ruta existe o no
export const validatePath = (pathRoot) => fs.existsSync(pathRoot)

// Funciones para saber si el path es directorio o file
// saber si es file
export const ifIsFile = (pathRoot) => {
  const statsObj = fs.statSync(pathRoot)
  return statsObj.isFile()
}

// saber si es directorio
export const ifIsDirectory = (pathRoot) => {
  const statsObj = fs.statSync(pathRoot)
  return statsObj.isDirectory()
}

// MOSTRAR EL CONTENIDO DE UN ARCHIVO
export const readaPathFile = (pathRoot) => fs.readFileSync(pathRoot).toString()

// encontrar archivos con extensión de .md
export const findMdFile = (pathRoot) => path.extname(pathRoot) === '.md'

// leer un directorio (devuelve el contenido sin identifiacr si hay o no carpetas dentro)
export const readaPathDirectory = (pathRoot) => fs.readdirSync(pathRoot)

// Función que extrae links de los archivos md, si no hay devuelve array vacío
export const getLinksFileMD = (arrayFiles) => {
  const foundLinksRegEx = /\[([^\[]+)\](\(.*\))/gm
  const contentLinkRegEx = /\[([^\[]+)\]\((.*)\)/
  arrayFiles.forEach(e => {
    const fileContent = readaPathFile(e)
    const linksonMdFile = fileContent.match(foundLinksRegEx)
    if (linksonMdFile !== null) {
      linksonMdFile.forEach(link => {
        const foundLinksMd = link.match(contentLinkRegEx)
        if (foundLinksMd[2].includes('http')) {
          arrayLinks.push({
            href: foundLinksMd[2],
            text: foundLinksMd[1].slice(0, 50),
            file: e
          })
        }
      })
    }
  })
  return arrayLinks
}
// valida la url
export const validateLinks = (arrayLinks) => {
  const arrayLinksStatus = arrayLinks.map(e => {
    const fetchPromise = fetch(e.href)
      .then((data) => {
        return {
          href: e.href,
          text: e.text,
          file: e.file,
          status: data.status,
          msg: data.statusText
        }
      }).catch(() => ({
        href: e.href,
        text: e.text,
        file: e.file,
        status: 'Fail Request',
        msg: 'fail'
      }
      ))
    return fetchPromise
  })
  return Promise.all(arrayLinksStatus)
}

// recursividad / para obtener los archivos MD de cada directorio y encontrar los links en cada archivo de cada direcrtorio
export const getFilesMdofDirectory = (pathRoot) => {
  readaPathDirectory(pathRoot).forEach(e => {
    const newPathDirectory = path.join(pathRoot, e)
    if (ifIsFile(newPathDirectory)) {
      if (findMdFile(newPathDirectory)) {
        arrayFiles.push(newPathDirectory)
      }
    } else {
      arrayFiles = arrayFiles.concat(getFilesMdofDirectory(newPathDirectory))
      return arrayFiles
    };
  }
  )
  return arrayFiles
}

// para obtener stats de los links
export const getStatsLinks = (arrayLinks) => {
  const linksUnique = new Set(arrayLinks.map(e => e.href))
  return {
    file: arrayLinks[0].file,
    total: arrayLinks.length,
    unique: linksUnique.size
  }
}
