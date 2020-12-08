import { useId } from "@reach/auto-id";
import clsx from "clsx";
import { forwardRef } from "react";

import css from "src/components/Input/Input.module.css";

export const Input = forwardRef(({ id, errorMessage, label, ...otherProps }, ref) => {
	const inputId = useId(id);

	return (
		<div className={css.container}>
			<label className={css.label} htmlFor={inputId}>
				{label}
			</label>
			<input {...otherProps} id={inputId} ref={ref} className={clsx(css.input, errorMessage && css.inputError)} />
			{errorMessage && <p className={css.errorMessage}>{errorMessage}</p>}
		</div>
	);
});
