import app from "./app";
import { config } from "./utils/config";
import logger from "./utils/logger";

const PORT = config.PORT;

app.listen(PORT, () => {
  logger.info(`Server on http://localhost:${PORT}`);
});
