'use client';

import { useEffect } from "react";

import EmptyState from "@/app/components/EmptyState";

interface ErrorStateProps {
  error: Error
}

const ErrorState: React.FC<ErrorStateProps> = ({ error }) => {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return ( 
  <div className="pt-[7.5rem]">
    <EmptyState
      title="Uh Oh"
      subtitle="Something went wrong!"
    />
  </div>
   );
}
 
export default ErrorState;
