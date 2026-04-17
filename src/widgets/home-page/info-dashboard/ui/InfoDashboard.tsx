import { Suspense } from 'react'
import { View } from 'react-native'
import { ErrorBoundary } from 'react-error-boundary'
import { ErrorFallback } from '@/shared/ui/error-boundary'
import { StatsSkeleton } from '@/shared/ui/cbr-stats/ui/StatsSkeleton'
import { CbrStats } from '@/shared/ui/cbr-stats/ui/CbrStats'
import { CurrencySkeleton } from '@/shared/ui/home-carrency-skeleton/ui/CurrencySkeleton'
import { CurrencyDasbord } from '@/features/home-page/currency-info-dashbord'

export const InfoDashboard = () => {
  return (
    <View className="flex-col gap-6">
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Suspense fallback={<StatsSkeleton />}>
          <CbrStats />
        </Suspense>
      </ErrorBoundary>

      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Suspense fallback={<CurrencySkeleton />}>
          <CurrencyDasbord />
        </Suspense>
      </ErrorBoundary>
    </View>
  )
}
