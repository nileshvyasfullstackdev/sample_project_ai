export default function EnvCheckPage() {
  return (
    <div style={{ padding: '2rem', fontFamily: 'system-ui, sans-serif' }}>
      <h1>Environment Check</h1>
      <p>This page helps verify whether your app is running with the expected API routing.</p>
      <ul>
        <li><strong>Checkout API:</strong> <code>/api/checkout/create-session</code></li>
        <li><strong>Config endpoint:</strong> <code>/api/checkout/config</code></li>
        <li><strong>Serverless env endpoint:</strong> <code>/api/checkout/config</code></li>
      </ul>
      <button
        style={{ padding: '0.75rem 1.25rem', fontSize: '1rem', marginRight: '1rem' }}
        onClick={async () => {
          const response = await fetch('/api/checkout/config');
          const data = await response.json();
          alert(`checkout/config response:\n${JSON.stringify(data, null, 2)}`);
        }}
      >
        Check server config
      </button>
      <button
        style={{ padding: '0.75rem 1.25rem', fontSize: '1rem' }}
        onClick={async () => {
          const response = await fetch('/api/checkout/create-session', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ items: [{ name: 'Test', price: 1.0, quantity: 1 }] }),
          });
          const data = await response.json();
          alert(`create-session response:\n${JSON.stringify(data, null, 2)}`);
        }}
      >
        Test checkout route
      </button>
    </div>
  );
}
