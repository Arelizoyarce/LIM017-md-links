#!/usr/bin/env node
// eslint-disable-next-line no-unused-vars
import { mdLinks } from './src/index.js'
import chalk from 'chalk'

const entryArray = process.argv
// entrada de la ruta
const path = entryArray[2]
const option = entryArray[3]
if (entryArray.length === 3) {
  mdLinks(path, { validate: false, stats: false })
    .then((result) => {
      result.forEach(e => {
        if (e.file !== undefined) {
          console.log(`${(e.file)} ${chalk.green(e.href)} ${(e.text)}`)
        }
      })
    }).catch((error) => {
      console.log(chalk.red(error))
    })
}
if (entryArray.length === 4) {
  if (option === '--validate') {
    mdLinks(path, { validate: true, stats: false })
      .then((result) => {
        result.forEach(e => {
          if (e.href !== undefined) {
            console.log(`${(e.file)} ${chalk.green(e.href)} ${(e.text)} ${chalk.yellow(e.status)} ${chalk.bold.magenta(e.msg)}`)
          }
        })
      }).catch((error) => console.log(error))
  }

  if (option === '--stats') {
    mdLinks(path, { validate: false, stats: true })
      .then((result) => {
        console.log(result)
      })
  }
}

if (entryArray.length === 5) {
  mdLinks(path, { validate: true, stats: true })
    .then((result) => {
      console.log(result)
    })
}
