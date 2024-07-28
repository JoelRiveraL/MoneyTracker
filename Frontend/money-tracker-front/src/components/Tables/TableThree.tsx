import { Payment as Payment } from "../../models/payment";
import ButtonsTable from "./ButtonsTable";

const paymentData: Payment[] = [
  {
    name: "Beca",
    price: 200.0,
    description: "Beca de la universidad",
    type: "Ingreso",
    date: `Feb 13,2023`,
    status: "Pagado",
  },
  {
    name: "Pago Trabajo",
    price: 1350.0,
    description: "Pago por trabajo en la empresa Google",
    type: "Ingreso",
    date: `Ene 13,2023`,
    status: "Pagado",
  },
  {
    name: "Apuesta Deportiva",
    price: 99.0,
    description: "Apuesta en el partido de futbol Ecuador vs Argentina",
    type: "Ingreso",
    date: `Ene 13,2023`,
    status: "Pendiente",
  },
  {
    name: "Compra de Ropa",
    price: 59.0,
    description: "Compra de ropa en el centro comercial",
    type: "Egreso",
    date: `Ene 13,2023`,
    status: "En Curso",
  },
];

const TableThree = () => {
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="min-w-[220px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11">
                Nombre
              </th>
              <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                Descripción
              </th>
              <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                Tipo
              </th>
              <th className="px-4 py-4 font-medium text-black dark:text-white">
                Fecha
              </th>
              <th className="px-4 py-4 font-medium text-black dark:text-white">
                Estado
              </th>
              <th className="px-4 py-4 font-medium text-black dark:text-white">
                Acción
              </th>
            </tr>
          </thead>
          <tbody>
            {paymentData.map((packageItem, key) => (
              <tr key={key}>
                <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                  <h5 className="font-medium text-black dark:text-white">
                    {packageItem.name}
                  </h5>
                  <p className="text-sm">${packageItem.price}</p>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <p className="font-medium text-black dark:text-white">
                        {packageItem.description}
                    </p>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <h5 className="font-medium text-dark-gray dark:text-white">
                        {packageItem.type}
                    </h5>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {packageItem.date}
                  </p>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p
                    className={`inline-flex rounded-full bg-opacity-10 px-3 py-1 text-sm font-medium ${
                      packageItem.status === "Pagado"
                        ? "bg-success text-success"
                        : packageItem.status === "Pendiente"
                          ? "bg-danger text-danger"
                          : "bg-warning text-warning"
                    }`}
                  >
                    {packageItem.status}
                  </p>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <ButtonsTable />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableThree;
