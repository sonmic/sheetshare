import React from 'react';
import { Link } from 'react-router-dom';
import SignOutButton from '../SignOut';
import { AuthUserContext } from '../Session';


import * as ROUTES from '../../constants/routes';

const Navigation = ()  => (
<div>
<AuthUserContext.Consumer>
{ authUser => 
authUser ? <NavigationAuth /> : <NavigationNonAuth />
}
</AuthUserContext.Consumer>
</div>
);




const NavigationAuth = () => (

    <nav className="navbar sticky-top navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="#">Sheet Share</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
                <Link className="nav-item nave-link" to={ROUTES.LANDING}>Landing |</Link>
                <Link className="nav-item nave-link" to={ROUTES.HOME}>Home |</Link>
                <Link className="nav-item nave-link" to={ROUTES.ACCOUNT}>Account</Link>
                <SignOutButton />

            </div>
        </div>
    </nav>
   
);

const NavigationNonAuth = () => (

    <nav className="navbar sticky-top navbar-expand-lg navbar-light bg-light">
    <a className="navbar-brand" href="#">Sheet Share</a>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav">
            <Link className="nav-item nave-link" to={ROUTES.LANDING}>Landing |</Link>
            <Link className="nav-item nave-link" to={ROUTES.SIGN_IN}>Sign In </Link>
        </div>
    </div>
</nav>
    
);


{/* <li>
                <Link to={ROUTES.ADMIN}>Admin</Link>
            </li> */}

export default Navigation;