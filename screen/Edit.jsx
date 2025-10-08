import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export function Edit() {
  //todo РЕДАКТИРОВАНИЕ ПРОДУКЦИИ
  const navigate = useNavigate();
  const location = useLocation();
  const { product } = location.state || {};
  const [formData, setFormData] = useState({
    packsNumber: product?.packsNumber || 1,
    packageType: product?.packageType || "компрессия",
    isArchived: product?.isArchived || false,
    description: product?.description || "",
  });
  if (!product) return <p>Нет данных продукта для редактирования</p>;
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]:
        type === "checkbox"
          ? checked
          : type === "number"
          ? Number(value)
          : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `http://localhost:8081/productTypes/${product.id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      if (!res.ok) throw new Error("Ошибка при обновлении");
      alert("Продукт обновлен");
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };
  //todo УДАЛЕНИЕ ПРОДУКТА
  const handleDelete = async () => {
    const isConfirmed = window.confirm("Хотите удалить этот продукт?");
    if (!isConfirmed) return;

    try {
      const res = await fetch(
        `http://localhost:8081/productTypes/${product.id}`,
        {
          method: "DELETE",
        }
      );

      if (!res.ok) throw new Error("Ошибка при удалении");
      alert("Продукт удален");
      navigate("/", { replace: true });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <main className="flex justify-center items-center">
      <section className="w-[700px] mt-20">
        <div className="flex justify-between mb-6">
          <h1 className="font-medium text-2xl">
            Редактирование типа продукции
          </h1>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex justify-between items-center mb-[10px]">
            <p>Кол-во пачек <span className="text-red-600">*</span></p>
            <input
              type="number"
              name="packsNumber"
              value={formData.packsNumber}
              onChange={handleChange}
              min={1}
              className="w-[500px] border border-neutral-200 focus:shadow-md transition-shadow rounded-sm px-3 py-1 text-sm outline-0"
            />
          </div>
          <div className="flex justify-between items-center mb-[10px]">
            <p>Тип упаковки <span className="text-red-600">*</span></p>
            <select
              name="packageType"
              value={formData.packageType}
              onChange={handleChange}
              className="w-[500px] border border-neutral-200 focus:shadow-md transition-shadow rounded-sm px-3 py-1 text-sm outline-0 cursor-pointer"
            >
              <option value="компрессия">компрессия</option>
              <option value="некомпрессия">не компрессия</option>
            </select>
          </div>
          <div className="flex gap-25 items-center mb-[10px]">
            <label>Архивировано</label>
            <input
              type="checkbox"
              name="isArchived"
              checked={formData.isArchived}
              onChange={handleChange}
              className="w-5 h-5"
            />
          </div>
          <div className="flex justify-between items-center">
            <label>Описание</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="resize-none w-[500px] border border-neutral-200 focus:shadow-md transition-shadow rounded-sm px-3 py-1 text-sm outline-0"
            />
          </div>
          <div className="mt-10 flex justify-center gap-5">
            <button
              type="button"
              onClick={handleDelete}
              className="button del"
            >
              Удалить
            </button>
            <Link to="/" className="button cancel">
              Отмена
            </Link>
            <button
              type="submit"
              className="button addCreate"
            >
              Сохранить
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}
