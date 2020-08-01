import React from 'react';
import { shallow } from 'enzyme';
import DataTotal from './DataTotal';

describe('DataTotal', () => {
  test('matches snapshot', () => {
    const wrapper = shallow(<DataTotal />);
    expect(wrapper).toMatchSnapshot();
  });
});
