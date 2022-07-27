import { app } from "./application/server";
import "./application/setup";

const port = process.env.PORT || 3000;
const domain = process.env.DOMAIN || `http://localhost:${port}`;

app.listen(port, () => {
  console.log(`Server listening on ${domain}`);
});
