const executeCode = () => {
  window.socketConnection.send(JSON.stringify({
    type: 'run_script',
    payload: window.editor.getValue()
  }));
}

export { executeCode };
