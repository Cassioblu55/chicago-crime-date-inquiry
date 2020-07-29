import React from 'react';
import { shallow } from 'enzyme';
import DataDisplay from './DataDisplay';

describe('DataDisplay', () => {
  test('matches snapshot', () => {
    const wrapper = shallow(<DataDisplay />);
    expect(wrapper).toMatchSnapshot();
  });
});
