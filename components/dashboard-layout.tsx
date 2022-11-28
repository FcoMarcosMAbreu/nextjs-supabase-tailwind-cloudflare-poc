import React from "react";

type Props = {};

const DashboardLayout = ({ children }: React.PropsWithChildren<Props>) => {
  return <div className="container">{children}</div>;
};

export default DashboardLayout;

export const getDashboardLayout = (page: React.ReactNode) => {
  return <DashboardLayout>{page}</DashboardLayout>;
};
