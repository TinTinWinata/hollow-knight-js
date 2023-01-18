function characterTemplate(name, img) {
  return `
<li class="img-container center">
  <div class="container" 
  data-anijs="if: click, do: bounceIn animated"
  >
    <div class="center">
      <img
        src="${img}"
        alt=""
      />
    </div>
    <p>${name}</p>
  </div>
</li>`;
}

class Character {
  constructor(name, img) {
    this.name = name;
    this.img = img;
  }
}

let characters = [];
// Pushing Character

characters.push(
  new Character("Broken Vessel", "assets/landing/character/broken-vessel.webp")
);
characters.push(
  new Character("Brooding Mawlek", "assets/landing/character/brooding.webp")
);
characters.push(
  new Character("Brother Oro & Mato", "assets/landing/character/brothers.webp")
);
characters.push(
  new Character(
    "Crystal Guardian",
    "assets/landing/character/crystal-guardian.webp"
  )
);
characters.push(
  new Character("Dung Defender", "assets/landing/character/dung-defender.webp")
);
characters.push(
  new Character("False Knight", "assets/landing/character/false-knight.webp")
);
characters.push(
  new Character("Flukerman", "assets/landing/character/flukermam.webp")
);

characters.push(
  new Character("God Tamer", "assets/landing/character/god-tamer.webp")
);
characters.push(
  new Character("Great Nailsage Fly", "assets/landing/character/great.webp")
);
characters.push(new Character("Grimm", "assets/landing/character/grimm.webp"));
characters.push(
  new Character("Gruz Mother", "assets/landing/character/gruz-mother.webp")
);
characters.push(
  new Character("Hive Knight", "assets/landing/character/hive-knight.webp")
);
characters.push(
  new Character(
    "Hornet Protector",
    "assets/landing/character/hornet-protector.webp"
  )
);
characters.push(
  new Character("Massive Moss Changer", "assets/landing/character/massive.webp")
);

// ----------------------------------------------------------------

// Total Character Per Root (Divided 2 by marquee root 2 )
const totalCharacter = characters.length;

const root = $(".marquee-root");
const rootLength = root.length;

for (let i = 0; i < rootLength; i++) {
  let tempContainer = "";
  for (let i = 0; i < 7; i++) {
    const randomIdx = Math.floor(Math.random() * rootLength);
    const temp = characterTemplate(
      characters[randomIdx].name,
      characters[randomIdx].img
    );
    tempContainer += temp;
  }
  root.eq(i).html(tempContainer);
}

// Listener

// const imgContainer = $(".marquee-root li");
// imgContainer.hover(() => {
//   var index = $(this).index();
// });
