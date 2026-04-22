import { ReactNode } from "react";

interface PageContainerProps {
  children: ReactNode;
  className?: string;
}

export function PageContainer({ children, className = "" }: PageContainerProps) {
  return (
    <div className={`p-6 md:p-8 lg:p-10 max-w-md md:max-w-4xl lg:max-w-6xl mx-auto w-full pb-32 md:pb-12 ${className}`}>
      {children}
    </div>
  );
}
