import clsx from "clsx";
import Link from "next/link";

import { Icon } from "src/components/Icon";

import css from "src/components/SidebarOption/SidebarOption.module.css";

export const SidebarOption = ({ className: customClassName, href, iconName, isActive, title, ...otherProps }) => {
	const className = clsx(customClassName, css.container, isActive && css.isActive);

	return href ? (
		<Link href={href}>
			<a className={className} {...otherProps}>
				<Icon name={iconName} className={css.icon} />
				<span className={css.title}>{title}</span>
			</a>
		</Link>
	) : (
		<button className={className} {...otherProps}>
			<Icon name={iconName} className={css.icon} />
			<span className={css.title}>{title}</span>
		</button>
	);
};
