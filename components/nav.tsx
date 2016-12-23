import * as React from "react";
import { Link } from "react-router";
import Paths from "../modules/paths";
import { APP_NAME } from "../modules/constants";
import {
    AppBar,
    Drawer,
    MenuItem,
    Divider,
} from "material-ui";

export interface IProps {

}

export interface IState {
    drawerOpen?: boolean;
}

export default class Nav extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

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
        const props = this.props;

        return (
            <div>
                <AppBar title={APP_NAME} onLeftIconButtonTouchTap={e => this.setState({ drawerOpen: true })} />
                <Drawer open={this.state.drawerOpen} docked={false} disableSwipeToOpen={true} onRequestChange={open => this.setState({ drawerOpen: open })}>
                    <AppBar onLeftIconButtonTouchTap={e => this.setState({ drawerOpen: false })} title={APP_NAME} />
                    <MenuItem
                        {...{ containerElement: <Link to={Paths.home.index} /> }}
                        primaryText="Recommended" />
                    <MenuItem
                        {...{ containerElement: <Link to={Paths.home.subscriptions} /> }}
                        primaryText="Subscriptions" />
                    <Divider />
                    <MenuItem
                        {...{ containerElement: <Link to={Paths.auth.login} /> }}
                        primaryText={"Sign in"} />
                </Drawer>
            </div>
        )
    }
}