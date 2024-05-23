import CreateItemDrawer from "@/components/createItemDrawer";
import ListItem from "@/components/ui/listItem";
import { getItems } from "./actions";
import ItemsTable from "@/components/itemsTable";
import { HydrationBoundary, dehydrate, QueryClient } from "@tanstack/react-query";

export default async function Home() {
const queryClient = new QueryClient

await queryClient.prefetchQuery({
  queryKey: ['pictures', 1],
  queryFn: () => getItems(1)
})

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
        <HydrationBoundary state={dehydrate(queryClient)}>
        <ItemsTable/>
        </HydrationBoundary>
      </div>
    </main>
  );
}
