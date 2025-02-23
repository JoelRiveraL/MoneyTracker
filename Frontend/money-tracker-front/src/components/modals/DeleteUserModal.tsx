import { useRouter } from "next/router";
import Cookies from "js-cookie";

interface DeleteUserModalProps {
  userId: string;
  onClose: () => void;
}

const DeleteUserModal: React.FC<DeleteUserModalProps> = ({ userId, onClose }) => {
  const router = useRouter();

  const handleDeleteUser = async () => {
    const token = Cookies.get("token");
    if (!token) {
      console.error("No token found");
      return;
    }

    try {
      const response = await fetch(`http://localhost:3003/users/deleteUser/${userId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        console.log("Usuario eliminado con éxito");
        router.push("/"); // Redirige al index
      } else {
        console.error("Error al eliminar usuario:", response.statusText);
      }
    } catch (error) {
      console.error("Error al conectar con el servidor:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white dark:bg-boxdark p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-bold text-black dark:text-white">Eliminar Usuario</h2>
        <p className="text-gray-700 dark:text-gray-300 mt-2">
          ¿Estás seguro de que deseas eliminar este usuario? Esta acción no se puede deshacer.
        </p>
        <div className="mt-4 flex justify-end space-x-2">
          <button
            className="px-4 py-2 bg-gray-500 dark:bg-black-700 rounded hover:bg-gray-400 dark:hover:bg-gray-600"
            onClick={onClose}
          >
            Cancelar
          </button>
          <button
            className="px-4 py-2 bg-gray-500 text-black rounded hover:bg-red-600"
            onClick={handleDeleteUser}
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteUserModal;
