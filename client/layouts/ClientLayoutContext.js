import React from 'react';

export const AccountContextComponent = React.createContext({ AccountContext: {}, setAccountContext: () => {} });
// export const AccountContextComponent = React.createContext();   

export const AccountContextHOF = (Component) => {

    return (props) => {

        return (
            <AccountContextComponent.Consumer>
                {AccountContext => <Component {...props} AccountContext={AccountContext}/>}
            </AccountContextComponent.Consumer>
        )
    }
}
// export const SettingsContextComponent= React.createContext(undefined);