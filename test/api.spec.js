/* eslint-disable quotes */
/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable space-infix-ops */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import {
  validatePath,
  createAbsolutePath,
  determinateAbsolutePath,
  ifIsFile,
  ifIsDirectory,
  getLinksFileMD,
  getFilesMdofDirectory,
  getStatsLinks,
  validateLinks
} from '../api'

import fetch from 'node-fetch'
jest.mock('node-fetch', () => jest.fn())

const route = './archivosdeprueba'
const arrayLinks = [
  {
    href: 'https://carlosazaustre.es/manejando-la-asincronia-en-javascript',
    text: 'Asíncronía en js',
    file: 'archivosdeprueba/exampleFileMD.md'
  },
  {
    href: 'https://docs.npmjs.com/getting-started/what-is-npm',
    text: 'NPM',
    file: 'archivosdeprueba/exampleFileMD.md'
  },
  {
    href: 'https://docs.npmjs.com/getting-started/publishing-npm-packages',
    text: 'Publicar packpage',
    file: 'archivosdeprueba/exampleFileMD.md'
  },
  {
    href: 'https://docs.npmjs.com/getting-started/publishing-npm-packages',
    text: 'Publicar packpage',
    file: 'archivosdeprueba/exampleFileMD.md'
  }
]

const arrayFiles = [
  'archivosdeprueba\\carpetadeprueba\\carpetapueba2\\carpetaprueba3\\exampleprueba6.md',
  'archivosdeprueba\\carpetadeprueba\\carpetapueba2\\exampleprueba5.md',
  'archivosdeprueba\\carpetadeprueba\\examplethree.md',
  "archivosdeprueba\\exampleFileEmpty.md",
  "archivosdeprueba\\exampleFileMD.md",
  "archivosdeprueba\\exampleFileMdBroken.md",
  "archivosdeprueba\\exampleFileNull.md",
  'archivosdeprueba\\exampletwo.md'
]

const arrayLinksStatus = [
  {
    href: 'https://carlosazaustre.es/manejando-la-asincronia-en-javascript',
    text: 'Asíncronía en js',
    file: 'archivosdeprueba/exampleFileMD.md',
    status: 200,
    msg: 'OK'
  },
  {
    href: 'https://docs.npmjs.com/getting-started/what-is-npm',
    text: 'NPM',
    file: 'archivosdeprueba/exampleFileMD.md',
    status: 200,
    msg: 'OK'
  },
  {
    href: 'https://docs.npmjs.com/getting-started/publishing-npm-packages',
    text: 'Publicar packpage',
    file: 'archivosdeprueba/exampleFileMD.md',
    status: 200,
    msg: 'OK'
  },
  {
    href: 'https://docs.npmjs.com/getting-started/publishing-npm-packages',
    text: 'Publicar packpage',
    file: 'archivosdeprueba/exampleFileMD.md',
    status: 200,
    msg: 'OK'
  }
]

const objStats = { file: 'archivosdeprueba/exampleFileMD.md', total: 4, unique: 3 }

const arrayFail = [
  {
    href: 'http://community.laboratoria.la/t/modulos-librerias-paquetes-frameworks-cual-es-la-diferencia/175',
    text: 'Módulos, librerías, paquetes, frameworks... ¿cuál',
    file: 'exampleFileMD.md'
  }
]
const returnArrayFail= [{
  href: 'http://community.laboratoria.la/t/modulos-librerias-paquetes-frameworks-cual-es-la-diferencia/175',
  text: 'Módulos, librerías, paquetes, frameworks... ¿cuál',
  file: 'exampleFileMD.md',
  status: 'Fail Request',
  msg: 'fail'
}
]
describe('validatePath', () => {
  it('should be return true if the path exists', () => {
    expect(validatePath(route)).toBe(true)
  })
})

describe('createAbsolutePath', () => {
  it('should be return absolute Path', () => {
    expect(createAbsolutePath('archivosdeprueba/exampleFileMD.md')).toBe('C:\\LABORATORIA PROYECTOS\\P4-MDLINKS\\LIM017-md-links\\archivosdeprueba\\exampleFileMD.md')
  })
})

describe('determinateAbsolutePath', () => {
  it('should be return path if is an absolute path', () => {
    expect(determinateAbsolutePath('C:\\LABORATORIA PROYECTOS\\P4-MDLINKS\\LIM017-md-links\\archivosdeprueba\\exampleFileMD.md')).toBe('C:\\LABORATORIA PROYECTOS\\P4-MDLINKS\\LIM017-md-links\\archivosdeprueba\\exampleFileMD.md')
  })
  it('should be return absolute path if is an relative path', () => {
    expect(determinateAbsolutePath('archivosdeprueba/exampleFileMD.md')).toBe('C:\\LABORATORIA PROYECTOS\\P4-MDLINKS\\LIM017-md-links\\archivosdeprueba\\exampleFileMD.md')
  })
})

describe('ifIsFile', () => {
  it('should be return true if is a file', () => {
    expect(ifIsFile('archivosdeprueba/exampleFileMD.md')).toBe(true)
  })
  it('should be return false if is a directory', () => {
    expect(ifIsFile(route)).toBe(false)
  })
})

describe('ifIsDirectory', () => {
  it('should be return true if is a directory', () => {
    expect(ifIsDirectory(route)).toBe(true)
  })
})

describe('getLinksFileMD', () => {
  it('should be return array empty if does not have links', () => {
    expect(getLinksFileMD(['archivosdeprueba/exampleFileNull.md'])).toStrictEqual([])
  })
  it('should be return array with links', () => {
    expect(getLinksFileMD(['archivosdeprueba/exampleFileMD.md'])).toStrictEqual(arrayLinks)
  })
})

describe('getFilesMdofDirectory', () => {
  it('should be return array with files .md', () => {
    expect(getFilesMdofDirectory('archivosdeprueba')).toStrictEqual(arrayFiles)
  })
})

describe('getStatsLinks', () => {
  it('should be return an object with links information', () => {
    expect(getStatsLinks(arrayLinks)).toStrictEqual(objStats)
  })
})

describe('validateLinks', () => {
  it('should be return href, text, file, status, msg', () => {
    fetch.mockImplementation(() => Promise.resolve({
      status: 200,
      msg: 'OK'
    }))
    return validateLinks(arrayLinks)
      .then((data) => {
        expect(data).toEqual(arrayLinksStatus)
      })
  })
  it('should be return href, text, file, status, msg', () => {
    fetch.mockImplementation(() => Promise.reject({
      status: 'Not found',
      msg: 'fail'
    }))
    return validateLinks(arrayFail)
      .then((data) => {
        expect(data).toEqual(returnArrayFail)
      })
  })
})
