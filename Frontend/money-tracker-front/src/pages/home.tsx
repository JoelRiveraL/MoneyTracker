import DefaultLayout from "../components/Layouts/DefaultLayout";
import TableThree from "../components/Tables/TableThree";
import FormIncome from "../components/Forms/FormIncome";

export default function Home() {
  return (
    <div>
      <DefaultLayout>
        <FormIncome />
        
        <div className="flex flex-col gap-10">
          <TableThree />
        </div>
      </DefaultLayout>
    </div>
  );
}
