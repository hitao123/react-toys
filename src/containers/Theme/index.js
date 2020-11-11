import React from "react";
// import ThemedButton from "./themed-button";
import ThemeTogglerButton from './theme-toggler-button';
import { ThemeContext, themes } from "./theme-context";

// function Toolbar(props) {
//     return (
//         <ThemedButton onClick={props.changeTheme}>Change Theme</ThemedButton>
//     );
// }

export default class contextApp extends React.Component {
    constructor(props) {
        super(props);

        this.toggleTheme = () => {
            this.setState(state => ({
                theme: state.theme === themes.dark ? themes.light : themes.dark
            }));
        };

        this.state = {
            theme: themes.light,
            toggleTheme: this.toggleTheme
        };
    }

    render() {
        return (
            <>
                <ThemeContext.Provider value={this.state}>
                    <ThemeTogglerButton />
                </ThemeContext.Provider>
            </>
        );
    }
}
