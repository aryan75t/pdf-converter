import { useState, useRef } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Paper,
  Stack,
  CircularProgress,
  Alert,
  Card,
  CardContent,
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import DeleteIcon from '@mui/icons-material/Delete';

export default function HeroSection() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [fromPdfType, setFromPdfType] = useState('docx');
  const fileInputRef = useRef(null);

  const allowedFormats = [
    'doc', 'docx', 'txt', 'html', 'ppt', 'pptx',
    'jpg', 'jpeg', 'png', 'bmp', 'tiff', 'gif',
    'xls', 'xlsx', 'csv',
  ];

  const getFileExtension = (filename) => filename.split('.').pop().toLowerCase();

  const validateFile = (f) => {
    if (!f) { setMessage({ type: 'error', text: 'Please select a file.' }); return false; }
    const ext = getFileExtension(f.name);
    if (!allowedFormats.includes(ext)) {
      setMessage({ type: 'error', text: `File format .${ext} not supported.` }); return false;
    }
    if (f.size > 50 * 1024 * 1024) { setMessage({ type: 'error', text: 'File exceeds 50MB.' }); return false; }
    return true;
  };

  const handleFileSelect = (e) => {
    const f = e.target.files[0];
    if (f && validateFile(f)) { setFile(f); setMessage({ type: 'success', text: `File selected: ${f.name}` }); }
  };

  const handleDragOver = (e) => { e.preventDefault(); e.stopPropagation(); };
  const handleDrop = (e) => {
    e.preventDefault(); e.stopPropagation();
    const f = e.dataTransfer.files[0];
    if (f && validateFile(f)) { setFile(f); setMessage({ type: 'success', text: `File selected: ${f.name}` }); }
  };

  const downloadFile = (blob, filename) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const convertFile = async () => {
    if (!file) { setMessage({ type: 'error', text: 'Please select a file first.' }); return; }
    if (!validateFile(file)) return;

    setLoading(true);
    setMessage({ type: 'info', text: 'Uploading file...' });

    try {
      const formData = new FormData();
      formData.append('file', file);

      let url = `http://localhost:3001/convert-file`;
      if (getFileExtension(file.name) === 'pdf') url += `?to=${fromPdfType}`;

      const resp = await fetch(url, { method: 'POST', body: formData });
      const data = await resp.json();
      if (!resp.ok || data.error) throw new Error(data.error || 'Conversion failed');

      setMessage({ type: 'info', text: 'Downloading file...' });
      const downloadResp = await fetch(data.resultUrl);
      const blob = await downloadResp.blob();

      let outName = file.name.split('.')[0];
      const ext = getFileExtension(file.name);
      if (ext === 'pdf') outName += `.${fromPdfType}`;
      else outName += '.pdf';

      downloadFile(blob, outName);
      setMessage({ type: 'success', text: '✅ File converted successfully!' });

    } catch (err) {
      console.error(err);
      setMessage({ type: 'error', text: `❌ Conversion error: ${err.message}` });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ 
      background: 'linear-gradient(135deg,#667eea 0%,#764ba2 100%)', 
      py: 10,
      Height: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      px: { xs: 1, sm: 2 },
      mt: -2
    }}>
      <Container maxWidth="sm">
        {/* Header Section */}
        <Box sx={{ textAlign: 'center', color: 'white', mb: { xs: 3, sm: 4, md: 4 } }}>
          <Typography 
            variant="h3" 
            sx={{ 
              fontWeight: 800, 
              mb: { xs: 1, sm: 1.5 }, 
              fontSize: { xs: '1.5rem', sm: '2rem', md: '3rem' },
              lineHeight: { xs: 1.2, md: 1.3 }
            }}
          >
            🚀 Convert Your Files
          </Typography>
          <Typography 
            variant="h6" 
            sx={{ 
              fontWeight: 300, 
              opacity: 0.95,
              fontSize: { xs: '0.9rem', sm: '1rem', md: '1.25rem' }
            }}
          >
            Upload any document or PDF to convert instantly
          </Typography>
        </Box>

        {/* Main Card */}
        <Paper 
          elevation={8} 
          sx={{ 
            p: { xs: 2, sm: 3, md: 4 }, 
            borderRadius: { xs: 2, sm: 3 }, 
            background: 'rgba(255,255,255,0.98)', 
            backdropFilter: 'blur(10px)',
          }}
        >
          <Stack spacing={{ xs: 2, sm: 3 }}>
            {/* File upload */}
            <Paper 
              variant="outlined" 
              onDragOver={handleDragOver} 
              onDrop={handleDrop} 
              onClick={() => fileInputRef.current?.click()} 
              sx={{ 
                p: { xs: 2.5, sm: 3, md: 4 }, 
                textAlign: 'center', 
                border: '2px dashed', 
                borderColor: 'primary.main', 
                borderRadius: { xs: 1.5, sm: 2 }, 
                cursor: 'pointer', 
                background: 'rgba(102,126,234,0.05)',
                transition: 'all 0.3s ease',
                '&:hover': { 
                  background: 'rgba(102,126,234,0.1)', 
                  borderColor: '#764ba2',
                  transform: 'scale(1.02)'
                },
                '&:active': {
                  transform: 'scale(0.98)'
                }
              }}
            >
              <input 
                ref={fileInputRef} 
                hidden 
                type="file" 
                onChange={handleFileSelect} 
                accept={allowedFormats.map(f => '.' + f).join(',')} 
              />
              <CloudUploadIcon 
                sx={{ 
                  fontSize: { xs: 36, sm: 42, md: 48 }, 
                  color: 'primary.main', 
                  mb: 1 
                }} 
              />
              <Typography 
                variant="h6" 
                sx={{ 
                  mb: 0.5, 
                  fontWeight: 600, 
                  color: '#333',
                  fontSize: { xs: '0.95rem', sm: '1.1rem', md: '1.25rem' }
                }}
              >
                Click to upload or drag & drop
              </Typography>
              <Typography 
                variant="body2" 
                sx={{ 
                  color: 'text.secondary',
                  fontSize: { xs: '0.75rem', sm: '0.875rem', md: '1rem' },
                  wordBreak: 'break-word'
                }}
              >
                Supported: {allowedFormats.join(', ').toUpperCase()}
              </Typography>
            </Paper>

            {/* Selected file */}
            {file && (
              <Card 
                sx={{ 
                  background: 'rgba(102,126,234,0.1)', 
                  border: '1px solid rgba(102,126,234,0.2)',
                  borderRadius: { xs: 1.5, sm: 2 }
                }}
              >
                <CardContent 
                  sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: { xs: 1.5, sm: 2 }, 
                    p: { xs: 1.5, sm: 2 },
                    flexWrap: 'wrap'
                  }}
                >
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        fontWeight: 600, 
                        color: '#333', 
                        wordBreak: 'break-word', 
                        mb: 0.5,
                        fontSize: { xs: '0.85rem', sm: '1rem' }
                      }}
                    >
                      {file.name}
                    </Typography>
                    <Typography 
                      variant="caption" 
                      sx={{ 
                        color: 'text.secondary',
                        fontSize: { xs: '0.7rem', sm: '0.875rem' }
                      }}
                    >
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </Typography>
                  </Box>
                  <Button 
                    size="small" 
                    variant="text" 
                    startIcon={<DeleteIcon sx={{ fontSize: { xs: 18, sm: 20 } }} />} 
                    onClick={() => { 
                      setFile(null); 
                      setMessage({ type: '', text: '' }); 
                      if (fileInputRef.current) fileInputRef.current.value = ''; 
                    }} 
                    sx={{ 
                      color: '#764ba2', 
                      textTransform: 'none',
                      fontSize: { xs: '0.75rem', sm: '0.875rem' },
                      p: { xs: 0.5, sm: 1 }
                    }}
                  >
                    Remove
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Messages */}
            {message.text && (
              <Alert 
                severity={message.type === 'error' ? 'error' : message.type === 'success' ? 'success' : 'info'} 
                icon={message.type === 'error' ? <ErrorIcon /> : message.type === 'success' ? <CheckCircleIcon /> : null}
                sx={{
                  fontSize: { xs: '0.8rem', sm: '0.875rem', md: '1rem' },
                  borderRadius: { xs: 1, sm: 1.5 },
                  '& .MuiAlert-icon': {
                    fontSize: { xs: 20, sm: 24 }
                  }
                }}
              >
                {message.text}
              </Alert>
            )}

            {/* Convert button */}
            <Button 
              variant="contained" 
              size="large" 
              onClick={convertFile} 
              disabled={!file || loading} 
              sx={{ 
                background: 'linear-gradient(135deg,#667eea 0%,#764ba2 100%)', 
                py: { xs: 1.2, sm: 1.5 }, 
                fontWeight: 700, 
                fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' }, 
                textTransform: 'none', 
                borderRadius: { xs: 1.5, sm: 2 },
                width: '100%',
                '&:hover:not(:disabled)': { 
                  boxShadow: '0 10px 25px rgba(102,126,234,0.4)', 
                  transform: 'translateY(-2px)'
                },
                '&:active:not(:disabled)': {
                  transform: 'translateY(0)'
                },
                '&:disabled': { 
                  background: 'rgba(0,0,0,0.12)',
                  cursor: 'not-allowed'
                }
              }}
            >
              {loading ? (
                <>
                  <CircularProgress 
                    size={{ xs: 16, sm: 20 }} 
                    sx={{ mr: 1, color: 'white' }} 
                  />
                  <span style={{ fontSize: 'inherit' }}>Converting...</span>
                </>
              ) : (
                'Convert File'
              )}
            </Button>
          </Stack>
        </Paper>

        {/* Footer */}
        <Box sx={{ mt: { xs: 3, sm: 4 }, textAlign: 'center', color: 'white', opacity: 0.9 }}>
          <Typography 
            variant="body2"
            sx={{
              fontSize: { xs: '0.75rem', sm: '0.875rem', md: '1rem' }
            }}
          >
            Max file size: 50MB • Powered by PDF.co API
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}