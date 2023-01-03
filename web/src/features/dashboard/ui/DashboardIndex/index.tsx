// React
import { useMemo, useEffect } from 'react'

// Components
import { CardList, StyledWrapper } from './components'
import { AppBaseCard } from '@/features/app/components'

// Apex Chart
import Chart, { Props } from 'react-apexcharts'

// Redux
import { useProjectTransaction } from '@/features/project-transaction/hooks/project-transaction.hook'

const FULL_MONTH: { month: string; budget: number }[] = [
  { month: 'January', budget: 0 },
  { month: 'February', budget: 0 },
  { month: 'March', budget: 0 },
  { month: 'April', budget: 0 },
  { month: 'May', budget: 0 },
  { month: 'June', budget: 0 },
  { month: 'July', budget: 0 },
  { month: 'August', budget: 0 },
  { month: 'September', budget: 0 },
  { month: 'October', budget: 0 },
  { month: 'November', budget: 0 },
  { month: 'December', budget: 0 }
]

const DashboardIndex = () => {
  // Hook
  const {
    projectTransaction_fetchBudgetCalculation,
    projectTransaction_budgetCalculation
  } = useProjectTransaction()

  useEffect(() => {
    projectTransaction_fetchBudgetCalculation()
  }, [projectTransaction_fetchBudgetCalculation])

  const _budgetCalculation = useMemo((): {
    months: string[]
    budgets: number[]
  } => {
    return {
      months: FULL_MONTH.map(month => month.month),
      budgets: FULL_MONTH.map(month => {
        const findMonth = projectTransaction_budgetCalculation?.results?.find(
          result => result.month === month.month
        )

        if (findMonth) {
          return findMonth.budget
        } else {
          return month.budget
        }
      })
    }
  }, [projectTransaction_budgetCalculation])

  const lineChartConfig = useMemo((): {
    options: Props['options']
    series: Props['series']
  } => {
    return {
      options: {
        chart: {
          id: 'area-bar'
        },
        xaxis: {
          categories: _budgetCalculation.months
        },
        yaxis: [
          {
            axisTicks: {
              show: true
            },
            tooltip: {
              enabled: true
            }
          }
        ],
        legend: {
          show: true
        }
      },
      series: [
        {
          name: 'Budget',
          data: _budgetCalculation.budgets,
          color: '#3A36DB'
        }
      ]
    }
  }, [_budgetCalculation])

  return (
    <StyledWrapper>
      {/* Card List */}
      <CardList />

      {/* Chart List */}
      <div className={'grid grid-cols-1 mt-4'}>
        {/* Line Chart */}
        <AppBaseCard>
          <div
            style={{
              overflowX: 'auto'
            }}
          >
            <Chart
              options={lineChartConfig.options}
              series={lineChartConfig.series}
              type='area'
              width={'100%'}
              height={'430.99px'}
            />
          </div>
        </AppBaseCard>
      </div>
    </StyledWrapper>
  )
}

export { DashboardIndex }
