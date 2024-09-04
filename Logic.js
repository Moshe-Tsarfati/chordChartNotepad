// --- Configuration ---
// Textarea Setup
const textareaDiv = document.querySelector('#textarea1');
const textarea = textareaDiv.querySelector("#chartBody");
const scaleI = textareaDiv.querySelector('#scale-indicator');
// Scales Setup + Scale Tracker
let currentScale = "c";
const modDd = document.querySelector('#mod-dd');
const strDd = document.querySelector('#str-dd');
let typeMode = "chords";

let keyboardControl = "chartWriter";

// split line
const splitLine = document.querySelector('#splits-line');
const splitBar = splitLine.querySelector("#split-bar");
const splitNewLine = splitLine.querySelector("#split-new-line");
const splitBackspace = splitLine.querySelector("#split-backspace");
const splitSpace = splitLine.querySelector('#split-space');
const split1 = splitLine.querySelector("#split-1");
const split2 = splitLine.querySelector("#split-2");
const split3 = splitLine.querySelector("#split-3");
// Extensions Line
const extLine = document.querySelector("#ext-line");
const extM7b5 = extLine.querySelector("#ext-m7b5");
const extMaj7 = extLine.querySelector("#ext-maj7");
const extSus4 = extLine.querySelector("#ext-sus4");
const extSus9 = extLine.querySelector("#ext-sus9");
const ext5 = extLine.querySelector("#ext-5");
const ext6 = extLine.querySelector("#ext-6");
const ext7 = extLine.querySelector("#ext-7");
const extm = extLine.querySelector("#ext-m");
const extb = extLine.querySelector("#ext-b");
const exts = extLine.querySelector("#ext-s");
const extAug = extLine.querySelector("#ext-aug");
const extDim = extLine.querySelector("#ext-dim");

// Symbol Line
const symLine = document.querySelector("#symbols-line");
const rlb = symLine.querySelector("#rlb");
const rep1 = symLine.querySelector("#rep-1");
const rep2 = symLine.querySelector("#rep-2");
const symX2 = symLine.querySelector("#sym-x2");
const symX3 = symLine.querySelector("#sym-x3");
const symX4 = symLine.querySelector("#sym-x4");
const sym24 = symLine.querySelector("#sym-2-4");
const sym34 = symLine.querySelector("#sym-3-4");
const sym44 = symLine.querySelector("#sym-4-4");
const sym54 = symLine.querySelector("#sym-5-4");
const sym68 = symLine.querySelector("#sym-6-8");
const sym38 = symLine.querySelector("#sym-3-8");

// buildScale function
function buildScale(scaleDataArr, scaleBtnItems) {
  if (scaleDataArr.length != scaleBtnItems.length) {
    console.log("Error V1 - data dont match");
  } else {
    // add v1 listeners
    for (let i = 0; i < scaleDataArr.length; i++) {
      scaleBtnItems[i].addEventListener('click', function (e) {
        typeInTextarea(scaleDataArr[i]);
      });
    }
  }
}
function buildStructure(strDataArray, strBtnItems) {
  if (strDataArray.length != strBtnItems.length) {
    console.log("Error str V1 - data dont match");
  } else {
    for (let i = 0; i < strDataArray.length; i++) {
      strBtnItems[i].addEventListener('click', function () {
        tsita(strDataArray[i]);
      });
    }
  }
}
// typeInTextarea Function
function typeInTextarea(newText, el = textarea) {
  if(keyboardControl == "android") {
    textarea.setAttribute('inputmode', "none");
    textarea.focus();
    keyboardControl = "chartWriter";
  }
  const start = el.selectionStart
  const end = el.selectionEnd
  const text = el.value
  const before = text.substring(0, start)
  const after  = text.substring(end, text.length)
  el.value = (before + newText + after)
  el.selectionStart = el.selectionEnd = start + newText.length
  el.focus({ preventScroll: true })
  el.scrollTop = el.scrollHeight;
}

textarea.addEventListener('click', function() {
  textarea.setAttribute('inputmode', "text");
  textarea.focus();
  keyboardControl = "android";
});

// Structure counter (verse 1/2/3... etc)
function countOccurences(string, word) {
  return string.split(word).length - 1;
}



// Type structure in textarea
function tsita(newText) {
  typeInTextarea(newText);
  if (newText == 'Chorus' || newText == 'Pre-chorus' ||
    newText == 'Outro' || newText == 'Bridge' || newText == 'Interlude') {
    typeInTextarea(":");
  } else if (countOccurences(textarea.value, newText) == 1){
    typeInTextarea(":");
  } else {
    let counter = countOccurences(textarea.value, newText);
    typeInTextarea(` ${counter}:`);
  }
  strDd.classList.toggle('d-none');
}

function sendkeys(key, text) {
  key.addEventListener("click", function sk() {
    typeInTextarea(text);
  });
}
function sendKeysV2(key, text, repeats) {
  key.addEventListener("dblclick", function sk() {
    for (let i = 0; i < repeats; i++) {
      splitBackspace.click();
    }
    typeInTextarea(text);
  });
}

function newLine(key) {
  key.addEventListener("click", function sk() {
    typeInTextarea("\r\n");
  });
}
function backspace(key) {
  key.addEventListener("click", function sk() {
    if(keyboardControl == "android") {
      textarea.setAttribute('inputmode', "none");
      textarea.focus();
      keyboardControl = "chartWriter";
    }
    const x = window.scrollX;
    const y = window.scrollY;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const before = text.substring(0, start);
    const after  = text.substring(end, text.length);
    textarea.value = (before.substring(0, before.length -1) + after);
    textarea.selectionStart = textarea.selectionEnd = start - 1;
    textarea.focus({ preventScroll: true });
  });
}

// --- Keys Setup ---

// Splits line Listeners
sendkeys(splitBar, " |");
newLine(splitNewLine);
backspace(splitBackspace);
sendkeys(splitSpace, " ");
sendkeys(split1, "'");
sendkeys(split2, "''");
sendkeys(split3, "'''");
// Extensions line Listeners
sendkeys(extM7b5, "⍉");
sendkeys(extMaj7, "maj7");
sendkeys(extSus4, "sus4");
sendkeys(extSus9, "sus9");
sendkeys(ext5, "5");
sendkeys(ext6, "6");
sendkeys(ext7, "7");
sendkeys(extm, "m");
sendkeys(extb, "b");
sendkeys(exts, "#");
sendkeys(extAug, "aug");
sendkeys(extDim, "dim");

// Symbol line Listeners
sendkeys(rlb, " % |");
sendkeys(rep1, " 1.");
sendkeys(rep2, " 2.");
sendkeys(symX2, "  X2");
sendkeys(symX3, "  X3");
sendkeys(symX4, "  X4");
sendkeys(sym24, "  2/4");
sendkeys(sym34, "  3/4");
sendkeys(sym44, "  4/4");
sendkeys(sym54, "  5/4");
sendkeys(sym68, "  6/8");
sendkeys(sym38, "  3/8");
// Send Keys v2
sendKeysV2(rep1, " ||:", 6);
sendKeysV2(rep2, " :||", 6);
sendKeysV2(extSus9, "add9", 8);
sendKeysV2(extSus4, "(add4)", 8);
sendKeysV2(extAug, "+", 6);
sendKeysV2(extDim, "−", 6);
sendKeysV2(extb, "(b5)", 2);
sendKeysV2(exts, "(#5)", 2);
sendKeysV2(extM7b5, "m7b5", 2);
sendKeysV2(split3, " 𝅘𝅥·", 6);
sendKeysV2(extMaj7, "△7", 8);
sendKeysV2(ext7, "7⁹", 2);



// Modulation Setup
    // C/Am scale setup
const modBtnC = modDd.querySelector("#modBtn-c");
modBtnC.addEventListener("click", function () {
  document.querySelector(`#keyboard-${currentScale}`).classList.toggle("d-none");
  document.querySelector("#keyboard-c").classList.toggle("d-none");
  currentScale = "c";
  scaleI.textContent = 'C/Am';
  modDd.classList.toggle('d-none');
});
modBtnC.addEventListener(
  "click",
  function () {
    const cKeyboard = document.querySelector("#keyboard-c");
    const cNotes = ["/C", "/D", "/E", "/F", "/F#", "/G", "/Ab", "/A", "/Bb", "/B",
      " A/C#", " Eb", " F#ø", " E/Ab", " Bb",
      " C", " Dm", " Em", " F", " G", " Am", " Bø"
    ];
    const cNotesEl = cKeyboard.querySelectorAll('button');
    buildScale(cNotes, cNotesEl);
    const v2Els = cKeyboard.querySelectorAll('.v2Note');
    sendKeysV2(v2Els[0], 'D/F#', 7);
    sendKeysV2(v2Els[1], "D", 5);
    sendKeysV2(v2Els[2], "E", 5);
    sendKeysV2(v2Els[3], "A", 5);
    sendKeysV2(v2Els[4], "B", 5);
  },
  { once: true }
);

// C#/Bbm Scale setup
const modBtnCs = modDd.querySelector("#modBtn-cs");
modBtnCs.addEventListener("click", function () {
  document.querySelector(`#keyboard-${currentScale}`).classList.toggle("d-none");
  document.querySelector("#keyboard-cs").classList.toggle("d-none");
  currentScale = "cs";
  scaleI.textContent = 'C#/Bbm';
  modDd.classList.toggle('d-none');
});
modBtnCs.addEventListener(
  "click",
  function () {
    const csNotes = ["/C", "/C#", "/Eb", "/F", "/F#", "/G", "/Ab", "/A", "/Bb", "/B",
      " C#", " Ebm", " F#", " Ab", " Bbm",
      " Cø", " Bb/D", " E", " Fm", " Gø", " F/A", " B"
    ];
    const csKeyboard = document.querySelector("#keyboard-cs");
    const csNotesEl = csKeyboard.querySelectorAll('button');
    buildScale(csNotes, csNotesEl);
    const v2Els = csKeyboard.querySelectorAll('.v2Note');
    sendKeysV2(v2Els[0], 'Eb', 7);
    sendKeysV2(v2Els[1], "Bb", 7);
    sendKeysV2(v2Els[2], "C", 5);
    sendKeysV2(v2Els[3], "F", 5);
    sendKeysV2(v2Els[4], "Eb/G", 5);
  },
  { once: true }
);
// D/Bm Scale setup
const modBtnD = modDd.querySelector("#modBtn-d");
modBtnD.addEventListener("click", function () {
  document.querySelector(`#keyboard-${currentScale}`).classList.toggle("d-none");
  document.querySelector("#keyboard-d").classList.toggle("d-none");
  currentScale = "d";
  scaleI.textContent = 'D/Bm';
  modDd.classList.toggle('d-none');
});
modBtnD.addEventListener(
  "click",
  function () {
    const dNotes = ["/C", "/C#", "/D", "/E", "/F#", "/G", "/Ab", "/A", "/Bb", "/B",
      " C#ø", " B/Eb", " F#m", " G#ø", " F#/Bb",
      " C", " D", " Em", " F", " G", " A", " Bm"
    ];
    const dKeyboard = document.querySelector("#keyboard-d");
    const dNotesEl = dKeyboard.querySelectorAll('button');
    buildScale(dNotes, dNotesEl);
    const v2Els = dKeyboard.querySelectorAll('.v2Note');
    sendKeysV2(v2Els[0], 'C#', 7);
    sendKeysV2(v2Els[1], "F#", 7);
    sendKeysV2(v2Els[2], "E/Ab", 7);
    sendKeysV2(v2Els[3], "E", 5);
    sendKeysV2(v2Els[4], "B", 5);
  },
  { once: true }
);

// Eb/Cm Scale setup
const modBtnEb = modDd.querySelector("#modBtn-eb");
const ebKeyboard = document.querySelector("#keyboard-eb");
modBtnEb.addEventListener("click", function () {
  document.querySelector(`#keyboard-${currentScale}`).classList.toggle("d-none");
  ebKeyboard.classList.toggle("d-none");
  currentScale = "eb";
  scaleI.textContent = 'Eb/Cm';
  modDd.classList.toggle('d-none');
});
modBtnEb.addEventListener(
  "click",
  function () {
    const ebNotes = ["/C", "/C#", "/D", "/Eb", "/F", "/G", "/Ab", "/A", "/Bb", "/B",
      " C#", " Eb", " F#", " Ab", " Bb",
      " Cm", " Dø", " C/E", " Fm", " Gm", " Aø", " G/B"
    ];
    const ebNotesEl = ebKeyboard.querySelectorAll('button');
    buildScale(ebNotes, ebNotesEl);
    const v2Els = ebKeyboard.querySelectorAll('.v2Note');
    sendKeysV2(v2Els[0], 'C', 5);
    sendKeysV2(v2Els[1], "D", 5);
    sendKeysV2(v2Els[2], "F", 5);
    sendKeysV2(v2Els[3], "G", 5);
    sendKeysV2(v2Els[4], "F/A", 5);
  },
  { once: true }
);
// E/C#m Scale setup
const modBtnE = modDd.querySelector("#modBtn-e");
const eKeyboard = document.querySelector("#keyboard-e");
modBtnE.addEventListener("click", function () {
  document.querySelector(`#keyboard-${currentScale}`).classList.toggle("d-none");
  eKeyboard.classList.toggle("d-none");
  currentScale = "e";
  scaleI.textContent = 'E/C#m';
  modDd.classList.toggle('d-none');
});
modBtnE.addEventListener(
  "click",
  function () {
    const eNotes = ["/C", "/C#", "/D", "/Eb", "/E", "/F#", "/Ab", "/A", "/Bb", "/B",
      " C#m", " Ebø", " F#m", " G#m", " Bbø",
      " Ab/C", " D", " E", " C#/F", " G", " A", " B"
    ];
    const eNotesEl = eKeyboard.querySelectorAll('button');
    buildScale(eNotes, eNotesEl);
    const v2Els = eKeyboard.querySelectorAll('.v2Note');
    sendKeysV2(v2Els[0], 'C#', 7);
    sendKeysV2(v2Els[1], "Eb", 7);
    sendKeysV2(v2Els[2], "F#", 7);
    sendKeysV2(v2Els[3], "Ab", 7);
    sendKeysV2(v2Els[4], "Bb", 7);
  },
  { once: true }
);


// F/Dm Scale setup
const modBtnF = modDd.querySelector("#modBtn-f");
const fKeyboard = document.querySelector("#keyboard-f");
modBtnF.addEventListener("click", function () {
  document.querySelector(`#keyboard-${currentScale}`).classList.toggle("d-none");
  fKeyboard.classList.toggle("d-none");
  currentScale = "f";
  scaleI.textContent = 'F/Dm';
  modDd.classList.toggle('d-none');
});
modBtnF.addEventListener(
  "click",
  function () {
    const fNotes = ["/C", "/C#", "/D", "/Eb", "/E", "/F", "/G", "/A", "/Bb", "/B",
      " A/C#", " Eb", " D/F#", " Ab", " Bb",
      " C", " Dm", " Eø", " F", " Gm", " Am", " Bø"
    ];
    const fNotesEl = fKeyboard.querySelectorAll('button');
    buildScale(fNotes, fNotesEl);
    const v2Els = fKeyboard.querySelectorAll('.v2Note');
    sendKeysV2(v2Els[0], 'D', 5);
    sendKeysV2(v2Els[1], "E", 5);
    sendKeysV2(v2Els[2], "G", 5);
    sendKeysV2(v2Els[3], "A", 5);
    sendKeysV2(v2Els[4], "G/B", 5);
  },
  { once: true }
);

// F#/Ebm Scale setup
const modBtnFs = modDd.querySelector("#modBtn-fs");
const fsKeyboard = document.querySelector("#keyboard-fs");
modBtnFs.addEventListener("click", function () {
  document.querySelector(`#keyboard-${currentScale}`).classList.toggle("d-none");
  fsKeyboard.classList.toggle("d-none");
  currentScale = "fs";
  scaleI.textContent = 'F#/Ebm';
  modDd.classList.toggle('d-none');
});
modBtnFs.addEventListener(
  "click",
  function () {
    const fsNotes = ["/C", "/C#", "/D", "/Eb", "/E", "/F", "/F#", "/Ab", "/Bb", "/B", 
      " C#", " Ebm", " F#", " G#m", " Bbm",
      " Cø", " Bb/D", " E", " Fø", " Eb/G", " A", " B"
    ];
    const fsNotesEl = fsKeyboard.querySelectorAll('button');
    buildScale(fsNotes, fsNotesEl);
    const v2Els = fsKeyboard.querySelectorAll('.v2Note');
    sendKeysV2(v2Els[0], 'Eb', 7);
    sendKeysV2(v2Els[1], "Ab", 7);
    sendKeysV2(v2Els[2], "Bb", 7);
    sendKeysV2(v2Els[3], "Ab/C", 5);
    sendKeysV2(v2Els[4], "F", 5);
  },
  { once: true }
);

// G/Em Scale setup
const modBtnG = modDd.querySelector("#modBtn-g");
const gKeyboard = document.querySelector("#keyboard-g");
modBtnG.addEventListener("click", function () {
  document.querySelector(`#keyboard-${currentScale}`).classList.toggle("d-none");
  gKeyboard.classList.toggle("d-none");
  currentScale = "g";
  scaleI.textContent = 'G/Em';
  modDd.classList.toggle('d-none');
});
modBtnG.addEventListener(
  "click",
  function () {
    const gNotes = ["/C", "/C#", "/D", "/Eb", "/E", "/F", "/F#", "/G", "/A", "/B", 
      " C#ø", " B/Eb", " F#ø", " E/Ab", " Bb",
      " C", " D", " Em", " F", " G", " Am", " Bm"
    ];
    const gNotesEl = gKeyboard.querySelectorAll('button');
    buildScale(gNotes, gNotesEl);
    const v2Els = gKeyboard.querySelectorAll('.v2Note');
    sendKeysV2(v2Els[0], 'A/C#', 7);
    sendKeysV2(v2Els[1], "F#", 7);
    sendKeysV2(v2Els[2], "E", 5);
    sendKeysV2(v2Els[3], "A", 5);
    sendKeysV2(v2Els[4], "B", 5);
  },
  { once: true }
);

// Ab/Fm Scale setup
const modBtnAb = modDd.querySelector("#modBtn-ab");
const abKeyboard = document.querySelector("#keyboard-ab");
modBtnAb.addEventListener("click", function () {
  document.querySelector(`#keyboard-${currentScale}`).classList.toggle("d-none");
  abKeyboard.classList.toggle("d-none");
  currentScale = "ab";
  scaleI.textContent = 'Ab/Fm';
  modDd.classList.toggle('d-none');
});
modBtnAb.addEventListener(
  "click",
  function () {
    const abNotes = ["/C", "/C#", "/D", "/Eb", "/E", "/F", "/F#", "/G", "/Ab", "/Bb", 
      " C#", " Eb", " F#", " Ab", " Bbm",
      " Cm", " Dø", " C/E", " Fm", " Gø", " F/A", " B"
    ];
    const abNotesEl = abKeyboard.querySelectorAll('button');
    buildScale(abNotes, abNotesEl);
    const v2Els = abKeyboard.querySelectorAll('.v2Note');
    sendKeysV2(v2Els[0], 'Bb', 7);
    sendKeysV2(v2Els[1], "C", 5);
    sendKeysV2(v2Els[2], "Bb/D", 5);
    sendKeysV2(v2Els[3], "F", 5);
    sendKeysV2(v2Els[4], "G", 5);
  },
  { once: true }
);

// A/F#m Scale setup
const modBtnA = modDd.querySelector("#modBtn-a");
const aKeyboard = document.querySelector("#keyboard-a");
modBtnA.addEventListener("click", function () {
  document.querySelector(`#keyboard-${currentScale}`).classList.toggle("d-none");
  aKeyboard.classList.toggle("d-none");
  currentScale = "a";
  scaleI.textContent = 'A/F#m';
  modDd.classList.toggle('d-none');
});
modBtnA.addEventListener(
  "click",
  function () {
    const aNotes = ["/C#", "/D", "/Eb", "/E", "/F", "/F#", "/G", "/Ab", "/A", "/B", 
      " C#m", " Ebø", " F#m", " Abø", " F#/Bb",
      " C", " D", " E", " C#/F", " G", " A", " Bm"
    ];
    const aNotesEl = aKeyboard.querySelectorAll('button');
    buildScale(aNotes, aNotesEl);
    const v2Els = aKeyboard.querySelectorAll('.v2Note');
    sendKeysV2(v2Els[0], 'C#', 7);
    sendKeysV2(v2Els[1], "B/Eb", 7);
    sendKeysV2(v2Els[2], "F#", 7);
    sendKeysV2(v2Els[3], "Ab", 7);
    sendKeysV2(v2Els[4], "B", 5);
  },
  { once: true }
);

// Bb/Gm Scale setup
const modBtnBb = modDd.querySelector("#modBtn-bb");
const bbKeyboard = document.querySelector("#keyboard-bb");
modBtnBb.addEventListener("click", function () {
  document.querySelector(`#keyboard-${currentScale}`).classList.toggle("d-none");
  bbKeyboard.classList.toggle("d-none");
  currentScale = "bb";
  scaleI.textContent = 'Bb/Gm';
  modDd.classList.toggle('d-none');
});
modBtnBb.addEventListener(
  "click",
  function () {
    const bbNotes = ["/C", "/D", "/Eb", "/E", "/F", "/F#", "/G", "/Ab", "/A", "/Bb", 
      " C#", " Eb", " D/F#", " Ab", " Bb",
      " Cm", " Dm", " Eø", " F", " Gm", " Aø", " G/B"
    ];
    const bbNotesEl = bbKeyboard.querySelectorAll('button');
    buildScale(bbNotes, bbNotesEl);
    const v2Els = bbKeyboard.querySelectorAll('.v2Note');
    sendKeysV2(v2Els[0], 'C', 5);
    sendKeysV2(v2Els[1], "D", 5);
    sendKeysV2(v2Els[2], "C/E", 5);
    sendKeysV2(v2Els[3], "G", 5);
    sendKeysV2(v2Els[4], "A", 5);
  },
  { once: true }
);
// B/G#m Scale setup
const modBtnB = modDd.querySelector("#modBtn-b");
const bKeyboard = document.querySelector("#keyboard-b");
modBtnB.addEventListener("click", function () {
  document.querySelector(`#keyboard-${currentScale}`).classList.toggle("d-none");
  bKeyboard.classList.toggle("d-none");
  currentScale = "b";
  scaleI.textContent = 'B/G#m';
  modDd.classList.toggle('d-none');
});
modBtnB.addEventListener(
  "click",
  function () {
    const bNotes = ["/C#", "/Eb", "/E", "/F", "/F#", "/G", "/Ab", "/A", "/Bb", "/B",
      " C#m", " Ebm", " F#", " G#m", " Bbø",
      " Ab/C", " D", " E", " Fø", " Eb/G", " A", " B"
    ];
    const bNotesEl = bKeyboard.querySelectorAll('button');
    buildScale(bNotes, bNotesEl);
    const v2Els = bKeyboard.querySelectorAll('.v2Note');
    sendKeysV2(v2Els[0], 'C#', 7);
    sendKeysV2(v2Els[1], "Eb", 7);
    sendKeysV2(v2Els[2], "Ab", 7);
    sendKeysV2(v2Els[3], "Bb", 7);
    sendKeysV2(v2Els[4], "C#/F", 5);
  },
  { once: true }
);
// Modulation setup End


// Modulation control
// omdb = open modulation dropdown button
const modBox = document.querySelector('#mod-box');
const omdb = modBox.querySelector('#open-mod-dd-btn');
omdb.addEventListener('click', function () {
  modDd.classList.toggle('d-none');
});

// Structure Keys Setup / control
//  osdb = open structure dropdown button
const strBox = document.querySelector('#str-box');
const osdb = strBox.querySelector('#open-str-dd-btn');
osdb.addEventListener('click', function () {
  strDd.classList.toggle('d-none');
});
osdb.addEventListener('click', function () {
  const strElItems = strBox.querySelectorAll('#str-dd button');
  const strData = ["Intro", "Verse", "Pre-chorus", "Bridge", "Chorus", "Interlude", "C-part", "Solo", "Outro"];
  // Use build scale to build the structure button instead
  buildStructure(strData, strElItems);
}, {once: true});




// ---- Copy to clipboard Btn
const ctcBtn = textareaDiv.querySelector('#ctc');
const ctcAlert =  textareaDiv.querySelector('#alert-ctc');
ctcBtn.addEventListener('click', function () {
  try {
      const textarea1 = document.createElement('textarea');
      document.body.appendChild(textarea1);
      let text = textarea.value;
      textarea1.value = text;
      textarea1.select();
      textarea1.setSelectionRange(0, 99999);
      document.execCommand('copy');
      document.body.removeChild(textarea1);
  } finally {

  }
  navigator.clipboard.writeText(textarea.value);
  ctcAlert.textContent = 'Copied to clipboard';
  setTimeout(function(){
    ctcAlert.textContent = '';
  }, 3000);
});

// --- Save to txt file
// dw = download section
const dw = document.querySelector('#dw');
// fni = file name input
const fni = dw.querySelector('input');

function downloadFile(filename, content) {
  // It works on all HTML5 Ready browsers as it uses the download attribute of the <a> element:
  const element = document.createElement('a');
  //A blob is a data type that can store binary data
  // "type" is a MIME type
  // It can have a different value, based on a file you want to save
  const blob = new Blob([content], { type: 'plain/text' });

  //createObjectURL() static method creates a DOMString containing a URL representing the object given in the parameter.
  const fileUrl = URL.createObjectURL(blob);
  
  //setAttribute() Sets the value of an attribute on the specified element.
  element.setAttribute('href', fileUrl.trim()); //file location
  element.setAttribute('download', filename); // file name
  element.style.display = 'none';
  
  //use appendChild() method to move an element from one element to another
  document.body.appendChild(element);
  element.click();
  
  //The removeChild() method of the Node interface removes a child node from the DOM and returns the removed node
  document.body.removeChild(element);
};

window.onload = () => {
  // when page loads set Am/C as defalut scale
  omdb.click();
  modBtnC.click();
  // Download as text Setup
  document.getElementById('download').
  addEventListener('click', e => {
    
    //The value of the file name input box
    const filename = fni.value + '.txt';
    
    //The value of what has been input in the textarea
    let content0 = document.getElementById('chartBody').value;
    const content = content0 = content0.replace(/\n\r?/g, '\r\n');
     if (!fni.value) {
      fni.classList.add('red-ph');
      fni.placeholder = 'Enter File Name!';
      setTimeout(function(){
        fni.placeholder = 'Specify a filename...';
        fni.classList.remove('red-ph');
    }, 3000);
    }
    else if (filename && content) {
      downloadFile(filename, content);
    }
    
  });
};


// Keyboard conrol for pc

document.addEventListener('keydown',  (e) => {
  if (e.code == "ControlRight") {
    if (typeMode == "chords") {
      typeMode = "text";
      alert("Text mode is on")
    }
    else if (typeMode == "text") {
      typeMode = "chords";
      alert("chords mode is on")
    }
  }
});

document.addEventListener('keydown',  (e) => {
  if (typeMode == "chords") {
    e.preventDefault();
    switch (e.key) {
      case "z":
        document.querySelector(`#keyboard-${currentScale} .tut-C`).click()
        break;
      case "x":
        document.querySelector(`#keyboard-${currentScale} .tut-D`).click()
        break;
      case "c":
        document.querySelector(`#keyboard-${currentScale} .tut-E`).click()
        break;
      case "v":
        document.querySelector(`#keyboard-${currentScale} .tut-F`).click()
        break;
      case "b":
        document.querySelector(`#keyboard-${currentScale} .tut-G`).click()
        break;
      case "n":
        document.querySelector(`#keyboard-${currentScale} .tut-A`).click()
        break;
      case "m":
        document.querySelector(`#keyboard-${currentScale} .tut-B`).click()
        break;
      case "m":
        document.querySelector(`#keyboard-${currentScale} .tut-B`).click()
        break;
      case "s":
        document.querySelector(`#keyboard-${currentScale} .tut-Cs`).click()
        break;
      case "d":
        document.querySelector(`#keyboard-${currentScale} .tut-Eb`).click()
        break;
      case "g":
        document.querySelector(`#keyboard-${currentScale} .tut-Fs`).click()
        break;
      case "h":
        document.querySelector(`#keyboard-${currentScale} .tut-Ab`).click()
        break;
      case "j":
        document.querySelector(`#keyboard-${currentScale} .tut-Bb`).click()
        break;
      case "/":
        splitBar.click();
        break;
      case "Backspace":
        splitBackspace.click()
        break;
      case "=":
          exts.click()
      break;
      case " ":
          splitSpace.click()
      break;
      case ",":
          extm.click()
      break;
    }
    switch (e.code) {
      case "Numpad2":
        typeInTextarea("maj7");
        break;
      case "Numpad7":
          ext7.click()
        break;
      case "Digit7":
          document.querySelector(`#keyboard-${currentScale} .bass-7`).click()
        break;
      case "Numpad5":
          ext5.click()
        break;
      case "Digit5":
          document.querySelector(`#keyboard-${currentScale} .bass-5`).click()
        break;
      case "Numpad4":
          extSus4.click()
        break;
      case "Digit4":
          document.querySelector(`#keyboard-${currentScale} .bass-4`).click()
        break;
      case "Numpad6":
          ext6.click()
        break;
      case "Digit6":
          document.querySelector(`#keyboard-${currentScale} .bass-6`).click()
        break;
      case "Numpad8":
        typeInTextarea("7⁹");
        break;
      case "Numpad9":
          extSus9.click()
        break;
      case "Digit9":
          document.querySelector(`#keyboard-${currentScale} .bass-9`).click()
        break;
        case "Digit1":
          document.querySelector(`#keyboard-${currentScale} .bass-1`).click()
          break;
        case "Digit2":
          document.querySelector(`#keyboard-${currentScale} .bass-2`).click()
          break;
        case "Digit3":
          document.querySelector(`#keyboard-${currentScale} .bass-3`).click()
          break;
        case "Digit8":
          document.querySelector(`#keyboard-${currentScale} .bass-8`).click()
          break;
        case "Digit0":
          document.querySelector(`#keyboard-${currentScale} .bass-10`).click()
          break;
        case "Enter":
          splitNewLine.click()
          break;
        case "NumpadAdd":
          extAug.click()
          break;
        case "NumpadSubtract":
          extDim.click()
          break;
        case "Numpad1":
          extM7b5.click()
          break;
        case "Minus":
            extb.click()
        break;
        case "NumpadMultiply":
          typeInTextarea(" 𝅘𝅥·");
        break;
        case "Quote":
        split1.click();
        break;
        case "BracketLeft":
          typeInTextarea(" ||:");
        break;
        case "BracketRight":
          typeInTextarea(" :||");
        break;
        case "F1":
          typeInTextarea(" 1.");
        break;
        case "F2":
          typeInTextarea(" 2.");
        break;
    }
  } else if (typeMode == "text") {
    return;
  }
});

// document.addEventListener('keyup', (event) => {
//   var name = event.key;
//   var code = event.code;
//   // Alert the key name and key code on keydown
//   alert(`Key pressed ${name} \r\n Key code value: ${code}`);
// }, false);












