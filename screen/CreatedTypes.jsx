import { Link, useNavigate } from "react-router-dom";
import  { useState } from "react";

export function CreatedTypes() {
  //todo СОЗДАНИЕ ПРОДУКЦИИ
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    packsNumber: 1,
    packageType: "компрессия",
    isArchived: false,
    description: "",
  });

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
      const res = await fetch("http://localhost:8081/productTypes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Ошибка при отправке");

      navigate("/");
      setFormData({
        packsNumber: 1,
        packageType: "компрессия",
        isArchived: false,
        description: "",
      });
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <main className="flex justify-center items-center">
      <section className="w-[700px] mt-20">
        <div className="flex justify-between mb-6">
          <h1 className="font-medium text-2xl">Список выпускаемой продукции</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="flex justify-between items-center mb-[10px]">
            <p>
              Кол-во пачек <span className="text-red-600">*</span>
            </p>
            <input
              type="number"
              name="packsNumber"
              min={1}
              value={formData.packsNumber}
              onChange={handleChange}
              className="w-[500px] border border-neutral-200 focus:shadow-md transition-shadow rounded-sm px-3 py-1 text-sm outline-0"
              required
            />
          </div>

          <div className="flex justify-between items-center mb-[10px]">
            <p>
              Тип упаковки <span className="text-red-600">*</span>
            </p>
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
            <p>Архивировано</p>
            <input
              type="checkbox"
              name="isArchived"
              checked={formData.isArchived}
              onChange={handleChange}
              className="w-5 h-5"
            />
          </div>

          <div className="flex justify-between items-center ">
            <p>Описание</p>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="resize-none w-[500px] border border-neutral-200 focus:shadow-md transition-shadow rounded-sm px-3 py-1 text-sm outline-0"
            />
          </div>

          <div className="mt-10 flex justify-center gap-5">
            <Link to="/" className="button cancel">
              Отмена
            </Link>
            <button
              type="submit"
              className="button addCreate"
            >
              Создать
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}
