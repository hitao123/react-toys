import React from 'react';
import {Button} from 'react-bootstrap';
import { ThemeContext } from "./theme-context";

function ThemeTogglerButton() {
    // The Theme Toggler Button receives not only the theme
    // but also a toggleTheme function from the context
    // 使用 consumer 包裹起来，这里就可以获取到 context 的内容
    return (
        <ThemeContext.Consumer>
            {
                ({ theme, toggleTheme }) => (
                    <Button
                        onClick={toggleTheme}
                        style={{ backgroundColor: theme.background }}
                    >
                        Toggle Theme
                    </Button>
                )
            }
        </ThemeContext.Consumer>
    );
}

export default ThemeTogglerButton;
