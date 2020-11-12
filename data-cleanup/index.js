/*
*
*
*  The purpose of this script is to take in a CSV file containing cooccurence matrix and transform
*  it into a JSON object to be used in the frontend application.  By default this script is set up
*  to create the lowLevel co-occurences matrix.  The format for both mid and level should be the same
*  so you can simply change the variable termLevel to midLevel.
*
*/

const fs = require('fs')
const termLevel = 'lowLevel'
async function main() {
    let csv = await fs.readFileSync('coocurrences-lowlevel-relevant.csv', 'utf-8');
    csv = csv.split('\n')
    let lines = csv.slice(1)
    let header = csv.slice(0,1)[0].split(',')
    
    let termsWithRelations = []

    lines.map(l => {
        let obj = {}
        let line = l.split(',')
        let term = line[0]
        for (var i = 1; i < line.length; i++){
            obj[header[i]] = line[i]
        }
        termsWithRelations.push(obj)
    })

    await fs.writeFileSync(`../src/assets/${termLevel}-matrix.js`, `export let ${termLevel}_matrix = ${JSON.stringify(termsWithRelations)}`)
}

main()