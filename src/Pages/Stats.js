import React from 'react';
import { Card, Grid, Typography } from '@mui/material';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const Stats = () => {
  // Données pour les graphiques
  const salesData = [
    { name: 'LUN', Jour: 30, Soirée: 10 },
    { name: 'MAR', Jour: 40, Soirée: 20 },
    { name: 'MER', Jour: 35, Soirée: 15 },
    { name: 'JEU', Jour: 25, Soirée: 20 },
    { name: 'VEN', Jour: 50, Soirée: 30 },
    { name: 'SAM', Jour: 55, Soirée: 25 },
    { name: 'DIM', Jour: 30, Soirée: 10 },
  ];

  const pieData = [
    { name: 'Vente', value: 45 },
    { name: 'Reste', value: 55 },
  ];

  const COLORS = ['#882904', '#D3D3D3'];

  return (
    <div style={styles.dashboardContainer}>
      <Grid container spacing={3}>
        {/* Cartes du haut */}
        <Grid item xs={3}>
          <Card style={{ ...styles.card, ...styles.brownCard }}>
            <Typography variant="h6">Ventes du jour</Typography>
            <Typography variant="h3">456</Typography>
          </Card>
        </Grid>
        <Grid item xs={3}>
          <Card style={{ ...styles.card, ...styles.whiteCard }}>
            <Typography variant="h6">Stocks</Typography>
            <Typography variant="h3">3452</Typography>
          </Card>
        </Grid>
        <Grid item xs={3}>
          <Card style={{ ...styles.card, ...styles.brownCard }}>
            <Typography variant="h6">Clients fidèles</Typography>
            <Typography variant="h3">2309</Typography>
          </Card>
        </Grid>
        <Grid item xs={3}>
          <Card style={{ ...styles.card, ...styles.whiteCard }}>
            <Typography variant="h6">Notes</Typography>
            <Typography variant="h3">4,5 ★</Typography>
          </Card>
        </Grid>

        {/* Graphique des ventes */}
        <Grid item xs={8}>
          <Card style={styles.card}>
            <Typography variant="h6">Résultat des ventes</Typography>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={salesData} margin={{ top: 20, right: 20, left: 20, bottom: 5 }}>
                <XAxis dataKey="name" />
                <Tooltip />
                <Bar dataKey="Jour" fill="#882904" />
                <Bar dataKey="Soirée" fill="#FFD700" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Grid>

        {/* Graphique en forme de courbe */}
        <Grid item xs={4}>
          <Card style={styles.card}>
            <Typography variant="h6">Statistiques journaliers</Typography>
            <PieChart width={200} height={200}>
              <Pie
                data={pieData}
                dataKey="value"
                outerRadius={80}
                fill="#8884d8"
                label
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
            <div style={styles.pieChartDetails}>
              <p>08h : 28 ventes</p>
              <p>10h : 163 ventes</p>
              <p>13h : 328 ventes</p>
              <p>16h : 81 ventes</p>
            </div>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

// Styles en ligne pour correspondre au CSS de l'image
const styles = {
  dashboardContainer: {
    padding: '20px',
    backgroundColor: '#f7f7f7',
    fontFamily: 'Arial, sans-serif',
    height: "400px"
  },
  card: {
    padding: '15px',
    borderRadius: '8px',
    boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#ffffff',
  },
  brownCard: {
    backgroundColor: '#882904',
    color: '#ffffff',
    textAlign: 'center',
  },
  whiteCard: {
    backgroundColor: '#ffffff',
    color: '#333333',
    textAlign: 'center',
  },
  pieChartDetails: {
    marginTop: '10px',
    fontSize: '14px',
    lineHeight: '1.5',
  },
};

export default Stats;
