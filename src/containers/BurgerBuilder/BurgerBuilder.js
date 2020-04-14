import React, { useState, useEffect, useCallback } from "react";
import Aux from "../../hoc/Auxs";
import { connect, useDispatch, useSelector } from "react-redux";
import Burger from "../../components/burger/Burger";
import BuildControls from "../../components/burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import axios from "../../axios-orders";
import * as actions from "../../store/actions/index";

const BurgerBuilder = (props) => {
	const [purchasing, setPurchasing] = useState(false);

	const dispatch = useDispatch();

	const ings = useSelector((state) => {
		return state.burgerBuilder.ingredients;
	});
	const price = useSelector((state) => state.burgerBuilder.totalPrice);
	const error = useSelector((state) => state.burgerBuilder.error);
	const isAuthenticated = useSelector((state) => state.auth.token !== null);

	const onIngredientAdded = (ingName) =>
		dispatch(actions.addIngredient(ingName));
	const onIngredientRemoved = (ingName) =>
		dispatch(actions.removeIngredient(ingName));
	const onInitIngriedients = useCallback(
		() => dispatch(actions.initIngredients()),
		[dispatch]
	);
	const onInitPurchase = () => dispatch(actions.purchaseInit());
	const onSetAuthRedirectPath = (path) =>
		dispatch(actions.setAuthRedirectPath(path));

	useEffect(() => {
		onInitIngriedients();
	}, [props]);

	const updatePurchaseState = (ingredients) => {
		const sum = Object.keys(ingredients)
			.map((igKey) => {
				return ingredients[igKey];
			})
			.reduce((sum, el) => {
				return sum + el;
			}, 0);
		return sum > 0;
	};

	const purchaseHandler = () => {
		if (isAuthenticated) {
			setPurchasing(true);
		} else {
			onSetAuthRedirectPath("checkout");
			props.history.push("/auth");
		}
	};

	const purchaseCancelHandler = () => {
		setPurchasing(false);
	};

	const purchaseContinueHandler = () => {
		onInitPurchase();
		props.history.push("/checkout");
	};

	const disabledInfo = {
		...ings,
	};
	for (let key in disabledInfo) {
		disabledInfo[key] = disabledInfo[key] <= 0;
	}

	let orderSummary = null;
	let burger = error ? <p>Ingrediengs can't be loaded</p> : <Spinner />;

	if (ings) {
		burger = (
			<Aux>
				<Burger ingredients={ings} />
				<BuildControls
					ingredientAdded={onIngredientAdded}
					ingredientRemoved={onIngredientRemoved}
					disabled={disabledInfo}
					purchasable={updatePurchaseState(ings)}
					ordered={purchaseHandler}
					price={price}
					isAuth={isAuthenticated}
				/>
			</Aux>
		);
		orderSummary = (
			<OrderSummary
				ingredients={ings}
				purchaseCanceled={purchaseCancelHandler}
				purchaseContinued={purchaseContinueHandler}
				price={price}
			/>
		);
	}

	return (
		<Aux>
			<Modal show={purchasing} modalClosed={purchaseCancelHandler}>
				{orderSummary}
			</Modal>
			{burger}
		</Aux>
	);
};

export default withErrorHandler(BurgerBuilder, axios);
