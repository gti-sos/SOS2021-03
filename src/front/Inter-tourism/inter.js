
import { RadialBarChart } from 'reaviz';

const MyChart = () => (
  <RadialBarChart
    height={300}
    width={300}
    data={[
      { key: new Date('11/29/2019'), data: 3 },
      { key: new Date('11/30/2019'), data: 11 },
      { key: new Date('12/1/2019'), data: 6 }
    ]}
  />
);