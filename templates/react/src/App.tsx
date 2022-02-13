import React from "react";
import { createArche } from "./arche";

function App() {
	React.useEffect(() => {
		createArche();
	}, []);

	return (
		<canvas id="canvas" style={{ width: "100vw", height: "100vh" }}></canvas>
	);
}

export default App;
