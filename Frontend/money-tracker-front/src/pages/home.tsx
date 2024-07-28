import { Metadata } from "next";
import DefaultLayout from "../components/Layouts/DefaultLayout";
import TableThree from "../components/Tables/TableThree";
import FormIncome from "../components/Forms/FormIncome";

export const metadata: Metadata = {
  title:
    "Next.js E-commerce Dashboard | TailAdmin - Next.js Dashboard Template",
  description: "This is Next.js Home for TailAdmin Dashboard Template",
};

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
