import { Skeleton, Box, Card, CardContent, Breadcrumbs } from '@mui/material';

function BookingOperatorSkeleton() {
    return (
        <Box sx={{ bgcolor: '#f5f5f5', minHeight: '100vh' }}>
            <Box component="main" sx={{ pb: 10 }}>
                <Box sx={{ maxWidth: 1200, mx: 'auto', px: 3 }}>
                    {/* Page Header */}
                    <Box sx={{ mb: 8 }}>
                        <Breadcrumbs sx={{ fontSize: '0.75rem', mb: 2 }}>
                            <Skeleton variant="text" width={60} />
                            <Skeleton variant="text" width={150} />
                        </Breadcrumbs>
                        <Skeleton
                            variant="text"
                            width={280}
                            height={40}
                            sx={{ mb: 1 }}
                        />
                    </Box>

                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 3,
                        }}
                    >
                        {/* Customer Information */}
                        <Card sx={{ borderRadius: 3, boxShadow: 1 }}>
                            <CardContent sx={{ p: 3 }}>
                                {/* Section Title */}
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        mb: 3,
                                    }}
                                >
                                    <Skeleton
                                        variant="rectangular"
                                        width={32}
                                        height={32}
                                        sx={{ borderRadius: 2, mr: 2 }}
                                    />
                                    <Skeleton
                                        variant="text"
                                        width={180}
                                        height={28}
                                    />
                                </Box>

                                {/* First Name / Last Name */}
                                <Box
                                    sx={{
                                        display: 'grid',
                                        gridTemplateColumns: {
                                            xs: '1fr',
                                            lg: '1fr 1fr',
                                        },
                                        gap: 3,
                                        mb: 3,
                                    }}
                                >
                                    {[...Array(2)].map((_, i) => (
                                        <Box key={i}>
                                            <Skeleton
                                                variant="text"
                                                width={80}
                                                height={20}
                                                sx={{ mb: 1 }}
                                            />
                                            <Skeleton
                                                variant="rectangular"
                                                width="100%"
                                                height={44}
                                                sx={{ borderRadius: 2 }}
                                            />
                                        </Box>
                                    ))}
                                </Box>

                                {/* Email / Phone */}
                                <Box
                                    sx={{
                                        display: 'grid',
                                        gridTemplateColumns: {
                                            xs: '1fr',
                                            lg: '1fr 1fr',
                                        },
                                        gap: 3,
                                    }}
                                >
                                    {[...Array(2)].map((_, i) => (
                                        <Box key={i}>
                                            <Skeleton
                                                variant="text"
                                                width={100}
                                                height={20}
                                                sx={{ mb: 1 }}
                                            />
                                            <Skeleton
                                                variant="rectangular"
                                                width="100%"
                                                height={44}
                                                sx={{ borderRadius: 2 }}
                                            />
                                        </Box>
                                    ))}
                                </Box>
                            </CardContent>
                        </Card>

                        {/* Tour Information */}
                        <Card sx={{ borderRadius: 3, boxShadow: 1 }}>
                            <CardContent sx={{ p: 3 }}>
                                {/* Section Title */}
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        mb: 3,
                                    }}
                                >
                                    <Skeleton
                                        variant="rectangular"
                                        width={32}
                                        height={32}
                                        sx={{ borderRadius: 2, mr: 2 }}
                                    />
                                    <Skeleton
                                        variant="text"
                                        width={150}
                                        height={28}
                                    />
                                </Box>

                                {/* Tour Type / Tour Itinerary */}
                                <Box
                                    sx={{
                                        display: 'grid',
                                        gridTemplateColumns: {
                                            xs: '1fr',
                                            md: '1fr 1fr',
                                        },
                                        gap: 3,
                                        mb: 2,
                                    }}
                                >
                                    {[...Array(2)].map((_, i) => (
                                        <Box key={i}>
                                            <Skeleton
                                                variant="text"
                                                width={90}
                                                height={20}
                                                sx={{ mb: 1 }}
                                            />
                                            <Skeleton
                                                variant="rectangular"
                                                width="100%"
                                                height={44}
                                                sx={{ borderRadius: 2 }}
                                            />
                                        </Box>
                                    ))}
                                </Box>

                                {/* Manual Tour Entry link */}
                                <Skeleton
                                    variant="text"
                                    width={140}
                                    height={20}
                                    sx={{ mb: 3 }}
                                />

                                {/* Youth / Adult / Youth Price */}
                                <Box
                                    sx={{
                                        display: 'grid',
                                        gridTemplateColumns: {
                                            xs: '1fr',
                                            md: '1fr 1fr 1fr',
                                        },
                                        gap: 3,
                                        mb: 3,
                                        borderTop: '1px solid #e0e0e0',
                                        pt: 3,
                                    }}
                                >
                                    {[...Array(3)].map((_, i) => (
                                        <Box key={i}>
                                            <Skeleton
                                                variant="text"
                                                width={110}
                                                height={20}
                                                sx={{ mb: 1 }}
                                            />
                                            <Skeleton
                                                variant="rectangular"
                                                width="100%"
                                                height={44}
                                                sx={{ borderRadius: 2 }}
                                            />
                                        </Box>
                                    ))}
                                </Box>

                                {/* Adult Price / Logistics Fee / Other Fee / Tour Date / Duration / Guide */}
                                <Box
                                    sx={{
                                        display: 'grid',
                                        gridTemplateColumns: {
                                            xs: '1fr',
                                            md: '1fr 1fr 1fr',
                                        },
                                        gap: 3,
                                    }}
                                >
                                    {[...Array(6)].map((_, i) => (
                                        <Box key={i}>
                                            <Skeleton
                                                variant="text"
                                                width={100}
                                                height={20}
                                                sx={{ mb: 1 }}
                                            />
                                            <Skeleton
                                                variant="rectangular"
                                                width="100%"
                                                height={44}
                                                sx={{ borderRadius: 2 }}
                                            />
                                        </Box>
                                    ))}
                                </Box>

                                {/* Notes */}
                                <Box sx={{ mt: 3 }}>
                                    <Skeleton
                                        variant="text"
                                        width={50}
                                        height={20}
                                        sx={{ mb: 1 }}
                                    />
                                    <Skeleton
                                        variant="rectangular"
                                        width="100%"
                                        height={100}
                                        sx={{ borderRadius: 2 }}
                                    />
                                </Box>
                            </CardContent>
                        </Card>
                    </Box>

                    {/* Fixed Submit Button */}
                    <Skeleton
                        variant="circular"
                        width={56}
                        height={56}
                        sx={{
                            position: 'fixed',
                            bottom: 24,
                            right: 24,
                            zIndex: 50,
                        }}
                    />
                </Box>
            </Box>
        </Box>
    );
}

export default BookingOperatorSkeleton;
