import { Table } from "../component/elements/Table";
import { Link } from "react-router-dom";
function Home() {
  return (
    <main className=" flex justify-center items-center">
      <section className="w-5xl mt-20">
        <div className="flex justify-between">
          <h1 className="font-medium text-2xl">Список выпускаемой продукции</h1>
          <Link
            to={`/created-type`}
            className="cursor-pointer p-2 rounded-lg border bg-amber-200"
          >
            Создать тип продукции
          </Link>
        </div>
        <Table />
      </section>
    </main>
  );
}

export default Home;
