import {Emitter} from "../base/General";

/**
 * @name SoundFile
 * @property {string} url
 *
 * @extends Emitter
 */
class SoundFile extends Emitter {

    constructor(url) {
        super();

        this.url = url;

        this.buffer = null;
        this.loaded = false;
        this.loading = false;
    }

    load() {
        return new Promise((resolve, reject) => {
            if (this.loading || this.loaded) {
                resolve();
                return;
            }

            const context = SoundFile.acquireContext();

            this.loading = true;

            let request = new XMLHttpRequest();
            request.open('GET', this.url, true);
            request.responseType = 'arraybuffer';

            // Decode asynchronously
            request.onload = () => {
                context.decodeAudioData(request.response, (buffer) => {
                    this.buffer = buffer;
                    this.loaded = true;

                    resolve();

                    this.emit('load');
                });
            };

            request.send();
        });
    }

    async play() {
        if (!this.loaded) {
            await this.load();
        }

        const context = SoundFile.acquireContext();

        const source = context.createBufferSource();
        source.buffer = this.buffer;
        source.connect(context.destination);
        source.start(0);

        SoundFile.Nodes.add(source);

        return this;
    }

    static acquireContext() {
        if (!window) return null;

        if (!this.globalContext) {
            window.AudioContext = window.AudioContext || window.webkitAudioContext;
            this.globalContext = new AudioContext();
        }

        return this.globalContext;
    }
}

SoundFile.Nodes = {
    nodesPlaying: [],
    add: function (node) {
        this.nodesPlaying.push(node);

        node.onended = () => {
            this.nodesPlaying.remove(node);
        }
    },
    clear: function () {
        for (let node of this.nodesPlaying) {
            node.stop();
        }
        this.nodesPlaying = [];
    }
};

export default SoundFile;