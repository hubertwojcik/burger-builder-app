import React, { useState } from "react";
import { connect } from "react-redux";
import Aux from "../../hoc/Auxs";
import classes from "./Layout.css";
import Toolbar from "../../components/navigation/toolbar/Toolbar";
import SideDrawer from "../../components/navigation/sidedrawer/SideDrawer";

const layout = (props) => {
	const [sideDrawerIsVisible, setSideDrawerIsVisible] = useState(false);

	const sideDrawerClosedHandler = () => {
		setSideDrawerIsVisible(false);
	};

	const sideDrawerToggleHandler = () => {
		setSideDrawerIsVisible(!sideDrawerIsVisible);
	};

	return (
		<Aux>
			<Toolbar
				isAuth={props.isAuthenticated}
				showDrawer={sideDrawerToggleHandler}
			/>
			<SideDrawer
				isAuth={props.isAuthenticated}
				closed={sideDrawerClosedHandler}
				open={sideDrawerIsVisible}
			/>
			<main className={classes.Content}>{props.children}</main>
		</Aux>
	);
};

const mapStateToProps = (state) => {
	return {
		isAuthenticated: state.auth.token !== null,
	};
};

export default connect(mapStateToProps)(layout);
