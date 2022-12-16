const descHeader = $("#description-header");
const descContent = $("#description-content");
const descContainer = $(".description-text");

const descData = [
  {
    header: "Brave the Depths of a Forgotten Kingdom",
    content:
      "Beneath the fading town of Dirtmouth sleeps a vast, ancient kingdom. Many are drawn beneath the surface, searching for riches, or glory, or answers to old secrets. As the enigmatic Knight, you’ll traverse the depths, unravel its mysteries and conquer its evils.",
  },
  {
    header: "Use Your Skills and Reflexes to Survive",
    content:
      "Beneath the fading town of Dirtmouth sleeps a vast, ancient kingdom. Many are drawn beneath the surface, searching for riches, or glory, or answers to old secrets. As the enigmatic Knight, you’ll traverse the depths, unravel its mysteries and conquer its evils. Explore vast, interconnected worlds. Encounter a bizarre collection of friends and foes. Evolve with powerful new skills and abilities",
  },
  {
    header: "Evocative Hand-Drawn Art",
    content:
      "The world of Hollow Knight is brought to life in vivid, moody detail, its caverns alive with bizarre and terrifying creatures, each animated by hand in a traditional 2D style. Every new area you’ll discover is beautifully unique and strange, teeming with new creatures and characters to discover. The world of Hollow Knight is one worth exploring just to take in the sights and discover new wonders hidden off of the beaten path.",
  },
];

const characterData = [
  {
    header: "Main Character",
    content1:
      "The Knight is a discarded Vessel. They are the child of the Pale King and the White Lady,born in the Abyss with Void inside their shell.Hornet is the Knight's sister through their shared father. Like the rest of their Vessel siblings, theKnight is genderless.",
    content2:
      "Pale King Abyss.png After climbing out of their birthplace in the Abyss, the Knight witnessed their sibling, the Hollow Knight, being taken out of the Abyss by the Pale King. The entrance to the Abyss was sealed, causing the Knight to fall back down. Sometime after this, despite the entrance being sealed, the Knight and some of their siblings managed to escape the Abyss.",
    image: "assets/landing/hero.png",
  },
  {
    header: "False Knight",
    content1:
      "The False Knight was once a regular maggot, one of the weakest members of the insects living in Hallownest. When the Infection occurred, he was determined to protect his brothers from the plague. He encountered Hegemol while he slept and stole his armor, hoping that it would help him with his problems. This backfires when the armor itself causes the maggot to become infected, driving him mad. This resulted in him mercilessly attacking everyone who stood in his way, friend or foe.",
    content2:
      "The Knight encounters the False Knight in the middle of the Forgotten Crossroads, forced to make a detour from the route to the Snail Shaman due to a closed gate. The Knight comes to a big room with enemies, only for the False Knight to drop from the rood and crush them instead",
    image: "assets/landing/false-knight.webp",
  },
  {
    header: "Vengefly",
    content1:
      "If it opens its mouth to Swipe, wait until it starts moving and jump over it as it approaches. Either perform a downward slash to get in some damage or simply avoid it.",
    content2:
      "When it summons normal Vengeflies, it is best to kill them as quickly as possible. The longer they are around, the more difficult dodging the Vengefly King becomes, especially when it summons more Vengeflies. The Vengeflies provide an easy way to get SOUL.",
    image: "assets/landing/vengefly.webp",
  },
];

for (let i = 1; i <= 3; i++) {
  $(`#circle-${i}`).click(() => {
    showCharacter(i - 1);
  });
}

function showCharacter(idx) {
  const time = 300;
  $(".character-circle").removeClass("active");
  $(".character-circle").eq(idx).addClass("active");

  $("#character-image").fadeOut(time);
  $(".character-text-container").fadeOut(time);

  setTimeout(() => {
    $("#character-image").attr("src", characterData[idx].image);
    $("#character-header").html(characterData[idx].header);
    $("#character-content-1").html(characterData[idx].content1);
    $("#character-content-2").html(characterData[idx].content2);
    $("#character-image").fadeIn(time);
    $(".character-text-container").fadeIn(time);
  }, time);
}
function showCircle(idx) {
  $(".circle").removeClass("active");
  $(".circle").eq(idx).addClass("active");
}
function showDesc(idx) {
  const time = 300;
  showCircle(idx);
  descContainer.fadeOut(time);
  setTimeout(() => {
    descHeader.html(descData[idx].header);
    descContent.html(descData[idx].content);
    descContainer.fadeIn(time);
  }, time);
}

$("#jumbotron-card-1").click((e) => {
  showDesc(0);
});
$("#jumbotron-card-2").click((e) => {
  showDesc(1);
});
$("#jumbotron-card-3").click((e) => {
  showDesc(2);
});
