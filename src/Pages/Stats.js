import React, { useState, useEffect } from 'react';
import { Card, Grid, Typography } from '@mui/material';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { useAuth } from './AuthContext';


const Stats = () => {
  const { Username } = useAuth();
  const [stats, setStats] = useState({
    totalVentes: 0,
    totalStock: 0,
    totalClients: 0,
  });

  useEffect(() => {
    fetch(`https://packaging-backend-ccd132e45603.herokuapp.com/stats/${Username}`)
      .then((res) => res.json())
      .then((data) => {
        setStats({
          totalVentes: data.totalVentes,
          totalStock: data.totalStock,
          totalClients: data.totalClients,
        });
      })
      .catch((err) => console.log(err));
  
}, );

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
            <Typography variant="h3">{stats.totalVentes}</Typography>
          </Card>
        </Grid>
        <Grid item xs={3}>
          <Card style={{ ...styles.card, ...styles.whiteCard }}>
            <Typography variant="h6">Stocks</Typography>
            <Typography variant="h3">{stats.totalStock}</Typography>
          </Card>
        </Grid>
        <Grid item xs={3}>
          <Card style={{ ...styles.card, ...styles.brownCard }}>
            <Typography variant="h6">Clients fidèles</Typography>
            <Typography variant="h3">{stats.totalClients}</Typography>
          </Card>
        </Grid>
        <Grid item xs={3}>
          <Card style={{ ...styles.card, ...styles.whiteCard }}>
            <Typography variant="h6">Notes</Typography>
            <Typography variant="h3">2,5 ★</Typography>
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
                <Bar dataKey="Jour" fill="#004aad" />
                <Bar dataKey="Soirée" fill="#FFD700" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Grid>

        {/* Graphique en forme de courbe */}
        <Grid item xs={4}>
          <Card style={styles.card}>
            <Typography variant="h6">Statistiques journalières</Typography>
            <PieChart width={200} height={200}>
              <Pie
                data={pieData}
                dataKey="value"
                outerRadius={80}
                fill="#004aad"
                label
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
            <div style={styles.pieChartDetails}>
              <p>08h : 00 ventes</p>
              <p>10h : 00 ventes</p>
              <p>13h : 00 ventes</p>
              <p>16h : 00 ventes</p>
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
    backgroundColor: '#004aad',
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
