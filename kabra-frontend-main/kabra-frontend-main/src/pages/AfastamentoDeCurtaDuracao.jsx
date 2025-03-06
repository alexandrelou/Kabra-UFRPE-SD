import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import { FaFilePdf } from "react-icons/fa";
import { FaFileWord } from "react-icons/fa";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import Table from "../components/Table";

const steps = ["1", "2", "3", "4"];

export default function HorizontalLinearStepper() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  const [dataPdf, setDataPdf] = useState(null);
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };
  const pdf = (dados) => {
    axios
      .post("http://localhost:8000/api/pdf_converter/", dados, {
        responseType: "arraybuffer",
      })
      .then((response) => {
        const file = new Blob([response.data], { type: "application/pdf" });
        const fileURL = URL.createObjectURL(file);
        setDataPdf(fileURL);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const word = (dados) => {
    axios
      .post("http://localhost:8000/api/word_converter/", dados, {
        responseType: "blob",
      })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "processo.zip");
        document.body.appendChild(link);
        link.click();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const onSubmit = (data, tipo) => {
    const dados = {
      lista: [
        ["ufrpe", "afastamento_curta", "requerimento"],
        ["ufrpe", "afastamento_curta", "termo"],
        ["ufrpe", "afastamento_curta", "remanejamento"],
        ["ufrpe", "afastamento_curta", "plano"],
      ],
      json: {
        requerente: data.requerente,
        matricula: parseInt(data.matricula),
        cargo: data.cargo,
        celular: parseInt(data.celular),
        email: data.email,
        exercicio: data.exercicio,
        regime: data.regime,
        dataInicio: new Date(data.dataInicio).toLocaleDateString("pt-BR", {
          timeZone: "UTC",
        }),
        dataFim: new Date(data.dataFim).toLocaleDateString("pt-BR", {
          timeZone: "UTC",
        }),
        dias: Math.round(
          (new Date(data.dataFim) - new Date(data.dataInicio)) /
            (1000 * 60 * 60 * 24)
        ),
        cidade: data.cidade,
        data_atual: new Date().toLocaleDateString("pt-BR", { timeZone: "UTC" }),
        checkbox_programa: data.checkbox_programa ? "☒" : "☐",
        checkbox_treinamento: data.checkbox_treinamento ? "☒" : "☐",
        checkbox_congresso: data.checkbox_congresso ? "☒" : "☐",
        checkbox_exterior: data.checkbox_exterior ? "☒" : "☐",
        checkbox_pais: data.checkbox_pais ? "☒" : "☐",
        checkbox_outros: data.checkbox_outros ? "☒" : "☐",
        processo: data.processo,
        nome_serv: data.nome_serv,
        checkbox_mestrado: data.checkbox_mestrado ? "☒" : "☐",
        checkbox_doutorado: data.checkbox_doutorado ? "☒" : "☐",
        checkbox_pos_doutorado: data.checkbox_pos_doutorado ? "☒" : "☐",
        checkbox_intercambio: data.checkbox_intercambio ? "☒" : "☐",
        checkbox_estagio: data.checkbox_estagio ? "☒" : "☐",
        vigencia_inicio: new Date(data.vigencia_inicio).toLocaleDateString(
          "pt-BR",
          {
            year: "numeric",
            month: "2-digit",
            timeZone: "UTC",
          }
        ),
        vigencia_fim: new Date(data.vigencia_fim).toLocaleDateString("pt-BR", {
          year: "numeric",
          month: "2-digit",
          timeZone: "UTC",
        }),
        area_nome: data.area_nome,
        area_codigo: parseInt(data.area_codigo),
        linha_pesquisa: data.linha_pesquisa,
        palavrachave_1: data.palavrachave_1,
        palavrachave_2: data.palavrachave_2,
        palavrachave_3: data.palavrachave_3,
        palavrachave_4: data.palavrachave_4,
        palavrachave_5: data.palavrachave_5,
        palavrachave_6: data.palavrachave_6,
        resumo: data.resumo,
        introducao: data.introducao,
        obj_geral: data.obj_geral,
        obj_esp: data.obj_esp,
        metodologia: data.metodologia,
        contribuicao: data.contribuicao,
        ano_1_atv: 2023,
        atv_1: "atv1",
        color_atv1_jan: "000000",
        ano_2_atv: 2024,
        apoio_financeiro: data.apoio_financeiro,
        referencias: data.referencias,
      },
    };
    console.log(dados);
    console.log(tipo);
    if (tipo === "pdf") {
      pdf(dados);
    } else if (tipo === "word") {
      word(dados);
    }
  };

  if (Object.keys(errors).length > 0) {
    console.log("Há erros no formulário:", errors);
  }

  const forms = (step, register, errors) => {
    switch (step) {
      case 0:
        return (
          <div className="bg-white p-4 overflow-hidden transition-height ease-in-out">
            <div className="flex-grow grid grid-cols-2 gap-4">
              {/*Coluna 1 */}
              <div className="flex flex-col items-start col-span-1">
                {/*REQUERENTE */}
                <label
                  className="subtitle text-black bg-[#AC79FA] text-lg p-1 rounded-lg mt-1 ml-5 font-serif"
                  htmlFor="requerente"
                >
                  Requerente:
                </label>
                <span className="font-serif ml-5 text-red-500">
                  *Campo Obrigatório
                </span>
                <input
                  className={`w-2/3 border border-gray-300 p-1 rounded-md mt-1 ml-5 
                              focus:outline-none focus:ring-5 focus:border-purple-600 
                              ${errors?.requerente && "border-red-500"}`}
                  type="text"
                  id="requerente"
                  placeholder="Digite seu nome..."
                  {...register("requerente", { required: true })}
                />
                {errors?.requerente?.type == "required" && (
                  <p className="error-mensage ml-5">Requerente é obrigatório</p>
                )}

                {/*MATRICULA */}
                <label
                  className="subtitle text-black bg-[#AC79FA] text-lg p-1 rounded-lg mt-1 ml-5 font-serif"
                  htmlFor="matricula"
                >
                  Matricula:
                </label>
                <span className="font-serif ml-5 text-red-500">
                  *Campo Obrigatório
                </span>
                <input
                  className={`w-2/3 border border-gray-300 p-1 rounded-md mt-1 ml-5 
                      focus:outline-none focus:ring-5 focus:border-purple-600 ${
                        errors?.matricula && "border-red-500"
                      }`}
                  type="text"
                  id="matricula"
                  placeholder="Digete seu nº de matricula..."
                  {...register("matricula", { required: true })}
                />
                {errors?.matricula?.type == "required" && (
                  <p className="error-mensage ml-5">
                    Número de matricula é obrigatório
                  </p>
                )}

                {/*CARGO*/}
                <label
                  className="subtitle text-black bg-[#AC79FA] text-lg p-1 
                                rounded-lg mt-1 ml-5 font-serif"
                  htmlFor="cargo"
                >
                  Cargo:
                </label>
                <span className="font-serif ml-5 text-red-500">
                  *Campo Obrigatório
                </span>
                <input
                  className={`w-2/3 border border-gray-300 p-1 rounded-md mt-1 ml-5 
                  focus:outline-none focus:ring-5 focus:border-purple-600 ${
                    errors?.cargo && "border-red-500"
                  }`}
                  type="text"
                  id="cargo"
                  placeholder="Digite seu cargo..."
                  {...register("cargo", { required: true })}
                />
                {errors?.cargo?.type == "required" && (
                  <p className="error-mensage ml-5">Cargo é obrigatório</p>
                )}

                {/*EXERCICIO*/}
                <label
                  className="subtitle text-black bg-[#AC79FA] text-lg p-1 
                                rounded-lg mt-1 ml-5 font-serif"
                  htmlFor="exercicio"
                >
                  Exercício:
                </label>
                <span className="font-serif ml-5 text-red-500">
                  *Campo Obrigatório
                </span>
                <input
                  className={`w-2/3 border border-gray-300 p-1 rounded-md mt-1 ml-5 
                  focus:outline-none focus:ring-5 focus:border-purple-600 ${
                    errors?.exercicio && "border-red-500"
                  }`}
                  type="text"
                  id="exercicio"
                  placeholder="Digite seu exercicio..."
                  {...register("exercicio", { required: true })}
                />
                {errors?.exercicio?.type == "required" && (
                  <p className="error-mensage ml-5">Exercício é obrigatório</p>
                )}
              </div>
              <div className="flex flex-col items-start col-span-1">
                {/*PROCESSO*/}
                <label
                  className="subtitle text-black bg-[#AC79FA] text-lg p-1 
                                rounded-lg mt-1 ml-5 font-serif"
                  htmlFor="processo"
                >
                  Nº do Processo:
                </label>
                <input
                  className="w-2/3 border border-gray-300 p-1 rounded-md 
                                mt-1 ml-5 focus:outline-none focus:ring-5
                                focus:border-purple-600"
                  type="text"
                  id="processo"
                  placeholder="Digite o nº do processo..."
                  {...register("processo")}
                />

                {/*Nº DO CELULAR */}
                <label
                  className="subtitle text-black bg-[#AC79FA] text-lg p-1 
                                rounded-lg mt-1 ml-5 font-serif"
                  htmlFor="celular"
                >
                  Celular:
                </label>
                <span className="font-serif ml-5 text-red-500">
                  *Campo Obrigatório
                </span>
                <input
                  className={`w-2/3 border border-gray-300 p-1 rounded-md mt-1 ml-5 
                  focus:outline-none focus:ring-5 focus:border-purple-600 ${
                    errors?.celular && "border-red-500"
                  }`}
                  type="text"
                  id="celular"
                  placeholder="Digite seu nº de celular..."
                  {...register("celular", {
                    required: true,
                    pattern: {
                      value: /^[1-9]{2}9[0-9]{8}$/,
                    },
                  })}
                />
                {errors?.celular?.type == "required" && (
                  <p className="error-mensage ml-5">
                    Número do Celular é obrigatório
                  </p>
                )}
                {errors?.celular?.type == "pattern" && (
                  <p className="error-mensage ml-5">
                    Número do Celular inválido, use o DDD e sem caracteres
                    especiais
                  </p>
                )}

                {/*EMAIL */}
                <label
                  className="subtitle text-black bg-[#AC79FA] text-lg p-1
                                rounded-lg mt-1 ml-5 font-serif"
                  htmlFor="email"
                >
                  E-mail:
                </label>
                <span className="font-serif ml-5 text-red-500">
                  *Campo Obrigatório
                </span>
                <input
                  className={`w-2/3 border border-gray-300 p-1 rounded-md mt-1 ml-5 
                  focus:outline-none focus:ring-5 focus:border-purple-600 ${
                    errors?.email && "border-red-500"
                  }`}
                  type="text"
                  id="email"
                  placeholder="Digite seu email..."
                  {...register("email", {
                    required: true,
                    pattern: { value: /^\S+@\S+$/i },
                  })}
                />
                {errors?.email?.type == "required" && (
                  <p className="error-mensage ml-5">E-mail é obrigatório</p>
                )}
                {errors?.email?.type === "pattern" && (
                  <p className="error-mensagem ml-5">E-mail inválido</p>
                )}

                {/*Cidade*/}
                <label
                  className="subtitle text-black bg-[#AC79FA] text-lg p-1 
                                rounded-lg mt-1 ml-5 font-serif"
                  htmlFor="cidade"
                >
                  Cidade:
                </label>
                <span className="font-serif ml-5 text-red-500">
                  *Campo Obrigatório
                </span>
                <input
                  className={`w-2/3 border border-gray-300 p-1 rounded-md mt-1 ml-5 
                  focus:outline-none focus:ring-5 focus:border-purple-600 ${
                    errors?.cidade && "border-red-500"
                  }`}
                  type="text"
                  id="cidade"
                  placeholder="Digite a cidade..."
                  {...register("cidade", { required: true })}
                />
                {errors?.cidade?.type == "required" && (
                  <p className="error-mensage ml-5">Cidade é obrigatório</p>
                )}
              </div>
            </div>
          </div>
        );

      case 1:
        return (
          <div>
            <div>
              <div className="flex-grow grid grid-cols-2 gap-4">
                {/*Coluna 1 */}
                <div className="flex flex-col items-start col-span-1">
                  {/*REGIME*/}
                  <label
                    className="subtitle text-black bg-[#AC79FA] text-lg p-1 rounded-lg mt-1 ml-5 font-serif"
                    htmlFor="regime"
                  >
                    Regime de Trabalho Atual:
                  </label>
                  <span className="font-serif ml-5 text-red-500">
                    *Campo Obrigatório
                  </span>
                  <input
                    className={`w-2/3 border border-gray-300 p-1 rounded-md mt-1 ml-5 
                    focus:outline-none focus:ring-5 focus:border-purple-600 ${
                      errors?.regime && "border-red-500"
                    }`}
                    type="text"
                    id="regime"
                    placeholder="Digite o regime..."
                    {...register("regime", { required: true })}
                  />
                  {errors?.regime?.type == "required" && (
                    <p className="error-mensage ml-5">O regime é obrigatório</p>
                  )}

                  {/*DATA DE INICIO*/}
                  <label
                    className="subtitle text-black bg-[#AC79FA] text-lg p-1 rounded-lg mt-1 ml-5 font-serif"
                    htmlFor="datainicio"
                  >
                    Data de Início:
                  </label>
                  <span className="font-serif ml-5 text-red-500">
                    *Campo Obrigatório
                  </span>
                  <input
                    className={`w-2/3 border border-gray-300 p-1 rounded-md mt-1 ml-5 
                   focus:outline-none focus:ring-5 focus:border-purple-600 ${
                     errors?.dataInicio && "border-red-500"
                   }`}
                    type="date"
                    id="dataInicio"
                    {...register("dataInicio", { required: true })}
                  />
                  {errors?.dataInicio?.type == "required" && (
                    <p className="error-mensage ml-5">
                      A data de inicio é obrigatório
                    </p>
                  )}

                  {/*DATA DE FIM*/}
                  <label
                    className="subtitle text-black bg-[#AC79FA] text-lg p-1 rounded-lg mt-1 ml-5 font-serif"
                    htmlFor="datafim"
                  >
                    Data do Fim:
                  </label>
                  <span className="font-serif ml-5 text-red-500">
                    *Campo Obrigatório
                  </span>
                  <input
                    className={`w-2/3 border border-gray-300 p-1 rounded-md mt-1 ml-5 
                    focus:outline-none focus:ring-5 focus:border-purple-600 ${
                      errors?.dataFim && "border-red-500"
                    }`}
                    type="date"
                    id="dataFim"
                    {...register("dataFim", { required: true })}
                  />
                  {errors?.dataFim?.type == "required" && (
                    <p className="error-mensage ml-5">
                      A data do fim é obrigatório
                    </p>
                  )}

                  {/*NOME DO SERVIDOR*/}
                  <label
                    className="subtitle text-black bg-[#AC79FA] text-lg p-1 rounded-lg mt-1 ml-5 font-serif"
                    htmlFor="nome_serv"
                  >
                    {" "}
                    Suas atividades serão remanejadas para:{" "}
                  </label>
                  <span className="font-serif ml-5 text-red-500">
                    *Campo Obrigatório
                  </span>
                  <input
                    className={`w-2/3 border border-gray-300 p-1 rounded-md mt-1 ml-5 
                    focus:outline-none focus:ring-5 focus:border-purple-600 ${
                      errors?.nome_serv && "border-red-500"
                    }`}
                    type="text"
                    id="nome_serv"
                    placeholder="Nome do Servidor..."
                    {...register("nome_serv", { required: true })}
                  />
                  {errors?.nome_serv?.type == "required" && (
                    <p className="error-mensage ml-5">
                      O nome do servidor que vai substituir é obrigatório
                    </p>
                  )}
                </div>
                <div className="flex flex-col items-start col-span-1">
                  <label className="w-2/3 text-justify subtitle text-black bg-[#AC79FA] text-lg p-1 rounded-lg mt-1 ml-5 font-serif">
                    Tipo de afastamento do titular das atividades:
                  </label>
                  {/*CHECKBOX - EXTERIOR */}
                  <div className="inline-flex items-center">
                    <label
                      className="relative flex items-center p-3 rounded-full cursor-pointer"
                      htmlFor="checkbox_exterior"
                    >
                      <input
                        type="checkbox"
                        className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-gray-900 checked:bg-gray-900 checked:before:bg-gray-900 hover:before:opacity-10"
                        id="checkbox_exterior"
                        {...register("checkbox_exterior")}
                      />
                      <span className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-3.5 w-3.5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          stroke="currentColor"
                          strokeWidth="1"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      </span>
                    </label>
                    <label
                      className="w-2/3 mt-px font-light text-gray-700 cursor-pointer select-none text-sm text-justify"
                      htmlFor="checkbox_outros"
                    >
                      Estudo ou a serviço no exterior, nos termos do Decreto
                      nº91.800, de 18/10/1985 e da Lei nº 8.112, de 11/12/1990
                    </label>
                  </div>

                  {/*CHECKBOX - PAÍS */}
                  <div className="inline-flex items-center">
                    <label
                      className="relative flex items-center p-3 rounded-full cursor-pointer"
                      htmlFor="check"
                    >
                      <input
                        type="checkbox"
                        className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-gray-900 checked:bg-gray-900 checked:before:bg-gray-900 hover:before:opacity-10"
                        id="checkbox_pais"
                        {...register("checkbox_pais")}
                      />
                      <span className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-3.5 w-3.5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          stroke="currentColor"
                          strokeWidth="1"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      </span>
                    </label>
                    <label
                      className="w-2/3 mt-px font-light text-gray-700 cursor-pointer select-none text-sm text-justify"
                      htmlFor="checkbox_pais"
                    >
                      Estudo no país, nos termos do art. 96-A da Lei nº8.112/90
                    </label>
                  </div>

                  {/*CHECKBOX - OUTROS */}
                  <div className="inline-flex items-center">
                    <label
                      className="relative flex items-center p-3 rounded-full cursor-pointer"
                      htmlFor="check"
                    >
                      <input
                        type="checkbox"
                        className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-gray-900 checked:bg-gray-900 checked:before:bg-gray-900 hover:before:opacity-10"
                        id="checkbox_outros"
                        {...register("checkbox_outros")}
                      />
                      <span className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-3.5 w-3.5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          stroke="currentColor"
                          strokeWidth="1"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      </span>
                    </label>
                    <label
                      className="w-2/3 mt-px font-light text-gray-700 cursor-pointer select-none text-sm text-justify"
                      htmlFor="checkbox_outros"
                    >
                      Outros
                    </label>
                  </div>

                  {/*Outros motivos*/}
                  <label
                    className="subtitle text-black bg-[#AC79FA] text-lg p-1 rounded-lg mt-1 ml-5 font-serif"
                    htmlFor="outros_motivos"
                  >
                    {" "}
                    Outros motivos:{" "}
                  </label>
                  <input
                    className={
                      "w-2/3 border border-gray-300 p-1 rounded-md mt-1 ml-5 focus:outline-none focus:ring-5 focus:border-purple-600"
                    }
                    type="text"
                    id="outros_motivos"
                    placeholder="Outros motivos..."
                    {...register("outros_motivos")}
                  />

                  <label className="subtitle text-black bg-[#AC79FA] text-lg p-1 rounded-lg mt-1 ml-5 font-serif">
                    Motivo de afastamento:
                  </label>
                  {/*CHECKBOX - PROGRAMA */}
                  <div className="inline-flex items-center">
                    <label
                      className="relative flex items-center p-3 rounded-full cursor-pointer"
                      htmlFor="checkbox_programa"
                    >
                      <input
                        type="checkbox"
                        className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-gray-900 checked:bg-gray-900 checked:before:bg-gray-900 hover:before:opacity-10"
                        id="checkbox_programa"
                        {...register("checkbox_programa")}
                      />
                      <span className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-3.5 w-3.5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          stroke="currentColor"
                          strokeWidth="1"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      </span>
                    </label>
                    <label
                      className="w-2/3 mt-px font-light text-gray-700 cursor-pointer select-none text-sm text-justify"
                      htmlFor="checkbox_programa"
                    >
                      I - Programa de intercâmbio acadêmicos, científico,
                      cultural ou tecnológico, estágios, missões e visitas para
                      o reconhecimento de instituições de importância acadêmica,
                      cultural, técnica e científica;
                    </label>
                  </div>

                  {/*CHECKBOX - TREINAMENTO */}
                  <div className="inline-flex items-center">
                    <label
                      className="relative flex items-center p-3 rounded-full cursor-pointer"
                      htmlFor="checkbox_programa"
                    >
                      <input
                        type="checkbox"
                        className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-gray-900 checked:bg-gray-900 checked:before:bg-gray-900 hover:before:opacity-10"
                        id="checkbox_terinamento"
                        {...register("checkbox_treinamento")}
                      />
                      <span className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-3.5 w-3.5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          stroke="currentColor"
                          strokeWidth="1"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      </span>
                    </label>
                    <label
                      className="w-2/3 mt-px font-light text-gray-700 cursor-pointer select-none text-sm text-justify"
                      htmlFor="checkbox_treinamento"
                    >
                      II - Treinamento relacionado às atividades desempenhadas
                      pelo servidor;
                    </label>
                  </div>

                  {/*CHECKBOX - CONGRESSO */}
                  <div className="inline-flex items-center">
                    <label
                      className="relative flex items-center p-3 rounded-full cursor-pointer"
                      htmlFor="checkbox_programa"
                    >
                      <input
                        type="checkbox"
                        className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-gray-900 checked:bg-gray-900 checked:before:bg-gray-900 hover:before:opacity-10"
                        id="checkbox_congresso"
                        {...register("checkbox_congresso")}
                      />
                      <span className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-3.5 w-3.5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          stroke="currentColor"
                          strokeWidth="1"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      </span>
                    </label>
                    <label
                      className="w-2/3 mt-px font-light text-gray-700 cursor-pointer select-none text-sm text-justify"
                      htmlFor="checkbox_outros"
                    >
                      III - Congressos, seminários, simpósios, jornadas,
                      encontros e eventos correlatos
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="flex flex-col items-center justify-center">
            <div className="flex flex-col items-start">
              <label className="text-black bg-[#AC79FA] text-lg p-1 rounded-lg font-serif ml-5">
                Modalidade:
              </label>
              {/*CHECKBOX - MESTRADO */}
              <div className="flex">
                <div className="inline-flex items-center">
                  <label
                    className="relative flex items-center p-3 rounded-full cursor-pointer"
                    htmlFor="checkbox_mestrado"
                  >
                    <input
                      type="checkbox"
                      className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-gray-900 checked:bg-gray-900 checked:before:bg-gray-900 hover:before:opacity-10"
                      id="checkbox_mestrado"
                      {...register("checkbox_mestrado")}
                    />
                    <span className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3.5 w-3.5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        stroke="currentColor"
                        strokeWidth="1"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </span>
                  </label>
                  <label
                    className="w-2/3 mt-px font-light text-gray-700 cursor-pointer select-none text-sm text-justify"
                    htmlFor="checkbox_mestrado"
                  >
                    Mestrado
                  </label>
                </div>

                {/*CHECKBOX - DOUTORADO */}
                <div className="inline-flex items-center">
                  <label
                    className="relative flex items-center p-3 rounded-full cursor-pointer"
                    htmlFor="checkbox_doutorado"
                  >
                    <input
                      type="checkbox"
                      className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-gray-900 checked:bg-gray-900 checked:before:bg-gray-900 hover:before:opacity-10"
                      id="checkbox_doutorado"
                      {...register("checkbox_doutorado")}
                    />
                    <span className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3.5 w-3.5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        stroke="currentColor"
                        strokeWidth="1"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </span>
                  </label>
                  <label
                    className="w-2/3 mt-px font-light text-gray-700 cursor-pointer select-none text-sm text-justify"
                    htmlFor="checkbox_doutorado"
                  >
                    Doutorado
                  </label>
                </div>

                {/*CHECKBOX - PósDoc */}
                <div className="inline-flex items-center">
                  <label
                    className="relative flex items-center p-3 rounded-full cursor-pointer"
                    htmlFor="checkbox_pos_doutorado"
                  >
                    <input
                      type="checkbox"
                      className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-gray-900 checked:bg-gray-900 checked:before:bg-gray-900 hover:before:opacity-10"
                      id="checkbox_pos_doutorado"
                      {...register("checkbox_pos_doutorado")}
                    />
                    <span className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3.5 w-3.5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        stroke="currentColor"
                        strokeWidth="1"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </span>
                  </label>
                  <label
                    className="w-2/3 mt-px font-light text-gray-700 cursor-pointer select-none text-sm text-justify"
                    htmlFor="checkbox_pos_doutorado"
                  >
                    Pós-Doutorado
                  </label>
                </div>

                {/*CHECKBOX - INTERCÂMBIO*/}
                <div className="inline-flex items-center">
                  <label
                    className="relative flex items-center p-3 rounded-full cursor-pointer"
                    htmlFor="checkbox_intercambio"
                  >
                    <input
                      type="checkbox"
                      className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-gray-900 checked:bg-gray-900 checked:before:bg-gray-900 hover:before:opacity-10"
                      id="checkbox_intercambio"
                      {...register("checkbox_intercambio")}
                    />
                    <span className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3.5 w-3.5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        stroke="currentColor"
                        strokeWidth="1"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </span>
                  </label>
                  <label
                    className="w-2/3 mt-px font-light text-gray-700 cursor-pointer select-none text-sm text-justify"
                    htmlFor="checkbox_intercambio"
                  >
                    Intercâmbio
                  </label>
                </div>

                {/*CHECKBOX - ESTÁGIO*/}
                <div className="inline-flex items-center">
                  <label
                    className="relative flex items-center p-3 rounded-full cursor-pointer"
                    htmlFor="checkbox_estagio"
                  >
                    <input
                      type="checkbox"
                      className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-gray-900 checked:bg-gray-900 checked:before:bg-gray-900 hover:before:opacity-10"
                      id="checkbox_estagio"
                      {...register("checkbox_estagio")}
                    />
                    <span className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3.5 w-3.5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        stroke="currentColor"
                        strokeWidth="1"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </span>
                  </label>
                  <label
                    className="w-2/3 mt-px font-light text-gray-700 cursor-pointer select-none text-sm text-justify"
                    htmlFor="checkbox_estagio"
                  >
                    Estágio
                  </label>
                </div>
              </div>

              {/*Vigência de Inicio*/}
              <label
                className="subtitle text-black bg-[#AC79FA] text-lg p-1 rounded-lg mt-1 ml-5 font-serif"
                htmlFor="vigencia_inicio"
              >
                Vigência de Início (mês/ano):
              </label>
              <span className="font-serif ml-5 text-red-500">
                *Campo Obrigatório
              </span>
              <input
                className={`w-2/3 border border-gray-300 p-1 rounded-md mt-1 ml-5 
                    focus:outline-none focus:ring-5 focus:border-purple-600 ${
                      errors?.vigencia_inicio && "border-red-500"
                    }`}
                type="month"
                id="vigencia_inicio"
                {...register("vigencia_inicio", { required: true })}
              />
              {errors?.vigencia_inicio?.type == "required" && (
                <p className="error-mensage ml-5">
                  Vigência do Inicio é obrigatório
                </p>
              )}

              {/*Vigência do Fim*/}
              <label
                className="subtitle text-black bg-[#AC79FA] text-lg p-1 rounded-lg mt-1 ml-5 font-serif"
                htmlFor="cigencia_fim"
              >
                Vigência do Fim (mês/ano):
              </label>
              <span className="font-serif ml-5 text-red-500">
                *Campo Obrigatório
              </span>
              <input
                className={`w-2/3 border border-gray-300 p-1 rounded-md mt-1 ml-5 
                 focus:outline-none focus:ring-5 focus:border-purple-600 ${
                   errors?.vigencia_fim && "border-red-500"
                 }`}
                type="month"
                id="vigencia_fim"
                {...register("vigencia_fim", { required: true })}
              />
              {errors?.vigencia_fim?.type == "required" && (
                <p className="error-mensage ml-5">
                  Vigência do Fim é obrigatório
                </p>
              )}

              {/*CLASSIFICAÇÃO DA ÁREA*/}
              <label className="subtitle text-black bg-[#AC79FA] text-lg p-1 rounded-lg mt-1 ml-5 font-serif">
                Classificação da Área:
              </label>
              {/*Nome da Área */}
              <label
                className="subtitle text-black bg-[#AC79FA] text-lg p-1 rounded-lg mt-1 ml-5 font-serif"
                htmlFor="area_nome"
              >
                Nome da Área:
              </label>
              <input
                className={
                  "w-5/6 border border-gray-300 p-1 rounded-md mt-1 ml-5 focus:outline-none focus:ring-5 focus:border-purple-600"
                }
                type="text"
                id="area_nome"
                placeholder="Digite o nome da área..."
                {...register("area_nome")}
              />
              {/*NÚMERO DO CÓDIGO */}
              <label
                className="subtitle text-black bg-[#AC79FA] text-lg p-1 rounded-lg mt-1 ml-5 font-serif"
                htmlFor="area_codigo"
              >
                Número do Código:
              </label>
              <input
                className={
                  "w-5/6 border border-gray-300 p-1 rounded-md mt-1 ml-5 focus:outline-none focus:ring-5 focus:border-purple-600"
                }
                type="number"
                id="area_codigo"
                placeholder="Digite o código da área..."
                {...register("area_codigo")}
              />

              {/*LINHA DE PESQUISA */}
              <label
                className="w-5/6 text-justify subtitle text-black bg-[#AC79FA] text-lg p-1 rounded-lg mt-1 ml-5 font-serif"
                htmlFor="linha_pesquisa"
              >
                Linha de Pesquisa (informar em quais linhas de pesquisa se
                enquadra o projeto):
              </label>
              <input
                className={
                  "w-5/6 border border-gray-300 p-1 rounded-md mt-1 ml-5 focus:outline-none focus:ring-5 focus:border-purple-600"
                }
                type="text"
                id="linha_pesquisa"
                placeholder="Linha de pesquisa..."
                {...register("linha_pesquisa")}
              />

              {/*PALAVRA CHAVES */}
              <label
                className="w-5/6 text-justify subtitle text-black bg-[#AC79FA] text-lg p-1 rounded-lg mt-1 ml-5 font-serif"
                htmlFor="palavrachave_1"
              >
                Palavras Chaves (informar no mínimo 04):
              </label>
              <input
                className={
                  "w-5/6 border border-gray-300 p-1 rounded-md mt-1 ml-5 focus:outline-none focus:ring-5 focus:border-purple-600"
                }
                type="text"
                id="palavrachave_1"
                placeholder="..."
                {...register("palavrachave_1")}
              />

              <input
                className={
                  "w-5/6 border border-gray-300 p-1 rounded-md mt-1 ml-5 focus:outline-none focus:ring-5 focus:border-purple-600"
                }
                type="text"
                id="palavrachave_2"
                placeholder="..."
                {...register("palavrachave_2")}
              />

              <input
                className={
                  "w-5/6 border border-gray-300 p-1 rounded-md mt-1 ml-5 focus:outline-none focus:ring-5 focus:border-purple-600"
                }
                type="text"
                id="palavrachave_3"
                placeholder="..."
                {...register("palavrachave_3")}
              />

              <input
                className={
                  "w-5/6 border border-gray-300 p-1 rounded-md mt-1 ml-5 focus:outline-none focus:ring-5 focus:border-purple-600"
                }
                type="text"
                id="palavrachave_4"
                placeholder="..."
                {...register("palavrachave_4")}
              />

              <input
                className={
                  "w-5/6 border border-gray-300 p-1 rounded-md mt-1 ml-5 focus:outline-none focus:ring-5 focus:border-purple-600"
                }
                type="text"
                id="palavrachave_5"
                placeholder="..."
                {...register("palavrachave_5")}
              />

              <input
                className={
                  "w-5/6 border border-gray-300 p-1 rounded-md mt-1 ml-5 focus:outline-none focus:ring-5 focus:border-purple-600"
                }
                type="text"
                id="palavrachave_6"
                placeholder="..."
                {...register("palavrachave_6")}
              />

              {/*APOIO FINANCEIRO*/}
              <label
                className=" subtitle text-black bg-[#AC79FA] text-lg p-1 rounded-lg mt-1 ml-5 font-serif"
                htmlFor="apoio financeiro"
              >
                Apoio Financeiro (se houver):
              </label>
              <textarea
                className={
                  "w-5/6 border border-gray-300 p-1 rounded-md mt-1 ml-5 focus:outline-none focus:ring-5 focus:border-purple-600"
                }
                id="apoio_financeiro"
                placeholder="Apoio Financeiro..."
                {...register("apoio_financeiro")}
                rows={5}
              />

              {/*REFERÊNCIA BIBLIOGRAFICA*/}
              <label
                className=" subtitle text-black bg-[#AC79FA] text-lg p-1 rounded-lg mt-1 ml-5 font-serif"
                htmlFor="referencias"
              >
                Referências:
              </label>
              <textarea
                className={
                  "w-5/6 border border-gray-300 p-1 rounded-md mt-1 ml-5 focus:outline-none focus:ring-5 focus:border-purple-600"
                }
                id="referencias"
                placeholder="Apoio Financeiro..."
                {...register("referencias")}
                rows={5}
              />

              {/*DETALHAMENTO */}
              <label
                className="text-justify subtitle text-black bg-[#AC79FA] text-lg p-1 rounded-lg mt-1 ml-5 font-serif"
                htmlFor="palavrachave_1"
              >
                Detalhamento:
              </label>

              {/*RESUMO*/}
              <label
                className=" subtitle text-black bg-[#AC79FA] text-lg p-1 rounded-lg mt-1 ml-5 font-serif"
                htmlFor="resumo"
              >
                Resumo:
              </label>
              <textarea
                className={
                  "w-5/6 border border-gray-300 p-1 rounded-md mt-1 ml-5 focus:outline-none focus:ring-5 focus:border-purple-600"
                }
                id="resumo"
                placeholder="Resumo..."
                {...register("resumo")}
                rows={5}
              />

              {/*INTRODUÇÃO*/}
              <label
                className=" subtitle text-black bg-[#AC79FA] text-lg p-1 rounded-lg mt-1 ml-5 font-serif"
                htmlFor="introducao"
              >
                introdução:
              </label>
              <textarea
                className={
                  "w-5/6 border border-gray-300 p-1 rounded-md mt-1 ml-5 focus:outline-none focus:ring-5 focus:border-purple-600"
                }
                id="introducao"
                placeholder="introducao..."
                {...register("introducao")}
                rows={8}
              />

              {/*OBJETIVO GERAL*/}
              <label
                className=" subtitle text-black bg-[#AC79FA] text-lg p-1 rounded-lg mt-1 ml-5 font-serif"
                htmlFor="obj_geral"
              >
                Objeto Geral:
              </label>
              <textarea
                className={
                  "w-5/6 border border-gray-300 p-1 rounded-md mt-1 ml-5 focus:outline-none focus:ring-5 focus:border-purple-600"
                }
                id="obj_geral"
                placeholder="Objeto geral..."
                {...register("obj_geral")}
                rows={5}
              />

              {/*OBJETIVO ESPECIFICO*/}
              <label
                className=" subtitle text-black bg-[#AC79FA] text-lg p-1 rounded-lg mt-1 ml-5 font-serif"
                htmlFor="obj_esp"
              >
                Objeto Especifico:
              </label>
              <textarea
                className={
                  "w-5/6 border border-gray-300 p-1 rounded-md mt-1 ml-5 focus:outline-none focus:ring-5 focus:border-purple-600"
                }
                id="obj_esp"
                placeholder="Objeto especifico..."
                {...register("obj_esp")}
                rows={5}
              />

              {/*METODOLOGIA*/}
              <label
                className=" subtitle text-black bg-[#AC79FA] text-lg p-1 rounded-lg mt-1 ml-5 font-serif"
                htmlFor="metodologia"
              >
                Metodologia:
              </label>
              <textarea
                className={
                  "w-5/6 border border-gray-300 p-1 rounded-md mt-1 ml-5 focus:outline-none focus:ring-5 focus:border-purple-600"
                }
                id="metodologia"
                placeholder="Objeto especifico..."
                {...register("metodologia")}
                rows={8}
              />

              {/*CONTRIBUIÇÃO*/}
              <label
                className=" subtitle text-black bg-[#AC79FA] text-lg p-1 rounded-lg mt-1 ml-5 font-serif"
                htmlFor="contribuicao"
              >
                Contribuição esperada:
              </label>
              <textarea
                className={
                  "w-5/6 border border-gray-300 p-1 rounded-md mt-1 ml-5 focus:outline-none focus:ring-5 focus:border-purple-600"
                }
                id="contribuicao"
                placeholder="Contribuição esperada..."
                {...register("contribuicao")}
                rows={5}
              />
            </div>
          </div>
        );
      case 3:
        return (
          <div>
            <label
              className="subtitle text-black bg-[#AC79FA] text-lg p-1 rounded-lg m=10 font-serif"
              htmlFor="cronograma"
            >
              Cronograma de Atividades:
            </label>
            <span className="font-serif ml-5 text-red-500">
              *Campo Obrigatório
            </span>
            <Table />
            <Table />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full h-full">
      <Stepper activeStep={activeStep}>
        {steps.map((label) => {
          const stepProps = {};
          const labelProps = {};

          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}></StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <div className="flex justify-center items-center space-x-4">
            <Tooltip title="Baixar em PDF">
              <IconButton
                aria-label="pdf"
                onClick={handleSubmit((data) => onSubmit(data, "pdf"))}
              >
                <FaFilePdf color="red" size="2.5em" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Baixar em Word">
              <IconButton
                aria-label="word"
                onClick={handleSubmit((data) => onSubmit(data, "word"))}
              >
                <FaFileWord color="blue" size="2.5em" />
              </IconButton>
            </Tooltip>
          </div>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={handleReset}>Limpar</Button>
          </Box>
          {dataPdf ? (
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
              <Viewer
                fileUrl={dataPdf}
                plugins={[defaultLayoutPluginInstance]}
              />
              ;
            </Worker>
          ) : null}
        </React.Fragment>
      ) : (
        <React.Fragment>
          <div className="mt-5">{forms(activeStep, register, errors)}</div>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Anterior
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={handleNext}>
              {activeStep === steps.length - 1 ? "Finalizar" : "Próximo"}
            </Button>
          </Box>
        </React.Fragment>
      )}
    </div>
  );
}
