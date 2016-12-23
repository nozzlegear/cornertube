import Router from "./router";
import * as React from 'react';
import { Video } from "youtube";
import getLength = require("youtube-duration-format");
import PlayIcon from "material-ui/svg-icons/av/play-arrow";
import { Card, CardMedia, CardTitle, CardHeader, Avatar } from "material-ui";

export interface IProps extends React.Props<any> {
    video: Video;
}

export interface IState {

}

export default class Thumbnail extends Router<IProps, IState> {
    constructor(props: IProps, context) {
        super(props, context);

        this.configureState(props, false);
    }

    public state: IState;

    //#region Utility functions

    private configureState(props: IProps, useSetState: boolean) {
        let state: IState = {}

        if (!useSetState) {
            this.state = state;

            return;
        }

        this.setState(state);
    }

    //#endregion

    private navigateToVideo(event: React.MouseEvent<any>) {
        event.preventDefault();

        const {id} = this.props.video;

        this.context.router.push(`/watch/${id}`);
    }

    public componentDidMount() {

    }

    public componentDidUpdate() {

    }

    public componentWillReceiveProps(props: IProps) {
        this.configureState(props, true);
    }

    public render() {
        const { snippet, contentDetails } = this.props.video;
        const { channelTitle, thumbnails, title, description, publishedAt } = snippet;
        const { duration } = contentDetails;
        const avatar = <Avatar icon={<PlayIcon />} />;
        const date = new Date(publishedAt);

        const subtitle = (
            <div className={"spread-children"}>
                <span>{getLength(duration)}</span>
                <span>{`${date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })} ${date.toLocaleTimeString()}`}</span>
            </div>
        )

        return (
            <div onClick={e => this.navigateToVideo(e)}>
                <Card className="thumbnail">
                    <CardMedia overlay={<CardTitle subtitle={subtitle} />}>
                        <img className="img-responsive" alt={`${channelTitle} – ${title}`} src={thumbnails.standard.url} />
                    </CardMedia>
                    <CardHeader avatar={avatar} title={title} subtitle={channelTitle} />
                </Card>
            </div>
        );
    }
}