// React
import { memo, useMemo } from 'react'

// Constants
import { PROJECT_TRANSACTION_STATUS } from '@/features/project-transaction/constant/project-transaction-status.constant'

// Interfaces
import { IProjectTransactionStatusTag } from './interfaces'

// Components
import { AppBaseTag } from '@/features/app/components'

const ProjectTransactionStatusTag = memo(
  ({ status }: IProjectTransactionStatusTag) => {
    const statusColor = useMemo((): string => {
      switch (status) {
        case PROJECT_TRANSACTION_STATUS.REJECTED:
          return 'error'
        case PROJECT_TRANSACTION_STATUS.PENDING:
        case PROJECT_TRANSACTION_STATUS.REVISE:
        case PROJECT_TRANSACTION_STATUS.REVISED:
          return 'warning'
        case PROJECT_TRANSACTION_STATUS.AGREEMENT_PROCESS:
        case PROJECT_TRANSACTION_STATUS.INTERNAL_AGREEMENT_PROCESS:
          return 'processing'
        case PROJECT_TRANSACTION_STATUS.APPROVED:
          return 'success'
        default:
          return status
      }
    }, [status])

    return <AppBaseTag color={statusColor}>{status}</AppBaseTag>
  }
)

ProjectTransactionStatusTag.displayName = 'ProjectTransactionStatusTag'

export { ProjectTransactionStatusTag }
