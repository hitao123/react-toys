import React from "react";
import {Button} from 'react-bootstrap';
import {ThemeContext} from './theme-context';


export default class ThemedButton extends React.Component {
    static contextType = ThemeContext;

    render() {
        let props = this.props;
        let theme = this.context;
        return (
          <Button
            {...props}
            style={{backgroundColor: theme.background}}
          />
        );
    }
};
