import { Helmet } from "@dr.pogodin/react-helmet";
import { Button, Grid, Typography } from "@mui/material";
import type { ReactNode } from "react";

interface PageHeaderProps {
    title: string;
    subtitle?: string;
    icon?: ReactNode;
    icon2?: ReactNode;
    btntitle?: string;
    btntitle2?: string;
    onActionClick?: () => void;
    onActionClick2?: () => void;
}

const PageHeader = ({ title, subtitle, btntitle, btntitle2, icon, icon2, onActionClick, onActionClick2 }: PageHeaderProps) => {
    return (
        <>
            <Helmet>
                <title>{title}</title>
            </Helmet>
            <Grid container display={"flex"} flexDirection={"row"} justifyContent="space-between" alignItems="center" sx={{ py: 2 }}>
                <Grid size={{ xs: 6, lg: 8 }}>
                    <Typography sx={{ fontSize: '18px', fontWeight: '800' }}>{title}</Typography>
                    <Typography variant="subtitle2" sx={{ fontSize: '15px', }}>{subtitle}</Typography>
                </Grid>
                <Grid size={{ xs: 6, lg: 4 }} sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center", gap: 2 }}>
                    {btntitle && (
                        <Button
                            sx={{ mt: { xs: 2, md: 0 } }}
                            variant="contained"
                            startIcon={icon}
                            onClick={onActionClick}
                        >
                            {btntitle}
                        </Button>
                    )}
                    {btntitle2 && (
                        <Button
                            sx={{ mt: { xs: 2, md: 0 } }}
                            variant="contained"
                            startIcon={icon2}
                            onClick={onActionClick2}
                        >
                            {btntitle2}
                        </Button>
                    )}
                </Grid>
            </Grid>
        </>
    )
};
export default PageHeader