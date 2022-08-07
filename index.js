import WebSocket, { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 3000 });

wss.on("connection", () => {
  wss.on("message", (message) => {
    const data = JSON.parse(message);

    if (data.type === "message") {
      // send the message to all the connected clients, besides the one that sent it
      wss.clients.forEach((client) => {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify({ type: "message", data: data.data }));
        }
      });
    }
  });
});
