import SoundFile from "./SoundFile";

class MusicFile extends SoundFile {
    constructor(url) {
        super(url);

        this.audio = null;
        this.media = null;
        this.position = 0;
        this.duration = 0;
        this._state = MusicFile.States.Unloaded;
    }

    load() {
        window.cSound = this;

        if (this.loading) return this.loading;

        this.loading = new Promise((resolve, reject) => {
            if (this.loaded) {
                resolve();
                return;
            }

            this.state(MusicFile.States.Loading);

            this.audio = new Audio();

            this.audio.crossOrigin = "anonymous";

            const context = SoundFile.acquireContext();

            this.audio.oncanplaythrough = () => {
                this.loaded = true;
                this.media = context.createMediaElementSource(this.audio);
                this.media.connect(context.destination);

                // Save duration
                this.duration = this.audio.duration;

                // Prevent firing again
                this.audio.oncanplaythrough = null;

                this.state(MusicFile.States.Stopped);

                resolve();
            };

            this.audio.onloadedmetadata = () => {
                this.duration = this.audio.duration;
            };

            this.audio.onloadeddata = () => {
                this.duration = this.audio.duration;
            };

            this.audio.onprogress = () => {
                this.duration = this.audio.duration;
            };

            this.audio.ontimeupdate = () => {
                this.position = this.audio.currentTime;

                this.emit('playing');
            };

            this.audio.onended = () => {
                this.position = 0;

                this.state(MusicFile.States.Stopped);

                this.emit('end');
            };

            this.audio.src = this.url;
        });

        return this.loading;
    }

    async play() {
        debugger;
        await this.load();

        this.audio.play();
        this.state(MusicFile.States.Playing);

        this.emit('play');
    }

    async toggle(stop = false) {
        if (this.state() === MusicFile.States.Playing) {
            stop ? this.stop() : this.pause();
        } else {
            await this.play();
        }
    }

    pause() {
        if (this.state() === MusicFile.States.Playing) {
            this.audio.pause();
            this.state(MusicFile.States.Paused);
        }
    }

    stop() {
        if (this.state() === MusicFile.States.Playing) {
            this.audio.pause();
        }

        this.seek(0);

        this.state(MusicFile.States.Stopped);

        this.emit('stop');
    }

    seek(position) {
        this.audio.currentTime = position;
        this.position = position;
        this.emit('playing');
    }

    state(val) {
        if (typeof val !== 'undefined') {
            this._state = val;
            this.emit('stateChange');
        } else {
            return this._state;
        }
    }

    _getTimeString(secs) {
        let minutes = Math.floor(secs / 60);
        let seconds = Math.floor(secs - (minutes * 60));
        let milliseconds = Math.floor((secs - Math.floor(secs)) * 1000);

        return minutes.pad(2) + ":" + seconds.pad(2) + '.' + milliseconds.pad(3);
    }

    getTimeString(secs) {
        return this._getTimeString(this.position) + " / " + this._getTimeString(this.duration);
    }


    isPlaying() {
        return this.state() === MusicFile.States.Playing;
    }
    isStopped() {
        return this.state() === MusicFile.States.Stopped || this.state() === MusicFile.States.Unloaded;
    }
    isLoading() {
        return this.state() === MusicFile.States.Loading;
    }
}

MusicFile.States = {Stopped: 1, Playing: 2, Paused: 3, Loading: 4, Unloaded: 5};


export default MusicFile;