import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

import { Button } from "src/components/Button";
import { Checkbox } from "src/components/Checkbox";
import { Input } from "src/components/Input";

export const CouponForm = ({ defaultValues = { active: true }, isNew, onSubmit: submit }) => {
	const router = useRouter();
	const { handleSubmit, register } = useForm({
		defaultValues,
	});

	return (
		<form className="w-full max-w-xs mx-auto space-y-4" onSubmit={handleSubmit(submit)}>
			<Input ref={register({ required: true })} label="Descrição" name="description" />
			<Input ref={register({ required: true })} inputMode="numeric" label="Desconto" name="discount" />
			<Input ref={register()} label="Data de criação" name="startDate" type="date" />
			<Input ref={register()} label="Data de expiração" name="expirationDate" type="date" />
			<Checkbox ref={register()} label="Ativo" name="active" />
			<Button isExpanded>{isNew ? "Criar cupom" : "Salvar alterações"}</Button>
			{!isNew && (
				<Button
					isExpanded
					isSecondary
					onClick={() => {
						if (confirm("Você quer mesmo excluir este cupom?")) {
							alert("Cupom excluído.");
							router.push("/app/coupons");
						}
					}}
				>
					Excluir cupom
				</Button>
			)}
		</form>
	);
};
