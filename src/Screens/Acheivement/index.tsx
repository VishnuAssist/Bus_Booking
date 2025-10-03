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
  Dialog,
} from "@mui/material";
import {
  EmojiEvents,
  Star,
  AutoAwesome,
  Close,
} from "@mui/icons-material";
import { motion, AnimatePresence } from "framer-motion";

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
    maxWidth: 448,
    margin: "0 16px",
    border: `2px solid ${colors.border}`,
    boxShadow: showGlow ? `0 0 30px 5px ${colors.glow}` : theme.shadows[8],
    overflow: "visible",
    "&::before": {
      content: '""',
      position: "absolute",
      inset: 0,
      background: colors.gradient,
      opacity: 0.1,
    },
  };
});

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
    boxShadow: theme.shadows[4],
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

  return {
    border: `2px solid ${getBorderColor()}`,
    padding: "4px 12px",
    borderRadius: "12px",
    fontSize: "0.75rem",
    fontWeight: "bold",
    textTransform: "uppercase",
    backgroundColor: "transparent",
    color: "white",
  };
});

// Floating elements around the dialog
const floatingElements = [
  // Top side
  { id: 1, side: 'top', x: '20%', y: '-30px', delay: 0 },
  { id: 2, side: 'top', x: '50%', y: '-40px', delay: 0.3 },
  { id: 3, side: 'top', x: '80%', y: '-30px', delay: 0.6 },
  // Right side
  { id: 4, side: 'right', x: 'calc(100% + 30px)', y: '20%', delay: 0.2 },
  { id: 5, side: 'right', x: 'calc(100% + 40px)', y: '50%', delay: 0.5 },
  { id: 6, side: 'right', x: 'calc(100% + 30px)', y: '80%', delay: 0.8 },
  // Bottom side
  { id: 7, side: 'bottom', x: '20%', y: 'calc(100% + 30px)', delay: 0.4 },
  { id: 8, side: 'bottom', x: '50%', y: 'calc(100% + 40px)', delay: 0.7 },
  { id: 9, side: 'bottom', x: '80%', y: 'calc(100% + 30px)', delay: 1.0 },
  // Left side
  { id: 10, side: 'left', x: '-30px', y: '20%', delay: 0.1 },
  { id: 11, side: 'left', x: '-40px', y: '50%', delay: 0.6 },
  { id: 12, side: 'left', x: '-30px', y: '80%', delay: 0.9 },
];

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
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  const getParticleColor = () => {
    switch (achievement.rarity) {
      case "legendary":
        return "#FFD700";
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        duration: 0.3,
        when: "beforeChildren"
      }
    },
    exit: { 
      opacity: 0,
      transition: {
        duration: 0.2,
        when: "afterChildren"
      }
    }
  };

  const cardVariants = {
    hidden: { 
      scale: 0.8,
      opacity: 0,
      y: 20
    },
    visible: { 
      scale: 1,
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        duration: 0.6
      }
    },
    exit: { 
      scale: 0.8,
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.3
      }
    }
  };

  const iconVariants = {
    initial: { scale: 0, rotate: -180 },
    animate: { 
      scale: 1, 
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15,
        duration: 0.8
      }
    },
    bounce: {
      scale: [1, 1.1, 1],
      y: [0, -10, 0],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse" as const
      }
    }
  };

  const sparkleVariants = {
    animate: {
      scale: [1, 1.3, 1],
      rotate: [0, 180, 360],
      opacity: [0.7, 1, 0.7],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "loop" as const
      }
    }
  };

  const floatingElementVariants = {
    animate: (custom: any) => ({
      y: custom.side === 'top' || custom.side === 'bottom' ? [0, -10, 0] : [0, 0, 0],
      x: custom.side === 'left' || custom.side === 'right' ? [0, -5, 0] : [0, 0, 0],
      scale: [1, 1.2, 1],
      opacity: [0.6, 1, 0.6],
      transition: {
        duration: 2,
        delay: custom.delay,
        repeat: Infinity,
        repeatType: "reverse" as const
      }
    })
  };

  const particleVariants = {
    animate: (custom: any) => ({
      scale: [0, 2, 0],
      opacity: [1, 0.5, 0],
      x: custom.x || 0,
      y: custom.y || 0,
      transition: {
        duration: 2 + Math.random(),
        delay: Math.random() * 0.5,
        repeat: Infinity,
        repeatType: "loop" as const
      }
    })
  };

  return (
    <Dialog
      open={isVisible}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperComponent={({ children }) => (
        <Box sx={{ overflow: 'visible', position: 'relative' }}>
          {children}
        </Box>
      )}
      sx={{
        '& .MuiDialog-paper': {
          overflow: 'visible',
          backgroundColor: 'transparent',
          boxShadow: 'none',
        },
        '& .MuiBackdrop-root': {
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          backdropFilter: 'blur(4px)',
        }
      }}
    >
      <AnimatePresence>
        {isVisible && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {/* Background Particles */}
            {showParticles && (
              <Box
                sx={{
                  position: "absolute",
                  inset: 0,
                  overflow: "hidden",
                  pointerEvents: "none",
                }}
              >
                {Array.from({ length: 15 }).map((_, i) => (
                  <motion.div
                    key={i}
                    custom={{
                      x: (Math.random() - 0.5) * 100,
                      y: (Math.random() - 0.5) * 100
                    }}
                    variants={particleVariants}
                    initial="initial"
                    animate="animate"
                    style={{
                      position: 'absolute',
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      backgroundColor: getParticleColor(),
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                    }}
                  />
                ))}
              </Box>
            )}

            {/* Floating Elements Around All Four Sides */}
            {floatingElements.map((element) => (
              <motion.div
                key={element.id}
                custom={element}
                variants={floatingElementVariants}
                initial="initial"
                animate="animate"
                style={{
                  position: 'absolute',
                  left: element.x,
                  top: element.y,
                  zIndex: 10,
                }}
              >
                {element.id % 3 === 0 ? (
                  <Star 
                    sx={{ 
                      fontSize: 24, 
                      color: getParticleColor(),
                      filter: 'drop-shadow(0 0 6px currentColor)'
                    }} 
                  />
                ) : (
                  <AutoAwesome 
                    sx={{ 
                      fontSize: 20, 
                      color: getParticleColor(),
                      filter: 'drop-shadow(0 0 6px currentColor)'
                    }} 
                  />
                )}
              </motion.div>
            ))}

            {/* Main Achievement Card */}
            <motion.div
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <StyledCard 
                rarity={achievement.rarity} 
                showGlow={showParticles} 
                className={className}
              >
                <CardContent sx={{ position: "relative", p: 4, textAlign: "center" }}>
                  {/* Stable Close Button - No movement */}
                  <IconButton
                    sx={{
                      position: "absolute",
                      right: 12,
                      top: 12,
                      width: 32,
                      height: 32,
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                      },
                    }}
                    onClick={onClose}
                    data-testid="close-achievement"
                  >
                    <Close sx={{ width: 18, height: 18, color: 'white' }} />
                  </IconButton>

                  <Box sx={{ mb: 3 }}>
                    <motion.div
                      variants={iconVariants}
                      initial="initial"
                      animate="animate"
                      whileInView="bounce"
                    >
                      <IconContainer rarity={achievement.rarity}>
                        <EmojiEvents sx={{ width: 40, height: 40 }} />
                      </IconContainer>
                    </motion.div>

                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                    >
                      <StyledBadge
                        rarity={achievement.rarity}
                        badgeContent={achievement.rarity.toUpperCase()}
                        color="default"
                      />
                    </motion.div>
                  </Box>

                  <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 2 }}>
                      <motion.div variants={sparkleVariants} animate="animate">
                        <AutoAwesome sx={{ width: 24, height: 24, color: "#FFD700" }} />
                      </motion.div>
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                      >
                        <Typography variant="h6" component="h3" fontWeight="bold" color="white">
                          Achievement Unlocked!
                        </Typography>
                      </motion.div>
                      <motion.div variants={sparkleVariants} animate="animate">
                        <AutoAwesome sx={{ width: 24, height: 24, color: "#FFD700" }} />
                      </motion.div>
                    </Box>

                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.7 }}
                    >
                      <Typography variant="h5" component="h4" fontWeight="bold" color="white">
                        {achievement.title}
                      </Typography>
                    </motion.div>

                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.9 }}
                    >
                      <Typography variant="body1" color="rgba(255,255,255,0.9)">
                        {achievement.description}
                      </Typography>
                    </motion.div>

                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 1.1, type: "spring", stiffness: 200 }}
                      style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}
                    >
                      <Star sx={{ width: 20, height: 20, color: "#FFD700" }} />
                      <Typography variant="h6" fontWeight="bold" color="#FFD700">
                        +{achievement.points} XP
                      </Typography>
                    </motion.div>
                  </Box>

                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 1.3 }}
                  >
                    <Button
                      variant="contained"
                      onClick={onClose}
                      fullWidth
                      sx={{ 
                        mt: 3,
                        py: 1.5,
                        background: 'linear-gradient(135deg, rgba(255,255,255,0.3), rgba(255,255,255,0.1))',
                        color: 'white',
                        border: '2px solid rgba(255,255,255,0.4)',
                        fontSize: '1rem',
                        fontWeight: 'bold',
                        borderRadius: 2,
                        backdropFilter: 'blur(10px)',
                        '&:hover': {
                          background: 'linear-gradient(135deg, rgba(255,255,255,0.4), rgba(255,255,255,0.2))',
                          border: '2px solid rgba(255,255,255,0.6)',
                        }
                      }}
                      startIcon={<Star />}
                      data-testid="claim-achievement"
                    >
                      Claim Reward
                    </Button>
                  </motion.div>
                </CardContent>
              </StyledCard>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Dialog>
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
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button
          variant="contained"
          onClick={() => setShowAchievement(true)}
          startIcon={<EmojiEvents />}
          data-testid="trigger-achievement"
          size="large"
          sx={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            fontSize: '1.1rem',
            px: 4,
            py: 1.5,
            borderRadius: 3,
            boxShadow: '0 8px 25px rgba(102, 126, 234, 0.4)',
          }}
        >
          🎉 Trigger Achievement 🎉
        </Button>
      </motion.div>

      <AnimatedAchievement
        achievement={demoAchievement}
        isVisible={showAchievement}
        onClose={() => setShowAchievement(false)}
      />
    </Box>
  );
}