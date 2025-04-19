import {
    Box,
    Button,
    Container,
    FormControl,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    SelectChangeEvent,
    TextField,
    Typography,
  } from '@mui/material';
  import { gql, useLazyQuery } from '@apollo/client';
  import { useState } from 'react';
  
  // Queries
  const SUM = gql`
    query ($a: Float!, $b: Float!) {
      sum(a: $a, b: $b)
    }
  `;
  const SUBTRACT = gql`
    query ($a: Float!, $b: Float!) {
      subtract(a: $a, b: $b)
    }
  `;
  const MULTIPLY = gql`
    query ($a: Float!, $b: Float!) {
      multiply(a: $a, b: $b)
    }
  `;
  const DIVIDE = gql`
    query ($a: Float!, $b: Float!) {
      divide(a: $a, b: $b)
    }
  `;
  
  export const Calculator = () => {
    const [a, setA] = useState(0);
    const [b, setB] = useState(0);
    const [operation, setOperation] = useState('sum');
    const [result, setResult] = useState<number | null>(null);
    const [error, setError] = useState<string | null>(null);
  
    // One hook per operation
    const [getSum] = useLazyQuery<{ sum: number }, { a: number; b: number }>(SUM, {
      onCompleted: (data) => setResult(data.sum),
      onError: (err) => setError(err.message),
    });
    const [getSubtract] = useLazyQuery<{ subtract: number }, { a: number; b: number }>(SUBTRACT, {
      onCompleted: (data) => setResult(data.subtract),
      onError: (err) => setError(err.message),
    });
    const [getMultiply] = useLazyQuery<{ multiply: number }, { a: number; b: number }>(MULTIPLY, {
      onCompleted: (data) => setResult(data.multiply),
      onError: (err) => setError(err.message),
    });
    const [getDivide] = useLazyQuery<{ divide: number }, { a: number; b: number }>(DIVIDE, {
      onCompleted: (data) => setResult(data.divide),
      onError: (err) => setError(err.message),
    });
  
    const handleCalculate = () => {
      setError(null);
      setResult(null);
  
      switch (operation) {
        case 'sum':
          getSum({ variables: { a, b } });
          break;
        case 'subtract':
          getSubtract({ variables: { a, b } });
          break;
        case 'multiply':
          getMultiply({ variables: { a, b } });
          break;
        case 'divide':
          getDivide({ variables: { a, b } });
          break;
      }
    };
  
    const handleOperationChange = (event: SelectChangeEvent<string>) => {
      setOperation(event.target.value);
    };
  
    return (
      <Container maxWidth="sm">
        <Paper elevation={3} sx={{ p: 4, mt: 8 }}>
          <Typography variant="h4" gutterBottom>
            GraphQL Calculator
          </Typography>
  
          <Box display="flex" flexDirection="column" gap={2}>
            <TextField
              label="First Number"
              required
              type="number"
              value={a}
              onChange={(e) => setA(parseFloat(e.target.value))}
              fullWidth
            />
            <TextField
              label="Second Number"
              required
              type="number"
              value={b}
              onChange={(e) => setB(parseFloat(e.target.value))}
              fullWidth
            />
  
            <FormControl fullWidth>
              <InputLabel>Operation</InputLabel>
              <Select label={"Operation"} value={operation} onChange={handleOperationChange}>
                <MenuItem value="sum">Sum</MenuItem>
                <MenuItem value="subtract">Subtract</MenuItem>
                <MenuItem value="multiply">Multiply</MenuItem>
                <MenuItem value="divide">Divide</MenuItem>
              </Select>
            </FormControl>
  
            <Button variant="contained" onClick={handleCalculate}>
              Calculate
            </Button>
  
            {error && <Typography color="error">Error: {error}</Typography>}
            {result !== null && (
              <Typography variant="h6" mt={2}>
                Result: {result}
              </Typography>
            )}
          </Box>
        </Paper>
      </Container>
    );
  };
  