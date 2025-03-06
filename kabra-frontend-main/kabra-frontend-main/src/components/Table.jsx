
import { useForm, Controller } from 'react-hook-form';

const Table = () => {
  const { control, handleSubmit } = useForm();
  const nomesMeses = [
    'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
  ];

  const onSubmit = (data) => {
    console.log(data);
    // Faça o que for necessário com os dados do formulário
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="border p-2">Atividades</th>
            {nomesMeses.map((nomeMes, mesIndex) => (
              <th key={mesIndex}>{nomeMes}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[...Array(7)].map((_, atividadeIndex) => (
            <tr key={atividadeIndex}>
              <td className="border p-2">
                <Controller
                  control={control}
                  name={`atividades[${atividadeIndex}].nome`}
                  render={({ field }) => <input {...field} />}
                />
              </td>
              {nomesMeses.map((_, mesIndex) => (
                <td key={mesIndex} className="border p-2">
                  <Controller
                    control={control}
                    name={`atividades[${atividadeIndex}].duracao[${mesIndex}]`}
                    render={({ field }) => (
                      <input {...field} type="checkbox" />
                    )}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </form>
  );
};

export default Table;
