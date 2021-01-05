import React from 'react';
import Plot from 'react-plotly.js';

const PieChart = (props) => {

    return (

        <div class="pie"><Plot data={[
            {
                marker: { color: "black" },
                values: props.repoSize,
                labels: props.repoNames,
                type: 'pie'
            }
        ]}
            layout={{ width: 500, height: 500,
            paper_bgcolor: "#FFFFF"
        }}
        />
        </div>
    );

}

export default PieChart;