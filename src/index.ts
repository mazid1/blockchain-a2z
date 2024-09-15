import { server } from "./api/server";
import { getServerPort } from "./api/parseArgv/getServerPort";

const PORT = getServerPort();

server.listen(PORT, () => console.info(`Server is running on port ${PORT}`));
