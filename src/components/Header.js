import React from 'react';
import { Segment } from 'semantic-ui-react';
import logo from '../logo.svg';
import '../App.css';


const Header = () => (
        <Segment color='blue'>
            <div className="App-intro">Application for customer support agents to search for blogs and delete notes</div>
            <img src={logo} className="App-logo" alt="logo" />
        </Segment>
)

export default Header