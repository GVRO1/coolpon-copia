import { useForm } from "react-hook-form";

import { Button } from "src/components/Button";
import { Input } from "src/components/Input";

export const UserForm = ({ defaultValues = {}, reset, onSubmit: submit }) => {
	const { handleSubmit, register } = useForm({
		defaultValues,
	});

	return (
		<form className="w-full max-w-xs mx-auto space-y-4" onSubmit={handleSubmit(submit)}>
			<Input ref={register()} inputMode="numeric" label="CPF" name="cpf" />
			<Input ref={register({ required: true })} label="Telefone celular" name="phone" type="tel" />
			<Input ref={register()} label="Nome completo" name="fullName" />
			<Input ref={register()} label="Data de aniversário" name="birthDate" type="date" />
			<Button isExpanded>Atualizar perfil</Button>
			{reset && (
				<Button isExpanded isSecondary type="button" onClick={reset}>
					Retornar ao início
				</Button>
			)}
		</form>
	);
};
