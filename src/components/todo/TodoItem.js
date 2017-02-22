import React from 'react';
import {partial} from '../../utils/utils';

export const TodoItem = (props) => {
  // const handleToggle = () => props.handleToggle(props.id);
  // const handleToggle = props.handleToggle.bind(null, props.id);
  const handleToggle = partial(props.handleToggle, props.id);
  return(
    <li>
      <input type="checkbox" onChange={handleToggle} checked={props.isComplete}/>{props.name}
    </li>
  );
};

TodoItem.PropTypes = {
  name: React.PropTypes.string.isRequired,
  isComplete: React.PropTypes.bool,
  id: React.PropTypes.number.isRequired
}
