export default function ModalLogout({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg shadow-lg w-87.5 p-6">
        <h2 className="text-lg font-semibold text-gray-800">
          Konfirmasi Logout
        </h2>
        <p className="text-sm text-gray-600 mt-2">
          Apakah kamu yakin ingin keluar?
        </p>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 text-gray-700"
          >
            Batal
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-md bg-red-600 hover:bg-red-700 text-white"
          >
            Ya
          </button>
        </div>
      </div>
    </div>
  );
}
