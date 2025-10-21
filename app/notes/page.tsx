import { fetchNotes } from "@/lib/api";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import NotesClient from "./Notes.client";

interface NotesPageProps {
  searchParams: Promise<{
    page: string;
    search: string;
    perPage: string;
  }>;
}

const NotesPage = async ({ searchParams }: NotesPageProps) => {
  const queryClient = new QueryClient();
  const page = Number((await searchParams).page) || 1;
  const search = (await searchParams).search || "";
  const perPage = Number((await searchParams).perPage) || 12;

  await queryClient.prefetchQuery({
    queryKey: ["notes", page, search, perPage],
    queryFn: () => fetchNotes(search, page, perPage),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient />
    </HydrationBoundary>
  );
};

export default NotesPage;
