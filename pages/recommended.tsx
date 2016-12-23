import * as React from 'react';
import inspect from "logspect";
import { VideoListResponse } from "youtube";
import Router from "../components/router";
import { CircularProgress } from "material-ui";
import Thumbnail from "../components/thumbnail";
import { YouTube, ApiError } from "../modules/api";
import { YOUTUBE_API_KEY } from "../modules/constants";

export interface IProps extends React.Props<any> {

}

export interface IState {
    loading?: boolean;
    videos?: VideoListResponse;
}

export default class RecommendedPage extends Router<IProps, IState> {
    constructor(props: IProps, context) {
        super(props, context);

        this.configureState(props, false);
    }

    public state: IState;

    //#region Utility functions

    private configureState(props: IProps, useSetState: boolean) {
        let state: IState = {
            loading: true,
        }

        if (!useSetState) {
            this.state = state;

            return;
        }

        this.setState(state);
    }

    private async refresh() {
        const api = new YouTube(YOUTUBE_API_KEY);
        let result: VideoListResponse;

        try {
            result = await api.getMostPopular({ part: "snippet,contentDetails", chart: "mostpopular", maxResults: 20 });
        } catch (e) {
            const err: ApiError = e;

            alert(err.message);

            return;
        }

        this.setState({ loading: false, videos: result });
    }

    //#endregion

    public componentDidMount() {
        this.refresh();
    }

    public componentDidUpdate() {
        
    }

    public componentWillReceiveProps(props: IProps) {
        
    }

    public render() {
        const { loading, videos } = this.state;

        return (
            <section id="home" className="pure-g center-children">
                <div className="pure-u-22-24 pure-u-md-20-24">
                    <h3>{"Recommended Videos"}</h3>
                    {
                        loading ? 
                        <div className="text-center"><CircularProgress /></div> : 
                        videos.items.map(i => 
                            <div key={i.id} className="pure-u-1-1 pure-u-lg-12-24 pure-u-xl-8-24">
                                <Thumbnail video={i} />
                            </div>
                        )
                    }
                </div>
            </section>
        );
    }
}