import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { Button } from "src/components/Button";
import { Input } from "src/components/Input";
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
				const { data: tableData } = await axios(
					`http://localhost:8080/historical/business/${business.getCookie()?.id}`
				);
				// TODO: Incluir última visita e valor pago.
				const body = tableData.reduce(
					(body, { promotionHasUser: item }) => [
						...body,
						{ id: item.user.id, phone: item.user.phone, name: item.user.fullName },
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
			heading="Histórico"
			imageName="clock"
		>
			<div className="space-y-4">
				<form
					className="grid gap-4 md:grid-cols-3"
					onSubmit={(e) => {
						e.preventDefault();
					}}
				>
					<Input label="Telefone celular" />
					<Input label="Nome completo" />
					{/* <Input label="Data inicial" /> */}
					{/* <Input label="Data final" /> */}
					<Button>Filtrar histórico</Button>
				</form>
				<Table
					// head={["ID", "Telefone celular", "Nome completo", "Última visita", "Valor pago"]}
					head={["ID", "Telefone celular", "Nome completo"]}
					body={body}
					onRowClick={({ id }) => router.push(`/app/users/${id}`)}
				/>
			</div>
		</Layout>
	);
};

export default Page;
