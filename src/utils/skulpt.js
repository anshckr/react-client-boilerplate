// output functions are configurable.  This one just appends some text
// to a pre element.
function outf(text) {
  window.term.reset();
  window.term.write(text);
}
function builtinRead(x) {
  if (Sk.builtinFiles === undefined || Sk.builtinFiles['files'][x] === undefined) throw "File not found: '" + x + "'";
  return Sk.builtinFiles['files'][x];
}

// Here's everything you need to run a python program in skulpt
// grab the code from your textarea
// get a reference to your pre element for output
// configure the output function
// call Sk.importMainWithBody()
const runit = () => {
  var prog = window.editor.getValue();
  Sk.pre = 'output';
  Sk.configure({ output: outf, read: builtinRead });
  (Sk.TurtleGraphics || (Sk.TurtleGraphics = {})).target = 'canvas-ele';
  var myPromise = Sk.misceval.asyncToPromise(function () {
    return Sk.importMainWithBody('<stdin>', false, prog);
  });
  myPromise.then(
    function (mod) {
      console.log(mod);
    },
    function (err) {
      outf(err.toString())
      // console.log(err.toString());
    }
  );
}

export default runit;
