import React from 'react';
import { shallow } from 'enzyme';
import CompleteDataDisplay from './CompleteDataDisplay';

describe('CompleteDataDisplay', () => {
  test('matches snapshot', () => {
    const wrapper = shallow(<CompleteDataDisplay />);
    expect(wrapper).toMatchSnapshot();
  });
});
