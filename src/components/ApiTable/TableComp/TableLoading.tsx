import { CSSProperties } from "react";
import { BeatLoader } from "react-spinners";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

export const TableLoading = () => {
  return (
    <BeatLoader 
      color='silver'
      cssOverride={override}
      size={15}
    />
  )
}
