import app from "@/app";

const PORT = process.env.PORT || 8000;

// Start the server
const startServer = () => {
  try {
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
      console.log(
        `📊 Health check available at http://localhost:${PORT}/health`
      );
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
