import clsx from "clsx";

const paths = {
	archive: "M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4",
	clock: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
	heart:
		"M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
	logout: "M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1",
	menu: "M4 6h16M4 12h16M4 18h16",
	search: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z",
	ticket:
		"M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z",
	users:
		"M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z",
	x: "M6 18L18 6M6 6l12 12",
};

export const Icon = ({ name, className }) => {
	const path = paths[name];

	return (
		<svg
			className={clsx("w-6 h-6", className)}
			fill="none"
			stroke="currentColor"
			viewBox="0 0 24 24"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path d={path} strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
		</svg>
	);
};
