import CreateItemDrawer from "@/components/createItemDrawer";
import ListItem from "@/components/ui/listItem";
import { getItems } from "./actions";
import ItemsTable from "@/components/itemsTable";

export default async function Home() {
  const data = await getItems();

  return (
    <main className="flex flex-col min-h-screen  items-center justify-between p-24">
      <div className="w-full max-w-5xl items-start justify-between font-mono text-sm flex flex-col gap-4">
        <h1 className="text-4xl font-bold">CRUD Application</h1>
        <div className="flex flex-col w-full">
          <div className="self-end w-1/4">
            <CreateItemDrawer>
              <span className="btn w-full  btn-primary">Create Item</span>
            </CreateItemDrawer>
          </div>
        </div>
        <ItemsTable items={data.data ?? []} />
      </div>
    </main>
  );
}
