import { Box } from "@mui/material";

/**
 * Cartographic dot-grid background for light mode sections.
 * Two layers (primary 36px + secondary 18px) drift diagonally
 * at different speeds, fade in/out at section edges.
 */
const GeoDots = () => (
  <Box
    aria-hidden
    sx={{
      position: "absolute",
      inset: 0,
      overflow: "hidden",
      pointerEvents: "none",
      zIndex: 0,
      // Fade at top and bottom so section transitions are clean
      maskImage:
        "linear-gradient(to bottom, transparent 0%, black 14%, black 86%, transparent 100%)",
      WebkitMaskImage:
        "linear-gradient(to bottom, transparent 0%, black 14%, black 86%, transparent 100%)",
    }}
  >
    {/* Primary grid — 36px spacing, slower drift */}
    <Box
      sx={{
        position: "absolute",
        inset: 0,
        backgroundImage:
          "radial-gradient(circle, rgba(0,161,82,0.22) 1.2px, transparent 1.2px)",
        backgroundSize: "36px 36px",
        animation: "geoDrift 32s linear infinite",
      }}
    />

    {/* Secondary grid — 18px spacing, faster drift, more subtle */}
    <Box
      sx={{
        position: "absolute",
        inset: 0,
        backgroundImage:
          "radial-gradient(circle, rgba(2,132,199,0.10) 0.8px, transparent 0.8px)",
        backgroundSize: "18px 18px",
        animation: "geoDrift 18s linear infinite reverse",
      }}
    />
  </Box>
);

export default GeoDots;
