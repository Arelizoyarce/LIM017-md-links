/* eslint-disable prefer-promise-reject-errors */
import {
  readaPathDirectory,
  getLinksFileMD,
  getLinksofDirectory,
  validatePath,
  ifIsDirectory,
  ifIsFile,
  findMdFile,
  validateLinks,
  determinateAbsolutePath,
  getStatsLinks,
  readaPathFile
} from './api.js'

// Promesa planteada para que devuelva resultados solo ingresando ruta (falta validate y stast)
export const mdLinks = (path, option = { validate: false, stats: false }) => {
  return new Promise((resolve, reject) => {
    if (validatePath(path)) {
      const pathAbsolute = determinateAbsolutePath(path)
      let arrayLinks = []
      if (ifIsDirectory(pathAbsolute)) {
        if (readaPathDirectory(pathAbsolute).length !== 0) {
          arrayLinks = getLinksofDirectory(pathAbsolute)
        } else {
          reject('Carpeta vacía')
        }
      }
      if (ifIsFile(pathAbsolute)) {
        if (findMdFile(pathAbsolute)) {
          arrayLinks = getLinksFileMD(pathAbsolute)
        } else {
          reject('La ruta ingresada no es .md')
        }
      }
      if (!option.validate && option.stats) {
        resolve(getStatsLinks(arrayLinks))
      }
      if (option.validate && !option.stats) {
        validateLinks(arrayLinks).then((result) => {
          resolve(result)
        })
      }
      if (option.validate && option.stats) {
        let brokenLinks = 0
        const failLinks = validateLinks(arrayLinks)
          .then((result) => {
            result.forEach(e => {
              if (e.msg === 'fail') {
                brokenLinks++
              }
              resolve({
                ...getStatsLinks(arrayLinks),
                broken: brokenLinks
              })
            })
          })
        return failLinks
      }
    } else {
      reject('La ruta ingresada no existe')
    }
  })
}
