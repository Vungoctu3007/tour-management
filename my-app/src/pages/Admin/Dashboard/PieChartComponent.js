import {PieChart, Pie, Sector, Cell, ResponsiveContainer, Legend} from 'recharts';

const data01 = [
  { name: 'Completed', value: 120 },
  { name: 'Processing', value: 80 },
  { name: 'Cancelled', value: 30 },
];

const data02 = [
  { name: 'Domestic Completed', value: 70 },
  { name: 'International Completed', value: 50 },
  { name: 'Domestic Processing', value: 50 },
  { name: 'International Processing', value: 30 },
  { name: 'Domestic Cancelled', value: 20 },
  { name: 'International Cancelled', value: 10 },
];

function PieChartComponent() {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data01}
            dataKey="value"
            cx="50%"
            cy="50%"
            outerRadius={60}
            fill="#8884d8"
            label={(entry) => `${entry.name}: ${entry.value}`}
          />
          <Pie
            data={data02}
            dataKey="value"
            cx="50%"
            cy="50%"
            innerRadius={70}
            outerRadius={90}
            fill="#82ca9d"
            label
          />
          <Legend layout="horizontal" align="center" verticalAlign="bottom" />
        </PieChart>
      </ResponsiveContainer>

    );
}

export default PieChartComponent;
