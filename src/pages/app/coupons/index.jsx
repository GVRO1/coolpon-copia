import axios from "axios";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { Badge, BadgeVariant } from "src/components/Badge";
import { Button } from "src/components/Button";
import { Layout } from "src/components/Layout";
import { Table } from "src/components/Table";
import { BusinessContainer } from "src/BusinessContainer";

const Page = () => {
	const router = useRouter();
	const [body, setBody] = useState([]);

	const business = BusinessContainer.useContainer();

	useEffect(() => {
		const fetchTableData = async () => {
			try {
				// TODO: Incluir última visita.
				const { data: tableData } = await axios(
					`http://localhost:8080/promotions/business/${business.getCookie()?.id}`
				);
				const body = tableData.reduce(
					(body, { id, description, startDate, expirationDate, active }) => [
						...body,
						{
							id,
							description,
							startDate: startDate ? dayjs(startDate).format("DD/MM/YYYY") : "--",
							expirationDate: expirationDate ? dayjs(expirationDate).format("DD/MM/YYYY") : "--",
							active: (
								<Badge variant={active ? BadgeVariant.BLUE : BadgeVariant.RED}>{active ? "Ativo" : "Inativo"}</Badge>
							),
						},
					],
					[]
				);

				setBody(body);
			} catch (e) {
				if (e.request?.status === 400) {
					router.push("/");
				} else {
					console.error(e);
					alert("Algo deu errado. Por favor, tente novamente.");
				}
			}
		};

		fetchTableData();
	}, []);

	return (
		<Layout
			description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent porta maximus lacus."
			heading="Cupons"
			imageName="starred-ticket"
		>
			<div className="space-y-4">
				<Button className="mx-auto" onClick={() => router.push("/app/coupons/new")}>
					Novo cupom
				</Button>
				<Table
					head={["ID", "Descrição", "Data de criação", "Data de expiração", "Status"]}
					body={body}
					onRowClick={({ id }) => router.push(`/app/coupons/${id}`)}
				/>
			</div>
		</Layout>
	);
};

export default Page;
