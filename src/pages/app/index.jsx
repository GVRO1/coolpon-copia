import axios from "axios";
import confetti from "canvas-confetti";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "src/components/Button";
import { Checkbox } from "src/components/Checkbox";
import { Definition } from "src/components/Definition";
import { DefinitionList } from "src/components/DefinitionList";
import { Input } from "src/components/Input";
import { Layout } from "src/components/Layout";
import { UserForm } from "src/components/UserForm";

const Step = {
	SEARCH_USER: "SEARCH_USER",
	SCORE: "SCORE",
	SCORE_CONFIRMATION: "SCORE_CONFIRMATION",
	EDIT_USER: "EDIT_USER",
	EDIT_USER_CONFIRMATION: "EDIT_USER_CONFIRMATION",
};

const Page = () => {
	const searchUserFormMethods = useForm();
	const scoreFormMethods = useForm();

	const [heading, setHeading] = useState();
	const [imageName, setImageName] = useState();
	const [step, setStep] = useState(Step.SEARCH_USER);
	const [user, setUser] = useState();
	const [rewards, setRewards] = useState([]);

	const containerClassName = "w-full max-w-xs mx-auto space-y-4";

	const goTo = (nextStep) => {
		setStep(nextStep);
	};

	const reset = () => {
		setUser(undefined);
		setRewards([]);
		goTo(Step.SEARCH_USER);
	};

	useEffect(() => {
		switch (step) {
			case Step.SEARCH_USER:
				setHeading("Fidelizar cliente");
				setImageName("medal");
				break;
			case Step.SCORE:
				break;
			case Step.SCORE_CONFIRMATION:
				confetti();
				setHeading("Parabéns!");
				setImageName("confetti");
				break;
			case Step.EDIT_USER:
				setHeading("Perfil");
				setImageName("edit-user");
				break;
			case Step.EDIT_USER_CONFIRMATION:
				setHeading("Perfil atualizado");
				setImageName("good");
				break;
		}
	}, [step]);

	return (
		<Layout
			description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent porta maximus lacus."
			heading={heading}
			imageName={imageName}
		>
			{step === Step.SEARCH_USER && (
				<form
					className={containerClassName}
					onSubmit={searchUserFormMethods.handleSubmit(async ({ phone }) => {
						try {
							const { data: user } = await axios(`http://localhost:8080/users/phone/${phone}`);
							const { data: rewards } = await axios(`http://localhost:8080/promotion-has-users/user/${user.id}`);

							setUser(user);
							setRewards(rewards);
							goTo(Step.SCORE);
						} catch (e) {
							if (e.request?.status === 404) {
								setUser({ fullName: "", cpf: "", phone, birthDate: "" });
								setRewards([]);
								goTo(Step.SCORE);
							} else {
								console.error(e);
								alert("Algo deu errado. Por favor, tente novamente.");
							}
						}
					})}
				>
					<Input
						ref={searchUserFormMethods.register({ required: true })}
						label="Telefone celular"
						name="phone"
						type="tel"
					/>
					<Button isExpanded>Buscar cliente</Button>
				</form>
			)}
			{step === Step.SCORE && (
				<form
					className={containerClassName}
					onSubmit={scoreFormMethods.handleSubmit((formData) => {
						console.log(formData);
						goTo(Step.SCORE_CONFIRMATION);
					})}
				>
					<DefinitionList>
						{user.cpf && <Definition description={user.cpf} term="CPF:" />}
						{user.phone && <Definition description={user.phone} term="Telefone celular:" />}
						{user.fullName && <Definition description={user.fullName} term="Nome completo:" />}
						{user.birthDate && (
							<Definition description={dayjs(user.birthDate).format("DD/MM/YYYY")} term="Data de aniversário:" />
						)}
					</DefinitionList>
					<Input ref={scoreFormMethods.register({ required: true })} label="Valor gasto" />
					<div className="space-y-2">
						{rewards.map(({ promotion }) => (
							<Checkbox
								key={promotion.description}
								ref={scoreFormMethods.register()}
								label={`R$${promotion.reward.discount + ""} OFF`}
								name={`reward-${promotion.reward.id}`}
							/>
						))}
					</div>
					<Button isExpanded>Fidelizar cliente</Button>
					<Button isExpanded isSecondary type="button" onClick={reset}>
						Retornar ao início
					</Button>
				</form>
			)}
			{step === Step.SCORE_CONFIRMATION && (
				<div className={containerClassName}>
					<Button
						isExpanded
						onClick={() => {
							goTo(Step.EDIT_USER);
						}}
					>
						Atualizar perfil
					</Button>
					<Button isExpanded isSecondary onClick={reset}>
						Retornar ao início
					</Button>
				</div>
			)}
			{step === Step.EDIT_USER && (
				<UserForm
					reset={reset}
					onSubmit={(e) => {
						async (formData) => {
							const { birthDate } = formData;

							try {
								await axios.put(`http://localhost:8080/users/update/${user?.id}`, {
									...formData,
									birthDate: birthDate ? birthDate + "T02:00:00.000+0000" : undefined,
								});

								goTo(Step.EDIT_USER_CONFIRMATION, e);
							} catch (e) {
								console.error(e);
								alert("Algo deu errado. Por favor, tente novamente.");
							}
						};
					}}
				/>
			)}
			{step === Step.EDIT_USER_CONFIRMATION && (
				<div className={containerClassName}>
					<Button isExpanded onClick={reset}>
						Retornar ao início
					</Button>
				</div>
			)}
		</Layout>
	);
};

export default Page;
