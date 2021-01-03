import React from 'react';
import PieChart from './PieChart';
let x = ''
let langs = '';
const LanguageList = (props) => {
    if (props.langslist) {
        {
            var totalcount = Object.entries(props.langslist).map(([key, value]) =>
                (value)).reduce((pv, cv) => pv + cv, 0)
        }
        return (

                <div>
                    {
                        Object.entries(props.langslist).map(([key, value]) =>

                                <div key={key}>
                                    {key} {Math.round(100 * value / totalcount)}%

                                {console.log(x = x + value + ',')}

                            { console.log(langs = langs + key + ',') }

                </div>)}

                <div className='App-header'>
                </div>
                <div>
                    <div className="text-left">
                        <PieChart repoSize={x.split(',')} repoNames={langs.split(',')}  />
                        </div>
                        {x = ''}
                        {langs = ''}

                </div>
            </div>
        )
    } else { return null; }

};

export default LanguageList;