// Task 1.1

process.stdin.resume();

process.stdin.on("data", (data) => {
  const reversedData = data.reverse();
  process.stdout.write(reversedData);
});

process.stdout.on("error", () => {
  if (err.code === "EPIPE") return process.exit();
  process.emit("error", err);
});

process.on("SIGINT", () => {
  console.log("Press Control-C to exit.");
});
