import { Box, Container, Typography, Link } from '@mui/material';

export default function Footer() {
  return (
    <Box
      sx={{
        background: 'linear-gradient(135deg,#667eea 0%,#764ba2 100%)', // same as Features
        color: 'white',
        py: 2
      }}
    >
      <Container maxWidth="lg" sx={{ p: 0, textAlign: 'center', fontSize: '0.875rem' }}>
        {/* Links */}
        <Box sx={{ mb: 1 }}>
          <Link href="#" color="inherit" underline="hover" sx={{ mx: 1 }}>Features</Link>
          <Link href="#" color="inherit" underline="hover" sx={{ mx: 1 }}>Pricing</Link>
          <Link href="#" color="inherit" underline="hover" sx={{ mx: 1 }}>About Us</Link>
          <Link href="#" color="inherit" underline="hover" sx={{ mx: 1 }}>Blog</Link>
          <Link href="#" color="inherit" underline="hover" sx={{ mx: 1 }}>Privacy Policy</Link>
        </Box>

        {/* Copyright */}
        <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.9)' }}>
          © {new Date().getFullYear()} FileConverter. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
}
