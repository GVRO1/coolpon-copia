import clsx from "clsx";

import { Icon } from "src/components/Icon";

import css from "src/components/Button/Button.module.css";

export const Button = ({ children, className, iconName, isExpanded, isSecondary, ...otherProps }) => {
	const buttonClassName = clsx(
		className,
		css.button,
		isExpanded && "w-full",
		isSecondary ? css.buttonSecondary : css.buttonPrimary
	);

	return (
		<button {...otherProps} className={buttonClassName}>
			<span>{children}</span>
			{iconName && <Icon name={iconName} />}
		</button>
	);
};
