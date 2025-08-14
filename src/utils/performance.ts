export class PerformanceMonitor {
  private static instance: PerformanceMonitor;
  private metrics: Map<string, number> = new Map();
  private observers: Map<string, PerformanceObserver> = new Map();

  private constructor() {
    this.initObservers();
  }

  static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor();
    }
    return PerformanceMonitor.instance;
  }

  private initObservers() {
    // Monitor navigation timing
    if ('PerformanceObserver' in window) {
      try {
        const navigationObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (entry.entryType === 'navigation') {
              const navEntry = entry as PerformanceNavigationTiming;
              this.metrics.set('pageLoadTime', navEntry.loadEventEnd - navEntry.loadEventStart);
              this.metrics.set('domContentLoaded', navEntry.domContentLoadedEventEnd - navEntry.domContentLoadedEventStart);
            }
          }
        });
        navigationObserver.observe({ entryTypes: ['navigation'] });
        this.observers.set('navigation', navigationObserver);
      } catch (e) {
        console.warn('Navigation timing observer not supported');
      }

      // Monitor paint timing
      try {
        const paintObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (entry.entryType === 'paint') {
              this.metrics.set(entry.name, entry.startTime);
            }
          }
        });
        paintObserver.observe({ entryTypes: ['paint'] });
        this.observers.set('paint', paintObserver);
      } catch (e) {
        console.warn('Paint timing observer not supported');
      }
    }
  }

  startMeasure(name: string): void {
    if ('performance' in window) {
      performance.mark(`${name}-start`);
    }
  }

  endMeasure(name: string): number | null {
    if ('performance' in window) {
      performance.mark(`${name}-end`);
      performance.measure(name, `${name}-start`, `${name}-end`);
      
      const measure = performance.getEntriesByName(name)[0];
      if (measure) {
        this.metrics.set(name, measure.duration);
        return measure.duration;
      }
    }
    return null;
  }

  getMetrics(): Record<string, number> {
    return Object.fromEntries(this.metrics);
  }

  logMetrics(): void {
    console.log('Performance Metrics:', this.getMetrics());
  }

  cleanup(): void {
    this.observers.forEach(observer => observer.disconnect());
    this.observers.clear();
    this.metrics.clear();
  }
}

export const performanceMonitor = PerformanceMonitor.getInstance();

// Utility function to measure component render time
export function measureRenderTime(componentName: string) {
  return {
    start: () => performanceMonitor.startMeasure(`${componentName}-render`),
    end: () => performanceMonitor.endMeasure(`${componentName}-render`)
  };
}

// Utility function to measure async operations
export async function measureAsync<T>(
  name: string,
  operation: () => Promise<T>
): Promise<T> {
  performanceMonitor.startMeasure(name);
  try {
    const result = await operation();
    return result;
  } finally {
    performanceMonitor.endMeasure(name);
  }
}
