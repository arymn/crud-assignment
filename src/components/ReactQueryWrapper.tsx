"use client";

import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { FC } from "react";

interface ReactQueryWrapperProps {
  children: React.ReactNode;
}

const ReactQueryWrapper: FC<ReactQueryWrapperProps> = ({ children }) => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default ReactQueryWrapper;
