// // src/shared/lib/perf-logger.ts
// export class PerfLogger {
//   private static markers: Map<string, number> = new Map()

//   static start(label: string): void {
//     this.markers.set(label, performance.now())
//   }

//   static end(label: string): number {
//     const startTime = this.markers.get(label)
//     if (startTime === undefined) return 0

//     const duration = performance.now() - startTime
//     console.log(`[PERF] ${label}: ${duration.toFixed(2)}ms`)
//     this.markers.delete(label)
//     return duration
//   }
// }
