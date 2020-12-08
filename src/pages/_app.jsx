import { BusinessContainer } from "src/BusinessContainer";

import "tailwind/index.css";

const CustomApp = ({ Component, pageProps }) => {
	return (
		<BusinessContainer.Provider>
			<Component {...pageProps} />;
		</BusinessContainer.Provider>
	);
};

export default CustomApp;
