export class MyAudio {
  static instance;
  static HOME = 0;

  constructor() {
    this.homeAudio = document.getElementById("homeAudio");
  }

  static getInstance = () => {
    if (this.instance == null) {
      this.instance = new MyAudio();
    }
    return this.instance;
  };

  play(state) {
    switch (state) {
      case MyAudio.HOME:
        this.homeAudio.play();
        this.homeAudio.loop = true;
    }
  }
}
