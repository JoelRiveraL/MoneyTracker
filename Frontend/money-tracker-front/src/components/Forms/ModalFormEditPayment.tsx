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
  const [messageType, setMessageType] = useState<"success" | "error">("success");
  const [errors, setErrors] = useState<{
    name?: string;
    price?: string;
    description?: string;
    status?: string;
    type?: string;
    dateLimit?: string;
  }>({});

  // Cargar datos iniciales del payment
  useEffect(() => {
    if (payment) {
      setName(payment.name || "");
      setPrice(payment.price || "");
      setDescription(payment.description || "");
      setStatus(payment.status || "");
      setTypes(payment.type || "");
      setDateLimit(payment.dateLimit || "");
    }
  }, [payment]);

  // Función de validación
  const validateForm = () => {
    let newErrors: {
      name?: string;
      price?: string;
      description?: string;
      status?: string;
      type?: string;
      dateLimit?: string;
    } = {};

    // Validación de Nombre
    if (!name.trim()) {
      newErrors.name = "El nombre es obligatorio.";
    } else if (name.length < 3 || name.length > 100) {
      newErrors.name = "El nombre debe tener entre 3 y 100 caracteres.";
    }

    // Validación de Monto
    if (!price) {
      newErrors.price = "El monto es obligatorio.";
    } else if (isNaN(Number(price)) || Number(price) <= 0) {
      newErrors.price = "El monto debe ser un número positivo.";
    }

    // Validación de Descripción

    if (description.length > 500) {
      newErrors.description = "La descripción debe tener menos de 500 caracteres.";
    }

    // Validación de Estado
    const validStatuses = ["Pagado", "Pendiente","En curso"]; // Ajusta según tus opciones reales
    if (!status || !validStatuses.includes(status)) {
      newErrors.status = "Debe seleccionar un estado válido.";
    }

    // Validación de Tipo
    const validTypes = ["Ingreso", "Egreso", "Deuda a Pagar", "Deuda a Cobrar"]; // Ajusta según tu MultiSelect
    if (!type || !validTypes.includes(type)) {
      newErrors.type = "Debe seleccionar un tipo válido.";
    }

    // Validación de Fecha Límite (si aplica)
    if (type === "Deuda a Pagar" || type === "Deuda a Cobrar") {
      if (!dateLimit) {
        newErrors.dateLimit = "La fecha límite es obligatoria para deudas.";
      } else {
        const selectedDate = new Date(dateLimit);
        const today = new Date();
        if (selectedDate < today) {
          newErrors.dateLimit = "La fecha límite no puede ser anterior a hoy.";
        }
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Validar en tiempo real
  useEffect(() => {
    validateForm();
  }, [name, price, description, status, type, dateLimit]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const token = Cookies.get("token");
    if (!token) {
      console.error("No token found");
      return;
    }

    if (!validateForm()) {
      return; // No enviar si hay errores
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
          onClose(); // Cerrar el modal
          window.location.reload(); // Recargar la página
        }, 2000);
      } else {
        setMessage("Error al actualizar los datos");
        setMessageType("error");
      }
    } catch (error) {
      setMessage("Error al actualizar los datos");
      setMessageType("error");
    }
  };

  return (
    <div className="modal">  
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
                      className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm font-semibold">{errors.name}</p>
                    )}
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
                      className="w-full rounded-lg border-[1.5px] border-primary bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:bg-form-input dark:text-white"
                    />
                    {errors.price && (
                      <p className="text-red-500 text-sm font-semibold">{errors.price}</p>
                    )}
                  </div>
                  <div>
                    <MultiSelect
                      id="multiSelect"
                      onChange={(selectedValues) => setTypes(selectedValues)}
                    />
                    {errors.type && (
                      <p className="text-red-500 text-sm font-semibold">{errors.type}</p>
                    )}
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
                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                      {errors.dateLimit && (
                        <p className="text-red-500 text-sm font-semibold">{errors.dateLimit}</p>
                      )}
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
                      className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                    {errors.description && (
                      <p className="text-red-500 text-sm font-semibold">{errors.description}</p>
                    )}
                  </div>
                  <div>
                    <SelectStatus
                      id="selectStatus"
                      onChange={(selectedStatus) => setStatus(selectedStatus)}
                    />
                    {errors.status && (
                      <p className="text-red-500 text-sm font-semibold">{errors.status}</p>
                    )}
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
                      className="flex justify-center rounded bg-primary px-6 py-2 font-medium text-gray hover:bg-opacity-90 disabled:opacity-50"
                      type="submit"
                      disabled={Object.keys(errors).length > 0}
                    >
                      Guardar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
          {message && (
        <div
          className={`alert ${
            messageType === "success" ? "text-green-500" : "text-red-500"
          }`}
        >
          {message}
        </div>
      )}
        </div>
      </div>
    </div>
  );
};

export default ModalFormEditPayment;