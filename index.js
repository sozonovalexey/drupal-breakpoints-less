'use strict'
const YAML = require('yamljs')
const fs = require('fs')
const stream = require('stream')
const through = require('through2')

// Midnight oil <3
const howCanWeSleepWhileOurBedsAreBurning = {}

function jsonToLessVars (obj) {
  let lessVars = ''

  for (let i in obj) {
    lessVars += '@' + obj[i].label + ': ~"' + obj[i].mediaQuery + '";\n'
  }

  return lessVars
}

howCanWeSleepWhileOurBedsAreBurning.read = function (path) {
  let rs = stream.Readable()
  let breakpoints = YAML.load(path)

  rs._read = function () {
    rs.push(jsonToLessVars(breakpoints))
    rs.push(null)
  }

  return rs
}

howCanWeSleepWhileOurBedsAreBurning.write = function (path) {
  let lessFile = fs.createWriteStream(path)
  return lessFile
}

howCanWeSleepWhileOurBedsAreBurning.ymlToLess = function () {
  return through.obj(function (file, enc, cb) {
    var content = file.contents.toString('utf8')
    var parsedYaml = YAML.parse(content)
    file.contents = new Buffer(String(jsonToLessVars(parsedYaml)))
    cb(null, file)
  })
}

module.exports = howCanWeSleepWhileOurBedsAreBurning
