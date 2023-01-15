const modalTemplate = `
<div class="modal">
<div class="center full">
  <div class="container">
    <div class="close">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="svg"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    </div>
    <div class="director">
      <div class="right">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M8.25 4.5l7.5 7.5-7.5 7.5"
          />
        </svg>
      </div>
      <div class="left">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M15.75 19.5L8.25 12l7.5-7.5"
          />
        </svg>
      </div>
    </div>
    <div class="content"></div>
    <div class="center">
      <p class="page-text">1 / 2</p>
    </div>
  </div>
</div>
<div class="black"></div>
</div>
`;

// Initializing Modal
$("#root-modal").html(modalTemplate);

const firstTemplate = `
<div class="flex header-container">
  <div class="center">
   <h1 class="hollow header">How To Play</h1>
  </div>
  <div class="center">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
    <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
  </div>
</svg>
</div>
<div class="content-container">
<ul>
  <li>
    On the start game you need to achieve 10 coin to open the boss
    door
  </li>
  <li>
    Kill the enemies on the start lobby to achieve coin. (1 Coin per
    1 Kill)
  </li>
  <li>
    You can rest at chair on the left side, then health will restore
    to max hp
  </li>
  <li>
    Once you open the boss door, you can interact go to the boss room 
  </li>
  <li>
    Boss HP will be decreased if the bunny is leaving the boss body
  </li>
</ul>
</div>
`;

const secondTemplate = `
      <div class="flex header-container">
        <div class="center">
        <h1 class="hollow header">Keyboard Mapping</h1>
        </div>
        <div class="center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
        </div>
      </svg>
      </div>
      <div class="center">
        <div class="keyboard-base">
          <div class="key escape used">Esc</div>
          <div class="key 1">1</div>
          <div class="key 2">2</div>
          <div class="key 3">3</div>
          <div class="key 4">4</div>
          <div class="key 5">5</div>
          <div class="key 6">6</div>
          <div class="key 7">7</div>
          <div class="key 8">8</div>
          <div class="key 9">9</div>
          <div class="key 0">0</div>
          <div class="key minus">-</div>
          <div class="key plus">+</div>
          <div class="key delete backspace">Delete</div>
          <div class="key tab">Tab</div>
          <div class="key q">Q</div>
          <div class="key w">W</div>
          <div class="key e used">E</div>
          <div class="key r">R</div>
          <div class="key t">T</div>
          <div class="key u">Y</div>
          <div class="key u">U</div>
          <div class="key i">I</div>
          <div class="key o">O</div>
          <div class="key p">P</div>
          <div class="key leftbracket">[</div>
          <div class="key rightbracket">]</div>
          <div class="key backslash">\\</div>
          <div class="key capslock">CapsLock</div>
          <div class="key a used">A</div>
          <div class="key s used">S</div>
          <div class="key d">D</div>
          <div class="key f used">F</div>
          <div class="key g">G</div>
          <div class="key h">H</div>
          <div class="key j">J</div>
          <div class="key k">K</div>
          <div class="key l">L</div>
          <div class="key semicolon">;</div>
          <div class="key colon">'</div>
          <div class="key return enter">Enter</div>
          <div class="key leftshift shift">Shift</div>
          <div class="key z used">Z</div>
          <div class="key x used">X</div>
          <div class="key c">C</div>
          <div class="key v">V</div>
          <div class="key b">B</div>
          <div class="key n">N</div>
          <div class="key m">M</div>
          <div class="key coma">,</div>
          <div class="key dot">.</div>
          <div class="key left-arrow">/</div>
          <div class="key arrowup used">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 19.5v-15m0 0l-6.75 6.75M12 4.5l6.75 6.75" />
            </svg>
        
          </div>
          <div class="key">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
            </svg>

          </div>
          <div class="key leftctrl control">Ctrl</div>
          <div class="key meta">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3 8.25V18a2.25 2.25 0 002.25 2.25h13.5A2.25 2.25 0 0021 18V8.25m-18 0V6a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 6v2.25m-18 0h18M5.25 6h.008v.008H5.25V6zM7.5 6h.008v.008H7.5V6zm2.25 0h.008v.008H9.75V6z" />
            </svg>
          </div>
          <div class="key alt">Alt</div>
          <div class="key space used">Space</div>
          <div class="key alt">Alt</div>
          <div class="key">Fn</div>
          <div class="key arrowleft used">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75" />
            </svg>

          </div>
          <div class="key arrowdown">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m0 0l6.75-6.75M12 19.5l-6.75-6.75" />
            </svg>
          
          </div>
          <div class="key ctrl arrowright used">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
            </svg>
          </div>
      </div>
    </div>
    <div class="key-text-container flex">
      <div class="key-text">ESCAPE - </div>
      <div class="key-purpose">Pause The Game</div>
    </div>
`;

const keyMap = new Map();
keyMap.set("e", "Interact (Used when go to boss door or rest)");
keyMap.set("arrowup", "Player Jump");
keyMap.set("arrowleft", "Player Move Left");
keyMap.set("arrowleft", "Player Move Right");
keyMap.set("space", "Interact (Used when go to boss door or rest)");
keyMap.set("z", "Player Jump");
keyMap.set("x", "Player Attack");
keyMap.set("s", "Player Dash");
keyMap.set("f", "Active Fullscreen Mode");
keyMap.set("a", "Player Blast");
keyMap.set("escape", "Pause The Game");

const xButton = $(".close");
const modal = $(".modal");
const howToPlay = $(".how-to-play");
const left = $(".modal .left");
const right = $(".modal .right");
const pageText = $(".page-text");
const content = $(".modal .content");
const keyText = ".modal .key-text";
const keyPurpose = ".modal .key-purpose";

const maxPage = 2;
const page = 1;
const time = 500;

showPage(1);

window.addEventListener("keydown", (e) => {
  if (e.key) {
    const key = e.key.toLowerCase();

    let elName = `.${key}`;

    switch (key) {
      case "-":
        elName = ".minus";
        break;
      case "=":
      case "+":
        elName = ".plus";
        break;
      case "[":
        elName = ".leftbracket";
        break;
      case "]":
        elName = ".rightbracket";
        break;
      case "\\":
        elName = ".backslash";
        break;
      case ";":
        elName = ".semicolon";
        break;
      case "'":
        elName = ".colon";
        break;
      case ",":
        elName = ".coma";
        break;
      case ".":
        elName = ".dot";
        break;
      case "/":
        elName = ".left-arrow";
        break;
      case " ":
        elName = ".space";
        break;
    }

    const el = $(elName);

    let className = "active";
    if (el.hasClass("used")) {
      const key = elName.substring(1, elName.length);
      const purpose = keyMap.get(key);
      changeText(key, purpose);
      className = "used-active";
    }

    el.toggleClass(className);
    setTimeout(() => {
      el.toggleClass(className);
    }, 100);
  }
});

function changeText(key, text) {
  key = key.toUpperCase() + " - ";
  $(keyText).html(key);
  $(keyPurpose).html(text);
}

function showPage(n) {
  switch (n) {
    case 1:
      left.hide();
      right.show();
      content.html(firstTemplate);
      break;
    case 2:
      content.html(secondTemplate);
      left.show();
      right.hide();
      break;
  }
  pageText.html(`${n} / ${maxPage}`);
}

xButton.click(() => {
  modal.fadeOut(time);

  document.removeEventListener("keypress", removePreventDefault);
});

function removePreventDefault(e) {
  if (e.key === " ") e.preventDefault();
}

howToPlay.click(() => {
  document.addEventListener("keypress", removePreventDefault);
  modal.fadeIn(time);
});

left.click(() => {
  showPage(1);
});

right.click(() => {
  showPage(2);
});
