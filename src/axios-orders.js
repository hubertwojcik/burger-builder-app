import axios from "axios";

const instance = axios.create({
	baseURL: "https://burger-app-rct.firebaseio.com/",
});

export default instance;
