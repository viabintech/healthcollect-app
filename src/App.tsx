import { useState } from 'react';
import { Button } from './components/ui/Button';
import { Badge } from './components/ui/Badge';
import { Card } from './components/ui/Card';
import { Input } from './components/ui/Input';
import { Modal } from './components/ui/Modal';

function App() {
	const [email, setEmail] = useState('');
	const [isModalOpen, setIsModalOpen] = useState(false);

	return (
		<>
			<Button>New Button</Button>

			<div className="flex gap-3 p-4">
				<Badge mode="chip" active>Active Chip</Badge>
				<Badge mode="chip">Inactive Chip</Badge>
			</div>

			<div className="flex gap-3 p-4">
				<Badge mode="status" status="pending">Pending</Badge>
				<Badge mode="status" status="completed">Completed</Badge>
				<Badge mode="status" status="cancelled">Cancelled</Badge>
			</div>

			<div className="p-4">
				<Card>
					<h3 className="font-display text-lg text-ink">Blood Test</h3>
					<p className="text-ink-soft">Home sample collection</p>
				</Card>
			</div>

			<div className="p-4 max-w-sm">
				<Input
					label="Email"
					value={email}
					onChange={setEmail}
					placeholder="you@example.com"
				/>
			</div>

			<div className="p-4">
				<Button onClick={() => setIsModalOpen(true)}>Open Modal</Button>
			</div>

			<Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
				<h3 className="font-display text-lg text-ink mb-2">Confirm Booking</h3>
				<p className="text-ink-soft">Your home sample collection is scheduled for tomorrow at 9 AM.</p>
			</Modal>
		</>
	);
}

export default App;
