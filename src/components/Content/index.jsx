import { Image } from "src/components/Image";

import css from "src/components/Content/Content.module.css";

export const Content = ({ children, description, heading, imageName }) => {
	return (
		<div className={css.container}>
			<header className={css.header}>
				{imageName && <Image className={css.image} name={imageName} />}
				<h1 className={css.heading}>{heading}</h1>
				<p className={css.description}>{description}</p>
			</header>
			<main className={css.content}>{children}</main>
		</div>
	);
};
