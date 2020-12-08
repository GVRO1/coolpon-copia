import clsx from "clsx";

export const Image = ({ className, name }) => {
	return <img alt="" className={clsx("w-40 h-40", className)} src={`/images/${name}.png`} />;
};
