import clsx from "clsx";

import css from "src/components/Badge/Badge.module.css";

export const BadgeVariant = {
	BLUE: "BLUE",
	GREEN: "GREEN",
	YELLOW: "YELLOW",
	RED: "RED",
};

const getVariantClassName = (variant) => {
	switch (variant) {
		case BadgeVariant.BLUE:
			return css.badgeBlue;
		case BadgeVariant.GREEN:
			return css.badgeGreen;
		case BadgeVariant.YELLOW:
			return css.badgeYellow;
		case BadgeVariant.RED:
			return css.badgeRed;
	}
};

export const Badge = ({ children, variant = BadgeVariant.BLUE }) => {
	return <span className={clsx(css.badge, getVariantClassName(variant))}>{children}</span>;
};
