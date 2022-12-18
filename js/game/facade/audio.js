export class MyAudio {
  static instance;
  static HOME = 0;
  static BOSS = 1;
  static PLAYER_ATTACK = 2;
  static HIT = 3;
  static CRAWLID_DIED = 4;
  static VENGE_DIED = 5;
  static PLAYER_DASH = 6;
  static PLAYER_JUMP = 7;
  static PLAYER_HIT = 8;

  constructor() {
    this.audios = [];
    this.setListener();
    this.volume = 0;
    this.addAllAudio();
  }
  getElement(id, asset) {
    return `<audio id="${id}" src="${asset}"></audio>`;
  }

  addElement(el) {
    $("#root-audio").append(el);
  }

  addAllAudio() {
    this.addAudio(MyAudio.HOME, "/assets/game/audio/home.mp3");
    this.addAudio(MyAudio.BOSS, "/assets/game/audio/boss.mp3");
    this.addAudio(MyAudio.PLAYER_ATTACK, "/assets/game/audio/sword.wav");
    this.addAudio(MyAudio.HIT, "/assets/game/audio/hit.wav");
    this.addAudio(MyAudio.CRAWLID_DIED, "/assets/game/audio/crawlid_death.wav");
    this.addAudio(
      MyAudio.VENGE_DIED,
      "/assets/game/audio/enemy_death_sword.wav"
    );
    this.addAudio(MyAudio.PLAYER_DASH, "/assets/game/audio/hero_dash.wav");
    this.addAudio(MyAudio.PLAYER_JUMP, "/assets/game/audio/hero_jump.mp3");
    this.addAudio(MyAudio.PLAYER_HIT, "/assets/game/audio/hero_hit.wav");
  }

  addAudio(index, asset) {
    const element = `audio-${index}`;
    this.addElement(this.getElement(element, asset));
    this.audios[index] = document.getElementById(element);
  }

  setListener() {
    $("#volumeRange").on("input", (e) => {
      const vol = e.target.value;
      this.setVolume(vol / 100);
    });
  }

  stopAllAudio() {
    this.audios.forEach((audio) => {
      audio.pause();
    });
  }

  setVolume(vol) {
    this.volume = vol;
    this.audios.forEach((audio) => {
      audio.volume = vol;
    });
  }

  static getInstance = () => {
    if (this.instance == null) {
      this.instance = new MyAudio();
    }
    return this.instance;
  };

  play(state, loop = true) {
    this.audios[state].currentTime = 0;
    this.audios[state].play();
    this.audios[state].loop = loop;
  }
}
