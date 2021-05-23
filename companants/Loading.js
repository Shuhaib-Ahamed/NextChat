import { Circle } from "better-react-spinkit";

function Loading() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vH",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <h1 style={{ fontSize: "60px" }}>Next Chat</h1>
      <Circle color="#9737f1" size={80} />
    </div>
  );
}

export default Loading;
