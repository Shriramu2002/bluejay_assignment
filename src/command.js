import yargs from 'yargs'
import { main } from './analyze'

yargs(hideBin(process.argv))
  .command('new <file>', 'create a new note', yargs => {
    return yargs.positional('file', {
      describe: 'The csv file in the csvFiles directory to analyze',
      type: 'string'
    })
  }, async (argv) => {
    main(argv.file)
  })
  .demandCommand(1)
  .parse()