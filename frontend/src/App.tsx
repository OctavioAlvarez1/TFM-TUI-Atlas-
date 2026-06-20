import { Box } from "@mui/material";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import HeroSection from "./components/sections/HeroSection";
import FeaturesSection from "./components/sections/FeaturesSection";
import StatsBar from "./components/sections/StatsBar";
import DashboardPreviewSection from "./components/sections/DashboardPreviewSection";
import KeyQuestionsSection from "./components/sections/KeyQuestionsSection";
import DataSourcesSection from "./components/sections/DataSourcesSection";
import HowItWorksSection from "./components/sections/HowItWorksSection";

const App = () => {
  return (
    <Box sx={{ minHeight: "100vh" }}>
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <StatsBar />
        <DashboardPreviewSection />
        <KeyQuestionsSection />
        <DataSourcesSection />
        <HowItWorksSection />
      </main>
      <Footer />
    </Box>
  );
};

export default App;
