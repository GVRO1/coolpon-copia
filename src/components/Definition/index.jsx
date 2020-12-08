import css from "src/components/Definition/Definition.module.css";

export const Definition = ({ description, term }) => {
	return (
		<div className={css.container}>
			<dt className={css.term}>{term}</dt>
			<dd className={css.description}>{description}</dd>
		</div>
	);
};
