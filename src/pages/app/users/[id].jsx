import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { Layout } from "src/components/Layout";
import { UserForm } from "src/components/UserForm";

const Page = () => {
	const router = useRouter();
	const [defaultValues, setDefaultValues] = useState();

	useEffect(() => {
		const fetchDefaultValues = async () => {
			try {
				const { data: defaultValues } = await axios(`http://localhost:8080/users/${router.query.id}`);
				const { birthDate } = defaultValues;

				setDefaultValues({ ...defaultValues, birthDate: birthDate ? birthDate.split("T")[0] : "" });
			} catch (e) {
				if (e.request?.status === 400) {
					router.push("/");
				} else {
					console.error(e);
					alert("Algo deu errado. Por favor, tente novamente.");
				}
			}
		};

		fetchDefaultValues();
	}, []);

	return defaultValues ? (
		<Layout
			description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent porta maximus lacus."
			heading="Perfil"
			imageName="edit-user"
		>
			<UserForm
				defaultValues={defaultValues}
				onSubmit={async (formData) => {
					const { birthDate } = formData;

					try {
						await axios.put(`http://localhost:8080/users/update/${router.query.id}`, {
							...formData,
							birthDate: birthDate ? birthDate + "T02:00:00.000+0000" : undefined,
						});

						alert("Perfil atualizado com sucesso.");
						router.push("/app/users");
					} catch (e) {
						console.error(e);
						alert("Algo deu errado. Por favor, tente novamente.");
					}
				}}
			/>
		</Layout>
	) : null;
};

export default Page;
