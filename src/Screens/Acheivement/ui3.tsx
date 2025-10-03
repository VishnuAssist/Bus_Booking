import { useState, useEffect } from "react"
import {
  Card,
  CardContent,
  Badge,
  Button,
  IconButton,
  Typography,
  Box
} from "@mui/material"
import {
  EmojiEvents as Award,
  Star,
  AutoAwesome as Sparkles,
  Close as X
} from "@mui/icons-material"
import { motion, AnimatePresence } from "framer-motion"

interface Achievement {
  id: string
  title: string
  description: string
  points: number
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
  icon: string
}

interface AnimatedAchievementProps {
  achievement: Achievement
  isVisible: boolean
  onClose: () => void
  className?: string
}

export function AnimatedAchievement({ 
  achievement, 
  isVisible, 
  onClose,
  className 
}: AnimatedAchievementProps) {
  const [showParticles, setShowParticles] = useState(false)
  
  useEffect(() => {
    if (isVisible) {
      setShowParticles(true)
      const timer = setTimeout(() => {
        setShowParticles(false)
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [isVisible])

  const rarityColors = {
    common: {
      gradient: 'linear-gradient(135deg, #94a3b8, #475569)',
      border: '#94a3b8',
      glow: 'rgba(148, 163, 184, 0.5)',
      badge: '#94a3b8'
    },
    rare: {
      gradient: 'linear-gradient(135deg, #60a5fa, #2563eb)',
      border: '#60a5fa',
      glow: 'rgba(96, 165, 250, 0.5)',
      badge: '#60a5fa'
    },
    epic: {
      gradient: 'linear-gradient(135deg, #a78bfa, #7c3aed)',
      border: '#a78bfa',
      glow: 'rgba(167, 139, 250, 0.5)',
      badge: '#a78bfa'
    },
    legendary: {
      gradient: 'linear-gradient(135deg, #fbbf24, #d97706)',
      border: '#fbbf24',
      glow: 'rgba(251, 191, 36, 0.5)',
      badge: '#fbbf24'
    }
  }

  const currentColors = rarityColors[achievement.rarity]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        duration: 0.3
      }
    },
    exit: { 
      opacity: 0,
      transition: {
        duration: 0.2
      }
    }
  }

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
  }

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
        duration: 1,
        repeat: Infinity,
        repeatType: "reverse" as const
      }
    }
  }

  const sparkleVariants = {
    animate: {
      scale: [1, 1.2, 1],
      rotate: [0, 180, 360],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "loop" as const
      }
    }
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {/* Particles Effect */}
          {showParticles && (
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {Array.from({ length: 20 }).map((_, i) => (
                <motion.div
                  key={i}
                  className={`absolute w-2 h-2 rounded-full ${
                    achievement.rarity === 'legendary' ? 'bg-yellow-400' :
                    achievement.rarity === 'epic' ? 'bg-purple-400' :
                    achievement.rarity === 'rare' ? 'bg-blue-400' : 'bg-slate-400'
                  }`}
                  initial={{ 
                    scale: 0,
                    opacity: 1 
                  }}
                  animate={{ 
                    scale: [0, 3, 0],
                    opacity: [1, 0.5, 0]
                  }}
                  transition={{
                    duration: 2 + Math.random(),
                    delay: Math.random() * 0.5,
                    repeat: Infinity,
                    repeatType: "loop"
                  }}
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                />
              ))}
            </div>
          )}

          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative max-w-md mx-4 overflow-hidden"
          >
            <Card 
              sx={{
                border: `2px solid ${currentColors.border}`,
                boxShadow: `0 0 30px 5px ${currentColors.glow}`,
                background: currentColors.gradient,
                position: 'relative',
                overflow: 'visible'
              }}
              className={className}
              data-testid="animated-achievement"
            >
              <Box
                sx={{
                  position: 'absolute',
                  inset: 0,
                  background: currentColors.gradient,
                  opacity: 0.1
                }}
              />
              
              <CardContent sx={{ p: 3, textAlign: 'center', position: 'relative' }}>
                <IconButton
                  sx={{ 
                    position: 'absolute', 
                    right: 8, 
                    top: 8,
                    color: 'white'
                  }}
                  onClick={onClose}
                  size="small"
                  data-testid="close-achievement"
                >
                  <X fontSize="small" />
                </IconButton>

                <Box sx={{ mb: 3 }}>
                  <motion.div
                    variants={iconVariants}
                    initial="initial"
                    animate="animate"
                    whileInView="bounce"
                    style={{
                      width: 80,
                      height: 80,
                      margin: '0 auto 16px auto',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
                      background: currentColors.gradient
                    }}
                  >
                    <Award sx={{ fontSize: 40 }} />
                  </motion.div>
                  
                  <Badge 
                    sx={{
                      px: 2,
                      py: 0.5,
                      border: `2px solid ${currentColors.badge}`,
                      backgroundColor: 'transparent',
                      color: 'white',
                      fontSize: '0.75rem',
                      fontWeight: 'bold',
                      borderRadius: 2
                    }}
                  >
                    {achievement.rarity.toUpperCase()}
                  </Badge>
                </Box>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                    <motion.div variants={sparkleVariants} animate="animate">
                      <Sparkles sx={{ color: '#FFD700', fontSize: 20 }} />
                    </motion.div>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'white' }}>
                      Achievement Unlocked!
                    </Typography>
                    <motion.div variants={sparkleVariants} animate="animate">
                      <Sparkles sx={{ color: '#FFD700', fontSize: 20 }} />
                    </motion.div>
                  </Box>
                  
                  <Typography variant="h5" sx={{ fontWeight: 'semibold', color: 'white' }}>
                    {achievement.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                    {achievement.description}
                  </Typography>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.5, color: '#FFD700' }}>
                    <Star sx={{ fontSize: 16, fill: 'currentColor' }} />
                    <Typography sx={{ fontWeight: 'bold', color: '#FFD700' }}>
                      +{achievement.points} XP
                    </Typography>
                  </Box>
                </Box>

                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button 
                    onClick={onClose}
                    fullWidth
                    sx={{
                      mt: 3,
                      background: 'rgba(255,255,255,0.2)',
                      color: 'white',
                      border: '1px solid rgba(255,255,255,0.3)',
                      '&:hover': {
                        background: 'rgba(255,255,255,0.3)',
                      }
                    }}
                    data-testid="claim-achievement"
                  >
                    <Star sx={{ mr: 1, fontSize: 16 }} />
                    Claim Reward
                  </Button>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Demo component to show achievement
export function AchievementDemo() {
  const [showAchievement, setShowAchievement] = useState(false)
  
  const demoAchievement: Achievement = {
    id: '1',
    title: 'Sales Superstar',
    description: 'Achieved 150% of monthly target',
    points: 500,
    rarity: 'legendary',
    icon: 'star'
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button 
          onClick={() => setShowAchievement(true)}
          variant="contained"
          startIcon={<Award />}
          data-testid="trigger-achievement"
        >
          Trigger Achievement
        </Button>
      </motion.div>
      
      <AnimatedAchievement
        achievement={demoAchievement}
        isVisible={showAchievement}
        onClose={() => setShowAchievement(false)}
      />
    </Box>
  )
}