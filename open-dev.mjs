import { spawn } from "child_process";
import { platform } from "os";

// Start Next.js dev server
const next = spawn(
  "npx",
  ["next", "dev", "--turbopack"],
  { stdio: "inherit", shell: true }
);

// Wait for "Ready" message then open browser
const openBrowser = () => {
  const url = "http://localhost:3000";
  const cmd =
    platform() === "win32"  ? `start ${url}`        :
    platform() === "darwin" ? `open ${url}`          :
                              `xdg-open ${url}`;
  spawn(cmd, { shell: true });
};

// Give it 3 seconds to boot then open
setTimeout(openBrowser, 3000);

next.on("exit", (code) => process.exit(code));
