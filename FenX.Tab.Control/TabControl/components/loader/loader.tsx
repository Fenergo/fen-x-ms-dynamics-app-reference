import { Spinner } from "@fluentui/react";
import React from "react";

export interface ILoaderContext {}

export const LoadingSpinner: React.FC<ILoaderContext> = () => {
  return (
    <div
      style={{
        position: "relative",
        height: "100%",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Spinner
        style={{
          height: 100,
          width: 100,
        }}
      />
    </div>
  );
};
