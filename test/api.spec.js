/* eslint-disable no-undef */
import { getFilesMdofDirectory, getLinksFileMD, determinateAbsolutePath, createAbsolutePath, validatePath, ifIsFile, ifIsDirectory, findMdFile, readaPathFile } from '../api.js'

const route = './archivosdeprueba'
const absoluteRoute = 'C:\\LABORATORIA PROYECTOS\\P4-MDLINKS\\LIM017-md-links\\archivosdeprueba'
const arrayLinks = [
  {
    href: 'Módulos, librerías, paquetes, frameworks... ¿cuál es la diferencia?',
    text: 'http://community.laboratoria.la/t/modulos-librerias-paquetes-frameworks-cual-es-la-diferencia/175',
    file: 'exampleFileMD.md'
  },
  {
    href: 'Asíncronía en js',
    text: 'https://carlosazaustre.es/manejando-la-asincronia-en-javascript',
    file: 'exampleFileMD.md'
  },
  {
    href: 'NPM',
    text: 'https://docs.npmjs.com/getting-started/what-is-npm',
    file: 'exampleFileMD.md'
  },
  {
    href: 'Publicar packpage',
    text: 'https://docs.npmjs.com/getting-started/publishing-npm-packages',
    file: 'exampleFileMD.md'
  }
]

const arrayFiles = ['examplethree.md', 'exampletwo.md']

describe('validatePath', () => {
  it('should be return true if the path exists', () => {
    expect(validatePath(route)).toBe(true)
  })
})

describe('determinateAbsolutePath', () => {
  it('should be return false for absolute path', () => {
    expect(determinateAbsolutePath(route)).toBe(false)
  })
})

describe('createAbsolutePath', () => {
  it('should be return a absolute path', () => {
    expect(createAbsolutePath(route)).toBe(absoluteRoute)
  })
})

describe('ifIsFile', () => {
  it('should be return false if path is not a file', () => {
    expect(ifIsFile(route)).toBe(false)
  })
  it('should be return true if path is a file', () => {
    expect(ifIsFile('exampleFile.txt')).toBe(true)
  })
})

describe('ifIsDirectory', () => {
  it('should be return false if path is not a directory', () => {
    expect(ifIsDirectory('exampleFile.txt')).toBe(false)
  })
  it('should be return true if path is a directory', () => {
    expect(ifIsDirectory(route)).toBe(true)
  })
})
// describe('readaPathFile', () => {
//   it('should be return el archivo está vació if the file.leght is 0', () => {
//     expect(readaPathFile('exampleFileMDNull.md')).toStrictEqual([])
//   })
//   it('should be return links of md file', () => {
//     expect(readaPathFile('exampleFileMD.md')).toEqual(arrayLinks)
//   })
// })

// describe('getContentMdFile', () => {
//   it('should be return el archivo no es .md if it isnt .md', () => {
//     expect(getContentMdFile('exampleFile.txt')).toBe(console.log('el archivo no es .md'))
//   })
//   it('should be return array file content if the file is .md', () => {
//     expect(getContentMdFile('exampleFileMD.md')).toBe(readaPathFile('exampleFileMD.md'))
//   })
// })

describe('findMdFile', () => {
  it('should be return true if the file is .md', () => {
    expect(findMdFile('exampleFile.txt')).toBe(false)
  })
})

describe('getLinksFileMD', () => {
  it('should be return array with the links', () => {
    expect(getLinksFileMD(readaPathFile('exampleFileMD.md'), 'exampleFileMD.md')).toStrictEqual(arrayLinks)
  })
})

describe('getFilesMdofDirectory', () => {
  it('should be return array md file list', () => {
    expect(getFilesMdofDirectory('archivosdeprueba')).toStrictEqual(arrayFiles)
  })
})
