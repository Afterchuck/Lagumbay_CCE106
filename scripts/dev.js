const { spawn } = require('node:child_process');
const path = require('node:path');

const rootDirectory = path.resolve(__dirname, '..');
const nodeCommand = process.execPath;
const npxCommand = process.platform === 'win32' ? 'npx.cmd' : 'npx';

const api = spawn(nodeCommand, ['server/index.js'], {
  cwd: rootDirectory,
  stdio: 'inherit',
});

const expo = spawn(npxCommand, ['expo', 'start', ...process.argv.slice(2)], {
  cwd: rootDirectory,
  stdio: 'inherit',
});

function stopChildren() {
  if (!api.killed) api.kill();
  if (!expo.killed) expo.kill();
}

process.once('SIGINT', stopChildren);
process.once('SIGTERM', stopChildren);

expo.on('exit', (code) => {
  if (!api.killed) api.kill();
  process.exit(code ?? 0);
});

api.on('error', (error) => {
  console.error(`Could not start the student API: ${error.message}`);
});
