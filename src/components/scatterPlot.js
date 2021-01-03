import React from 'react';
import Plot from 'react-plotly.js';

const ScatterPlot = (props) => {
        return (
            <Plot
                data={[

                  {
                      x: props.repo,
                      y: props.y,
                      type: 'scatter',
                      mode: 'lines+markers',
                      marker: { color: '#FFFFF' },
                  }
                ]}
                layout={{width: 800, height: 400, title: props.label }}
            />
        );

}
export default ScatterPlot;