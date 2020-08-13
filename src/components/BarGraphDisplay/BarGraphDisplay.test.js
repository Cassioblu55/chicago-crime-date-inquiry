import React from 'react';
import { shallow } from 'enzyme';
import BarGraphDisplay from './BarGraphDisplay';

// Hou comment: Nice job implementing these snapshot tests for all your components!
describe('BarGraphDisplay', () => {
	test('matches snapshot', () => {
		const wrapper = shallow(<BarGraphDisplay />);
		expect(wrapper).toMatchSnapshot();
	});
});
