import React from "react";

import classes from "./NavigationItems.css";
import NavigationItem from "./navigationItem/NavigationItem";

const NavigationItems = (props) => {
	return (
		<ul className={classes.NavigationItems}>
			<NavigationItem link="/" exact>
				Burger Builder
			</NavigationItem>
			{props.isAuthenticated ? (
				<NavigationItem link="/Orders" exact>
					Orders
				</NavigationItem>
			) : null}
			{props.isAuthenticated ? (
				<NavigationItem link="/logout" exact>
					Logout
				</NavigationItem>
			) : (
				<NavigationItem link="/auth"> Authenticate </NavigationItem>
			)}
		</ul>
	);
};

export default NavigationItems;
