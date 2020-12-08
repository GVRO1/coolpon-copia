import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { CouponForm } from "src/components/CouponForm";
import { Layout } from "src/components/Layout";

const Page = () => {
	const router = useRouter();
	const [defaultValues, setDefaultValues] = useState();
	const [promotion, setPromotion] = useState();

	useEffect(() => {
		const fetchDefaultValues = async () => {
			try {
				const { data: promotion } = await axios(`http://localhost:8080/promotions/${router.query.id}`);
				const { active, description, expirationDate, startDate, reward } = promotion;

				setPromotion(promotion);
				setDefaultValues({
					active,
					description,
					expirationDate: expirationDate ? expirationDate.split("T")[0] : "",
					startDate: startDate ? startDate.split("T")[0] : "",
					discount: reward.discount,
				});
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
			heading="Edição de cupom"
			imageName="gift-card"
		>
			<CouponForm
				defaultValues={defaultValues}
				onSubmit={async (formData) => {
					const { discount, startDate, expirationDate, ...rest } = formData;

					try {
						await axios.put(`http://localhost:8080/promotions/${router.query.id}`, {
							...rest,
							id: promotion.id,
							startDate: startDate ? startDate + "T02:00:00.000+0000" : undefined,
							expirationDate: expirationDate ? expirationDate + "T02:00:00.000+0000" : undefined,
							reward: {
								...promotion.reward,
								discount: formData.discount,
							},
						});

						alert("Cupom atualizado com sucesso.");
						router.push("/app/coupons");
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
