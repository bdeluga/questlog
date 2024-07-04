import React from "react";

import Header from "@/components/Header";

export default async function MainAuthFlow({
  children,
}: {
  children: React.ReactElement;
}) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
