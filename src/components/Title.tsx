import * as React from 'react';
import Typography from '@mui/material/Typography';

interface TitleProps {
  children?: React.ReactNode;
}

// wrapper around Typography
export default function Title(props: TitleProps) {
  return (
    <Typography component="h2" variant="h6" color="primary" gutterBottom>
      {props.children}
    </Typography>
  );
}