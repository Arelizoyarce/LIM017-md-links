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
  getStatsLinks
} from '../api.js'
import fetch from 'node-fetch'
jest.mock('node-fetch', () => jest.fn())

const route = './archivosdeprueba'
const arrayLinks = [
  {
    href: 'http://community.laboratoria.la/t/modulos-librerias-paquetes-frameworks-cual-es-la-diferencia/175',
    text: 'Módulos, librerías, paquetes, frameworks... ¿cuál ',
    file: 'exampleFileMD.md'
  },
  {
    href: 'https://carlosazaustre.es/manejando-la-asincronia-en-javascript',
    text: 'Asíncronía en js',
    file: 'exampleFileMD.md'
  },
  {
    href: 'https://docs.npmjs.com/getting-started/what-is-npm',
    text: 'NPM',
    file: 'exampleFileMD.md'
  },
  {
    href: 'https://docs.npmjs.com/getting-started/publishing-npm-packages',
    text: 'Publicar packpage',
    file: 'exampleFileMD.md'
  },
  {
    href: 'https://docs.npmjs.com/getting-started/publishing-npm-packages',
    text: 'Publicar packpage',
    file: 'exampleFileMD.md'
  }
]

const arrayFiles = [
  'archivosdeprueba\\carpetadeprueba\\carpetapueba2\\carpetaprueba3\\exampleprueba6.md',
  'archivosdeprueba\\carpetadeprueba\\carpetapueba2\\exampleprueba5.md',
  'archivosdeprueba\\carpetadeprueba\\examplethree.md',
  'archivosdeprueba\\exampletwo.md'
]

const objStats = { file: 'exampleFileMD.md', total: 5, unique: 4 }

describe('validatePath', () => {
  it('should be return true if the path exists', () => {
    expect(validatePath(route)).toBe(true)
  })
})

describe('createAbsolutePath', () => {
  it('should be return absolute Path', () => {
    expect(createAbsolutePath('exampleFileMD.md')).toBe('C:\\LABORATORIA PROYECTOS\\P4-MDLINKS\\LIM017-md-links\\exampleFileMD.md')
  })
})

describe('determinateAbsolutePath', () => {
  it('should be return path if is an absolute path', () => {
    expect(determinateAbsolutePath('C:\\LABORATORIA PROYECTOS\\P4-MDLINKS\\LIM017-md-links\\exampleFileMD.md')).toBe('C:\\LABORATORIA PROYECTOS\\P4-MDLINKS\\LIM017-md-links\\exampleFileMD.md')
  })
  it('should be return absolute path if is an relative path', () => {
    expect(determinateAbsolutePath('exampleFileMD.md')).toBe('C:\\LABORATORIA PROYECTOS\\P4-MDLINKS\\LIM017-md-links\\exampleFileMD.md')
  })
})

describe('ifIsFile', () => {
  it('should be return true if is a file', () => {
    expect(ifIsFile('exampleFileMD.md')).toBe(true)
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
  it('should be return array with links', () => {
    expect(getLinksFileMD(['exampleFileMD.md'])).toStrictEqual(arrayLinks)
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
