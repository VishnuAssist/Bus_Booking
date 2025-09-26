import { Backdrop, Box, CircularProgress, Typography, styled, keyframes } from "@mui/material"

const pulseAnimation = keyframes`
  0%, 100% {
    opacity: 0.4;
  }
  50% {
    opacity: 1;
  }
`

const BlurredBackdrop = styled(Backdrop)(({ theme }) => ({
  backgroundColor: "rgba(0, 0, 0, 0.2)",
  backdropFilter: "blur(8px)",
  zIndex: theme.zIndex.modal + 1,
}))

const LoadingCard = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: theme.spacing(4),

  borderRadius: theme.spacing(2),
 
  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
  minWidth: "200px",
  minHeight: "150px",
}))

const AnimatedDot = styled(Box)<{ delay: number }>(({ delay }) => ({
  width: 8,
  height: 8,
  backgroundColor: "blue",
  borderRadius: "50%",
  animation: `${pulseAnimation} 1.5s infinite`,
  animationDelay: `${delay}s`,
}))

const LazyLoading = ({ open = true }: { open?: boolean }) => {
  return (
    <BlurredBackdrop open={open}>
      <LoadingCard>
        
        <Box sx={{ position: "relative", mb: 2 }}>
          <CircularProgress
            size={48}
            thickness={4}
            sx={{
              color: "primary.main",
              "& .MuiCircularProgress-circle": {
                strokeLinecap: "round",
              },
            }}
          />
        </Box>

       
        <Typography
          variant="h6"
          sx={{
             color: "primary.main",
            fontWeight: 500,
            letterSpacing: "0.05em",
            mb: 1,
          }}
        >
          Loading...
        </Typography>

        <Box sx={{ display: "flex", gap: 0.5 }}>
          <AnimatedDot delay={0} />
          <AnimatedDot delay={0.2} />
          <AnimatedDot delay={0.4} />
        </Box>
      </LoadingCard>
    </BlurredBackdrop>
  )
}

export default LazyLoading
