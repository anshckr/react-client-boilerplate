import React, { useEffect } from 'react';
import * as monaco from 'monaco-editor';
import { FitAddon } from 'xterm-addon-fit';
import { Unicode11Addon } from 'xterm-addon-unicode11';

import runit from 'utils/skulpt';

import './Layout.scss';

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

    // Get Firebase Database reference.
    var firepadRef = firebase.database().ref();

    //// Create Monaco and firepad.
    window.editor = monaco.editor.create(document.getElementById('firepad'), {
      language: 'python',
    });

    Firepad.fromMonaco(firepadRef, window.editor);

    window.term = new Terminal();
    const fitAddon = new FitAddon();
    window.term.loadAddon(fitAddon);
    window.term.loadAddon(new Unicode11Addon());
    window.term.open(document.getElementById('output'));

    fitAddon.fit();
  }, []);

  return (
    <div className="layout container">
      <div className="row">
        <div className="col-sm-6">
          <button className="layout__run" onClick={runit}>
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
          <div id="canvas-ele"></div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
