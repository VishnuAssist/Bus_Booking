import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  IconButton,
  Chip,
  Box,
} from "@mui/material";
import {
  EmojiEvents as AwardIcon,
  Star as StarIcon,
  AutoAwesome as SparklesIcon,
  Close as CloseIcon,
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

const rarityColors: Record<Achievement["rarity"], string> = {
  common: "#94a3b8",
  rare: "#3b82f6",
  epic: "#a855f7",
  legendary: "#facc15",
};

export function AnimatedAchievement({
  achievement,
  isVisible,
  onClose,
}: AnimatedAchievementProps) {
  const [showParticles, setShowParticles] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setShowParticles(true);
      const timer = setTimeout(() => setShowParticles(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
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
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 rounded-full"
                  style={{
                    backgroundColor: rarityColors[achievement.rarity],
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  initial={{ scale: 0, opacity: 1 }}
                  animate={{ scale: [1, 2], opacity: [1, 0] }}
                  transition={{
                    delay: Math.random() * 2,
                    duration: 1 + Math.random() * 2,
                    repeat: Infinity,
                  }}
                />
              ))}
            </Box>
          )}

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Card
              sx={{
                maxWidth: 400,
                border: `2px solid ${rarityColors[achievement.rarity]}`,
                boxShadow: `0 0 20px ${rarityColors[achievement.rarity]}80`,
                position: "relative",
              }}
            >
              <CardContent sx={{ textAlign: "center", p: 4 }}>
                <IconButton
                  onClick={onClose}
                  size="small"
                  sx={{ position: "absolute", top: 8, right: 8 }}
                >
                  <CloseIcon />
                </IconButton>

                {/* Icon */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  <Box
                    sx={{
                      width: 80,
                      height: 80,
                      mx: "auto",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "white",
                      mb: 2,
                      background: `linear-gradient(135deg, ${rarityColors[achievement.rarity]}, #000)`,
                      boxShadow: 3,
                    }}
                  >
                    <AwardIcon sx={{ fontSize: 40 }} />
                  </Box>
                </motion.div>

                <Chip
                  label={achievement.rarity.toUpperCase()}
                  sx={{
                    border: `2px solid ${rarityColors[achievement.rarity]}`,
                    color: rarityColors[achievement.rarity],
                    mb: 2,
                  }}
                  variant="outlined"
                />

                <Box display="flex" justifyContent="center" alignItems="center" gap={1}>
                  <SparklesIcon sx={{ color: "gold" }} />
                  <Typography variant="h6" fontWeight="bold">
                    Achievement Unlocked!
                  </Typography>
                  <SparklesIcon sx={{ color: "gold" }} />
                </Box>

                <Typography variant="h5" fontWeight="bold" mt={1}>
                  {achievement.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" mb={2}>
                  {achievement.description}
                </Typography>

                <Box display="flex" justifyContent="center" alignItems="center" gap={1} mb={2}>
                  <StarIcon sx={{ color: "gold" }} />
                  <Typography fontWeight="bold">+{achievement.points} XP</Typography>
                </Box>

                <Button
                  onClick={onClose}
                  variant="contained"
                  fullWidth
                  startIcon={<StarIcon />}
                  sx={{ mt: 2 }}
                >
                  Claim Reward
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Demo
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
    <Box textAlign="center" mt={4}>
      <Button
        variant="contained"
        startIcon={<AwardIcon />}
        onClick={() => setShowAchievement(true)}
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
