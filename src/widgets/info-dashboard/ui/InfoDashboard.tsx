import { Suspense } from 'react'
import { View } from 'react-native'
import { ErrorBoundary } from 'react-error-boundary'
import { ErrorFallback } from '@/shared/ui/error-boundary'
import { StatsSkeleton } from '@/shared/ui/cbr-stats/ui/StatsSkeleton'
import { CbrStats } from '@/shared/ui/cbr-stats/ui/CbrStats'
import { CurrencySkeleton } from '@/features/currency-info-dashbord/ui/CurrencySkeleton'
import { CurrencyDasbord } from '@/features/currency-info-dashbord'

export const InfoDashboard = () => {
  return (
    <View className="flex-col gap-6">
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Suspense fallback={<StatsSkeleton />}>
          <CbrStats />
        </Suspense>
      </ErrorBoundary>

      <View className="rounded-3xl border border-slate-100 bg-white p-2 shadow-xl shadow-slate-200">
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <Suspense fallback={<CurrencySkeleton />}>
            <CurrencyDasbord />
          </Suspense>
        </ErrorBoundary>
      </View>
    </View>
  )
}
