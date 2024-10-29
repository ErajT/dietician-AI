"use client";
import React, { useState } from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement, LinearScale, BarElement, CategoryScale } from 'chart.js';
import { Card, CardContent, Typography, Grid, Box, TextField, Button } from '@mui/material';
import LocalDrinkIcon from '@mui/icons-material/LocalDrink';
import BedtimeIcon from '@mui/icons-material/Bedtime';

Chart.register(ArcElement, LinearScale, BarElement, CategoryScale);

const Dashboard = () => {
  const [bmi, setBmi] = useState(23);
  const [waterIntake, setWaterIntake] = useState(0);
  const [sleepHours, setSleepHours] = useState([7, 6, 8, 5, 7, 7, 6]);

  const calorieData = {
    labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5'],
    datasets: [
      {
        label: 'Calories Burned',
        data: [3200, 3400, 3600, 3800, 4000],
        backgroundColor: '#4bc0c0',
      },
    ],
  };

  const bmiData = {
    labels: ['Underweight', 'Normal', 'Overweight', 'Obese'],
    datasets: [
      {
        data: [bmi < 18.5 ? 1 : 0, bmi >= 18.5 && bmi <= 24.9 ? 1 : 0, bmi > 24.9 && bmi <= 29.9 ? 1 : 0, bmi > 29.9 ? 1 : 0],
        backgroundColor: ['#66ccff', '#99ff99', '#ffcc66', '#ff6666'],
      },
    ],
  };

  const sleepData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Sleep Hours',
        data: sleepHours,
        backgroundColor: '#ffcc99',
      },
    ],
  };

  const handleWaterIntakeChange = (e) => {
    setWaterIntake(e.target.value);
  };

  const handleSleepHoursChange = (e) => {
    const dayIndex = parseInt(e.target.name);
    const newHours = [...sleepHours];
    newHours[dayIndex] = parseInt(e.target.value) || 0;
    setSleepHours(newHours);
  };

  const getBmiCategory = () => {
    if (bmi < 18.5) return 'Underweight';
    if (bmi <= 24.9) return 'Normal';
    if (bmi <= 29.9) return 'Overweight';
    return 'Obese';
  };

  const getWaterMessage = () => {
    if (waterIntake >= 2) return "Yahoo! You're hydrated!";
    return "Keep going, stay hydrated!";
  };

  return (
    <div style={styles.dashboard}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <div style={styles.calorieGraph}>
            <Typography variant="h6" style={styles.sectionTitle}>
              Calories Burned
            </Typography>
            <Bar data={calorieData} options={chartOptions} />
          </div>
        </Grid>

        <Grid item xs={12} md={4}>
          <div style={styles.bmiChart}>
            <Typography variant="h6" style={styles.sectionTitle}>
              BMI Distribution
            </Typography>
            <Doughnut data={bmiData} options={chartOptions} />
            <div style={styles.bmiIndicator}>
              <Typography variant="h6">BMI: {bmi}</Typography>
              <Typography style={styles.indicatorText}>{getBmiCategory()}</Typography>
            </div>
          </div>
        </Grid>
      </Grid>

      <Grid container spacing={3} style={styles.bottomHalf}>
        <Grid item xs={12} md={6}>
          <Card style={styles.trackerCard}>
            <CardContent>
              <LocalDrinkIcon style={styles.trackerIcon} />
              <Typography variant="h5">Water Intake Tracker</Typography>
              <TextField
                variant="outlined"
                label="Liters"
                type="number"
                value={waterIntake}
                onChange={handleWaterIntakeChange}
                fullWidth
                margin="normal"
              />
              <Button variant="contained" style={styles.button}>
                Update
              </Button>
              <Typography>{getWaterMessage()}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card style={styles.trackerCard}>
            <CardContent>
              <BedtimeIcon style={styles.trackerIcon} />
              <Typography variant="h5">Sleep Tracker</Typography>
              <Bar data={sleepData} options={chartOptions} />
              {sleepHours.map((hours, index) => (
                <TextField
                  key={index}
                  variant="outlined"
                  label={`Day ${index + 1}`}
                  type="number"
                  name={`${index}`}
                  value={hours}
                  onChange={handleSleepHoursChange}
                  fullWidth
                  margin="normal"
                />
              ))}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
};

const styles = {
  dashboard: {
    padding: '20px',
    backgroundColor: '#cee2d2',
    minHeight: '100vh',
  },
  calorieGraph: {
    backgroundColor: 'white',
    borderRadius: '10px',
    padding: '20px',
    height: '300px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  bmiChart: {
    backgroundColor: 'white',
    borderRadius: '10px',
    padding: '20px',
    height: '300px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  bottomHalf: {
    marginTop: '20px',
  },
  trackerCard: {
    backgroundColor: 'white',
    borderRadius: '10px',
    padding: '20px',
    textAlign: 'center',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  trackerIcon: {
    fontSize: '40px',
    color: '#4bc0c0',
    marginBottom: '10px',
  },
  bmiIndicator: {
    marginTop: '20px',
    textAlign: 'center',
  },
  indicatorText: {
    fontWeight: 'bold',
    color: (bmi) => (bmi < 18.5 ? '#66ccff' : bmi <= 24.9 ? '#99ff99' : bmi <= 29.9 ? '#ffcc66' : '#ff6666'),
  },
  sectionTitle: {
    marginBottom: '10px',
    fontWeight: 'bold',
  },
  button: {
    marginTop: '10px',
    backgroundColor: '#4bc0c0',
    color: 'white',
  },
};

export default Dashboard;