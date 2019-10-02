import React from 'react';

import Footer from './Footer';
import Header from './Header';

export default class Layout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {name: "Will"};
    }
    render() { 
        return (
            <div>
                {this.state.name}
                <Header />
                <Footer />
            </div>
        );
    }
}
 
export default Layout;