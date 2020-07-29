import React from 'react';
import { shallow } from 'enzyme';
import GraphDisplay from './GraphDisplay';

describe('GraphDisplay', () => {
  test('matches snapshot', () => {
    const wrapper = shallow(<GraphDisplay />);
    expect(wrapper).toMatchSnapshot();
  });
});
