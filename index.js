/* eslint-disable no-constant-condition */
/* eslint-disable no-cond-assign */
/* eslint-disable prefer-promise-reject-errors */
import {
  readaPathDirectory,
  getLinksFileMD,
  getFilesMdofDirectory,
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
          arrayLinks = getLinksFileMD(getFilesMdofDirectory(pathAbsolute))
        } else {
          reject('Empty folder')
        }
      }
      if (ifIsFile(pathAbsolute)) {
        if (readaPathFile(pathAbsolute) !== '') {
          if (findMdFile(pathAbsolute)) {
            arrayLinks = getLinksFileMD([pathAbsolute])
            if (arrayLinks = []) {
              reject('Does not links here')
            }
          } else {
            reject('The path entered is not .md')
          }
        } else {
          reject('empty file')
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
      if (!option.validate && !option.stats) {
        resolve(arrayLinks)
      }
    } else {
      reject('The path entered does not exist')
    }
  })
}
