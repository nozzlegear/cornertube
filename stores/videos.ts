import inspect from "logspect";
import { Video } from "youtube";
import { autorun, observable, action } from "mobx";

export class VideoStore {
    constructor() {
    }

    @observable videos: Video[] = [];

    @action addVideos(videos: Video[]) {
        this.videos.push(...videos);
    }
}

const store = new VideoStore();

export default store;