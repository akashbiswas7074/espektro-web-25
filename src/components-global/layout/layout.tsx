import React from 'react';
import { useLocation } from "react-router-dom";
import Navigation from "../navbar/navbar";
// import AudioControls from '../AudioControls';

interface PageLayoutProps {
  children: React.ReactNode;
}

const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  const location = useLocation();
  const isLandingPage = location.pathname === "/";

  return (
    <div className="page-layout">
      {!isLandingPage && <Navigation />}
      <main id="#layout">{children}</main>
      {/* <AudioControls /> */}
    </div>
  );
};

export default PageLayout;
