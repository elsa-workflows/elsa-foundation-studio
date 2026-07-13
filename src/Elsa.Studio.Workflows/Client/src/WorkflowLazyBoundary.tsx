import React, { Component, Suspense } from "react";

type WorkflowLazyBoundaryProps = {
  label: string;
  children: React.ReactNode;
};

type WorkflowLazyBoundaryState = {
  failed: boolean;
};

/**
 * Keeps every deferred Workflows surface operable for assistive technology while its code loads,
 * and turns a failed chunk request into an actionable error instead of a blank route.
 */
export class WorkflowLazyBoundary extends Component<WorkflowLazyBoundaryProps, WorkflowLazyBoundaryState> {
  state: WorkflowLazyBoundaryState = { failed: false };

  static getDerivedStateFromError(): WorkflowLazyBoundaryState {
    return { failed: true };
  }

  render() {
    if (this.state.failed) {
      return (
        <div className="wf-lazy-state error" role="alert">
          <strong>Unable to load {this.props.label}</strong>
          <span>The Studio module may have been updated while this page was open.</span>
          <button type="button" className="wf-lazy-reload" onClick={() => window.location.reload()}>
            Reload page
          </button>
        </div>
      );
    }

    return (
      <Suspense fallback={(
        <div className="wf-lazy-state" role="status" aria-live="polite" aria-busy="true">
          Loading {this.props.label}…
        </div>
      )}>
        {this.props.children}
      </Suspense>
    );
  }
}
