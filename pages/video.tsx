import * as React from 'react';
import inspect from "logspect";
import Videos from "../stores/videos";
import Router from "../components/router";
import * as Player from "react-youtube-player";
import { CircularProgress } from "material-ui";
import BackIcon from "material-ui/svg-icons/navigation/arrow-back";

export interface IProps extends React.Props<any> {
    params: {
        id: string;
    }
}

export interface IState {
    
}

export default class VideoPage extends Router<IProps, IState> {
    constructor(props: IProps, context) {
        super(props, context);
        
        this.configureState(props, false);
    }
    
    public state: IState = {};
    
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
    
    public componentDidMount() {
        
    }
    
    public componentDidUpdate() {
        
    }
    
    public componentWillReceiveProps(props: IProps) {
        this.configureState(props, true);
    }
    
    public render() {
        const video = Videos.videos.find(v => v.id === this.props.params.id).snippet;

        return (
            <section id="video">
                <div className="auto-resizable-iframe">
                    <Player videoId={this.props.params.id} configuration={{showinfo: 0, iv_load_policy: 1, modestbranding: 1}} />
                </div>
                <h3>
                    <a href="#" onClick={e => this.context.router.goBack()}>
                        <BackIcon />
                    </a>
                    {video.title}
                </h3>                
            </section>
        );
    }
}