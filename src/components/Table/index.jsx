import css from "src/components/Table/Table.module.css";

export const Table = ({ head, body, onRowClick: handleRowClick = () => {} }) => {
	return (
		<table className={css.table}>
			<thead>
				<tr className={css.headRow}>
					{head.map((header) => {
						return (
							<th key={header} className={css.head}>
								{header}
							</th>
						);
					})}
				</tr>
			</thead>
			<tbody>
				{body.map((data, i) => {
					return (
						<tr key={i} className={css.bodyRow} onClick={() => handleRowClick(data)}>
							{Object.keys(data).map((key) => {
								return (
									<td key={key} className={css.data}>
										{data[key]}
									</td>
								);
							})}
						</tr>
					);
				})}
			</tbody>
		</table>
	);
};
