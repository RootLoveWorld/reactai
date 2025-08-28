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

// Advanced Patterns
// ============================================================================
export * from './refs';

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

// Advanced Hooks
export {
  RefsExample,
  BasicRefExamples,
  ForwardRefExamples
} from './refs';

// Navigation
export {
  Navigation
} from './common';

// ============================================================================
// Type Exports
// ============================================================================
export type { Product } from './state-lifting';