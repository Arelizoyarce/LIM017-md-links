/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { mdLinks } from '../index.js'
import fetch from 'node-fetch'
jest.mock('node-fetch', () => jest.fn())

const arrayLinks = [{
  href: 'https://carlosazaustre.es/manejando-la-asincronia-en-javascript',
  text: 'Asíncronía en js',
  file: 'C:\\LABORATORIA PROYECTOS\\P4-MDLINKS\\LIM017-md-links\\exampleFileMD.md'
},
{
  href: 'https://docs.npmjs.com/getting-started/what-is-npm',
  text: 'NPM',
  file: 'C:\\LABORATORIA PROYECTOS\\P4-MDLINKS\\LIM017-md-links\\exampleFileMD.md'
},
{
  href: 'https://docs.npmjs.com/getting-started/publishing-npm-packages',
  text: 'Publicar packpage',
  file: 'C:\\LABORATORIA PROYECTOS\\P4-MDLINKS\\LIM017-md-links\\exampleFileMD.md'
},
{
  href: 'https://docs.npmjs.com/getting-started/publishing-npm-packages',
  text: 'Publicar packpage',
  file: 'C:\\LABORATORIA PROYECTOS\\P4-MDLINKS\\LIM017-md-links\\exampleFileMD.md'
}]
const arrayLinksStatus = [
  {
    href: 'https://carlosazaustre.es/manejando-la-asincronia-en-javascript',
    text: 'Asíncronía en js',
    file: 'C:\\LABORATORIA PROYECTOS\\P4-MDLINKS\\LIM017-md-links\\exampleFileMD.md',
    status: 200,
    msg: 'OK'
  },
  {
    href: 'https://docs.npmjs.com/getting-started/what-is-npm',
    text: 'NPM',
    file: 'C:\\LABORATORIA PROYECTOS\\P4-MDLINKS\\LIM017-md-links\\exampleFileMD.md',
    status: 200,
    msg: 'OK'
  },
  {
    href: 'https://docs.npmjs.com/getting-started/publishing-npm-packages',
    text: 'Publicar packpage',
    file: 'C:\\LABORATORIA PROYECTOS\\P4-MDLINKS\\LIM017-md-links\\exampleFileMD.md',
    status: 200,
    msg: 'OK'
  },
  {
    href: 'https://docs.npmjs.com/getting-started/publishing-npm-packages',
    text: 'Publicar packpage',
    file: 'C:\\LABORATORIA PROYECTOS\\P4-MDLINKS\\LIM017-md-links\\exampleFileMD.md',
    status: 200,
    msg: 'OK'
  }
]
const stats = {
  file: 'C:\\LABORATORIA PROYECTOS\\P4-MDLINKS\\LIM017-md-links\\exampleFileMD.md',
  total: 4,
  unique: 3
}
const validateStats = {
  file: 'C:\\LABORATORIA PROYECTOS\\P4-MDLINKS\\LIM017-md-links\\exampleFileMD.md',
  total: 5,
  unique: 4,
  broken: 0
}
const statsObj = {
  status: 200,
  msg: 'OK'
}
describe('mdLinks', () => {
  it('should return links stats if enter --stats ', () => {
    fetch.mockImplementation(() => Promise.resolve(statsObj))
    return mdLinks('exampleFileMD.md', { validate: false, stats: true })
      .then((result) => {
        expect(result).toEqual(stats)
      })
  })
  it('should return links total, unique, and broken if enter --validate --stats', () => {
    fetch.mockImplementation(() => Promise.resolve(statsObj))
    return mdLinks('exampleFileMdBroken.md', { validate: true, stats: true })
      .then((result) => {
        expect(result).toEqual(validateStats)
      })
  })
  it('should return path does not exist', () => {
    return mdLinks('exampleFile.md', { validate: false, stats: true })
      .catch((result) => {
        expect(result).toEqual('The path entered does not exist')
      })
  })
  it('should return error The path entered is not .md', () => {
    return mdLinks('archivosdeprueba/example.txt', { validate: false, stats: true })
      .catch((result) => {
        expect(result).toEqual('The path entered is not .md')
      })
  })
  it('should return error empty file', () => {
    return mdLinks('archivosdeprueba/exampleFileEmpty.md', { validate: false, stats: true })
      .catch((result) => {
        expect(result).toEqual('empty file')
      })
  })
  it('should return error empty folder', () => {
    return mdLinks('archivosdeprueba/carpetadeprueba/carpetapueba2/carpetaprueba3/carpetaprueba4', { validate: false, stats: true })
      .catch((result) => {
        expect(result).toEqual('Empty folder')
      })
  })
})
