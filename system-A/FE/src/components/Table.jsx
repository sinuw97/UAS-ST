export default function Table({ styleBg, columns, data }) {
  const theadBg = styleBg === "pembelian" ? "bg-[#E8BE00]" : "bg-[#0E7085]";

  return (
    <div className="overflow-x-auto mt-4 rounded-md">
      <table className="w-full text-left bg-white shadow-md rounded-md">
        <thead className={`${theadBg} font-semibold text-[#121212]`}>
          <tr>
            {columns.map((col, index) => (
              <th key={index} className="px-6 py-4">
                {col}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="text-sm text-gray-700">
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="px-6 py-4 text-center text-gray-500"
              >
                Tidak ada data
              </td>
            </tr>
          ) : (
            data.map((riwayat) => (
              <tr
                key={riwayat.transaction_id}
                className="odd:bg-[#fefefe] even:bg-gray-100"
              >
                <td className="px-6 py-4">{riwayat.transaction_id}</td>
                <td className="px-6 py-4 capitalize">{riwayat.type}</td>
                <td className="px-6 py-4">
                  Rp {riwayat.amount.toLocaleString("id-ID")}
                </td>
                <td
                  className={`px-6 py-4 font-medium uppercase ${
                    riwayat.status === "success"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {riwayat.status}
                </td>
                <td className="px-6 py-4">{riwayat.description}</td>
                <td className="px-6 py-4">
                  {new Date(riwayat.created_at).toLocaleString("id-ID", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
