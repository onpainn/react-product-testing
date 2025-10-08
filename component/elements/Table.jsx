import { Info, SquarePen, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export function Table() {
  //todo ВЫВОД ПРОДУКЦИИ
  let count = 1;
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    fetch("http://localhost:8081/productTypes")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Ошибка при загрузке продуктов");
        }
        return res.json();
      })
      .then((data) => {
        data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Загрузка...</p>;
  if (error) return <p>Ошибка: {error}</p>;

  //todo УДАЛЕНИЕ ПРОДУКТА
  const handleDelete = async (id) => {
    const isConfirmed = window.confirm("Хотите удалить этот продукт?");
    if (!isConfirmed) return;
    try {
      const res = await fetch(`http://localhost:8081/productTypes/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Ошибка при удалении");
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <>
      <table className="w-full mt-5">
        <thead>
          <tr className="text-gray-500">
            <td>№</td>
            <td>Кол-во пачек</td>
            <td>Тип упаковки</td>
            <td>Дата создания</td>
            <td>Статус</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
          </tr>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{count++}</td>
              <td>{product.packsNumber}</td>
              <td>{product.packageType}</td>
              <td>
                {new Date(product.createdAt).toLocaleString("ru-RU", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
              </td>
              <td>{product.isArchived ? "Архив" : "Активно"}</td>
              <td className="relative">
                <div className="flex justify-center items-center">
                  <div className="relative">
                    <div className="peer flex justify-center items-center p-2 hover:text-blue-500 hover:bg-blue-100 transition-colors rounded-sm cursor-pointer">
                      <Info size={20} strokeWidth={1.5} />
                    </div>
                    <div className="absolute bottom-full mb-2 w-40 -translate-x-1/2 left-1/2 bg-white text-gray-700 text-sm border text-center border-gray-200 rounded-md p-2 shadow-md opacity-0 peer-hover:opacity-100 transition-opacity z-10 pointer-events-none">
                      {product.description
                        ? product.description
                        : "Нет описания"}
                    </div>
                  </div>
                </div>
              </td>
              <td>
                <div className="flex justify-around">
                  <Link
                    to={`/product/${product.id}`}
                    state={{ product }}
                    className="p-2 hover:text-yellow-600 hover:bg-yellow-100 transition-colors rounded-sm"
                  >
                    <SquarePen
                      size={20}
                      strokeWidth={1.5}
                      className="cursor-pointer"
                    />
                  </Link>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="p-2 hover:text-red-500 hover:bg-red-100 transition-colors rounded-sm"
                  >
                    <Trash2
                      size={20}
                      strokeWidth={1.5}
                      className="cursor-pointer"
                    />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </thead>
      </table>
    </>
  );
}
