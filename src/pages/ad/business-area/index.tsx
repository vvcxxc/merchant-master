/**title: 商圈广告 */

import React, { Component } from 'react';
import AdLayout from '../components/ad-layout';
import From from './form';
import ExpenseCalendar from '../components/expense-calendar';
import Chart from './chart';

export default class BusinessArea extends Component {
	render() {
		const form = <From />;
		const expenseCalendar = <ExpenseCalendar />;
		const chart = <Chart />;
		return <AdLayout children={[form, expenseCalendar, chart]} />;
	}
}
