import Cookies from "js-cookie";
import { createContainer } from "unstated-next";

const useBusiness = () => {
	const getCookie = () => {
		const cookie = JSON.parse(Cookies.get("coolpon"));

		return cookie;
	};

	const removeCookie = () => {
		Cookies.remove("coolpon");
	};

	const setCookie = (businessData) => {
		Cookies.set("coolpon", businessData);
	};

	return { getCookie, removeCookie, setCookie };
};

export const BusinessContainer = createContainer(useBusiness);
