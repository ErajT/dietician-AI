"use client";
import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Grid,
  Card,
  CardContent,
  Box,
  Button,
  Snackbar,
  Alert,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Avatar,
} from "@mui/material";
import LocalDrinkIcon from "@mui/icons-material/LocalDrink";
import BedtimeIcon from "@mui/icons-material/Bedtime";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import ScaleIcon from "@mui/icons-material/Scale";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart,
  ArcElement,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  CategoryScale,
  Tooltip,
} from "chart.js";

Chart.register(
  ArcElement,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  CategoryScale,
  Tooltip
);

const Dashboard = () => {
  const [bmi, setBmi] = useState(28);
  const [waterIntake, setWaterIntake] = useState(0);
  const [sleepHours, setSleepHours] = useState([8, 8, 8, 8, 8, 8, 8]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState(0);
  const [newSleepHours, setNewSleepHours] = useState(8);

  const calorieData = {
    labels: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7"],
    datasets: [
      {
        label: "Calories Burned",
        data: [3200, 3400, 3600, 3800, 4000, 4200, 2200],
        borderColor: "#4bc0c0",
        fill: false,
      },
    ],
  };

  const sleepData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Sleep Hours",
        data: sleepHours,
        backgroundColor: "rgba(255, 204, 153, 0.8)",
      },
    ],
  };

  const handleWaterIntakeChange = (amount) => {
    setWaterIntake((prev) => {
      const newIntake = Math.max(0, prev + amount);
      if (newIntake === 10) {
        setSnackbarMessage("Congratulations! You've reached your water goal!");
        setSnackbarOpen(true);
      } else if (newIntake > 10) {
        setSnackbarMessage("Yay! You've exceeded your goal!");
        setSnackbarOpen(true);
      }
      return newIntake;
    });
  };

  const handleOpenDialog = (dayIndex) => {
    setSelectedDay(dayIndex);
    setNewSleepHours(sleepHours[dayIndex]);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleSaveSleepHours = () => {
    const updatedHours = [...sleepHours];
    updatedHours[selectedDay] = parseInt(newSleepHours) || 0;
    setSleepHours(updatedHours);
    setDialogOpen(false);
  };

  const getBmiCategory = () => {
    if (bmi < 18.5) return "Underweight";
    if (bmi <= 24.9) return "Normal";
    if (bmi <= 29.9) return "Overweight";
    return "Obese";
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const quotes = [
    "“Drink water like you love it. Your body will thank you.”",
    "“The best time for a glass of water was 20 minutes ago.”",
    "“Hydration is the key to a healthy life.”",
    "“Water: the original energy drink.”",
  ];

  return (
    <div style={styles.dashboard}>
      <AppBar position="static" sx={{ backgroundColor: "#cee2d2", color: "#000" }}>
        <Toolbar>
          <Avatar
            alt="Logo"
            src="Logo.png" // Replace with your logo path
            sx={{ width: 70, height: 70, marginRight: 2 }} // Increased size
          />
          <Box sx={{ flexGrow: 1 }} />
          <Button color="inherit" sx={{ mx: 1 }}>Dashboard</Button>
          <Button color="inherit" sx={{ mx: 1 }}>Settings</Button>
          <Button color="inherit" sx={{ mx: 1 }}>Help</Button>
          <Button color="inherit" sx={{ mx: 1 }}>Logo</Button>
        </Toolbar>
      </AppBar>
      <Typography variant="h4" align="center" style={styles.pageHeading}>
        Health Dashboard
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card style={styles.calorieGraph}>
            <CardContent>
              <div style={styles.header}>
                <FitnessCenterIcon style={styles.icon} />
                <Typography variant="h5" style={styles.sectionTitle}>
                  Calories Burned
                </Typography>
              </div>
              <div style={styles.chartContainer}>
                <Line data={calorieData} options={chartOptions} />
              </div>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card style={styles.bmiChart}>
            <CardContent>
              <div style={styles.header}>
                <ScaleIcon style={styles.icon} />
                <Typography variant="h5" style={styles.sectionTitle}>
                  BMI Distribution
                </Typography>
              </div>
              <Box style={styles.bmiGaugeContainer}>
                <Box style={{ ...styles.bmiNeedle, transform: `rotate(${(bmi - 18.5) * 6}deg)` }} />
                <Box style={styles.bmiLabels}>
                </Box>
              </Box>
              <Typography variant="h6" align="center" style={styles.bmiText}>
                BMI: {bmi}
              </Typography>
              <Typography align="center" style={styles.indicatorText}>{getBmiCategory()}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3} style={styles.bottomHalf}>
        <Grid item xs={12} md={6}>
          <Card style={styles.trackerCard}>
            <CardContent>
              <div style={styles.header}>
                <LocalDrinkIcon style={styles.icon} />
                <Typography variant="h5" style={styles.sectionTitle}>
                  Water Intake Tracker
                </Typography>
              </div>
              <Box style={styles.glassContainer}>
                <div
                  style={{
                    ...styles.glass,
                    height: `${(waterIntake / 10) * 100}%`,
                  }}
                />
              </Box>
              <Box style={styles.buttonContainer}>
                <Button variant="contained" style={styles.button} onClick={() => handleWaterIntakeChange(1)}>
                  +
                </Button>
              </Box>
              <Typography variant="h6" align="center" style={styles.waterText}>
                {waterIntake} Glasses
              </Typography>
              <Typography align="center" style={styles.motivationText}>
                {quotes[waterIntake % quotes.length]}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card style={styles.trackerCard}>
            <CardContent>
              <div style={styles.header}>
                <BedtimeIcon style={styles.icon} />
                <Typography variant="h5" style={styles.sectionTitle}>
                  Sleep Tracker
                </Typography>
              </div>
              <div style={styles.sleepChartContainer}>
                <Bar data={sleepData} options={chartOptions} />
              </div>
              <Grid container spacing={1} style={styles.sleepButtonsContainer}>
                {sleepHours.map((hours, index) => (
                  <Grid item xs={4} key={index}>
                    <Button variant="outlined" style={styles.sleepButton} onClick={() => handleOpenDialog(index)}>
                      {`Day ${index + 1} - ${hours} hrs`}
                    </Button>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Update Sleep Hours</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter the number of hours you slept for Day {selectedDay + 1}.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Hours"
            type="number"
            fullWidth
            variant="standard"
            value={newSleepHours}
            onChange={(e) => setNewSleepHours(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSaveSleepHours}>Save</Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};

const styles = {
  dashboard: {
    padding: "20px",
    backgroundColor: "#f0f8ff",
    minHeight: "100vh",
  },
  pageHeading: {
    marginTop: "20px",
    marginBottom: "20px",
    fontWeight: "bold",
    color: "#102820",
    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
  },
  calorieGraph: {
    backgroundColor: "#ffffff",
    borderRadius: "10px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
    padding: "15px",
  },
  chartContainer: {
    height: "280px",
    overflow: "hidden",
  },
  bmiChart: {
    backgroundColor: "#ffffff",
    borderRadius: "10px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
    padding: "20px",
  },
  bmiGaugeContainer: {
    position: "relative",
    width: "200px",
    height: "100px",
    margin: "0 auto",
    background: "linear-gradient(to right, #66ccff, #99ff99, #ffcc66, #ff6666)",
    borderRadius: "100px 100px 0 0",
    overflow: "hidden",
  },
  bmiNeedle: {
    position: "absolute",
    bottom: "0",
    left: "50%",
    width: "2px",
    height: "100px",
    backgroundColor: "black",
    transformOrigin: "bottom",
  },
  bmiLabels: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "10px",
  },
  sectionTitle: {
    fontSize: "20px",
    fontWeight: "bold",
    color: "#102820",
    textAlign: "center",
    flexGrow: 1,
  },
  header: {
    display: "flex",
    alignItems: "center",
    marginBottom: "20px",
  },
  icon: {
    fontSize: "30px",
    color: "#102820",
    marginRight: "10px",
  },
  bmiText: {
    fontSize: "24px",
    fontWeight: "bold",
    marginTop: "10px",
    color: "#102820",
  },
  indicatorText: {
    color: "#102820",
    fontSize: "18px",
    marginBottom: "10px",
  },
  trackerCard: {
    backgroundColor: "#ffffff",
    borderRadius: "10px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
    padding: "20px",
    height: "auto",
    minHeight: "450px",
  },
  glassContainer: {
    position: "relative",
    width: "150px",
    height: "250px",
    margin: "20px auto",
    border: "5px solid #102820",
    borderRadius: "20px",
    overflow: "hidden",
    backgroundColor: "#e0f7fa",
    display: "flex",
    alignItems: "flex-end",
  },
  glass: {
    backgroundColor: "#4bc0c0",
    width: "100%",
    transition: "height 0.3s ease-in-out",
  },
  buttonContainer: {
    marginTop: "20px",
    display: "flex",
    justifyContent: "center",
  },
  button: {
    backgroundColor: "#00796b",
    color: "#fff",
  },
  waterText: {
    textAlign: "center",
    marginTop: "10px",
    fontSize: "20px",
    color: "#102820",
  },
  motivationText: {
    textAlign: "center",
    marginTop: "20px",
    fontSize: "16px",
    color: "#00796b",
    fontStyle: "italic",
    padding: "0 10px",
  },
  sleepChartContainer: {
    height: "220px",
    marginBottom: "20px",
  },
  sleepButtonsContainer: {
    marginTop: "10px",
    paddingBottom: "20px",
  },
  sleepButton: {
    width: "100%",
    backgroundColor: "#ffffff",
    color: "#00796b",
    fontWeight: "bold",
    borderColor: "#00796b",
    "&:hover": {
      backgroundColor: "#b2ebf2",
    },
  },
  bottomHalf: {
    marginTop: "20px",  
    paddingBottom: "20px",
  },
};

export default Dashboard;