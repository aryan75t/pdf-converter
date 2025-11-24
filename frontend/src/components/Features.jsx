import { Box, Container, Typography, Card, CardContent } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import SpeedIcon from '@mui/icons-material/Speed';
import SecurityIcon from '@mui/icons-material/Security';
import FolderSpecialIcon from '@mui/icons-material/FolderSpecial';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PublicIcon from '@mui/icons-material/Public';

export default function Features() {
  const features = [
    { icon: CloudUploadIcon, title: 'Easy Upload', description: 'Drag & drop or click to upload files. Support multiple formats.' },
    { icon: SpeedIcon, title: 'Lightning Fast', description: 'Convert your files in seconds with optimized engine.' },
    { icon: SecurityIcon, title: 'Secure & Safe', description: 'Files are encrypted and deleted after conversion.' },
    { icon: FolderSpecialIcon, title: '50+ Formats', description: 'Convert documents, images, spreadsheets, presentations.' },
    { icon: CheckCircleIcon, title: 'High Quality', description: 'Maintain original formatting and quality.' },
    { icon: PublicIcon, title: 'No Installation', description: 'Works on any device with internet. No software required.' },
  ];

  return (
    <Box sx={{ background: 'linear-gradient(135deg,#667eea 0%,#764ba2 100%)', py: 10, px: 3 }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h3" sx={{ color: 'white', fontWeight: 800, mb: 2 }}>Why Choose FileConverter?</Typography>
          <Typography variant="h6" sx={{ color: 'rgba(255,255,255,0.9)', fontWeight: 300 }}>Everything you need for fast, secure file conversion</Typography>
        </Box>

        {/* Features Grid - CSS Grid */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(3, 1fr)' },
            gap: 4,
          }}
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} sx={{ background: 'rgba(255,255,255,0.95)', borderRadius: 3, p: 3, textAlign: 'center', transition: '0.3s', '&:hover': { transform: 'translateY(-5px)', boxShadow: '0 15px 40px rgba(0,0,0,0.2)' } }}>
                <Box sx={{ width: 60, height: 60, mx: 'auto', mb: 2, borderRadius: 2, background: 'linear-gradient(135deg,#667eea 0%,#764ba2 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon sx={{ fontSize: 32, color: 'white' }} />
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>{feature.title}</Typography>
                <Typography variant="body2" sx={{ color: '#666' }}>{feature.description}</Typography>
              </Card>
            );
          })}
        </Box>

        {/* CTA */}
        <Box sx={{ textAlign: 'center', mt: 8 }}>
          <Typography variant="h5" sx={{ color: 'white', mb: 2, fontWeight: 600 }}>Ready to get started?</Typography>
          <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.9)' }}>Start converting your files in seconds. No sign up required.</Typography>
        </Box>
      </Container>
    </Box>
  );
}
