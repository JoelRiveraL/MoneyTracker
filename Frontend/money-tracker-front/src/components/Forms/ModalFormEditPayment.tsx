import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import MultiSelect from "../FormElements/MultiSelect";
import SelectStatus from "../FormElements/SelectStatus";

interface ModalFormEditPaymentProps {
  payment: any;
  formType: "edit";
  onClose: () => void;
}

const ModalFormEditPayment: React.FC<ModalFormEditPaymentProps> = ({
  payment,
  formType,
  onClose,
}) => {
  const [name, setName] = useState(payment?.name || "");
  const [price, setPrice] = useState(payment?.price || "");
  const [description, setDescription] = useState(payment?.description || "");
  const [status, setStatus] = useState(payment?.status || "");
  const [type, setTypes] = useState(payment?.type || "");
  const [dateLimit, setDateLimit] = useState(payment?.dateLimit || "");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error">(
    "success"
  );

  useEffect(() => {
    if (payment) {
      setName(payment.name);
      setPrice(payment.price);
      setDescription(payment.description);
      setStatus(payment.status);
      setTypes(payment.type);
      setDateLimit(payment.dateLimit);
    }
  }, [payment]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const token = Cookies.get("token");
    if (!token) {
      console.error("No token found");
      return;
    }

    let formattedDateLimit: string | null = null;
    if (dateLimit) {
      const dateObj = new Date(dateLimit);
      dateObj.setDate(dateObj.getDate() + 1);
      formattedDateLimit = dateObj.toISOString();
    }

    const body: {
      name: string;
      price: string;
      description: string;
      status: string;
      type: string;
      dateLimit?: string;
    } = {
      name,
      price,
      description,
      status,
      type,
    };

    if (type === "Deuda a Pagar" || type === "Deuda a Cobrar") {
      if (formattedDateLimit) {
        body.dateLimit = formattedDateLimit;
      }
    }

    try {
      const response = await fetch(
        `http://localhost:3002/payment/updateData/${payment.id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );

      if (response.ok) {
        setMessage("Datos actualizados con éxito");
        setMessageType("success");
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        console.error("Error updating data:", response.statusText);
        setMessage("Error al actualizar los datos");
        setMessageType("error");
      }
    } catch (error) {
      console.error("Error updating data:", error);
      setMessage("Error al actualizar los datos");
      setMessageType("error");
    }
  };

  return (
    <div className="modal">
      {message && (
        <div
          className={`alert ${
            messageType === "success" ? "text-green-600" : "text-red-600"
          }`}
        >
          {message}
        </div>
      )}
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="relative bg-white rounded-lg p-6 shadow-lg dark:bg-boxdark">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-5.5 p-6.5 grid grid-cols-1 gap-9 sm:grid-cols-2">
              <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                  <h3 className="font-medium text-black dark:text-white">
                    Editar Pago
                  </h3>
                </div>
                <div className="flex flex-col gap-5.5 p-6.5">
                  <div>
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Nombre
                    </label>
                    <input
                      type="text"
                      placeholder="Nombre descriptivo"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Monto
                    </label>
                    <input
                      type="number"
                      placeholder="Ingrese su monto en números"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      className="w-full rounded-lg border-[1.5px] border-primary bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:bg-form-input dark:text-white"
                    />
                  </div>
                  <div>
                    <MultiSelect
                      id="multiSelect"
                      onChange={(selectedValues) => setTypes(selectedValues)}
                    />
                  </div>
                  {(type === "Deuda a Pagar" || type === "Deuda a Cobrar") && (
                    <div>
                      <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                        Fecha Límite de la Deuda
                      </label>
                      <input
                        type="date"
                        value={dateLimit}
                        onChange={(e) => setDateLimit(e.target.value)}
                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                  <h3 className="font-medium text-black dark:text-white">
                    Descripción
                  </h3>
                </div>
                <div className="flex flex-col gap-5.5 p-6.5">
                  <div>
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Descripción
                    </label>
                    <textarea
                      rows={6}
                      placeholder="Descripción de la transacción"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    ></textarea>
                  </div>
                  <div>
                    <SelectStatus
                      id="selectStatus"
                      onChange={(selectedStatus) => setStatus(selectedStatus)}
                    />
                  </div>
                  <div className="flex justify-end gap-4.5">
                    <button
                      className="flex justify-center rounded border border-stroke px-6 py-2 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                      type="button"
                      onClick={onClose}
                    >
                      Cancelar
                    </button>
                    <button
                      className="flex justify-center rounded bg-primary px-6 py-2 font-medium text-gray hover:bg-opacity-90"
                      type="submit"
                    >
                      Guardar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ModalFormEditPayment;
