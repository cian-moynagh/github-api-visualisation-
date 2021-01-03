import React from 'react';
import Plot from 'react-plotly.js';

const BarChart = (props) => {
        return (
            <Plot
                data={[

                  {
                      x: props.repoNames,
                      y: props.watchers_count,
                      type: 'bar',
                      mode: 'lines+markers',
                      marker: { color: '#D0B0D0' },
                  }
                ]}
                layout={{width: 800, height: 400, title: props.label }}
            />
        );

}
export default BarChart;