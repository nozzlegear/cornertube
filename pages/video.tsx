import * as React from 'react';
import Router from "../components/router";

export interface IProps extends React.Props<any> {
    
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
        return (
            <section id="video">
                <h3>{"Video page"}</h3>
            </section>
        );
    }
}