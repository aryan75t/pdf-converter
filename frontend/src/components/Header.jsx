import { useState } from 'react';
import { Box, Container, Typography, Button, IconButton, Drawer } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const navItems = ['Home', 'Features', 'Contact'];

  const drawer = (
    <Box sx={{ p: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
        <IconButton onClick={handleDrawerToggle}>
          <CloseIcon sx={{ color: 'white' }} />
        </IconButton>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        {navItems.map((item) => (
          <Button
            key={item}
            sx={{
              color: 'white',
              textTransform: 'none',
              fontWeight: 600,
              fontSize: '1rem',
              justifyContent: 'flex-start',
              '&:hover': { background: 'rgba(255,255,255,0.1)' }
            }}
          >
            {item}
          </Button>
        ))}
      </Box>
    </Box>
  );

  return (
    <Box sx={{ background: 'linear-gradient(135deg,#667eea 0%,#764ba2 100%)', boxShadow: '0 4px 20px rgba(102,126,234,0.3)' }}>
      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 2 }}>
          
          {/* Logo shifted 50px left */}
          <Typography
            variant="h5"
            sx={{
              fontWeight: 800,
              color: 'white',
              fontSize: { xs: '1.3rem', md: '1.8rem' },
              whiteSpace: 'nowrap',
              ml: '-50px'
            }}
          >
            📄 FileConverter
          </Typography>

          {/* Desktop Navigation shifted 50px right */}
          <Box sx={{ display: { xs: 'none', sm: 'flex' }, gap: 2, mr: '-50px' }}>
            {navItems.map((item) => (
              <Button
                key={item}
                sx={{
                  color: 'white',
                  textTransform: 'none',
                  fontWeight: 600,
                  '&:hover': { background: 'rgba(255,255,255,0.1)' }
                }}
              >
                {item}
              </Button>
            ))}
          </Box>

          {/* Mobile Menu Button */}
          <IconButton
            onClick={handleDrawerToggle}
            sx={{ display: { xs: 'flex', sm: 'none' }, color: 'white' }}
          >
            <MenuIcon />
          </IconButton>
        </Box>
      </Container>

      {/* Mobile Drawer */}
      <Drawer
        anchor="top"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': {
            background: 'linear-gradient(135deg,#667eea 0%,#764ba2 100%)',
            marginTop: '60px',
          }
        }}
      >
        {drawer}
      </Drawer>
    </Box>
  );
}
