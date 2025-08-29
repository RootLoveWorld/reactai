// ============================================================================
// React Learning Examples - Component Exports
// ============================================================================
// This file provides a centralized export point for all React learning components
// organized by concept/pattern for educational purposes.

// Common/Shared Components
// ============================================================================
export * from './common';

// Form Control Patterns
// ============================================================================
export * from './controlled';
export * from './uncontrolled';

// State Management Patterns
// ============================================================================
export * from './state-lifting';
export * from './context';
export * from './reducer';

// React Hooks
// ============================================================================
export * from './effects';
export * from './refs';
export * from './concurrent';

// ============================================================================
// Re-exports by Category (for convenience)
// ============================================================================

// Form Components
export {
  ControlledComponent
} from './controlled';

export {
  UncontrolledComponent
} from './uncontrolled';

// State Management
export {
  StateLiftingExample,
  ProductCard,
  Cart
} from './state-lifting';

// Context API
export {
  ContextExample,
  ThemeDisplay,
  UserProfile,
  SettingsPanel
} from './context';

// Reducer Patterns
export {
  UseReducerExample,
  UseStateVsUseReducer,
  SimpleCounter,
  TodoList
} from './reducer';

// Effect Hooks
export {
  UseEffectExample,
  BasicEffectExample,
  DependencyArrayExample,
  CleanupExample,
  ConditionalEffectExample,
  DataFetchingExample
} from './effects';

// Advanced Hooks
export {
  RefsExample,
  BasicRefExamples,
  ForwardRefExamples,
  UseRefPrinciplesExample,
  UseStateVsUseRefComparison,
  RenderCycleDemo
} from './refs';

// Concurrent Features
export {
  ConcurrentExample,
  TransitionExample,
  DeferredValueExample,
  SuspenseExample,
  ConcurrentRenderingExample
} from './concurrent';

// Navigation
export {
  Navigation
} from './common';

// ============================================================================
// Type Exports
// ============================================================================
export type { Product } from './state-lifting';