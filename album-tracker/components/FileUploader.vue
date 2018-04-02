<template>
    <div class="file-upload btn btn-block btn-primary">
        <input :id="id" type="file" ref="input" multiple @change="onInputChange">
        <label :for="id" ref="label" :class="{over: isOver}"
               @dragenter.stop.prevent="labelDragEnter"
               @dragleave.stop.prevent="labelDragLeave"
               @dragover.stop.prevent="labelDragOver"
               @drop.stop.prevent="labelDrop">
            <span class="icon" :class="icon"></span>
            {{label}}
        </label>
        &nbsp;
    </div>
</template>
<style>
    .file-upload {
        position: relative;
    }

    .file-upload label {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        top: 0;
        line-height: 2em;
        cursor: pointer;
        color: #eee;
        text-align: center;
        transition: all .3s;
        margin-bottom: 0;
        font-weight: inherit;
    }

    .file-upload label.over, .file-upload label:hover {
        color: #fff;
        box-shadow: 0 0 0 0.3rem rgba(0,123,255,.5);
    }


    .file-upload label .icon {
        transform: translateY(0px) scale(1);
        transition: transform 1s;
    }
    .file-upload label.over .icon, .file-upload label:hover .icon {
        animation: bounce .3s infinite alternate;
        animation-timing-function: ease-out;
    }

    @keyframes bounce {
        from {
            transform: translateY(0px) scale(1);
        }
        to {
            transform: translateY(-8px) scale(1.1);
        }
    }

    .file-upload input[type="file"] {
        width: 1px;
        height: 1px;
        opacity: 0;
        overflow: hidden;
        position: absolute;
        z-index: -1;
        left: 0;
        top: 0;
    }
</style>
<script>
    import {Emitter} from 'Shared/base/General';

    class FileUpload extends Emitter {
        constructor(file, url) {
            super();

            this.file = file;

            this.progress = 0;
            this.completed = false;
            this.response = null;
            this.imageData = null;

            this.xhr = new XMLHttpRequest();
            this.xhr.withCredentials = true;
            this.xhr.open("post", url, true);

            // this.xhr.setRequestHeader("Content-Type", "multipart/form-data");
            // this.xhr.setRequestHeader("X-File-Name", this.file.name);
            // this.xhr.setRequestHeader("X-File-Size", this.file.size);
            // this.xhr.setRequestHeader("X-File-Type", this.file.type);

            this.xhr.upload.addEventListener("progress", (evt) => {
                if (evt.lengthComputable) {
                    this.progress = (evt.loaded / evt.total);
                    this.emit('progress');
                }
            }, false);

            this.xhr.addEventListener("load", () => {
                this.progress = 100;
                this.completed = true;
                this.response = this.xhr.response;

                try {
                    this.response = JSON.parse(this.response);
                } catch (e) {}

                this.emit('complete');
            }, false);
        }

        isImage() {
            return (/image/i).test(this.file.type);
        }

        fetchImageData() {
            if (typeof FileReader !== "undefined" && this.isImage()) {
                let reader = new FileReader();

                let that = this;
                reader.onload = function (evt) {
                    that.imageData = evt.target.result;
                    that.emit('imageload');
                };
                reader.readAsDataURL(this.file);
            }
        }

        upload() {
            let fd = new FormData();
            fd.append("file", this.file);

            this.xhr.send(fd);
        }
    }

    export default {
        name: 'file-uploader',

        props: {
            url: {
                type: String
            },
            label: {
                type: String,
                default: 'Upload'
            },
            icon: {
                type: String,
                default: 'fa fa-upload'
            }
        },
        data: function () {
            return {
                id: 0,
                uploads: [],
                isOver: false
            }
        },
        computed: {},
        methods: {
            acquireFiles: function (files) {
                if (typeof files !== "undefined") {
                    for (let i = 0, l = files.length; i < l; i++) {
                        this.uploadFile(files[i]);
                    }
                } else {
                    console.log("No support for the File API in this web browser");
                }
            },
            uploadFile: function (file) {

                let fileUpload = new FileUpload(file, this.url);
                this.uploads.push(fileUpload);

                this.$emit('upload-start', fileUpload);

                fileUpload.on('complete', () => {
                    this.$emit('upload-finish', fileUpload);
                });

                fileUpload.upload();
            },

            onInputChange(e) {
                this.acquireFiles(this.$refs.input.files);
            },
            labelDragEnter(e) {
                this.isOver = true;
            },
            labelDragLeave(e) {
                this.isOver = false;
            },
            labelDragOver(e) {},
            labelDrop(e) {
                this.isOver = false;
                this.acquireFiles(e.dataTransfer.files);
            },
        },
        mounted: function () {
            this.id = (new Emitter()).GetUId();
        },
        template: ""
    }
</script>
