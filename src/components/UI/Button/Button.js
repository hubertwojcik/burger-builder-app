import React from "react";
import classes from "./Button.css";

const Button = (props) => {
	return (
		<button
			disabled={props.disabled}
			className={[classes.Button, classes[props.btnType]].join(" ")}
			// className={classes.Button}
			onClick={props.clicked}
		>
			{props.children}
		</button>
	);
};

export default Button;
