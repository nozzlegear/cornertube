// Material-UI needs the react-tap-event-plugin activated
const injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();

// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
import inspect from "logspect";
import * as React from "react";
import * as DOM from "react-dom";
import Paths from "./modules/paths";
import { Provider } from "mobx-react";
import { APP_NAME } from "./modules/constants";
import { Router, Redirect, Link, Route, IndexRoute, hashHistory, RouterContext } from "react-router";

// Pages
import Navbar from "./components/nav";
import WatchVideoPage from "./pages/video";
import RecommendedPage from "./pages/recommended";

// Material UI
import * as colors from "material-ui/styles/colors";
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

export const theme = getMuiTheme(baseTheme, {
    appBar: {
        color: colors.red700,
    }
});

// Main app component
export default function Main(props) {
    return (
        <main id="app"> 
            <Navbar />
            {React.cloneElement(props.children, props)}
        </main>
    )
}

(function () {
    function checkAuthState(args: Router.RouterState, replace: Router.RedirectFunction, callback: Function) {
        inspect("TODO: Ensure the user has connected their YouTube account.");
    }

    const app = (
        <Provider>
            <MuiThemeProvider muiTheme={theme}>
                <Router history={hashHistory}>
                    <Route component={Main}>
                        <Route onEnter={checkAuthState}>
                        </Route>
                        <Route path={Paths.home.index} component={RecommendedPage} onEnter={args => document.title = `${APP_NAME} Recommended Videos`} />
                        <Route path={"/watch/:id"} component={WatchVideoPage} onEnter={args => document.title = `${APP_NAME} Watch Video`} />
                    </Route>
                </Router>
            </MuiThemeProvider>
        </Provider>
    )

    DOM.render(app, document.getElementById("contenthost"));
} ());