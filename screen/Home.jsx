import { Table } from "../component/elements/Table";
import { Link } from "react-router-dom";
function Home() {
  return (
    <main className=" flex justify-center items-center">
      <section className="w-[1090px] mt-20">
        <div className="flex justify-between items-center">
          <h1 className="font-medium">Список выпускаемой продукции</h1>
          <Link
            to={`/created-type`}
            className="button addCreate"
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
