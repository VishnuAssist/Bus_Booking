import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Badge,
  Button,
  IconButton,
  Box,
  Typography,
  styled,
} from "@mui/material";
import {
  EmojiEvents,
  Star,
  AutoAwesome,
  Close,
} from "@mui/icons-material";

interface Achievement {
  id: string;
  title: string;
  description: string;
  points: number;
  rarity: "common" | "rare" | "epic" | "legendary";
  icon: string;
}

interface AnimatedAchievementProps {
  achievement: Achievement;
  isVisible: boolean;
  onClose: () => void;
  className?: string;
}

const StyledCard = styled(Card, {
  shouldForwardProp: (prop) => prop !== 'rarity' && prop !== 'showGlow',
})<{ rarity: string; showGlow: boolean }>(({ theme, rarity, showGlow }) => {
  const getRarityColors = () => {
    switch (rarity) {
      case "common":
        return {
          gradient: `linear-gradient(135deg, ${theme.palette.grey[400]}, ${theme.palette.grey[600]})`,
          border: theme.palette.grey[400],
          glow: theme.palette.grey[400] + "50",
        };
      case "rare":
        return {
          gradient: `linear-gradient(135deg, ${theme.palette.info.light}, ${theme.palette.info.dark})`,
          border: theme.palette.info.light,
          glow: theme.palette.info.light + "50",
        };
      case "epic":
        return {
          gradient: `linear-gradient(135deg, ${theme.palette.secondary.light}, ${theme.palette.secondary.dark})`,
          border: theme.palette.secondary.light,
          glow: theme.palette.secondary.light + "50",
        };
      case "legendary":
        return {
          gradient: `linear-gradient(135deg, ${theme.palette.warning.light}, ${theme.palette.warning.dark})`,
          border: theme.palette.warning.light,
          glow: theme.palette.warning.light + "50",
        };
      default:
        return {
          gradient: `linear-gradient(135deg, ${theme.palette.grey[400]}, ${theme.palette.grey[600]})`,
          border: theme.palette.grey[400],
          glow: theme.palette.grey[400] + "50",
        };
    }
  };

  const colors = getRarityColors();

  return {
    position: "relative",
    width:"100%",
    maxWidth: 348,
    margin: "0 16px",
    animation: "zoomIn 0.5s ease-out",
    border: `2px solid ${colors.border}`,
    boxShadow: showGlow ? `0 0 30px 5px ${colors.glow}` : theme.shadows[8],
    overflow: "hidden",
    "&::before": {
      content: '""',
      position: "absolute",
      inset: 0,
      background: colors.gradient,
      opacity: 0.1,
    },
    "@keyframes zoomIn": {
      from: {
        opacity: 0,
        transform: "scale(0.8)",
      },
      to: {
        opacity: 1,
        transform: "scale(1)",
      },
    },
  };
});

const Particle = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'color' && prop !== 'delay' && prop !== 'duration',
})<{ color: string; delay: number; duration: number }>(({ color, delay, duration }) => ({
  position: "absolute",
  width: 8,
  height: 8,
  borderRadius: "50%",
  animation: `ping ${duration}s infinite`,
  animationDelay: `${delay}s`,
  backgroundColor: color,
  "@keyframes ping": {
    "0%": {
      transform: "scale(1)",
      opacity: 1,
    },
    "75%, 100%": {
      transform: "scale(2)",
      opacity: 0,
    },
  },
}));

const IconContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'rarity',
})<{ rarity: string }>(({ theme, rarity }) => {
  const getGradient = () => {
    switch (rarity) {
      case "common":
        return `linear-gradient(135deg, ${theme.palette.grey[400]}, ${theme.palette.grey[600]})`;
      case "rare":
        return `linear-gradient(135deg, ${theme.palette.info.light}, ${theme.palette.info.dark})`;
      case "epic":
        return `linear-gradient(135deg, ${theme.palette.secondary.light}, ${theme.palette.secondary.dark})`;
      case "legendary":
        return `linear-gradient(135deg, ${theme.palette.warning.light}, ${theme.palette.warning.dark})`;
      default:
        return `linear-gradient(135deg, ${theme.palette.grey[400]}, ${theme.palette.grey[600]})`;
    }
  };

  return {
    width: 80,
    height: 80,
    margin: "0 auto 12px auto",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: theme.palette.common.white,
    background: getGradient(),
    animation: "bounce 1s infinite",
    boxShadow: theme.shadows[4],
    "@keyframes bounce": {
      "0%, 100%": {
        transform: "translateY(0)",
      },
      "50%": {
        transform: "translateY(-10px)",
      },
    },
  };
});

const StyledBadge = styled(Badge, {
  shouldForwardProp: (prop) => prop !== 'rarity',
})<{ rarity: string }>(({ theme, rarity }) => {
  const getBorderColor = () => {
    switch (rarity) {
      case "common":
        return theme.palette.grey[400];
      case "rare":
        return theme.palette.info.light;
      case "epic":
        return theme.palette.secondary.light;
      case "legendary":
        return theme.palette.warning.light;
      default:
        return theme.palette.grey[400];
    }
  };
  const styles = getBorderColor();
  return {


     display: "inline-block",
    padding: "6px 16px",
    borderRadius: "16px",
    fontSize: "0.75rem",
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    margin: "8px auto",
    
  };
});

export function AnimatedAchievement({
  achievement,
  isVisible,
  onClose,
  className,
}: AnimatedAchievementProps) {
  const [showParticles, setShowParticles] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setShowParticles(true);
      const timer = setTimeout(() => {
        setShowParticles(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  const getParticleColor = () => {
    switch (achievement.rarity) {
      case "legendary":
        return "#FFC107";
      case "epic":
        return "#9C27B0";
      case "rare":
        return "#2196F3";
      case "common":
        return "#78909C";
      default:
        return "#78909C";
    }
  };

  if (!isVisible) return null;

  return (
    <Box
      sx={{
        position: "fixed",
        inset: 0,
        zIndex: 1300,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        backdropFilter: "blur(4px)",
      }}
    >
      {/* Particles Effect */}
      {showParticles && (
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            overflow: "hidden",
            pointerEvents: "none",
          }}
        >
          {Array.from({ length: 20 }).map((_, i) => (
            <Particle
              key={i}
              color={getParticleColor()}
              delay={Math.random() * 2}
              duration={1 + Math.random() * 2}
              sx={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </Box>
      )}

      <StyledCard rarity={achievement.rarity} showGlow={showParticles} className={className} >
        <CardContent sx={{ position: "relative", p: 3, textAlign: "center" }}>
          <IconButton
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              width: 24,
              height: 24,
            }}
            onClick={onClose}
            data-testid="close-achievement"
          >
            <Close sx={{ width: 16, height: 16 }} />
          </IconButton>

          <Box sx={{ mb: 3 }}>
            <IconContainer rarity={achievement.rarity}>
              <EmojiEvents sx={{ width: 40, height: 40 }} />
            </IconContainer>

            <StyledBadge
              rarity={achievement.rarity}
              badgeContent={achievement.rarity.toUpperCase()}
              color="default"
            />
          </Box>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 1 }}>
              <AutoAwesome sx={{ width: 20, height: 20, color: "warning.main", animation: "pulse 1s infinite" }} />
              <Typography variant="h6" component="h3" fontWeight="bold">
                Achievement Unlocked!
              </Typography>
              <AutoAwesome sx={{ width: 20, height: 20, color: "warning.main", animation: "pulse 1s infinite" }} />
            </Box>

            <Typography variant="h5" component="h4" fontWeight="semibold">
              {achievement.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {achievement.description}
            </Typography>

            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 0.5 }}>
              <Star sx={{ width: 16, height: 16, color: "warning.main" }} />
              <Typography variant="body1" fontWeight="bold" color="warning.main">
                +{achievement.points} XP
              </Typography>
            </Box>
          </Box>

          <Button
            variant="contained"
            onClick={onClose}
            fullWidth
            sx={{ mt: 4 }}
            startIcon={<Star />}
            data-testid="claim-achievement"
          >
            Claim Reward
          </Button>
        </CardContent>
      </StyledCard>
    </Box>
  );
}

// Demo component to show achievement
export function AchievementDemo() {
  const [showAchievement, setShowAchievement] = useState(false);

  const demoAchievement: Achievement = {
    id: "1",
    title: "Sales Superstar",
    description: "Achieved 150% of monthly target",
    points: 500,
    rarity: "legendary",
    icon: "star",
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Button
        variant="contained"
        onClick={() => setShowAchievement(true)}
        startIcon={<EmojiEvents />}
        data-testid="trigger-achievement"
      >
        Trigger Achievement
      </Button>

      <AnimatedAchievement
        achievement={demoAchievement}
        isVisible={showAchievement}
        onClose={() => setShowAchievement(false)}
      />
    </Box>
  );
}