const PageHeader = () => {
    return (
        <>
            <Box sx={{ minHeight: "100vh", background: "linear-gradient(120deg,#111424 60%,#232551 100%)" }}>
                <Box sx={{ p: { xs: 2, md: 4 } }}>
                    <Stack direction="row" alignItems="center" spacing={1}>
                        <Typography
                            variant="h4"
                            sx={{ fontWeight: 700, color: "#346cff" }}
                        >
                            Welcome back,
                        </Typography>
                        <NeonText variant="h4">Alex!</NeonText>
                        <BoltRoundedIcon sx={{ color: "#55ff99", ml: 1, fontSize: 34 }} />
                    </Stack>
                    <Box sx={{ color: "#9cb7ff", mt: 0.5, mb: 3 }}>
                        <Typography variant="subtitle1">
                            You're doing great! Keep up the momentum.
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </>
    );
};
export default PageHeader;