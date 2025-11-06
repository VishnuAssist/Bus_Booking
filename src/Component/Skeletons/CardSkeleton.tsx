import React from "react";
import {
  Grid,
  Card,
  CardContent,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";

const UserGroupCardSkeleton: React.FC = () => {
  // Display 6 cards as placeholders
  const skeletonItems = Array.from({ length: 6 });

  return (
    <Grid container spacing={2} sx={{ px: 1 }}>
      {skeletonItems.map((_, index) => (
        <Grid size={{xs:12,sm:6,md:4}}  key={index}>
          <Card
            sx={{
              borderRadius: 3,
              boxShadow: 2,
              p: 1,
            }}
          >
            <CardContent>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                mb={1}
              >
                {/* Group name */}
                <Skeleton variant="text" width={120} height={28} />

                {/* Action icons */}
                <Stack direction="row" spacing={1}>
                  <Skeleton variant="circular" width={28} height={28} />
                  <Skeleton variant="circular" width={28} height={28} />
                  <Skeleton variant="circular" width={28} height={28} />
                </Stack>
              </Stack>

              {/* Description */}
              <Typography variant="body2" color="text.secondary" gutterBottom>
                <Skeleton variant="text" width="90%" height={20} />
                <Skeleton variant="text" width="70%" height={20} />
              </Typography>

              {/* Members info */}
              <Stack direction="row" justifyContent="space-between" mt={2}>
                <Skeleton variant="text" width={100} height={20} />
                <Skeleton variant="text" width={80} height={20} />
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default UserGroupCardSkeleton;
