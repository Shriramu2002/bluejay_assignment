import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import { main } from './analyze.js'

yargs(hideBin(process.argv))
  .command('new <file>', 'Analyze the csv file', yargs => {
    return yargs.positional('file', {
      describe: 'The csv file in the csvFiles directory to analyze',
      type: 'string'
    })
  }, async (argv) => {
    main(argv.file)
  })
  .demandCommand(1)
  .parse()