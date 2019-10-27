import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { Link } from "react-router-dom";
import Divider from "@material-ui/core/Divider";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { googleLogin, getUser, logout } from "../actions/userAction";

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  searchIcon: {
    width: theme.spacing(7),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit"
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: 200
    }
  }
}));

function PrimarySearchAppBar({ history, googleLogin, user, logout }) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <Divider />
      <MenuItem
        onClick={() => {
          handleMenuClose();
          logout();
        }}
      >
        Log out
      </MenuItem>
    </Menu>
  );
  const getGreeting = () => {
    const { displayName } = user;
    return displayName ? `Hi, ${user.displayName}!` : "Hi!";
  };

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" noWrap>
            <Link to="/">
              <div className="logoLeft logotxt">SHEET</div>
              <img className="logo" src={require("./images/musicicon03.png")} />
              <div className="logoRight logotxt">SHARE</div>
            </Link>
          </Typography>

          <div className={classes.grow} />
          <BottomNavigationAction
            label="Search"
            icon={<SearchIcon />}
            showLabel
            onClick={() => history.push("/search")}
          />
          {console.log("User:", user)}
          <BottomNavigationAction
            label={user ? getGreeting() : "Login"}
            icon={<AccountCircle />}
            showLabel
            aria-controls={menuId}
            aria-haspopup="true"
            onClick={user ? handleProfileMenuOpen : googleLogin}
          />
        </Toolbar>
      </AppBar>
      {renderMenu}
    </div>
  );
}

function mapStateToProps(state, ownProps) {
  return {
    user: state.user
  };
}

export default connect(
  mapStateToProps,
  { googleLogin, getUser, logout }
)(withRouter(PrimarySearchAppBar));
