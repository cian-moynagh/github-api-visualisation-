import React from 'react';
import Moment from 'react-moment';
import ScatterPlot from './scatterPlot';
let repo = ''
let watchers = '';
let forks = '';
let size = '';

const SortedList = (props) => {

  if (props.repitems) {

    return (
      <div>
          {
              props.repitems.map((repitem) =>
                <div>
                  {console.log(repo = repo + repitem.name + ',')}
                  { console.log(watchers = watchers + repitem.watchers_count + ',') }
                  { console.log(forks = forks + repitem.forks_count + ',') }
                  { console.log(size = size + repitem.forks_count/10 + ',') }
              </div>
            )}

            <ScatterPlot  y={watchers.split(',')} repo={repo.split(',')} label={'Watchers of repos'} />
            {watchers = ''}
            {repo = ''}
            {forks = ''}
            </div>



      )
  } else { return null;}

  };
export default SortedList;