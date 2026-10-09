import { spawn, execSync } from 'child_process';
import path from 'path';

console.log('===========================================================');
console.log('🚢  Starting Master Export Pro (MERN Stack Architecture) ');
console.log('===========================================================');

const isWin = process.platform === 'win32';

// Function to terminate any stale listening process on ports 5000 or 5173
function freePortIfOccupied(port) {
  if (!isWin) return;
  try {
    const stdout = execSync(`netstat -ano | findstr :${port}`, { encoding: 'utf8', stdio: ['pipe', 'pipe', 'ignore'] });
    const lines = stdout.trim().split('\n');
    for (const line of lines) {
      if (!line.includes('LISTENING')) continue;
      const parts = line.trim().split(/\s+/);
      const pid = parts[parts.length - 1];
      if (pid && pid !== '0' && pid !== String(process.pid)) {
        try {
          execSync(`taskkill /F /PID ${pid}`, { stdio: 'ignore' });
          console.log(`🧹 Cleared stale process (PID ${pid}) on port ${port}`);
        } catch {}
      }
    }
  } catch {}
}

// Clean up stale port blockers if previous sessions were not closed cleanly
freePortIfOccupied(5000);
freePortIfOccupied(5173);

// Spawn backend server directly with node
const server = spawn(process.execPath, ['--watch', 'server.js'], {
  cwd: path.resolve('server'),
  stdio: 'inherit',
});

// Spawn frontend client directly with node (running Vite CLI directly)
const viteCli = path.resolve('client/node_modules/vite/bin/vite.js');
const client = spawn(process.execPath, [viteCli], {
  cwd: path.resolve('client'),
  stdio: 'inherit',
});

function killProcess(proc) {
  if (!proc || !proc.pid) return;
  if (isWin) {
    try {
      execSync(`taskkill /F /T /PID ${proc.pid}`, { stdio: 'ignore' });
    } catch {}
  } else {
    try {
      proc.kill('SIGINT');
    } catch {}
  }
}

function cleanup() {
  console.log('\n🛑 Shutting down services cleanly...');
  killProcess(server);
  killProcess(client);
  process.exit(0);
}

process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);
process.on('exit', () => {
  killProcess(server);
  killProcess(client);
});
