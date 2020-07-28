import React from 'react';
import { shallow } from 'enzyme';
import ResultSecondaryContainer from './ResultSecondaryContainer';

describe('ResultSecondaryContainer', () => {
  test('matches snapshot', () => {
    const wrapper = shallow(<ResultSecondaryContainer />);
    expect(wrapper).toMatchSnapshot();
  });
});
