import { useRouter } from "next/router";

import { CouponForm } from "src/components/CouponForm";
import { Layout } from "src/components/Layout";

const Page = () => {
	const router = useRouter();

	return (
		<Layout
			description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent porta maximus lacus."
			heading="Criação de cupom"
			imageName="gift-card"
		>
			<CouponForm isNew onSubmit={() => router.push("/coupons")} />
		</Layout>
	);
};

export default Page;
