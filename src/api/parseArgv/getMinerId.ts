export function getMinerId() {
  const minerIdIndex = process.argv.findIndex((arg) => arg === "--miner") + 1;

  if (minerIdIndex === 0 || minerIdIndex >= process.argv.length) {
    console.error('No value for "--miner" is provided');
    process.exit(1);
  }

  return process.argv[minerIdIndex];
}
