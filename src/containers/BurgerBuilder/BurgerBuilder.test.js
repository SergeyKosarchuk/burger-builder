import React from 'react';
import { shallow } from 'enzyme';

import { BurgerBuilder } from './BurderBuilder';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

describe('<BurgerBuilder />', () => {
    let wrapper = null;

    beforeEach(() => {
        wrapper = shallow(<BurgerBuilder ingredients={{SALAD: 1}} needFetchIngredients initIngredients={() => undefined}/>);
    });

    it('should render <BuildControls /> when receiving ingredients', () => {
        wrapper.setProps({ingredients: {SALAD: 0}});
        expect(wrapper.find(BuildControls)).toHaveLength(1);
    })
});