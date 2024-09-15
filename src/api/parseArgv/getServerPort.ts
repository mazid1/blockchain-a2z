import { DEFAULT_PORT } from "../server.constants";

export function getServerPort() {
  const portIndex = process.argv.findIndex((arg) => arg === "--port") + 1;

  if (portIndex === 0) {
    return DEFAULT_PORT;
  }

  if (portIndex >= process.argv.length) {
    console.error('No value for "--port" is provided');
    process.exit(1);
  }

  const port = Number(process.argv[portIndex]);

  if (Number.isNaN(port)) {
    console.error('Invalid value for "--port" is provided');
    process.exit(1);
  }

  return port;
}
