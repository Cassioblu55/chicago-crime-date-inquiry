import React from 'react';
import { shallow } from 'enzyme';
import CompleteDataDisplayRow from './CompleteDataDisplayRow';

describe('CompleteDataDisplayRow', () => {
  test('matches snapshot', () => {
    const wrapper = shallow(<CompleteDataDisplayRow />);
    expect(wrapper).toMatchSnapshot();
  });
});
