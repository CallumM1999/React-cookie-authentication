import React from 'react';
import Header from './header';

const Layout = props => (
    <div>
        <Header auth={props.auth}/>

        {props.children}
    
        <style jsx global>{`
            
            body {
                margin: 0;
                padding: 0;
                box-sixing: border-box;
            }

        `}</style>
    </div>
)

export default Layout;