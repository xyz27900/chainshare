import React from 'react';
import { Container } from '@/components/Container';

type AppLayoutProps = {
  header?: React.ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ header = null, children }) =>
  <div className="h-full flex flex-col">
    { header }
    <Container>
      <div className="flex flex-col h-full py-4">
        { children }
      </div>
    </Container>
  </div>;
