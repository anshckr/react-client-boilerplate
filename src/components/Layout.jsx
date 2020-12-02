import React, { useEffect } from 'react';
import * as monaco from 'monaco-editor';

import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import { Unicode11Addon } from 'xterm-addon-unicode11';

// import 'firebase';
// import Firepad from 'firepad';
// import firebase from 'firebase';

// import 'firebase/auth';
// import 'firebase/database';
// const Firepad = require('firepad').default;
// import io from 'socket.io-client';

import { connectNoVNC } from 'utils/noVNC';

import 'xterm/css/xterm.css';
import './Layout.scss';
import { executeCode } from '../utils/socket';

const Layout = () => {
  useEffect(() => {
    var firebaseConfig = {
      apiKey: 'AIzaSyCN8ck51Bd2PRKV7yNIAw1vgaCSFa29vv4',
      authDomain: 'cuemath-python-box.firebaseapp.com',
      databaseURL: 'https://cuemath-python-box.firebaseio.com',
      projectId: 'cuemath-python-box',
      storageBucket: 'cuemath-python-box.appspot.com',
      messagingSenderId: '428204228921',
      appId: '1:428204228921:web:7f07c38f3a2cf0315da8e8',
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    // window.firebaseWindow = firebase;

    // Get Firebase Database reference.
    var firepadRef = firebase.database().ref('cuemath');

    //// Create Monaco and firepad.
    window.editor = monaco.editor.create(document.getElementById('firepad'), {
      language: 'python',
      cursorBlinking: 'solid',
      cursorSmoothCaretAnimation: true,
      cursorStyle: 'block',
      cursorSurroundingLines: '1',
    });

    Firepad.fromMonaco(firepadRef, window.editor);

    window.term = new Terminal();
    const fitAddon = new FitAddon();
    window.term.loadAddon(fitAddon);
    window.term.loadAddon(new Unicode11Addon());
    window.term.open(document.getElementById('output'));

    fitAddon.fit();

    // const url = 'ws://localhost:3010';
    // const connection = (window.socketConnection = new WebSocket(url));
    // connection.binaryType = 'arraybuffer';

    // var socket = window.socketConnection = io.connect('http://localhost:3010');
    // socket.on('connect', function(data) {
    //   socket.emit('join', 'Hello World from client');
    // });

    //   connection.onopen = () => {
    //     connection.send(
    //       JSON.stringify({
    //         type: 'client_connected',
    //         payload: 'Hello From Client',
    //       })
    //     );
    //   };

    //   connection.onerror = (error) => {
    //     console.log(`WebSocket error: ${error}`);
    //   };

    //   connection.onmessage = (e) => {
    //     const data = JSON.parse(e.data);
    //     // console.log(ab2str(e.data));
    //     if (e.data instanceof Blob) {
    //       const reader = new FileReader();
    //       // reader.onload = () => {
    //       //   console.log(reader.result);
    //       // };

    //       reader.addEventListener('loadend', (e) => {
    //         console.log(e);
    //       });

    //       reader.readAsText(e.data);
    //     } else {
    //       window.term.reset();

    //       data.payload.split(',').forEach((res) => {
    //         window.term.writeln(`${res}`);

    //         fitAddon.fit();
    //       });

    //       // console.log(data);
    //     }
    //   };
  }, []);

  const onClickRun = () => {
    // executeCode();

    connectNoVNC(document.getElementById('screen'));
  };

  return (
    <div className="layout container">
      <div className="row">
        <div className="col-sm-6">
          <button className="layout__run" onClick={onClickRun}>
            Run
          </button>
          <div id="firepad"></div>
        </div>
        <div className="col-sm-6 mt-4">
          <pre id="output"></pre>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <div id="status"></div>
          <div id="screen"></div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
