import AllQuickStats from './QuickStats'

const Dashboard = ({setDisplayContent, getQuickStatsData}) => {
	return (
		<div id='Dashboard'>
			<h1>Dashboard</h1>
			<AllQuickStats getQuickStatsData={getQuickStatsData}/>
		</div>
	)
}

export default Dashboard