// Description

function showCircle(idx) {
  $(".circle").removeClass("active");
  $(".circle").eq(idx).addClass("active");
}

const descHeader = $("#description-header");
const descContent = $("#description-content");
const descContainer = $(".description-text");
const descImage = $(".jumbotron-card");
const rightCursor = $(".right");
const leftCursor = $(".left");

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

const maxLenght = descData.length;

let currIdx = 0;
showDesc(currIdx);

function showDesc(idx) {
  const time = 0; // no delay
  showCircle(idx);
  descContainer.fadeOut(time);
  descImage.hide();
  descHeader.html(descData[idx].header);
  descContent.html(descData[idx].content);
  descContainer.fadeIn(time);
  descImage.eq(idx).fadeIn(time);
}

setInterval(() => {
  nextDesc();
}, 3000);

function nextDesc() {
  currIdx += 1;
  if (currIdx > maxLenght - 1) {
    currIdx = 0;
  }
  showDesc(currIdx);
}

function prevDesc() {
  currIdx -= 1;
  if (currIdx < 0) {
    currIdx = maxLenght - 1;
  }
  showDesc(currIdx);
}

rightCursor.click(nextDesc);

leftCursor.click(prevDesc);

// -----------------------------------------------------
