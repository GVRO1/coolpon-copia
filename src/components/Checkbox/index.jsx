import { useId } from "@reach/auto-id";
import clsx from "clsx";
import { forwardRef } from "react";

import css from "src/components/Checkbox/Checkbox.module.css";

export const Checkbox = forwardRef(({ id, className, label, ...otherProps }, ref) => {
	const inputId = useId(id);

	return (
		<div className={css.container}>
			<input {...otherProps} id={inputId} ref={ref} className={clsx(className, css.checkbox)} type="checkbox" />
			<label className={css.label} htmlFor={inputId}>
				{label}
			</label>
		</div>
	);
});
