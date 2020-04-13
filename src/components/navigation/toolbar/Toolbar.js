import React from "react";
import classes from "./Toolbar.css";
import Logo from "../../logo/Logo";
import NavigationItems from "../navigationItems/NavigationItems";
import DrawerToggle from "../sidedrawer/drawerToggle/DrawerToggle";

const Toolbar = (props) => {
	return (
		<header className={classes.Toolbar}>
			<DrawerToggle clicked={props.showDrawer} />
			<div className={classes.Logo}>
				<Logo />
			</div>
			<nav className={classes.DesktopOnly}>
				<NavigationItems isAuthenticated={props.isAuth} />
			</nav>
		</header>
	);
};

export default Toolbar;
