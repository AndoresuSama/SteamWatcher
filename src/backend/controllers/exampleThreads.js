const { parentPort, workerData, isMainThread } = require('worker_threads');

if (!isMainThread) {
  let message;
  if (typeof workerData.id === 'string') message = `ID: ${workerData.id} validado como string`;
  parentPort.postMessage(message);
}