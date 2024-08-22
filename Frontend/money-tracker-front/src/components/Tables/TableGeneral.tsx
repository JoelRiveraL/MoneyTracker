import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { Payment as Payment } from "../../models/payment";
import ButtonsTable from "./ButtonsTable";

interface TableGeneralProps {
  limit?: number; // Optional limit parameter
}

const TableGeneral: React.FC<TableGeneralProps> = ({ limit = 5 }) => {
  const [payments, setPayments] = useState<Payment[]>([]);
  
  const fetchPayments = async () => {
    const token = Cookies.get('token');

    if (!token) {
      console.error('No token found');
      return;
    }

    try {
      const response = await fetch('http://localhost:3002/payment/getData', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        data.sort((a: Payment, b: Payment) => new Date(b.date).getTime() - new Date(a.date).getTime());
        setPayments(limit > 0 ? data.slice(0, limit) : data);
      } else {
        console.error('Error fetching payments:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching payments:', error);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, [limit]);

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long',
    };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  };

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        <div className="max-h-96 overflow-y-auto"> {/* Add fixed height and scrollbar */}
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
              {payments.map((packageItem, key) => (
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
                      {formatDate(packageItem.date)}
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
    </div>
  );
}

export default TableGeneral;