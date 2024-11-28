import {createFileRoute} from '@tanstack/react-router';

export const Route = createFileRoute('/_protected/dashboard')({
  component: Dashboard,
});

function Dashboard() {
  return (
    <div className="p-2">
      <h3>Welcome to the dashboard!</h3>
    </div>
  );
}
