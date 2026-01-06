import {
    Skeleton,
    Box,
    Card,
    CardContent,
    Breadcrumbs,
    Typography,
} from '@mui/material'

function BlogOperatorSkelton() {
    return (
        <Box sx={{ bgcolor: '#f5f5f5', minHeight: '100vh' }}>
            <Box component="main" sx={{ pb: 10 }}>
                <Box sx={{ maxWidth: 1200, mx: 'auto', px: 3 }}>
                    {/* Page Header */}
                    <Box sx={{ mb: 8 }}>
                        <Breadcrumbs sx={{ fontSize: '0.75rem', mb: 2 }}>
                            <Skeleton variant="text" width={40} />
                            <Skeleton variant="text" width={100} />
                        </Breadcrumbs>
                        <Skeleton
                            variant="text"
                            width={300}
                            height={40}
                            sx={{ mb: 1 }}
                        />
                        <Skeleton variant="text" width={400} height={24} />
                    </Box>

                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 3,
                        }}
                    >
                        {/* Basic Information */}
                        <Card sx={{ borderRadius: 3, boxShadow: 1 }}>
                            <CardContent sx={{ p: 3 }}>
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

                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: 2.5,
                                    }}
                                >
                                    <Box>
                                        <Skeleton
                                            variant="text"
                                            width={80}
                                            height={20}
                                            sx={{ mb: 1 }}
                                        />
                                        <Skeleton
                                            variant="rectangular"
                                            width="100%"
                                            height={48}
                                            sx={{ borderRadius: 2 }}
                                        />
                                    </Box>
                                    <Box>
                                        <Skeleton
                                            variant="text"
                                            width={70}
                                            height={20}
                                            sx={{ mb: 1 }}
                                        />
                                        <Skeleton
                                            variant="rectangular"
                                            width="100%"
                                            height={48}
                                            sx={{ borderRadius: 2 }}
                                        />
                                    </Box>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            gap: 2.5,
                                            flexWrap: 'wrap',
                                        }}
                                    >
                                        <Box sx={{ flex: 1, minWidth: 200 }}>
                                            <Skeleton
                                                variant="text"
                                                width={70}
                                                height={20}
                                                sx={{ mb: 1 }}
                                            />
                                            <Skeleton
                                                variant="rectangular"
                                                width="100%"
                                                height={48}
                                                sx={{ borderRadius: 2 }}
                                            />
                                        </Box>
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                gap: 1,
                                            }}
                                        >
                                            <Skeleton
                                                variant="text"
                                                width={60}
                                                height={20}
                                            />
                                            <Box
                                                sx={{ display: 'flex', gap: 4 }}
                                            >
                                                <Skeleton
                                                    variant="circular"
                                                    width={20}
                                                    height={20}
                                                />
                                                <Skeleton
                                                    variant="circular"
                                                    width={20}
                                                    height={20}
                                                />
                                            </Box>
                                        </Box>
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                gap: 1,
                                            }}
                                        >
                                            <Skeleton
                                                variant="text"
                                                width={50}
                                                height={20}
                                            />
                                            <Box
                                                sx={{ display: 'flex', gap: 4 }}
                                            >
                                                <Skeleton
                                                    variant="circular"
                                                    width={20}
                                                    height={20}
                                                />
                                                <Skeleton
                                                    variant="circular"
                                                    width={20}
                                                    height={20}
                                                />
                                            </Box>
                                        </Box>
                                    </Box>
                                    <Box>
                                        <Skeleton
                                            variant="text"
                                            width={120}
                                            height={20}
                                            sx={{ mb: 1 }}
                                        />
                                        <Skeleton
                                            variant="rectangular"
                                            width="100%"
                                            height={80}
                                            sx={{ borderRadius: 2 }}
                                        />
                                    </Box>
                                </Box>
                            </CardContent>
                        </Card>

                        {/* Featured Image */}
                        <Card sx={{ borderRadius: 3, boxShadow: 1 }}>
                            <CardContent sx={{ p: 3 }}>
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
                                        width={130}
                                        height={28}
                                    />
                                </Box>
                                <Skeleton
                                    variant="rectangular"
                                    width="100%"
                                    height={350}
                                    sx={{ borderRadius: 2 }}
                                />
                            </CardContent>
                        </Card>

                        {/* Content Editor (without preview toggle) */}
                        <Card sx={{ borderRadius: 3, boxShadow: 1 }}>
                            <CardContent sx={{ p: 3 }}>
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
                                        width={120}
                                        height={28}
                                    />
                                </Box>

                                {/* Toolbar */}
                                <Box
                                    sx={{
                                        bgcolor: '#f5f5f5',
                                        p: 2,
                                        borderRadius: '8px 8px 0 0',
                                        border: '1px solid #e0e0e0',
                                        display: 'flex',
                                        gap: 1.5,
                                        mb: 0,
                                    }}
                                >
                                    {Array.from({ length: 10 }).map(
                                        (_, index) => (
                                            <Skeleton
                                                key={index}
                                                variant="rectangular"
                                                width={40}
                                                height={32}
                                                sx={{ borderRadius: 1 }}
                                            />
                                        )
                                    )}
                                </Box>

                                {/* Editor */}
                                <Skeleton
                                    variant="rectangular"
                                    width="100%"
                                    height={600}
                                    sx={{
                                        borderRadius: '0 0 8px 8px',
                                        border: '1px solid #e0e0e0',
                                        borderTop: 0,
                                    }}
                                />
                            </CardContent>
                        </Card>

                        {/* Tags & SEO */}
                        <Card sx={{ borderRadius: 3, boxShadow: 1 }}>
                            <CardContent sx={{ p: 3 }}>
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
                                        width={100}
                                        height={28}
                                    />
                                </Box>
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
                                    <Box>
                                        <Skeleton
                                            variant="text"
                                            width={40}
                                            height={20}
                                            sx={{ mb: 1 }}
                                        />
                                        <Skeleton
                                            variant="rectangular"
                                            width="100%"
                                            height={48}
                                            sx={{ borderRadius: 2 }}
                                        />
                                    </Box>
                                    <Box>
                                        <Skeleton
                                            variant="text"
                                            width={100}
                                            height={20}
                                            sx={{ mb: 1 }}
                                        />
                                        <Skeleton
                                            variant="rectangular"
                                            width="100%"
                                            height={48}
                                            sx={{ borderRadius: 2 }}
                                        />
                                    </Box>
                                </Box>
                            </CardContent>
                        </Card>
                    </Box>

                    {/* Fixed Button */}
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
    )
}

export default BlogOperatorSkelton
