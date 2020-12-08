import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "src/components/Button";
import { Content } from "src/components/Content";
import { Input } from "src/components/Input";
import { BusinessContainer } from "src/BusinessContainer";

const Step = {
	REGISTER: "REGISTER",
	SIGN_IN: "SIGN_IN",
};

const Page = () => {
	const { handleSubmit, register } = useForm();
	const router = useRouter();
	const [heading, setHeading] = useState();
	const [imageName, setImageName] = useState();
	const [step, setStep] = useState(Step.SIGN_IN);

	const business = BusinessContainer.useContainer();

	useEffect(() => {
		switch (step) {
			case Step.REGISTER:
				setHeading("Cadastro");
				setImageName("paper-plane");
				break;
			case Step.SIGN_IN:
				setHeading("Bem-vindo");
				setImageName("new-post");
				break;
		}
	}, [step]);

	const submit = async (formData) => {
		switch (step) {
			case Step.REGISTER:
				try {
					const { data: businessData } = await axios.post("http://localhost:8080/businesses/register", formData);
					business.setData(businessData);
					router.push("/app");
				} catch (e) {
					if (e.request?.status === 422) {
						alert(
							"O e-mail informado já está cadastrado em nossa base. Por favor, tente outro ou acesse a plataforma."
						);
					} else {
						console.error(e);
						alert("Algo deu errado. Por favor, tente novamente.");
					}
				}

				break;
			case Step.SIGN_IN:
				try {
					const { data: businessData } = await axios.post("http://localhost:8080/businesses/login", formData);
					business.setCookie(businessData);
					router.push("/app");
				} catch (e) {
					if (e.request?.status === 404) {
						alert("A combinação informada não existe em nossa base. Confira o e-mail e senha.");
					} else {
						console.error(e);
						alert("Algo deu errado. Por favor, tente novamente.");
					}
				}

				break;
		}
	};

	return (
		<Content
			description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent porta maximus lacus."
			heading={heading}
			imageName={imageName}
		>
			{step === Step.REGISTER && (
				<form className="w-full max-w-xs mx-auto space-y-4" onSubmit={handleSubmit(submit)}>
					<Input ref={register({ required: true })} label="Nome do negócio" name="name" />
					<Input ref={register({ required: true })} inputMode="numeric" label="CPF" name="cpf" />
					<Input ref={register({ required: true })} inputMode="numeric" label="CNPJ" name="cnpj" />
					<Input ref={register({ required: true })} label="Telefone" name="phone" type="tel" />
					<Input ref={register({ required: true })} label="Endereço de email" name="email" type="email" />
					<Input ref={register({ required: true })} label="Senha" name="password" type="password" />
					<Button isExpanded>Cadastrar</Button>
					<p className="mt-4 text-x1">
						Já é cadastrado?{" "}
						<span className="text-blue-600 cursor-pointer" onClick={() => setStep(Step.SIGN_IN)}>
							Clique aqui.
						</span>
					</p>
				</form>
			)}
			{step === Step.SIGN_IN && (
				<form className="w-full max-w-xs mx-auto space-y-4" onSubmit={handleSubmit(submit)}>
					<Input ref={register({ required: true })} label="Endereço de email" name="email" type="email" />
					<Input ref={register({ required: true })} label="Senha" name="password" type="password" />
					<Button isExpanded>Entrar</Button>
					<p className="mt-4 text-x1">
						Não tem cadastro?{" "}
						<span className="text-blue-600 cursor-pointer" onClick={() => setStep(Step.REGISTER)}>
							Registre-se aqui.
						</span>
					</p>
				</form>
			)}
		</Content>
	);
};

export default Page;
